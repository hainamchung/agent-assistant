---
title: Actor Map
description: 16 actors with responsibilities, boundaries, touchpoints, and communication patterns in the Agent Assistant system
category: entity
tags: [actor, roles, communication, boundaries, actors, system-design]
related:
  - Agent System
  - Golden Triangle
  - Workflow System
  - Tiered Orchestration
  - Command System
---

# Actor Map

The Actor Map defines all 16 actors that interact within the Agent Assistant system. Each actor has clearly delineated responsibilities, enforced boundaries, defined touchpoints, and established communication patterns. This architecture ensures that every action is performed by the appropriate actor, preventing boundary violations and ensuring system coherence.

Actors are organized into six categories based on their primary function: Primary Actors (who initiate and receive work), Meta Actors (who coordinate and plan), Execution Actors (who implement), Validation Actors (who verify), Research Actors (who investigate), and Support Actors (who document). This categorization enables the [[Tiered Orchestration]] system to route commands and tasks to the correct actors with minimal friction.

**Source**: `documents/business/business-workflows/01-actor-map.md:1-11`

---

## Actor Overview

The 16 actors form an interconnected system where work flows from primary actors through meta coordination to execution and validation. Each actor operates within strict boundaries that define what they can and cannot do. These boundaries are enforced by the [[Command System]] and the [[Golden Triangle]] pattern, which together ensure that responsibilities are never crossed and quality is maintained at every stage.

The orchestration layer (A2) serves as the central routing mechanism, receiving commands from the End User (A1) and delegating work to specialized actors. Meta actors (A3-A4) break down tasks and coordinate teams. Execution actors (A5-A8) implement code across different platforms. Validation actors (A9-A12) verify correctness, security, and quality. Research actors (A13-A15) investigate and design solutions. Support actors (A16) document everything.

**Source**: `documents/business/business-workflows/01-actor-map.md:8-12`

---

## Primary Actors

Primary actors are the entry and exit points for all work in the system. They represent the human users and the central orchestration intelligence that coordinates all other actors.

### A1: End User

| Attribute | Value |
|-----------|-------|
| **ID** | A1 |
| **Name** | End User |
| **Type** | Primary |
| **Category** | External Actor |
| **Reports To** | N/A (external) |

#### Responsibilities

The End User is the primary driver of all activity in the system. They issue natural language commands that are interpreted and routed by the Orchestrator. The End User provides requirements, reviews deliverables, and accepts or rejects suggestions from the system. They serve as the ultimate arbiter of quality and the source of truth for business requirements.

**Source**: `documents/business/business-workflows/01-actor-map.md:16-25`

#### Boundaries

The End User operates within clear constraints that preserve system integrity. They **cannot** directly modify agent behavior, which prevents unauthorized changes to the system's coordination rules. They **cannot** bypass workflow phases, which ensures that all work follows the established quality gates defined in the [[Golden Triangle]] pattern. These boundaries are enforced at the [[Command System]] level, ensuring consistent behavior regardless of user requests.

#### Touchpoints

The End User interacts with the system through three primary touchpoints: command input (where they issue instructions), deliverable review (where they examine outputs), and error notifications (where they receive alerts about issues). These touchpoints define the complete user interface surface area and ensure that all communication flows through controlled channels.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A2: Orchestrator | Bidirectional | User Interface | Command input and deliverable review |
| A10: Reviewer | Indirect | Deliverable review | Receive quality feedback |
| A11: Debugger | Indirect | Error notifications | Receive bug reports |

The End User communicates exclusively through the User Interface with the Orchestrator. All other actor communications are mediated through the Orchestrator to maintain the single point of truth principle defined in [[Tiered Orchestration]].

**Source**: `documents/business/business-workflows/01-actor-map.md:16-25`

---

### A2: Orchestrator

