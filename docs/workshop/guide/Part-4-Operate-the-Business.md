# Part 4: Operate the Business (Session 3)

In this final session you create your own staff accounts, use the dashboards to review and approve the receipts and donations from Session 2, see the security rules block someone who should not have access, and ship your final site.

> Before you start: finish [Part 3](./Part-3-Provision-Your-Backend.md). Your backend should be connected and saving data.

## What you will have by the end

- Your own Admin, Staff, and User accounts
- Hands-on practice approving receipts (which grants membership) and verifying donations
- A clear view of the security rules in action
- A final, deployed site you fully own and can run

## Session 3 checklist

- [ ] Set up your own Admin and Staff accounts
- [ ] Triaged an inquiry in the dashboard
- [ ] Approved a receipt (a user became a MEMBER)
- [ ] Rejected a receipt with a reason
- [ ] Verified a donation and rejected another
- [ ] Managed a listing and changed someone's role
- [ ] Saw the website block a non-staff account, and saw the database block it too
- [ ] Pushed final changes and confirmed your live site updated

---

## Step 1: Set up your Admin, Staff, and User accounts

**What this does:** gives you a login for each role, so you can see every dashboard. Every new account starts as a regular user. This step promotes two new accounts to Admin and Staff. Your two test accounts from Session 2 stay regular users.

Order matters: register the accounts first, then promote them.

1. On your **live site**, click **Sign in**, choose **Create account**, and register two more accounts: one for your admin (for example `you+admin@gmail.com`) and one for your staff (for example `you+staff@gmail.com`). Sign out between them.

   ![screenshot: register page on your live site](./images/s3-register.png)

2. In Supabase, open the **SQL Editor** and open a **New query**.
3. In VS Code, open `db/seed-roles.sql`. Near the top it explains the steps. You only change two email addresses:

```sql
-- 1) Promote your ADMIN account.  <-- EDIT this email.
update public.profiles
   set role = 'ADMIN'
 where id = (select id from auth.users where email = 'admin@example.com');

-- 2) Promote your STAFF account.  <-- EDIT this email.
update public.profiles
   set role = 'STAFF'
 where id = (select id from auth.users where email = 'staff@example.com');
```

4. Replace `admin@example.com` and `staff@example.com` with the two emails you just registered. Type them exactly as you registered them.
5. Copy the whole file into the Supabase query box and click **Run**.
6. The script ends with a check that lists each account and its role. Confirm your admin shows `ADMIN`, your staff shows `STAFF`, and your two test accounts show `USER`.

   ![screenshot: roles confirmed in the result](./images/s3-roles-confirmed.png)

7. On your site, sign out and sign back in as your admin. A **Dashboards** link now appears in the menu. It only shows for Staff and Admin.

> If a role still shows `USER`, the email in the script did not match exactly. The script only promotes accounts that already exist. Fix the email and run it again.

- [ ] You have one Admin, one Staff, and two User accounts

---

## Step 2: Triage an inquiry

"Triage" means sorting and handling incoming requests.

1. Sign in with your **Staff** or **Admin** account.
2. Click **Dashboards**, then **Inquiries**.
3. Change an inquiry's status, for example from NEW to IN_PROGRESS.
4. Click **Assign to me**. This records you as the person handling it.

   ![screenshot: inquiries dashboard](./images/s3-inquiries.png)

- [ ] An inquiry's status updated

---

## Step 3: Review receipts (this grants membership)

This is where a pending payment becomes a real membership.

1. Click **Dashboards**, then **Membership receipts**. You should see the two receipts from your test accounts, each labeled with its email.
2. Click **View receipt** on the first one to see the image. The link stops working after about five minutes.
3. Click **Approve**. That account's membership changes to **MEMBER**.
4. On the second receipt, click **Reject**, type a short reason (for example "Image is blurry"), and click **Confirm rejection**.
5. Click **Sign out**, then sign in as your first test account and open **Membership**. It now shows that you are a member.

   ![screenshot: receipt review with Approve and Reject](./images/s3-receipts.png)

> The receipt link is short-lived and only works for Staff and Admin. Receipts are never public. This is the private storage from Session 2 doing its job.

