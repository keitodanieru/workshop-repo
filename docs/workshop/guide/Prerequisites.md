# Prerequisites (Do This Before Session 1)

Please finish everything on this page before the first session. These are account sign-ups and a couple of installs. Doing them at home means class time goes into building your website, not waiting on verification emails.

> Set aside about **45 to 60 minutes**. Most of that is sign-ups and one install. Everything here is free. No credit card is needed.

## What you are setting up and why

You will use five tools. Here is what each one is, in plain words.

| Tool | What it is | Why you need it |
|------|------------|-----------------|
| **GitHub** | A website that stores your code online and tracks every change | You copy the workshop project into your own account, then connect it to hosting |
| **Node.js** | A program that runs website code on your computer | Lets you preview the site on your own machine before putting it online |
| **VS Code** | A code editor (like a word processor, but for code) | Where you open files and change them to make the site yours |
| **Supabase** | Your database, login system, and file storage, all in one | Remembers your listings, members, receipts, and donations |
| **Vercel** | A hosting service | Puts your site on the internet with a public web address |

You will also prepare one image: a **GCash QR screenshot**, used later so people can "pay" on your site.

---

## Before-class checklist

Tick each box as you finish its section below.

- [ ] GitHub account created and email verified
- [ ] Node.js installed, and `node -v` prints a version number
- [ ] VS Code installed
- [ ] Git installed and set up with your name and email
- [ ] Supabase account created (signed in with GitHub)
- [ ] Vercel account created (signed in with GitHub)
- [ ] A GCash QR screenshot saved on your computer
- [ ] In the VS Code terminal, `node -v`, `npm -v`, and `git --version` all print version numbers

---

## Section 1: Create a GitHub account

**What is GitHub?** It is where your project code lives online. It keeps a history of your changes and connects to the hosting service later.