| Attribute | Value |
|-----------|-------|
| **ID** | A2 |
| **Name** | Orchestrator |
| **Type** | System |
| **Category** | Coordination Layer |
| **Reports To** | N/A (system core) |

#### Responsibilities

The Orchestrator is the central nervous system of the Agent Assistant. It routes commands to appropriate agents, delegates work to specialized actors, coordinates phases across multiple actors, and enforces system rules. The Orchestrator maintains the command routing logic, manages agent handoffs, and ensures that phase transitions occur smoothly according to the established workflow patterns.

The Orchestrator implements Law 1 (Single Point of Truth) and Law 7 (Explicit Over Implicit) from the [[Agent System]] rules. It never writes code directly but instead routes all implementation requests to execution actors. This separation of concerns ensures that the coordination logic remains clean and maintainable.

**Source**: `documents/business/business-workflows/01-actor-map.md:27-36`

#### Boundaries

The Orchestrator operates under strict constraints that define its role in the system. It **cannot** write code directly under any circumstances. All implementation requests must be delegated to execution actors (A5-A8). This boundary ensures that the Orchestrator remains a coordinator rather than becoming a general-purpose implementer. When the Orchestrator encounters a request it cannot handle directly, it must route to the appropriate specialized agent.

#### Touchpoints

The Orchestrator connects to all other actors through its touchpoints: command routing (receiving and directing incoming commands), agent delegation (assigning work to specialists), and phase coordination (managing transitions between workflow phases). These touchpoints form the backbone of the system's coordination infrastructure.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A1: End User | Bidirectional | User Interface | Command I/O, deliverable review |
| A3: Tech Lead | Bidirectional | Commands, Handoffs | Task coordination, phase management |
| A4: Planner | Bidirectional | Commands | Requirements intake, plan routing |
| A5-A8: Engineers | Outbound | Agent Handoffs | Implementation delegation |
| A9-A12: Validators | Outbound | Review requests | Quality verification routing |
| A13-A15: Researchers | Outbound | Research routing | Investigation coordination |
| A16: Docs Manager | Outbound | Documentation requests | Content coordination |

The Orchestrator maintains bidirectional communication with the End User and Tech Lead, while delegating outbound to execution, validation, and research actors. This hub-and-spoke pattern ensures that all routing decisions flow through a single point.

**Source**: `documents/business/business-workflows/01-actor-map.md:27-36`

---

## Meta Actors

Meta actors operate above the implementation layer, providing coordination, planning, and arbitration services. They do not implement directly but instead enable other actors to work effectively.

### A3: Tech Lead

| Attribute | Value |
|-----------|-------|
| **ID** | A3 |
| **Name** | Tech Lead |
| **Type** | Meta |
| **Category** | Coordination |
| **Reports To** | A2: Orchestrator |

#### Responsibilities

The Tech Lead decomposes complex tasks into manageable subtasks, coordinates team activities, arbitrates disputes between actors, and synthesizes individual contributions into cohesive deliverables. As defined in the [[Golden Triangle]] pattern, the Tech Lead serves as the architecture coordinator who designs solutions without implementing them directly.

The Tech Lead owns the quality of every deliverable that leaves the team. They monitor debates between Executors and Reviewers, intervene when discussions exceed the 3-round limit, and make binding arbitration decisions on unresolved disputes. They apply the consensus stamp before releasing any phase output.

**Source**: `documents/business/business-workflows/01-actor-map.md:42-51`

#### Boundaries

The Tech Lead **does not implement directly**. This is a fundamental boundary that separates architecture from execution. The Tech Lead may suggest approaches, provide guidance, and evaluate alternatives, but all actual implementation work must be performed by execution actors (A5-A8). This boundary ensures that the Tech Lead maintains objectivity and does not become a bottleneck in the implementation pipeline.

#### Touchpoints

