# Troubleshooting

Common snags and quick fixes. Find your situation below. If something here does not match, ask your facilitator.

## Setup and tools

- **`node` or `git` says "command not found" after installing.** Close and reopen your terminal so it picks up the new program. If that does not work, restart your computer.
- **Not sure if something installed.** Run `node -v`, `npm -v`, and `git --version`. A version number for each means you are good.
- **Did not get the GitHub verification email.** Check your spam or junk folder. You can resend it from the GitHub prompt.

## Running the project on your computer

- **`npm install` fails with red errors.** Make sure you are inside the project folder (the one with a `package.json` file). Run `npm install` again. A flaky network is a common cause, so a second try often works.
- **`npm run dev` does not start, or the page will not load.** Check the terminal for an error. If it says the port is in use, something else is already running on it. Stop the other process, or close and reopen the terminal, then try again.
- **I changed a file but the page looks the same.** Save the file first (`Ctrl+S` or `Cmd+S`), then refresh the browser. If your local site is not running, start it with `npm run dev`.

## Deploying to Vercel

- **Vercel cannot find my project to import.** Make sure you forked the project to your own GitHub account and that you signed in to Vercel with that same GitHub account.
- **The build failed on Vercel.** Open the build log on Vercel and read the first red error. A common cause is missing environment variables. See the Supabase section below.
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

## Accounts and sign-in

- **"Check your inbox" appears after creating an account.** "Confirm email" is still on in Supabase. Turn it off (Part 3, Step 4), then create the account again with a different email, or click the link in the email.
- **No confirmation email arrives.** Supabase's built-in email sender only sends a few emails per hour. Turn off "Confirm email" (Part 3, Step 4).
- **"Registration failed".** That email may already have an account. Try **Sign in** instead, or use a different email. Passwords need at least 6 characters.

## Receipts and storage

- **Receipt upload fails, or the link does not open.** Open **Storage** in Supabase and check for a private bucket named `receipts`. If it is missing, run `db/setup.sql` again. It creates the bucket and the storage rules.
- **"You already have a receipt waiting for review."** Each account can have one pending receipt at a time. Wait for Staff to review it, or sign in as a different test account.
- **A regular user can see a receipt they should not.** That should not happen. If it does, the setup SQL may not have applied the security rules. Re-run `db/setup.sql` and try again.

## Roles and dashboards

- **I ran `db/seed-roles.sql` but my roles did not change.** The script only promotes accounts that already exist. Create the admin and staff accounts on your live site first, then edit the two emails in the script to match exactly, and run it again.
- **I cannot see the Staff or Admin dashboards.** The **Dashboards** link only shows for Staff and Admin. Make sure you are signed in with the account you promoted. Sign out and back in if a role change does not show up right away.
- **Receipt emails show as "Unknown member".** Your database still has the older security rules. Run `db/setup.sql` again.

## How to check your setup at a glance

- **Supabase:** Table Editor shows your tables, and `listings` has your listings.
- **Storage:** a bucket named `receipts` exists and is private.
- **Vercel:** all three environment variables are set, and your latest deploy is green.
- **GitHub:** your newest commit appears on your fork after `git push`.