1. Open your browser and go to [https://github.com/signup](https://github.com/signup).
2. Enter your email, pick a password, and choose a username.
3. Check your email inbox and confirm your address.
4. You are done when you land on your GitHub home page.

![screenshot: GitHub signup page](./images/prereq-github-signup.png)

> Keep your username and password handy. You will sign in to Supabase and Vercel with GitHub, so this one account unlocks the other two.

> If GitHub asks you to turn on two-factor authentication (a second check, like a code from an app on your phone), set it up now at home. Doing it in class can eat 15 minutes. The **GitHub Mobile** app is the easiest option.

- [ ] GitHub account created and email verified

---

## Section 2: Install Node.js

**What is Node.js?** It runs the website's code on your own computer so you can preview the site before it goes live.

> If someone already helped you install it, run the check in step 4 first. If you see version numbers, skip ahead.

1. Go to [https://nodejs.org](https://nodejs.org).
2. Download the version marked **LTS**. LTS means "long-term support", the stable version most people should use.
3. Run the installer and accept the default options. On Windows, leave **"Add to PATH"** checked.
4. Check that it worked. Open a terminal (Section 5 shows how) and type:

```bash
node -v
npm -v
```

You should see a version number for each, for example `v24.x.x`. If you get "command not found", restart your computer and try again.

![screenshot: node -v showing a version](./images/prereq-node-version.png)

- [ ] `node -v` prints a version number

---

## Section 3: Install VS Code

**What is VS Code?** The editor where you open the project files and change them.

> If you already have VS Code, skip this section.

1. Go to [https://code.visualstudio.com](https://code.visualstudio.com) and download the version for your operating system.
2. Run the installer, accept the license, and keep the default options.
3. On Windows, make sure **"Add to PATH"** is checked.
4. Click Finish.

![screenshot: VS Code download page](./images/prereq-vscode-download.png)

- [ ] VS Code installed

---

## Section 4: Install and set up Git

**What is Git?** The tool that saves your changes and uploads them to GitHub.

1. Install Git:
   - **Windows:** download from [https://git-scm.com/download/win](https://git-scm.com/download/win) and run the installer with the default options.
   - **macOS:** type `git --version` in the terminal. If Git is missing, macOS offers to install it. You can also get it from [https://git-scm.com/download/mac](https://git-scm.com/download/mac).
2. Check the install:

```bash
git --version
```

3. Tell Git who you are. Use the **same email as your GitHub account**. Replace the text inside the quotes with your own:

```bash
git config --global user.name "Your Name"
git config --global user.email "yourname@example.com"
```

4. Set the default branch name to `main` (this matches GitHub):

```bash
git config --global init.defaultBranch main
```

![screenshot: git config commands in a terminal](./images/prereq-git-config.png)

- [ ] `git --version` works and your name/email are set

---

## Section 5: How to open a terminal

You will paste commands into a **terminal** throughout the workshop. A terminal is a window where you type commands instead of clicking buttons. The easiest one is built into VS Code.

1. Open **VS Code**.
2. In the top menu, choose **Terminal -> New Terminal**. (Shortcut: `` Ctrl+` `` on Windows, `` Cmd+` `` on macOS.)
3. A panel opens at the bottom. Run these three commands one at a time, pressing Enter after each:

```bash
node -v
npm -v
git --version
```

Each one should print a version number.

**Windows only: if `npm -v` shows a red error** that says "running scripts is disabled on this system", Windows is blocking a small helper file that npm needs. Run this once to allow it:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

If it asks a question, type `Y` and press Enter. Then run `npm -v` again. It now prints a version number. This only changes the setting for your own user account.

> Any command block in this guide can be pasted into this terminal and run with Enter.

- [ ] `node -v`, `npm -v`, and `git --version` all work in the VS Code terminal

---

## Section 6: Create a Supabase account

**What is Supabase?** Your database, login system, and file storage, all on one platform. In Session 2 you create your own Supabase project and run a provided setup script. For now, just make the account.

1. Go to [https://supabase.com](https://supabase.com) and click **Start your project** or **Sign up**.
2. Choose **Continue with GitHub** and allow Supabase to connect. (Signing in with GitHub means one less password.)
3. You land on the Supabase dashboard.

![screenshot: Supabase dashboard after sign in](./images/prereq-supabase-dashboard.png)

> Do not create a project yet. We do that together in Session 2 so everyone sets it up the same way. For now, just make sure you can log in.

- [ ] You can log in to Supabase

---

## Section 7: Create a Vercel account

**What is Vercel?** The hosting service that puts your site on the internet. Every time you push code to GitHub, Vercel can re-publish your site automatically.

1. Go to [https://vercel.com/signup](https://vercel.com/signup).
2. Choose **Continue with GitHub** and allow Vercel to connect.
3. If it asks about a team or plan, pick the **free / Hobby** option.
4. You land on the Vercel dashboard.

![screenshot: Vercel dashboard after sign in](./images/prereq-vercel-dashboard.png)

> Do not import a project yet. We connect your project to Vercel together in Session 1. For now, just make sure you can log in.

- [ ] You can log in to Vercel

---

## Section 8: Prepare your GCash QR image

**Why?** Your site shows a GCash QR so members and donors can "pay". Nobody sends real money during the workshop. Payments are only checked by hand, so this is just an image on your site.

1. On your phone, open GCash and go to your personal QR or "Receive Money" screen.
2. Take a screenshot.
3. Send it to your computer (email it to yourself, use a cable, or a cloud drive).
4. Save it somewhere easy to find and name it clearly, for example `gcash-qr.png`.

> Privacy note: this QR appears on your live website. If you would rather not share your real one, use any placeholder QR image. The steps work the same. If you do not have GCash, bring any QR-code image.

- [ ] A GCash QR screenshot is saved on your computer

---

## You are ready

When every box above is ticked, you are set for **Part 1 and Session 1**. Bring your laptop charged, and keep your GitHub login handy. You will use it to sign in everywhere.

> Stuck on any step? See the [Troubleshooting](./Troubleshooting.md) page. The most common fix for "command not found" is to close and reopen your terminal, or restart your computer so it picks up the new install.