The Tech Lead interacts through task assignments (distributing work to team members), team communication (coordinating activities), and consensus decisions (resolving disputes and finalizing approaches). These touchpoints enable the Tech Lead to coordinate without directly participating in implementation.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A2: Orchestrator | Bidirectional | Commands, Handoffs | Phase coordination, escalation |
| A4: Planner | Bidirectional | Mailbox, Task List | Plan review, task breakdown |
| A5-A8: Engineers | Outbound/Inbound | Mailbox, Task List | Task assignment, submission review |
| A9-A12: Validators | Outbound/Inbound | Mailbox | Review coordination |
| A13-A15: Researchers | Outbound/Inbound | Mailbox | Research direction |
| A16: Docs Manager | Outbound | Documentation requests | Content coordination |

The Tech Lead communicates with all implementation actors through the Mailbox system, which provides an asynchronous coordination mechanism for distributed team activities.

**Source**: `documents/business/business-workflows/01-actor-map.md:42-51`

---

### A4: Planner

| Attribute | Value |
|-----------|-------|
| **ID** | A4 |
| **Name** | Planner |
| **Type** | Meta |
| **Category** | Planning |
| **Reports To** | A2: Orchestrator |

#### Responsibilities

The Planner creates detailed implementation plans, breaks down features into discrete tasks, and estimates effort for each task. The Planner works with requirements intake to understand user needs and produces structured plan deliverables that execution actors can follow. The Planner's outputs serve as the bridge between high-level requirements and low-level implementation tasks.

The Planner consults with the Tech Lead on technical feasibility and with the Brainstormer on alternative approaches. This consultation network ensures that plans are both technically sound and consider multiple implementation strategies.

**Source**: `documents/business/business-workflows/01-actor-map.md:53-62`

#### Boundaries

The Planner **produces plans only** and does not implement. This boundary is critical because mixing planning and implementation roles leads to scope creep and estimation bias. The Planner's job is to document what needs to be done, not to do it. When plans are complete, they are handed off to execution actors for implementation.

#### Touchpoints

The Planner receives requirements intake (understanding what needs to be built) and produces plan output (structured implementation blueprints). These touchpoints define the Planner's interface with the rest of the system.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A2: Orchestrator | Bidirectional | Commands | Requirements routing, plan submission |
| A5-A8: Engineers | Outbound | PLAN deliverables | Task breakdown delivery |
| A13-A15: Researchers | Inbound | RESEARCH deliverables | Information gathering |

The Planner delivers plans to execution actors and receives research input from the Research actors to inform estimation decisions.

**Source**: `documents/business/business-workflows/01-actor-map.md:53-62`

---

## Execution Actors

Execution actors are responsible for implementing code and content across different platforms and domains. Each execution actor has a defined scope that prevents overlap with other execution actors.

### A5: Backend Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A5 |
| **Name** | Backend Engineer |
| **Type** | Execution |
| **Category** | Implementation |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Backend Engineer implements server-side logic, designs and implements APIs, manages database operations, and ensures backend infrastructure reliability. The Backend Engineer works with backend-related skills including nodejs, python, and databases. Preferred skills include docker and redis for infrastructure concerns.

The Backend Engineer implements assigned subtasks to publication quality, self-reviews against quality standards before submitting, and defends or fixes issues raised by the Reviewer. As part of the [[Golden Triangle]] pattern, the Backend Engineer serves as the Executor role on the backend-team.

**Source**: `documents/business/business-workflows/01-actor-map.md:68-77`

#### Boundaries

The Backend Engineer **implements backend only**. Frontend work is explicitly out of scope. This boundary prevents scope creep and ensures that specialized expertise is applied to each layer of the system. When frontend-related issues arise, the Backend Engineer must route them to the Frontend Engineer (A6) rather than addressing them directly.

#### Touchpoints

The Backend Engineer receives requirements and design specs as input and produces deliverable output (code, APIs, documentation). These touchpoints define the interface between planning and implementation.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox, Task List | Task assignment, submission |
| A6: Frontend Engineer | Consultation | Code | API coordination, integration |
| A10: Reviewer | Inbound | CODE deliverables | Quality verification |
| A11: Debugger | Inbound | Error reports | Bug investigation |

