# Security and privacy

TARA is designed around children's health-related data. Even as a prototype, follow these rules:

- **Never commit real data**: child names, ages tied to identities, session recordings, screenshots of real patients, or exports from real devices.
- **Never commit secrets.** `.env*` files are git-ignored except `.env.example`. If a key leaks, rotate it immediately.
- AI API keys are **server-side only** (never prefix with `NEXT_PUBLIC_`).
- When the backend arrives, Supabase Row Level Security must be enabled on every table before any non-synthetic data is stored.

Report vulnerabilities privately to the maintainers rather than opening a public issue.
