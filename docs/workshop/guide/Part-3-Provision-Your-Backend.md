# Part 3: Provision Your Backend (Session 2)

In Session 1 your site went live, but the forms do not save anything yet. In this session you create your own database and connect it, so inquiries, receipts, and donations start saving as real data. You do all of this on **your own** Supabase project. There is no shared backend.

> Before you start: finish [Part 2](./Part-2-Build-the-Storefront.md). Your site should already be deployed to your own Vercel project.

## What you will have by the end

- Your own Supabase project with the tables, security rules, and a private storage spot for receipts
- Your own listings loaded into your database
- Your site connected to your backend, with sign-in working
- Your GCash QR showing on the membership and donation pages
- Test data saved, ready for Session 3

## Session 2 checklist

- [ ] Created your own Supabase project
- [ ] Ran the setup SQL (tables, security rules, receipts storage)
- [ ] Loaded your listings with the SQL from your `/setup` page
- [ ] Turned off "Confirm email"
- [ ] Copied your Project URL, publishable key, and secret key
- [ ] Set the three keys in `.env.local` AND in your Vercel project
- [ ] Added your GCash QR and payment details
- [ ] Saved a test inquiry, two receipts, and two donations

---

## A quick word on what a backend is

A "backend" is the part of your site the visitor never sees directly. It has three jobs here, all handled by Supabase:

- **Database**: the tables that remember your data (listings, inquiries, members, receipts, donations).
- **Authentication (login)**: lets people create an account and sign in.
- **Storage**: holds uploaded files, like receipt images, in a private spot.

You will also turn on **Row Level Security** (we will call it RLS). RLS is the set of rules in the database that decides who can see and change what. The setup script turns these on for you.

---

## Step 1: Create your Supabase project

