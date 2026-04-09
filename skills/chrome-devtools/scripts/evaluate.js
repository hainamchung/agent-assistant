#!/usr/bin/env node
/**
 * Execute JavaScript in page context
 * Usage: node evaluate.js --script "document.title" [--url https://example.com]
 */
import { getBrowser, getPage, closeBrowser, parseArgs, outputJSON, outputError } from './lib/browser.js';

async function evaluate() {
  const args = parseArgs(process.argv.slice(2));

  if (!args.script) {
    outputError(new Error('--script is required'));
    return;
  }

  try {
    const browser = await getBrowser({
      headless: args.headless !== 'false'
    });

    const page = await getPage(browser);

    // Navigate if URL provided
    if (args.url) {
      await page.goto(args.url, {
        waitUntil: args['wait-until'] || 'networkidle2'
      });
    }

    // SECURITY: page.evaluate executes arbitrary JS in browser context.
    // This is intentional for DevTools automation but requires explicit opt-in.
    if (!args['allow-eval'] && !process.env.AGENT_ASSISTANT_ALLOW_EVAL) {
      outputError(new Error(
        'Script evaluation requires explicit consent. ' +
        'Pass --allow-eval flag or set AGENT_ASSISTANT_ALLOW_EVAL=1 environment variable. ' +
        'WARNING: This executes arbitrary JavaScript in the browser page context.'
      ));
      return;
    }

    const result = await page.evaluate((script) => {
      // eslint-disable-next-line no-eval
      return eval(script);
    }, args.script);

    outputJSON({
      success: true,
      result: result,
      url: page.url()
    });

    if (args.close !== 'false') {
      await closeBrowser();
    }
  } catch (error) {
    outputError(error);
  }
}

evaluate();
