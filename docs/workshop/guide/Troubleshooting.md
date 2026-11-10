# Troubleshooting

Common snags and quick fixes. Find your situation below. If something here does not match, ask your facilitator.

## Setup and tools

- **`node` or `git` says "command not found" after installing.** Close and reopen your terminal so it picks up the new program. If that does not work, restart your computer.
- **Not sure if something installed.** Run `node -v`, `npm -v`, and `git --version`. A version number for each means you are good.
- **Windows: "running scripts is disabled on this system" when you run `npm`.** Windows is blocking a small helper file npm needs. Run this once in the VS Code terminal, type `Y` if asked, then try again:

  ```powershell
  Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
  ```

- **`code` is not recognized, or "command not found: code".** You do not need it. In VS Code, use **File -> Open Folder** to open the project instead.
- **Did not get the GitHub verification email.** Check your spam or junk folder. You can resend it from the GitHub prompt.

## Running the project on your computer

- **`npm install` fails with red errors.** Make sure you are inside the project folder (the one with a `package.json` file). Run `npm install` again. A flaky network is a common cause, so a second try often works.
- **`npm run dev` does not start, or the page will not load.** Check the terminal for an error. If it says the port is in use, something else is already running on it. Stop the other process, or close and reopen the terminal, then try again.
- **I changed a file but the page looks the same.** Save the file first (`Ctrl+S` or `Cmd+S`), then refresh the browser. If your local site is not running, start it with `npm run dev`.
- **The page turned into a red error screen after I edited a content file.** You probably deleted a quote `"`, a comma, or a `+`. Press `Ctrl+Z` (`Cmd+Z` on Mac) until the page comes back, save, then make your change again more carefully. The error screen names the file and line number to look at. A double quote inside your text also breaks it. Use single quotes inside your text instead.
- **Windows asks whether to allow Node.js on your network.** This appears the first time you run `npm run dev`. Either choice is fine for the workshop.
- **My picture shows on my computer but not on my live site.** The file name in `image_url` must match exactly, including capital letters and the ending (`.png` or `.jpg`). Your computer may ignore a capital letter, but your live site will not. Rename the file to lowercase with no spaces, update `image_url`, then push again.
- **I can't see `.png` or `.jpg` at the end of file names on Windows.** Turn them on in File Explorer: **View -> Show -> File name extensions** (on Windows 10: **View -> File name extensions**).

## Deploying to Vercel

- **Vercel cannot find my project to import.** Make sure you forked the project to your own GitHub account and that you signed in to Vercel with that same GitHub account.
- **The build failed on Vercel.** Open the deployment on Vercel and read the first red error in the build log. The usual cause is a typo in a content file, like a missing quote or comma. The error names the file and line. If your site works with `npm run dev` on your computer, run `npm run build` too. It shows the same error Vercel sees.
- **`git push` asks for a password, then fails.** GitHub no longer accepts your account password here. Run the push from the terminal inside VS Code, which offers a browser sign-in instead. If it still asks for a password, ask your facilitator to help you sign in to GitHub on this computer.
- **My latest change is not on the live site.** Confirm you ran `git push` and that it succeeded. Then check the Deployments tab on Vercel. If it did not rebuild, trigger a redeploy.

## Supabase (your backend)

- **The setup SQL throws an error.** The usual cause is copying only part of `db/setup.sql`. Select the whole file, paste it again, and run. The script is safe to run more than once.
- **I changed `.env.local` but nothing changed.** Your local site only reads `.env.local` when it starts. Press `Ctrl+C` in the terminal, then run `npm run dev` again.
- **The catalog is empty after connecting Supabase.** Your site now reads listings from the database. Open `/setup` on your site, copy the SQL, and run it in the Supabase SQL Editor (Part 3, Step 3).
- **My forms say they saved, but I see no rows.** Open the Supabase Table Editor and check the right table (`inquiries`, `membership_receipts`, or `donations`). If it is empty, your keys may be wrong. Recheck Step 5 and Step 6 in Part 3.
- **The live site cannot reach the database.** You likely set the three keys in `.env.local` but not on Vercel, or you set them on Vercel but did not redeploy. Set all three on Vercel, then redeploy.
- **Wrong key in the wrong slot.** The publishable key (`sb_publishable_...`) goes in `NEXT_PUBLIC_SUPABASE_ANON_KEY`. The secret key (`sb_secret_...`) goes only in `SUPABASE_SERVICE_ROLE_KEY`. On older projects these are called `anon` and `service_role`.
- **I can't find the `anon` or `service_role` keys.** Newer Supabase projects use a publishable key and a secret key instead. They do the same jobs. See Part 3, Step 5.
- **The catalog shows "We couldn't load the catalog".** Your keys are set, but the database query failed. Check three things in order: you ran `db/setup.sql` in this Supabase project (the Table Editor shows a `listings` table), the URL and keys all come from the same project, and you restarted `npm run dev` or redeployed on Vercel after changing them.
- **My site stopped working after a few days, and Supabase says the project is paused.** Free projects go to sleep after about a week with no activity. Open the project in Supabase and click **Restore project**. Wait a few minutes, then refresh your site.

## Accounts and sign-in

- **"Check your inbox" appears after creating an account.** "Confirm email" is still on in Supabase. Turn it off (Part 3, Step 4), then create the account again with a different email, or click the link in the email.
- **No confirmation email arrives.** Supabase's built-in email sender only sends a few emails per hour. Turn off "Confirm email" (Part 3, Step 4).
- **"Registration failed".** That email may already have an account. Try **Sign in** instead, or use a different email. Passwords need at least 6 characters.

## Receipts and storage

- **Receipt upload fails, or the link does not open.** Open **Storage** in Supabase and check for a private bucket named `receipts`. If it is missing, run `db/setup.sql` again. It creates the bucket and the storage rules.
- **My QR image is called `gcash-qr.png.png`, or it does not show.** Windows hid the ending when you renamed it. Rename it in the VS Code sidebar (right-click, **Rename**), where the full name is always shown, so it is exactly `gcash-qr.png`.
- **"You already have a receipt waiting for review."** Each account can have one pending receipt at a time. Wait for Staff to review it, or sign in as a different test account.
- **A regular user can see a receipt they should not.** That should not happen. If it does, the setup SQL may not have applied the security rules. Re-run `db/setup.sql` and try again.

## Roles and dashboards

- **I ran `db/seed-roles.sql` but my roles did not change.** The script only promotes accounts that already exist. Create the admin and staff accounts on your live site first, then edit the two emails in the script to match exactly, and run it again.
- **I cannot see the Staff or Admin dashboards.** The **Dashboards** link only shows for Staff and Admin. Make sure you are signed in with the account you promoted. Sign out and back in if a role change does not show up right away.
- **Receipt emails show as "Unknown member".** Your database still has the older security rules. Run `db/setup.sql` again.

## How to check your setup at a glance

- **Supabase:** Table Editor shows your tables, and `listings` has your listings.
- **Storage:** a bucket named `receipts` exists and is private.
- **Vercel:** all three environment variables are set, and your latest deployment shows **Ready**.
- **GitHub:** your newest commit appears on your fork after `git push`.