1. Log in at [https://supabase.com](https://supabase.com) with GitHub.
2. Click **New project**.

   ![screenshot: New project button in Supabase](./images/s2-new-project.png)

3. Give it a name, for example `my-catalog-site`.
4. Set a **database password** and save it somewhere safe. You may need it later.
5. Pick the region closest to you.
6. Click **Create new project** and wait about one to two minutes while it sets up.

   ![screenshot: Supabase project provisioning](./images/s2-project-creating.png)

- [ ] Your project is created and the dashboard loads

---

## Step 2: Run the setup SQL

**What this does:** creates your tables, turns on the security rules (RLS), adds the function that approves memberships, and creates a private storage spot named `receipts` for payment receipts. "SQL" is the language used to talk to a database. You do not write any. You paste a file we already wrote.

1. In your Supabase project, open the **SQL Editor** from the left sidebar.

   ![screenshot: SQL Editor in the sidebar](./images/s2-sql-editor.png)

2. Click **New query**.
3. In VS Code, open the file `db/setup.sql` from your project. Select **all** of it (`Ctrl+A` or `Cmd+A`) and copy it.
4. Paste it into the Supabase query box.
5. Click **Run**.
6. You should see a success message and no red errors.

   ![screenshot: setup SQL ran successfully](./images/s2-setup-success.png)

7. Open **Storage** in the left sidebar. You should see a bucket named `receipts`. It is private, which means nobody can open a receipt from a public link. Only Staff and Admin can view receipts, through a link that expires after a few minutes.

> If you see an error, the most common cause is copying only part of the file. Select the whole file and paste it again. The script is safe to run more than once.

- [ ] The setup SQL ran with no errors
- [ ] A private bucket named `receipts` shows under Storage

---

## Step 3: Load your listings

**What this does:** copies the listings you wrote in `content/listings.ts` during Session 1 into your database. From now on, your live catalog reads from the database.

1. Start your site on your computer if it is not running (`npm run dev`).
2. In your browser, open [http://localhost:3000/setup](http://localhost:3000/setup). You can also add `/setup` to the end of your live Vercel address.
3. The page shows some SQL built from your listings. Click **Copy SQL**.
4. In Supabase, open the **SQL Editor**, click **New query**, paste, and click **Run**.
5. Open the **Table Editor** from the sidebar, then open the `listings` table. You should see your listings.

   ![screenshot: listings table with your rows](./images/s2-listings-rows.png)

> Want the workshop's sample listings instead, including one hidden draft? Run `db/seed.sql` the same way. You can run both.

- [ ] Your listings appear in the `listings` table

---

## Step 4: Turn off email confirmation

**Why:** by default, Supabase emails every new account a confirmation link. Its built-in email sender only sends a few emails per hour, and you will create several test accounts today and in Session 3. Turning this off lets new accounts sign in right away.

1. In Supabase, open **Authentication** from the left sidebar.
2. Open **Sign In / Providers**, then open the **Email** provider.
3. Turn off **Confirm email**.
4. Click **Save**.

> On a real business site you would leave this on and connect your own email service. For the workshop, off is fine.

- [ ] "Confirm email" is off

---

## Step 5: Copy your three keys

**What these are:** the values your website uses to talk to your database. There are exactly three. Two are safe to share, one is a secret.

1. In your Supabase project, click the **Connect** button at the top. It shows your **Project URL** and your **publishable key**.
2. For the secret key, open **Project Settings**, then **API Keys**. Find the **secret key** and click to reveal it.
3. Copy each value and keep it handy:

| Value | What it looks like | Is it secret? | Goes into |
|-------|--------------------|---------------|-----------|
| **Project URL** | `https://abcdefgh.supabase.co` | No | `NEXT_PUBLIC_SUPABASE_URL` |
| **Publishable key** | starts with `sb_publishable_` | No. Safe in the browser | `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| **Secret key** | starts with `sb_secret_` | Yes. Server only | `SUPABASE_SERVICE_ROLE_KEY` |

   ![screenshot: Supabase API keys page](./images/s2-api-keys.png)

> Older Supabase projects call these the `anon` key and the `service_role` key (under a **Legacy API keys** tab). Those work too. Put `anon` where the publishable key goes, and `service_role` where the secret key goes.

> The secret key can get past every security rule. Never paste it into front-end code and never commit it to GitHub. It stays on the server only.

- [ ] You have all three values copied somewhere safe

---

## Step 6: Connect your keys

Your site reads these three values from **environment variables**. Those are named settings your code can read without the values being written into the code. You set them in two places: on your computer (for local preview) and on Vercel (for your live site).

### 6a. On your computer (`.env.local`)

1. In VS Code, look in your project root for a file called `.env.example`. Make a copy of it named `.env.local`.
   - On Windows PowerShell: `Copy-Item .env.example .env.local`
   - On macOS or Linux: `cp .env.example .env.local`
2. Open `.env.local` and fill in your three values from Step 5:

```bash
NEXT_PUBLIC_SUPABASE_URL="https://YOUR-PROJECT-REF.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sb_publishable_..."
SUPABASE_SERVICE_ROLE_KEY="sb_secret_..."
```

3. Save the file.
4. Restart your local site so it reads the new values. Click in the terminal, press `Ctrl+C`, then run `npm run dev` again.

> `.env.local` is already ignored by Git, so your secrets will not be uploaded to GitHub. That is on purpose.

- [ ] `.env.local` has all three values, and you restarted `npm run dev`

### 6b. On Vercel

1. Open your project on [Vercel](https://vercel.com), then go to **Settings -> Environment Variables**.

   ![screenshot: Vercel Environment Variables](./images/s2-vercel-env.png)

2. Add the same three variables with the same values:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Save. Then go to the **Deployments** tab and redeploy the latest one so the new values take effect.

> Names are case-sensitive. Copy them exactly, including the `NEXT_PUBLIC_` part where shown.

- [ ] All three variables are set in Vercel and you redeployed

---

## Step 7: Add your GCash QR

**What this does:** shows your QR code on the **Membership** and **Donate** pages so people know where to pay.

1. Copy the GCash QR image you saved before Session 1 into your project's `public/images/` folder.
2. Rename it to exactly `gcash-qr.png`.
3. Open `content/payment.ts` and change these values:
   - `label`: the line above the QR, for example "Scan to pay via GCash".
   - `accountName`: the name shown under the QR.
   - `instructions`: one or two short sentences telling people what to do.
4. Save, then open [http://localhost:3000/membership](http://localhost:3000/membership) to check that your QR shows.
5. Push your changes so they go live:

```bash
git add .
git commit -m "Add GCash QR and payment details"
git push
```

- [ ] Your QR shows on the Membership and Donate pages

---

## Step 8: Save some test data

Now test that data really saves. You will also use this data in Session 3, so create all of it.

1. Open your live Vercel site.
2. **Inquiry:** open any listing, fill in the form, and send it. It should say your request was received.
3. **First test account:** click **Sign in**, choose **Create account**, and register with an email you control (for example `you+test1@gmail.com`).
4. Open **Membership** and upload a test receipt (any small image works). It should show as **Pending**.
5. Click **Sign out**. Create a second test account (for example `you+test2@gmail.com`) and upload another test receipt.
6. **Donations:** open **Donate** and submit two test donations. Leave the name and email empty on one of them to try an anonymous donation.
7. Back in Supabase, open the **Table Editor** and check for new rows in `inquiries`, `membership_receipts`, and `donations`.

   ![screenshot: a new inquiry row in Supabase](./images/s2-test-rows.png)

> Tip: Gmail delivers `you+anything@gmail.com` to `you@gmail.com`, so one inbox can hold all your test accounts.

- [ ] One inquiry, two receipts (from two accounts), and two donations saved to your database

---

## Session 2 done

Your site now runs on your own backend. The forms save real data, receipts land in private storage, and the security rules are live. In **[Part 4: Operate the Business](./Part-4-Operate-the-Business.md)** you set up your Admin and Staff accounts and use the dashboards to review everything you just submitted.

> Hit a snag? Check the [Troubleshooting](./Troubleshooting.md) page.