**Source**: `documents/business/business-workflows/01-actor-map.md:68-77`

---

### A6: Frontend Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A6 |
| **Name** | Frontend Engineer |
| **Type** | Execution |
| **Category** | Implementation |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Frontend Engineer implements UI components, manages client-side logic, and ensures responsive styling and accessibility compliance. The Frontend Engineer works with react, css, and typescript as required skills. Preferred skills include accessibility and testing for quality assurance.

The Frontend Engineer consults with the Backend Engineer on API integration and with the Designer on visual implementation. This consultation network ensures that frontend implementations align with both technical constraints and design intent.

**Source**: `documents/business/business-workflows/01-actor-map.md:79-88`

#### Boundaries

The Frontend Engineer **implements frontend only**. Backend logic, database operations, and server infrastructure are out of scope. This boundary ensures clear separation between client and server concerns, enabling parallel development by specialized teams.

#### Touchpoints

The Frontend Engineer receives design specs and requirements as input and produces deliverable output (components, pages, styles). These touchpoints connect design intent to implementation reality.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox, Task List | Task assignment, submission |
| A5: Backend Engineer | Consultation | API specs | Integration coordination |
| A15: Designer | Consultation | Design specs | Visual implementation |
| A10: Reviewer | Inbound | CODE deliverables | Quality verification |

**Source**: `documents/business/business-workflows/01-actor-map.md:79-88`

---

### A7: Mobile Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A7 |
| **Name** | Mobile Engineer |
| **Type** | Execution |
| **Category** | Implementation |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Mobile Engineer implements features for iOS and Android platforms using React Native, Swift, and Kotlin. The Mobile Engineer ensures platform-specific code follows best practices for each target platform and manages cross-platform compatibility when needed.

The Mobile Engineer works as part of the mobile-team, following the [[Golden Triangle]] pattern with the Tech Lead coordinating and the Reviewer verifying quality.

**Source**: `documents/business/business-workflows/01-actor-map.md:90-99`

#### Boundaries

The Mobile Engineer **focuses on mobile platforms only**. Web, desktop, and backend implementations are out of scope. This boundary ensures that mobile-specific expertise is applied appropriately without distraction from other platform concerns.

#### Touchpoints

The Mobile Engineer receives platform requirements and produces deliverable output (mobile components, platform-specific implementations). These touchpoints connect requirements to mobile-specific implementations.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox, Task List | Task assignment, submission |
| A10: Reviewer | Inbound | CODE deliverables | Quality verification |

**Source**: `documents/business/business-workflows/01-actor-map.md:90-99`

---

### A8: Game Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A8 |
| **Name** | Game Engineer |
| **Type** | Execution |
| **Category** | Implementation |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Game Engineer implements game logic, physics simulation, graphics rendering, and multiplayer networking. The Game Engineer works with unity, threejs, and webgl as core technologies. Game development requires specialized knowledge of real-time systems, asset management, and platform-specific game APIs.

The Game Engineer follows the [[Golden Triangle]] pattern with the Tech Lead coordinating and the Reviewer verifying implementation quality.

**Source**: `documents/business/business-workflows/01-actor-map.md:101-110`

#### Boundaries

The Game Engineer **focuses on game development only**. General application development, web apps, and backend services are out of scope unless specifically related to game infrastructure (such as game servers).

#### Touchpoints

The Game Engineer receives game design specs and produces deliverable output (game systems, mechanics, graphics). These touchpoints connect design intent to playable game implementations.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox, Task List | Task assignment, submission |
| A10: Reviewer | Inbound | CODE deliverables | Quality verification |

**Source**: `documents/business/business-workflows/01-actor-map.md:101-110`

---

## Validation Actors

