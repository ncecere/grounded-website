# Screenshots to capture for v0.3.0

The v0.3.0 sections of the landing page have 3 new screenshot slots in `lib/slots.json`. Until a file exists, each shows the "Screenshot coming soon" placeholder (it names the slot, not the file). They use the same captures as the docs site (grounded-docs `SCREENSHOTS-v0.3.0.md`), so capture once for both.

## How

- Only from the public demo instance ("Example University"): PNG, 1440x900, saved in `../grounded-assets/screenshots/` under the **file** name below, with a line in that folder's `MANIFEST.md`.
- Then `npm run images` and commit `public/images/` and `lib/screenshots.json`. Check each image against its slot's alt text and caption.

## New slots

| Slot | File (`file` key) | Section | What it should show | Persona, URL |
|---|---|---|---|---|
| `mcp-tool-source` | `chat-tool-source` | MCP (`#feature-mcp`) | A chat answer that cites a tool result: the sources open, with **From Service status · check_outage** next to a document passage. Needs an MCP server "Service status" registered, its `check_outage` tool approved and chosen on a published agent (`make fake-mcp` in the Grounded repository serves one locally). | Jordan Kim, `/a/it-help-desk/help-desk-assistant?c=…` |
| `health-connections` | `admin-connections-health` | Stored health (`#feature-health`) | Admin → Connections with the **Health** column: two "Healthy · … ago", one "Failing · since …", the Health filter visible. | Morgan Lee, `/admin/connections` |
| `tracing-trace` | `tracing-answer-trace` | Tracing (`#feature-tracing`) | One chat answer as a trace in a local Jaeger (`OTEL_SERVICE_NAME=grounded-dev`): HTTP span, `agent.answer`, retrieval, `chat …` and an MCP `tools/call` span. | any, `http://127.0.0.1:16686` |

## Existing slots to recapture (optional)

| Slot | Why |
|---|---|
| `admin-overview-features` | The Features card now has MCP server and OAuth sign-in rows. |
| `agent-build` | Build now has a Tools section. |
