# Alpha Omega Inter Church Trust Website

Official website and admin dashboard for Alpha Omega Inter Church Trust. The app is built with React, Vite, Firebase Authentication, Firebase Realtime Database, Firebase Storage, Tailwind CSS, DaisyUI, Zustand, Framer Motion, and Recharts.

This README is for both content/admin users and new developers who need to maintain or update the project.

## Quick Start

Requirements:

- Node.js 20 or newer recommended
- npm
- Firebase project access for production data
- Repository access for code changes

Install and run locally:

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

Lint:

```bash
npm run lint
```

Note: the current project may contain existing lint issues unrelated to a new change. Always run `npm run build` before handing off work.

## User And Admin Guide

Public users can:

- Browse home, about, campaigns, past campaigns, gallery, newsletters, legal, privacy, terms, sponsor child, and contact pages.
- Sign up with email/password.
- Verify their email before login.
- Sign in with Google.
- View and edit their profile.
- Open profile history through `Profile -> History` or the navbar `Donation History` link.
- Send private messages to the admin team from the contact page.
- Post public comments where available.

Admins can:

- Access `/admin-panel` after login.
- Update website content stored in Firebase Realtime Database under `site_content`.
- Manage campaigns, past campaigns, home hero, about page, newsletters, sponsor child, voices of hope, gallery, legal, privacy, and terms content.
- Add or remove super admins.
- Moderate public comments.
- View admin activity logs and user login/logout logs.
- Reply to private user messages through the floating admin inbox.

Admin access rules in the app:

- Default/root super admin: `jcollins@globalgates.info`
- Initial transferable super admin: `xavierjames701@gmail.com`
- More super admins can be added from the admin panel.
- Removing a super admin removes their full admin access.
- A removed seeded admin is tracked in `removed_admins` so they are not auto-added again.
- Adding that email again as a super admin clears the removed block.
- The default/root super admin cannot be removed from the UI.

## Updating Website Content

Preferred content update flow:

1. Log in with an approved super admin account.
2. Go to `/admin-panel`.
3. Choose the content section.
4. Edit fields.
5. Click save.
6. Refresh the public page and confirm the update.

Content is saved to Firebase Realtime Database:

```text
site_content/{sectionKey}/content
```

The frontend reads content with `src/data/useSiteContent.js`.

Important behavior:

- Public pages use Firebase content as the source of truth.
- Latest content is cached in `localStorage` to avoid showing old bundled JSON before Firebase loads.
- Admin saves update this cache immediately.
- Fallback JSON files in `public/content` are used only if Firebase content is missing or unavailable.

Main fallback content files:

- `public/content/home-hero.json`
- `public/content/about-page.json`
- `public/content/campaigns.json`
- `public/content/past-campaigns.json`
- `public/content/newsletters-page.json`
- `public/content/sponsor-child-page.json`
- `public/content/voices-of-hope.json`
- `public/content/gallery-page.json`
- `public/content/legal-page.json`
- `public/content/privacy-page.json`
- `public/content/terms-page.json`

## Developer Guide

Important folders:

```text
src/App.jsx                         Routes
src/Pages                           Page components
src/Components/Layout/Navbar.jsx    Main navigation
src/Components/Layout/Footer.jsx    Footer
src/Pages/AdminPortal.jsx           Admin dashboard and content editor
src/Zustand/authStore.js            Auth, admin role logic, logs
src/Database/firebase.config.js     Firebase config and exports
src/data/useSiteContent.js          Firebase content loader/cache
src/utils/userProfile.js            User display/avatar helpers
public/content                      Static fallback JSON content
public/admin/index.html             Admin guard redirect page
database.rules.json                 Realtime Database rules
```

Common routes:

```text
/                         Home
/about                    About
/all-campaigns            Active campaigns
/past-campaigns           Past campaigns
/donation                 Donation form
/sponsor-child            Sponsor child
/gallery                  Gallery
/newsletters              Newsletters
/contact                  Contact and user/admin messages
/profile                  Profile
/profile?tab=history      Profile history tab
/admin-panel              Admin portal
/story                    Coming soon story page
/admin/index.html         Admin guard
```

Before changing code:

1. Check current changes with `git status --short`.
2. Do not overwrite unrelated local edits.
3. Read nearby files before editing.
4. Keep changes scoped to the requested behavior.

After changing code:

1. Run `npm run build`.
2. Run `npm run lint` when practical.
3. Manually test the route or admin flow touched.
4. Mention any existing warnings/errors in handoff notes.

## Admin Role Implementation

Role checks are in:

- `src/Zustand/authStore.js`
- `src/Pages/AdminPortal.jsx`
- `public/admin/index.html`

Firebase nodes used:

```text
super_admins/{email_key}
removed_admins/{email_key}
admin_activity_logs/{logId}
user_login_logs/{logId}
super_admin_messages/{uid}/{messageId}
```

Email keys replace dots with commas:

```text
name@example.com -> name@example,com
```

If you add a new admin-related role, update all three places:

- Main app auth store
- Admin portal UI
- `/admin/index.html` guard

## Firebase

Firebase config is currently in:

```text
src/Database/firebase.config.js
```

Services used:

- Firebase Authentication
- Realtime Database
- Firebase Storage

Realtime Database rules are in:

```text
database.rules.json
```

If rules are changed, deploy them through the Firebase CLI or Firebase Console.

## Decap CMS

Decap/Sveltia CMS config exists at:

```text
public/admin/config.yml
```

Local CMS workflow:

```bash
npm run cms
npm run dev
```

Then open:

```text
http://localhost:5173/admin/index.html
```

More notes are in:

```text
docs/decap-cms.md
```

## Content And Image Notes

Image files in `public` can be referenced with absolute paths:

```text
/NewLogo.png
/uploads/example.jpg
```

For email HTML or external pages, do not use `localhost` or relative image URLs. Use a deployed absolute URL, for example:

```html
<img src="https://your-deployed-domain.com/NewLogo.png" alt="Alpha Omega" />
```

Firebase Storage profile uploads are handled in:

```text
src/Pages/EditProfile.jsx
```

## Troubleshooting

Old content appears before new content:

- `useSiteContent` caches latest Firebase content in `localStorage`.
- If testing stale data, clear browser storage for the site.
- Confirm the admin save wrote to `site_content/{sectionKey}/content`.

Admin cannot access dashboard:

- Confirm the user is logged in and email verified.
- Confirm email exists in `super_admins` or is the default/root super admin.
- Confirm email is not listed in `removed_admins`.
- Confirm Firebase rules allow the read.

Images do not show:

- Confirm the file exists in `public`.
- Use `/filename.ext` for public assets.
- For external/email HTML, use a full deployed URL.

Build fails:

- Run `npm install`.
- Check the exact file/line from the Vite error.
- Confirm imports match actual filename casing.

## Ownership And Access

This project is private and proprietary. Do not copy, deploy, distribute, or grant access without permission from the project owner/lead.

See also:

```text
Readme2.md
public/LICENCE
```