Validation actors verify the correctness, security, and quality of all work produced by execution actors. They operate as the adversarial quality gate in the [[Golden Triangle]] pattern.

### A9: Tester

| Attribute | Value |
|-----------|-------|
| **ID** | A9 |
| **Name** | Tester |
| **Type** | Validation |
| **Category** | Quality Assurance |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Tester generates comprehensive test suites including unit tests, integration tests, and end-to-end tests. The Tester ensures adequate test coverage (targeting >80% as defined in the [[Golden Triangle]] quality gates) and validates functional correctness. The Tester consults with the Reviewer and Debugger to ensure tests effectively catch defects.

The Tester creates tests but does not fix implementation issues. When tests fail, the Tester reports findings to the Tech Lead who coordinates with the appropriate execution actor to address issues.

**Source**: `documents/business/business-workflows/01-actor-map.md:116-125`

#### Boundaries

The Tester **creates tests only**. Fixing implementation based on test failures is out of scope. This boundary maintains the adversarial relationship between implementation and verification, preventing conflicts of interest where the same actor both creates and validates code.

#### Touchpoints

The Tester receives code input and produces test output and coverage reports. These touchpoints connect code to its quality verification.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox | Test coordination, escalation |
| A5-A8: Engineers | Inbound | CODE deliverables | Test creation |
| A11: Debugger | Consultation | TEST deliverables | Failure investigation |

**Source**: `documents/business/business-workflows/01-actor-map.md:116-125`

---

### A10: Reviewer

| Attribute | Value |
|-----------|-------|
| **ID** | A10 |
| **Name** | Reviewer |
| **Type** | Validation |
| **Category** | Quality Assurance |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Reviewer performs code review against best practices and design patterns, ensures standards compliance, and serves as the adversarial quality gate in the [[Golden Triangle]] pattern. The Reviewer assumes every submission is wrong until proven otherwise, challenges every claim, and verifies every source citation.

The Reviewer posts structured review findings with severity levels and can block delivery until the quality bar is met. The Reviewer consults with the Tester and Security Engineer for specialized review areas.

**Source**: `documents/business/business-workflows/01-actor-map.md:127-136`

#### Boundaries

The Reviewer **reviews and reports only**. The Reviewer does not modify code directly. This boundary ensures that the Reviewer maintains objectivity and does not become an implementation bottleneck. All fixes must be performed by execution actors based on Reviewer feedback.

#### Touchpoints

The Reviewer receives code input and produces review output with PASS/FAIL status. These touchpoints connect implementation to quality verification.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox | Review escalation, approval |
| A5-A8: Engineers | Inbound | CODE deliverables | Review requests |
| A9: Tester | Consultation | Coverage reports | Testing coordination |
| A12: Security Engineer | Consultation | Security findings | Security review |

**Source**: `documents/business/business-workflows/01-actor-map.md:127-136`

---

### A11: Debugger

| Attribute | Value |
|-----------|-------|
| **ID** | A11 |
| **Name** | Debugger |
| **Type** | Validation |
| **Category** | Quality Assurance |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Debugger investigates bugs, traces root causes, and proposes solutions without implementing fixes. The Debugger uses systematic debugging methodology including backward call stack tracing, multi-layer validation, and verification protocols. The Debugger consults with the Tester and Performance Engineer for specialized investigation areas.

The Debugger produces DEBUG reports with root cause analysis that enable execution actors to implement targeted fixes.

**Source**: `documents/business/business-workflows/01-actor-map.md:138-147`

#### Boundaries

The Debugger **investigates only**. Implementing fixes based on investigation findings is out of scope. This boundary ensures that investigation and implementation remain separate, enabling focused expertise at each stage.

#### Touchpoints

The Debugger receives error reports and investigates code, producing analysis output. These touchpoints connect problems to their root causes.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox | Debug coordination, escalation |
| A5-A8: Engineers | Inbound | Error reports | Investigation requests |
| A9: Tester | Consultation | TEST deliverables | Test failure investigation |

