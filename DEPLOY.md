# Deploying Rudransh Wellness to Vercel

This is a plain-English guide. You don't need any coding knowledge — just
follow the steps in order. It takes about 15 minutes.

There are 3 things to set up:
1. **A database** (where products & orders live) — Vercel Postgres
2. **The website** (Vercel project connected to GitHub)
3. **A few settings** (passwords & secrets)

---

## Step 1 — Create a Vercel account

1. Go to **https://vercel.com/signup**
2. Click **"Continue with GitHub"** and sign in with the same GitHub account
   that owns this repository (`rudraxdevelopment98-cell/Rudransh`).
3. Authorise Vercel when GitHub asks.

---

## Step 2 — Import the project

1. On the Vercel dashboard click **"Add New…" → "Project"**.
2. Find **Rudransh** in the list and click **"Import"**.
3. **Don't click Deploy yet** — we need a database first. Leave this tab open
   and do Step 3, then come back.

---

## Step 3 — Create the database

1. In your Vercel project, click the **"Storage"** tab.
2. Click **"Create Database"** → choose **"Postgres"** → **"Continue"**.
3. Give it any name (e.g. `rudransh-db`), pick the region closest to you,
   click **"Create"**.
4. When it asks to **connect it to your project**, say **yes / Connect**.

That's it — Vercel automatically adds the `DATABASE_URL` setting for you.
You don't have to copy anything.

---

## Step 4 — Add the remaining settings

In your Vercel project go to **Settings → Environment Variables** and add
these three (click "Add" after each). Use **all environments** (Production,
Preview, Development) if it asks.

| Name | Value |
| --- | --- |
| `SESSION_SECRET` | `eedeee184e1a823c0e726d50d371d6be9478e229d64a79f30354f720749758e2` |
| `ADMIN_USERNAME` | choose your own admin login name, e.g. `rudransh` |
| `ADMIN_PASSWORD` | choose a strong password — this logs you into `/admin` |

> Write your `ADMIN_USERNAME` and `ADMIN_PASSWORD` down somewhere safe.
> You'll use them to sign in and manage products/orders.

(You can change `SESSION_SECRET` to any long random text — the one above was
generated for you and is fine to use.)

---

## Step 5 — Deploy

1. Go to the **"Deployments"** tab (or the Project overview) and click
   **"Deploy"** / **"Redeploy"**.
2. Wait ~2 minutes. Vercel will automatically:
   - create all the database tables,
   - load the starter products,
   - create your admin account,
   - build and publish the site.
3. When it finishes you'll get a live URL like
   `https://rudransh.vercel.app`. That's your live store. 🎉

---

## Step 6 — Sign in to your admin panel

1. Visit **`https://your-site.vercel.app/admin`**
2. Log in with the `ADMIN_USERNAME` / `ADMIN_PASSWORD` you set in Step 4.
3. From here you can add/edit products, see orders, and view subscribers.

---

## After that

- **Every time you (or I) push changes to GitHub**, Vercel automatically
  rebuilds and updates the live site. No manual steps.
- Your edited products and real orders are **never overwritten** by deploys —
  the starter data only loads once into an empty database.
- Want a custom domain (e.g. `rudranshwellness.com`)? In Vercel:
  **Settings → Domains → Add**. I can guide you through it.

---

## If something goes wrong

Open the failed deployment in Vercel, click **"View Build Logs"**, copy the
red error text, and paste it to me. I'll tell you exactly what to fix.