- [ ] Approving a receipt turned a user into a MEMBER
- [ ] Rejecting a receipt recorded a reason

---

## Step 4: Review donations

1. Click **Dashboards**, then **Donations**.
2. Click **Verify** on one pending donation.
3. Click **Reject** on the other, type a short reason, and click **Confirm rejection**.

   ![screenshot: donations dashboard](./images/s3-donations.png)

- [ ] A donation was verified
- [ ] A donation was rejected with a reason

---

## Step 5: Manage listings and roles (Admin)

These two dashboards only show for your **Admin** account.

1. Click **Dashboards**, then **Manage listings**. Click **Add a listing** or **Edit** on one, then use **Publish** and **Unpublish**. A **Draft** (unpublished) listing is hidden from visitors. Open the catalog while signed out to check.
2. Click **Dashboards**, then **Members & roles**. Pick a new role for one of your test accounts (for example User to Staff) and click **Apply**. Sign in as that account and the **Dashboards** link appears.

   ![screenshot: admin listing management](./images/s3-admin-listings.png)

- [ ] You created or edited a listing and toggled publish
- [ ] You changed a member's role

---

## Step 6: See the security in action

This is the signature lesson of the whole workshop. Your data has two guards. The website checks who you are, and the database checks again on its own. You will see both.

### 6a. The website blocks you

1. Sign in as a plain **User** account. The **Dashboards** link is gone from the menu.
2. Type the dashboard address by hand: add `/admin/receipts` to the end of your site's address and press Enter.
3. You are blocked with "You don't have access to this page". (Signed out, you see "Sign in to continue" instead.)

   ![screenshot: access denied page](./images/s3-403.png)

That block came from the website's own code. But the website is not the last line of defense. Someone could skip your website entirely and ask your database directly, because the publishable key is public.

### 6b. The database blocks you too

Now you ask the database the same question twice: once as yourself, the owner, and once as an anonymous visitor.

1. In Supabase, open the **SQL Editor** and click **New query**.
2. Paste this and click **Run**:

```sql
select count(*) as donations_seen from public.donations;
```

   You see `2`, your two test donations. The SQL Editor runs as the owner of the database, who can see everything.

3. Replace it with this and click **Run** again:

```sql
set local role anon;
select count(*) as donations_seen from public.donations;
```

   The first line tells the database "answer this one as an anonymous visitor". Now you see `0`.

Same table, same question, different answer. Nothing on the website was involved. The RLS rules inside the database decided that a visitor sees no donations. The change only lasts for that one run, so your SQL Editor is back to normal afterward.

> Why this matters: buttons can be hidden and pages can be skipped, but the database rules still apply to every request. That is why the real protection lives in the database, not just in the screen.

- [ ] A non-staff account was blocked from a dashboard page
- [ ] The same database question returned `2` as the owner and `0` as a visitor

---

## Step 7: Final deploy and showcase

1. Push any last changes:

```bash
git add .
git commit -m "Final workshop changes"
git push
```

2. Open your Vercel project and confirm it auto-deployed your latest version.
3. Open your live address and look around. Visit a few classmates' sites too.

   ![screenshot: final live site](./images/s3-final-site.png)

- [ ] Your final site is live and up to date

---

## You built and operated a three-tier website

Take a moment. You now own a live catalog site with real membership, manual payment review, donations, and role-based dashboards. Your own code, your own database, your own hosting. Nothing shared.

Here is what you learned by doing:

- How a site goes from your computer to a live web address.
- How a database, a login system, and file storage work together as a backend.
- How security rules protect data at the lowest level, even against someone who gets past the buttons.
- How every push to GitHub republishes your site automatically.

### Share your work (optional)

If you would like to share what you built, post a screenshot of your live site with a short note about what you learned, and tag the group that ran the workshop. A simple "I built and deployed my first three-tier website" goes a long way.

### Keep going

Everything you set up is yours to keep and extend. Add more listings, change the branding, or try new features. The same workflow (edit, push, auto-deploy) scales to much bigger projects.

Whether this left you excited or a little overwhelmed, that is completely normal. That is what learning to build software feels like. Nice work getting here.