**Source**: `documents/business/business-workflows/01-actor-map.md:138-147`

---

### A12: Security Engineer

| Attribute | Value |
|-----------|-------|
| **ID** | A12 |
| **Name** | Security Engineer |
| **Type** | Validation |
| **Category** | Quality Assurance |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Security Engineer performs security audits, assesses vulnerabilities, and recommends hardening measures. The Security Engineer focuses on OWASP Top 10 vulnerabilities and other common security weaknesses. The Security Engineer consults with the Reviewer and DevOps Engineer for comprehensive security coverage.

The Security Engineer produces security reports with vulnerability findings that enable appropriate remediation by execution actors.

**Source**: `documents/business/business-workflows/01-actor-map.md:149-158`

#### Boundaries

The Security Engineer **assesses only**. Implementing security fixes is out of scope. This boundary maintains the separation between security assessment and remediation, ensuring that security issues are properly documented before being addressed.

#### Touchpoints

The Security Engineer receives code input and produces security reports with vulnerability findings. These touchpoints connect implementation to security verification.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Mailbox | Security coordination, escalation |
| A5-A8: Engineers | Inbound | CODE deliverables | Security review requests |
| A10: Reviewer | Consultation | Review findings | Security integration |

**Source**: `documents/business/business-workflows/01-actor-map.md:149-158`

---

## Research Actors

Research actors investigate, explore, and design solutions without implementing them. They provide the information foundation that enables informed decision-making.

### A13: Researcher

| Attribute | Value |
|-----------|-------|
| **ID** | A13 |
| **Name** | Researcher |
| **Type** | Research |
| **Category** | Investigation |
| **Reports To** | A2: Orchestrator |

#### Responsibilities

The Researcher investigates technologies, analyzes best practices, and gathers evidence to inform decision-making. The Researcher produces research deliverables that provide the factual foundation for plans and implementations. The Researcher consults with the Business Analyst and Reporter for specialized research areas.

**Source**: `documents/business/business-workflows/01-actor-map.md:164-173`

#### Boundaries

The Researcher **researches and reports only**. Implementation based on research findings is out of scope. This boundary ensures that research remains objective and focused on gathering information rather than advocating for specific implementations.

#### Touchpoints

The Researcher receives research questions and produces findings output. These touchpoints connect information needs to researched answers.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A2: Orchestrator | Bidirectional | RESEARCH deliverables | Research coordination |
| A4: Planner | Inbound | RESEARCH deliverables | Information provision |

**Source**: `documents/business/business-workflows/01-actor-map.md:164-173`

---

### A14: Scouter

| Attribute | Value |
|-----------|-------|
| **ID** | A14 |
| **Name** | Scouter |
| **Type** | Research |
| **Category** | Investigation |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Scouter explores the codebase, maps dependencies, and discovers patterns that inform implementation decisions. The Scouter produces SCOUT reports with dependency maps that help execution actors understand the existing architecture before making changes.

**Source**: `documents/business/business-workflows/01-actor-map.md:175-184`

#### Boundaries

The Scouter **explores and reports only**. Modifying the codebase based on exploration findings is out of scope. This boundary ensures that exploration remains focused on understanding rather than changing the system.

#### Touchpoints

The Scouter analyzes the codebase and produces pattern reports. These touchpoints connect code exploration to architectural understanding.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | SCOUT reports | Exploration coordination |
| A5-A8: Engineers | Inbound | Dependency requests | Architecture understanding |

**Source**: `documents/business/business-workflows/01-actor-map.md:175-184`

---

### A15: Designer

| Attribute | Value |
|-----------|-------|
| **ID** | A15 |
| **Name** | Designer |
| **Type** | Research |
| **Category** | Design |
| **Reports To** | A3: Tech Lead |

#### Responsibilities

