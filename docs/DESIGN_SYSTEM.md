# Design system

Goal: professional, warm, minimal healthcare product. Not a hospital EMR, not a crypto dashboard, not childish. Cultural identity comes from the Kathputli logo and (later) story illustrations, not from decorating the analytics UI.

Tokens live in `src/app/globals.css` (`@theme`). Use the Tailwind classes they generate.

| Token                | Value             | Use                            |
| -------------------- | ----------------- | ------------------------------ |
| `canvas`             | #FAFAF8           | Page background                |
| `surface`            | #FFFFFF           | Cards                          |
| `panel`              | #F5F5F1           | Secondary panels, hover, notes |
| `line`               | #E9E9E4           | Borders                        |
| `ink` / `muted`      | #1C2321 / #6B7370 | Text                           |
| `brand-800`          | #164E4A           | Active nav, primary buttons    |
| `data` / `data-soft` | #3B82F6 / #93C5FD | Charts, analytics              |
| `good`               | #2F8F5B           | Improvement (sparingly)        |
| `gold`               | #E0A526           | Engagement stars               |

- Font: Inter (variable). Hierarchy through size and weight, not colour.
- Radius: cards 14px (`--radius-card`), controls 12px.
- Shadow: one token, `--shadow-card` (very subtle). Depth comes from whitespace and borders.
- Icons: `lucide-react`, line style, size 18 in nav. No emojis as UI icons.
- Layout: fixed 224px sidebar on desktop; drawer under 1024px; cards stack on small screens; tables scroll horizontally.
- Charts (`lib/chartColors.ts` keeps hex in sync): left = blue, right = light blue, thin gridlines, small points.
- Accessibility floor: visible focus ring, `aria-*` on custom controls, reduced-motion respected.

## Component inventory

`ui/`: Card, Badge, Stars, PageHeader, ComingSoon. `layout/`: AppShell, Sidebar, DeviceStatusChip, Logo. `dashboard/`: MetricCard, ChildSelector, TimeRangeSelector, RomChart, MotorRadar, SessionTable, TherapistNote, DashboardView.
