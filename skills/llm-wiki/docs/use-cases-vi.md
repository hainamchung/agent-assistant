# Tình huống sử dụng

Các ví dụ thực tế khi dùng llm-wiki trong dự án phát triển phần mềm.

## Quản lý tri thức team

### 1. Onboarding developer mới

Dev mới join team, tài liệu nằm rải rác khắp nơi.

```
/wiki ingest docs/api-spec.pdf --category architecture
/wiki ingest docs/database-erd.png --category design
/wiki ingest confluence-export/ --category product
/wiki compile

/wiki query "Luồng thanh toán hoạt động như thế nào?"
```

**Không có wiki:** Đọc 20 file rời rạc, hỏi 5 người khác nhau.
**Có wiki:** Hỏi 1 câu, nhận câu trả lời có nguồn trích dẫn và wikilinks.

### 2. Post-mortem & kiến thức sự cố

```
/wiki ingest postmortem-2026-03-15.md --category operations
/wiki compile

# 3 tháng sau, triệu chứng tương tự xuất hiện
/wiki query "Trước đây có gặp lỗi timeout trên payment gateway không?"
```

→ `wiki/postmortems/payment-gateway-timeout.md` với nguyên nhân gốc, cách fix, và timeline.

**Giá trị:** Team không lặp lại sai lầm cũ. Bộ nhớ tổ chức sống trong git, không mất theo người nghỉ việc.

### 3. Lưu trữ quyết định kiến trúc (ADR)

```
/wiki ingest meeting-notes/2026-03-20-migrate-to-postgres.md --category meetings
/wiki ingest adr/adr-007-database-migration.md --category architecture
/wiki compile

# 6 tháng sau: "sao không dùng MongoDB?"
/wiki query "Tại sao chọn PostgreSQL thay vì MongoDB?"
```

→ `wiki/decisions/database-selection.md` với trích dẫn từ meeting notes + ADR gốc.

### 4. Tài liệu API liên domain

```
/wiki ingest openapi.yaml --category development
/wiki ingest docs/auth-flow.md --category architecture
/wiki ingest docs/rate-limiting.md --category operations
/wiki compile

/wiki query "Làm sao authenticate và gọi endpoint /orders?"
```

**Khác Swagger:** Wiki kết nối liên domain — auth + API + rate limit + known issues trong 1 câu trả lời.

### 5. Tích lũy kiến thức từ sprint retrospective

```
# Cuối mỗi sprint
/wiki ingest retro-sprint-42.md --category meetings
/wiki compile

# Trước sprint planning
/wiki query "Những vấn đề nào lặp lại trong 5 sprint gần nhất?"
```

→ `wiki/chronicles/sprint-retrospectives.md` — "Flaky tests xuất hiện 4/5 sprint, deployment delays 3/5."

## Phát triển & điều tra tính năng

### 6. Điều tra lịch sử tính năng trước khi sửa

```
/wiki ingest prd-notification-v1.md --category product           # 2024-Q1
/wiki ingest meeting-notification-redesign.md --category meetings # 2024-Q3
/wiki ingest prd-notification-v2.md --category product           # 2025-Q1
/wiki ingest hotfix-notification-queue.md --category operations   # 2025-Q2
/wiki compile

# Được giao ticket: "Refactor notification retry logic"
/wiki query "Lịch sử thay đổi hệ thống notification và lý do?"
```

→ `wiki/chronicles/notification-system.md` — Timeline: polling → WebSocket (polling gây tải DB) → queue (WebSocket mất message khi server restart) → backpressure (queue deadlock khi burst 1000+ messages).

**Dev hiểu:** KHÔNG ĐƯỢC xóa logic backpressure dù nó trông "thừa".

### 7. Hiểu side effects trước khi thêm tính năng mới

```
# PM yêu cầu: "Thêm tính năng scheduled messages"
/wiki query "Những component nào liên quan đến message delivery và có hạn chế gì?"
```

→ Links đến `wiki/entities/message-queue.md`, `wiki/concepts/backpressure-pattern.md`, `wiki/postmortems/notification-queue-deadlock.md`.

**Dev nhận ra:** Scheduled messages cần bypass rate-limiter nhưng vẫn phải qua backpressure → tránh được bug mà không ai trong team hiện tại còn nhớ.

### 8. Hiểu lý do business đằng sau code "lạ"

```
/wiki ingest slack-export-payments-channel.md --category meetings
/wiki ingest jira-PAY-234-special-tax-handling.md --category product
/wiki ingest adr-005-tax-rounding.md --category architecture
/wiki compile

# Dev thấy: tax rounding dùng ROUND_HALF_EVEN thay vì ROUND_HALF_UP
/wiki query "Tại sao payment dùng banker's rounding cho tính thuế?"
```

→ `wiki/decisions/tax-rounding-method.md` — "Legal yêu cầu tuân thủ EU VAT directive. ROUND_HALF_UP gây sai lệch 0.01% khi aggregate 100K+ giao dịch/tháng. Auditor đã flag vào Q2-2024."

**Dev hiểu:** KHÔNG ĐƯỢC đổi phương pháp rounding dù unit test sẽ "đẹp" hơn.

### 9. Đánh giá impact trước khi refactor

```
# Dev muốn tách monolith user-service thành 2 microservices
/wiki query "Những service nào phụ thuộc user-service và lần trước thay đổi nó thì cái gì bị hỏng?"
```

→ Liệt kê 7 downstream consumers, sự cố trước đây khi billing bị break do cache role cũ sau khi tách auth ra.

**Dev nhận ra:** Phải invalidate cache ở billing trước khi tách — không lặp lại incident cũ.

### 10. Tiếp nhận tính năng từ người đã nghỉ việc

```
/wiki ingest recommendation-design-doc.md --category architecture
/wiki ingest recommendation-ab-test-results.md --category data
/wiki ingest meeting-recommendation-v2-planning.md --category meetings
/wiki compile

/wiki query "Recommendation scoring hoạt động như thế nào và có những tradeoff gì?"
```

→ Collaborative filtering + content-based hybrid. Pure CF bị cold-start (AB test: kém 40% với user mới). Hybrid tăng 50ms latency nhưng +12% conversion — team đã chấp nhận tradeoff.

**Dev mới hiểu TẠI SAO, không chỉ LÀM GÌ** → sửa đúng chỗ.

## Quy luật chung

```
Trước khi sửa/thêm tính năng:

/wiki query "Tại sao X hoạt động như vậy?"
         │
         ├──► wiki/chronicles/   → lịch sử thay đổi
         ├──► wiki/decisions/    → lý do quyết định
         └──► wiki/postmortems/  → cái gì đã fail
                    │
                    ▼
         Dev có đầy đủ context
         → sửa đúng chỗ
         → không phá thứ đang chạy
```

**Code cho biết ĐANG LÀM GÌ** (trạng thái hiện tại). **Wiki giữ lại TẠI SAO** (lý do) và **CÁI GÌ ĐÃ HỎNG** (bài học) — hai thứ mà git blame không nói được đủ.