The Designer creates UI/UX designs, establishes design systems, and reviews accessibility compliance. The Designer produces DESIGN deliverables that guide frontend implementation. The Designer consults with the Frontend Engineer to ensure designs are technically feasible.

**Source**: `documents/business/business-workflows/01-actor-map.md:186-195`

#### Boundaries

The Designer **designs only**. Implementing designs is out of scope. This boundary ensures that design remains focused on user experience rather than technical constraints, while implementation is handled by specialized execution actors.

#### Touchpoints

The Designer receives requirements and produces design specs. These touchpoints connect user needs to visual solutions.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A3: Tech Lead | Bidirectional | Design coordination | Design oversight |
| A6: Frontend Engineer | Consultation | Design specs | Implementation guidance |

**Source**: `documents/business/business-workflows/01-actor-map.md:186-195`

---

## Support Actors

Support actors provide essential services that enable other actors to work effectively. They document, coordinate, and manage resources.

### A16: Docs Manager

| Attribute | Value |
|-----------|-------|
| **ID** | A16 |
| **Name** | Docs Manager |
| **Type** | Support |
| **Category** | Documentation |
| **Reports To** | A2: Orchestrator |

#### Responsibilities

The Docs Manager performs technical writing, manages documentation architecture, and produces API documentation. The Docs Manager ensures that all deliverables are properly documented and that documentation remains consistent across the system. The Docs Manager consults with the Wiki Reviewer and Researcher for documentation quality assurance.

**Source**: `documents/business/business-workflows/01-actor-map.md:201-210`

#### Boundaries

The Docs Manager **writes documentation only**. Writing application code is out of scope. This boundary ensures that documentation remains focused on clarity and completeness rather than technical implementation details.

#### Touchpoints

The Docs Manager receives code input and produces documentation output. These touchpoints connect implementation to its documentation.

#### Communication Partners

| Partner | Direction | Channel | Purpose |
|---------|-----------|---------|---------|
| A2: Orchestrator | Bidirectional | DOC deliverables | Documentation coordination |
| A5-A8: Engineers | Inbound | CODE deliverables | Documentation source |

**Source**: `documents/business/business-workflows/01-actor-map.md:201-210`

---

## Actor Communication Matrix

The following matrix defines the communication patterns between all actors in the system. This matrix ensures that communication flows through appropriate channels and that no actor is required to communicate outside its defined touchpoints.

| Actor | ID | Initiates With | Receives From | Via |
|-------|-----|---------------|---------------|-----|
| End User | A1 | A2: Orchestrator | A2: Orchestrator | User Interface |
| Orchestrator | A2 | A3-A16 (all actors) | A1, A3-A16 | Commands, Handoffs |
| Tech Lead | A3 | A5-A15 | A2, A5-A15 | Mailbox, Task List |
| Planner | A4 | A5-A8 | A2, A13-A15 | PLAN deliverables |
| Backend Engineer | A5 | A3, A10 | A3, A10, A2 | Mailbox, CODE |
| Frontend Engineer | A6 | A3, A10 | A3, A10, A2 | Mailbox, CODE |
| Mobile Engineer | A7 | A3, A10 | A3, A10, A2 | Mailbox, CODE |
| Game Engineer | A8 | A3, A10 | A3, A10, A2 | Mailbox, CODE |
| Tester | A9 | A3 | A2, A5-A8 | REVIEW, TEST, DEBUG |
| Reviewer | A10 | A3 | A2, A5-A8 | REVIEW deliverables |
| Debugger | A11 | A3 | A2, A5-A8 | DEBUG reports |
| Security Engineer | A12 | A3 | A2, A5-A8 | SECURITY reports |
| Researcher | A13 | A4 | A2, A4 | RESEARCH deliverables |
| Scouter | A14 | A4 | A2, A4 | SCOUT reports |
| Designer | A15 | A4 | A2, A4 | DESIGN deliverables |
| Docs Manager | A16 | A2 | A2, A5-A8 | DOC deliverables |

