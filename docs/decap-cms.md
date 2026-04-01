# Decap CMS setup

Decap CMS has been added for this Vite app.

Admin URL:

- `/admin/index.html`

Local development workflow:

1. Run `npx decap-server` from the project root.
2. In a second terminal, run `npm run dev`.
3. Open `http://localhost:5173/admin/index.html`.
4. Log in through the local backend when prompted.

Important:

- Decap local repo mode needs the proxy server from `decap-server`.
- Without that proxy server, local saves will not be written to your repo.
- Your campaigns pages already read from `public/content/campaigns.json` and `public/content/past-campaigns.json`.

Configured content files:

- `public/content/campaigns.json`
- `public/content/past-campaigns.json`
- `content/newsletters`
- `content/settings/organization.yml`

GitHub backend:

- Repository: `habib-prog/Alpha-Omega-Inter-Church-Trust`
- Branch: `main`

If you deploy the site later, Decap CMS can also save to GitHub with proper authentication.