**Source**: `documents/business/business-workflows/01-actor-map.md:214-225`

---

## Boundary Enforcement

Boundary enforcement ensures that each actor operates within its defined scope and that no actor encroaches on the responsibilities of another. This enforcement is critical for maintaining system coherence and preventing the chaos that occurs when actors operate without clear boundaries.

### Meta Agent Boundary: Coordinate, Never Implement

Meta agents (A3: Tech Lead, A4: Planner) **coordinate only**. They design, plan, and arbitrate, but never implement. This boundary is enforced by the Tiered Orchestration pattern, which routes all implementation requests to execution actors. When a Meta agent receives an implementation request, it must delegate to the appropriate execution actor rather than handling it directly.

**Source**: `documents/business/business-workflows/01-actor-map.md:229-237`

### Validation Boundary: Report, Never Fix

Validation actors (A9-A12) **report only**. They verify, audit, and investigate, but never fix. When a validation actor identifies an issue, it documents the finding and routes the fix request to the appropriate execution actor. This boundary maintains the adversarial relationship that makes validation effective.

**Source**: `documents/business/business-workflows/01-actor-map.md:229-237`

### Execution Boundary: Implement, Never Change Requirements

Execution actors (A5-A8) **implement only**. They follow specifications and do not change requirements. When an execution actor encounters unclear or conflicting requirements, it must escalate to the Tech Lead rather than making unilateral decisions. This boundary ensures that requirements remain stable throughout implementation.

**Source**: `documents/business/business-workflows/01-actor-map.md:229-237`

### Orchestration Boundary: Route, Never Execute

The Orchestrator (A2) **routes only**. It receives commands, delegates to appropriate agents, and coordinates phases, but never implements directly. This boundary is defined by Law 1 (Single Point of Truth) in the [[Agent System]], which establishes the Orchestrator as the central coordination hub. All requests that require implementation must pass through the Orchestrator to the appropriate execution actor.

**Source**: `documents/business/business-workflows/01-actor-map.md:229-237`

### Enforcement Mechanisms

Boundary violations are prevented through multiple mechanisms:

1. **Command System Routing**: The [[Command System]] routes commands to appropriate actors based on command type and actor capabilities. Commands that violate boundaries are rejected with explanatory errors.

2. **Golden Triangle Pattern**: The [[Golden Triangle]] pattern enforces boundaries through its role definitions. The Tech Lead coordinates, the Executor implements, and the Reviewer verifies. Each role is explicitly prohibited from acting outside its scope.

3. **Tiered Orchestration**: The [[Tiered Orchestration]] system implements hierarchical routing that routes requests through appropriate tiers. Lower-tier requests cannot bypass higher-tier coordination.

4. **Evidence Source Tracking**: Every action is traced to its source, enabling accountability and boundary enforcement verification.

**Source**: `documents/business/business-workflows/01-actor-map.md:240-246`

---

## Evidence Sources

The Actor Map is derived from the following authoritative sources:

- `rules/CORE.md` — Orchestrator role definition and Orchestration Laws
- `rules/AGENTS.md` — Agent categories and task-to-agent mapping
- `rules/TEAMS.md` — Tech Lead role and Golden Triangle team structure
- `rules/PHASES.md` — Phase roles and required outputs
- `web/src/data/agents.ts` — Agent definition data structure

**Source**: `documents/business/business-workflows/01-actor-map.md:240-247`

---

## Related Pages

- [[Agent System]] — The 21 specialist agents that implement the Actor Map
- [[Golden Triangle]] — The adversarial team coordination pattern
- [[Workflow System]] — The phases that organize actor activities
- [[Tiered Orchestration]] — The hierarchical command routing mechanism
- [[Command System]] — The commands that invoke actor behaviors
- [[Team System]] — The 18 teams that organize actors for collaboration
