# Part 2: Build the Storefront (Session 1)

In this session you get your own copy of the project, run it on your computer, put it live on the internet, and then customize it so it is yours. By the end you have a personalized website at your own web address.

> Before you start: finish the [Prerequisites](./Prerequisites.md) page.

## What you will have by the end

- Your own fork of the project, running on your computer
- A live website at your own Vercel address
- A catalog with your own listings, branding, and images

## Session 1 checklist

- [ ] Forked the project into your own GitHub account
- [ ] Cloned it and ran it on your computer
- [ ] Deployed it to your own Vercel project (got a live address)
- [ ] Customized the landing page text in `content/site.ts`
- [ ] Customized the catalog in `content/listings.ts`
- [ ] Saw your changes on your live site

---

## Phase 1: Get your own copy

### Step 1: Fork the project

**What is a fork?** A fork is your own personal copy of someone else's project on GitHub. You can change your copy freely without touching the original.

1. Open the workshop project link your facilitator gives you.
2. Click **Fork** in the top right.

   ![screenshot: Fork button on GitHub](./images/s1-fork-button.png)

3. Leave everything as the default. Make sure your own GitHub account is selected under **Owner**.
4. Click **Create fork**. GitHub sends you to your own copy of the project.

   ![screenshot: your forked repo](./images/s1-fork-created.png)

- [ ] You are looking at your own fork (your username is in the address)

### Step 2: Copy your clone link

1. On your fork, click the green **Code** button.
2. Make sure the **HTTPS** tab is selected.
3. Click the copy icon next to the link to copy it.

   ![screenshot: Code button with HTTPS link](./images/s1-code-https.png)

- [ ] You copied your fork's HTTPS link

### Step 3: Clone it to your computer

**What is cloning?** Cloning downloads your fork from GitHub onto your computer so you can open and edit it.

1. Open **VS Code**. Open a terminal with **Terminal -> New Terminal**. It starts in your home folder (the folder with your computer username).
2. Type `git clone`, a space, then paste the link you copied in Step 2. Press Enter. It looks like this, but with your own link:

```bash
git clone https://github.com/your-username/your-fork.git
```

   Git downloads the project into a new folder inside your home folder. The folder has the same name as your fork. That is the last part of the link, without `.git`.

3. In VS Code, choose **File -> Open Folder**. Go to your home folder, click the new project folder once, and click **Open** (on Windows the button says **Select Folder**).
4. If VS Code asks whether you trust the authors of the files, click **Yes, I trust the authors**.

   ![screenshot: project open in VS Code](./images/s1-project-in-vscode.png)

- [ ] The project files show in the left sidebar of VS Code

---

## Phase 2: Run it on your computer

### Step 4: Install the project's building blocks

**What is this?** The project depends on some ready-made code packages. This command downloads them. You only do it once.

1. Open a new terminal with **Terminal -> New Terminal**. Because the project folder is open, the terminal starts inside it.
2. Run:

```bash
npm install
```

Wait for it to finish. It may take a minute and print a lot of text. Yellow lines that say `npm warn` are normal. Only red `npm error` lines mean something went wrong.

> On Windows, if you see "running scripts is disabled on this system", see [Troubleshooting](./Troubleshooting.md). It is a one-line fix.

- [ ] `npm install` finished without red error text

### Step 5: Start the site locally

**What is "locally"?** It means running the site on your own computer so only you can see it, before it goes online.

Run:

```bash
npm run dev
```

The terminal prints a web address, usually `http://localhost:3000`. Hold Ctrl (or Cmd on Mac) and click it, or paste it into your browser.

   ![screenshot: site running at localhost:3000](./images/s1-localhost.png)

You should see the landing page with the default "Acme Consulting" branding. You will change that soon. Click **Browse the catalog** to see three sample listings.

> On Windows, a "Windows Security" box may ask whether to allow Node.js on your network. Either choice is fine for this workshop. Click **Allow** if you are not sure.

> Open a listing and you will see its contact form with a note that it starts saving after Session 2. That is expected. There is no database yet.

> To stop the local site later, click in the terminal and press `Ctrl+C`. To start it again, run `npm run dev`.

- [ ] The site loads at `http://localhost:3000`

---

## Phase 3: Put it live on the internet

### Step 6: Deploy to your own Vercel

**What is deploying?** Deploying publishes your site to the internet so anyone with the link can open it.

1. Go to [https://vercel.com](https://vercel.com) and sign in.
2. Click **Add New -> Project**.

   ![screenshot: Vercel Add New Project](./images/s1-vercel-add-new.png)

3. Find **your fork** in the list and click **Import**.

   ![screenshot: import your fork on Vercel](./images/s1-vercel-import.png)

4. Leave all the settings at their defaults. Vercel detects Next.js on its own, so you do not change anything.
5. Click **Deploy** and wait for it to finish (usually a minute or two).

   ![screenshot: Vercel deployment success](./images/s1-vercel-deployed.png)

6. Click the preview or **Visit** to open your live site.

> From now on, every time you push a change to GitHub, Vercel republishes your site automatically. You do not deploy by hand again.

- [ ] Your site is live at a Vercel address you can open in a browser

---

## Phase 4: Make it yours

You customize the site by editing files in the `content` folder and adding your own pictures. Today you change two files. You do not need to touch anything outside `content` and `public/images`.

> After each edit, save the file (`Ctrl+S` or `Cmd+S`). If your local site is running, refresh your browser to see the change right away.

### How to edit these files without breaking them

These files are code, so a few characters matter:

- Change only the words between the double quotes `" "`.
- Keep the quotes, the comma at the end of each line, and the `+` that joins long text across lines.
- Apostrophes are fine (`"We're open"`). A double quote inside your text is not. Use single quotes instead (`"Our 'quick start' plan"`).

If your page turns into a red error screen after you save, you probably deleted a quote or a comma. Press `Ctrl+Z` (`Cmd+Z` on Mac) to undo, save again, and the page comes back. The error screen also names the file and line number to check.

### Step 7: Customize your landing page (`content/site.ts`)

1. In VS Code, open `content/site.ts`.
2. Near the bottom you will see a block that starts with `export const site`. Change these values to your own:

```ts
export const site: SiteContent = {
  name: "Acme Consulting",
  headline: "Software and consulting that fits your business",
  tagline: "Web development, custom software, and expert IT consulting.",
  intro:
    "We help teams ship the right software. Browse our catalog to see what we " +
    "offer, then send us a demo request, a quote request, or a general inquiry. " +
    "No account needed to get in touch.",
  catalogCtaLabel: "Browse the catalog",
};
```

   - `name`: your site or business name. This also shows in the top navigation.
   - `headline`: the big headline on the landing page.
   - `tagline`: the one line under the headline.
   - `intro`: the longer paragraph describing what you offer.
   - `catalogCtaLabel`: the text on the button that links to your catalog.

3. Save the file and refresh your browser.

   ![screenshot: landing page with your own branding](./images/s1-custom-landing.png)

- [ ] Your landing page shows your own name and text

### Step 8: Customize your catalog (`content/listings.ts`)

1. Open `content/listings.ts`.
2. Find the block that starts with `export const listings`. Each item inside the curly braces is one catalog card. Here is the first one:

```ts
{
  slug: "it-strategy-consulting",
  title: "IT Strategy Consulting",
  category: "CONSULTING",
  description:
    "Work with our consultants to map your technology roadmap, assess risk, " +
    "and plan the systems your business needs over the next 12 months.",
  inquiry_type: "INQUIRE",
  image_url: "/images/placeholder-consulting.svg",
},
```

3. For each item, change these values:
   - `title`: the name of the service.
   - `description`: a short explanation.
   - `category`: pick one of `CONSULTING`, `WEB_DEV`, or `CUSTOM_SOFTWARE`. Keep the quotes and the exact spelling in capitals. These three are fixed because the database only accepts these values. Pick the closest one. Your title and description can say anything.
   - `inquiry_type`: pick one of `DEMO`, `QUOTE`, or `INQUIRE`. This decides which contact form shows on that listing's page.
   - `image_url`: the picture for the card (see Step 9).
   - `slug`: the short name used in the page address, for example `/catalog/my-new-service`. Use lowercase words joined by dashes. Keep it unique.

> To add a listing, copy one whole item block, paste it below the last one, and add a comma after the previous block's closing brace. Then change its values. To remove one, delete its whole block.

4. Save and refresh your browser.

- [ ] Your catalog shows your own listings

### Step 9: Add your own images

1. Name your image files with lowercase letters, numbers, and dashes only. No spaces. For example `my-service.png`.
2. Put them into the `public/images/` folder in the project. You can drag them onto that folder in the VS Code sidebar.
3. In `content/listings.ts`, set each `image_url` to the path of your file under `/images/`. For example, if you added `public/images/my-service.png`, set:

```ts
image_url: "/images/my-service.png",
```

4. Save and refresh. Your pictures appear on the cards.

> Type the file name exactly, including the ending (`.png` or `.jpg`). Your computer may forgive a capital letter, but your live site will not, so the picture would show at home and be missing online.

> Wide pictures work best. The card shows them at a 16:10 shape (for example 1600 by 1000 pixels) and trims anything outside that.

> Can't see `.png` or `.jpg` at the end of your file names on Windows? Turn them on in File Explorer: **View -> Show -> File name extensions** (on Windows 10: **View -> File name extensions**).

> The project ships with placeholder images like `/images/placeholder-consulting.svg`. You can keep those for now and replace them later.

- [ ] Your catalog cards show your own images (or the placeholders)

---

## Phase 5: Save your work and publish it

So far your changes are only on your computer. Now you send them to GitHub, which tells Vercel to republish your live site.

This takes three Git commands. Think of mailing a package:

- `git add` puts your changed files in the box (Git calls this "staging").
- `git commit` seals the box and writes a label saying what is inside. The saved box is called a "commit".
- `git push` sends the box to GitHub.

1. In the VS Code terminal (it should already be inside your project folder), put your changes in the box:

```bash
git add .
```

2. Seal it with a short label describing what you did:

```bash
git commit -m "Customize branding and catalog"
```

3. Send it to your GitHub fork:

```bash
git push
```

   The first time you push, VS Code asks you to sign in to GitHub. Click **Allow**, finish signing in in your browser, then come back. If your terminal asks for a password instead, see [Troubleshooting](./Troubleshooting.md).

4. Open your Vercel site in the browser. Within a minute or two, your changes appear on the live site.

   ![screenshot: live site with your changes](./images/s1-live-updated.png)

- [ ] Your changes are live on your Vercel address

---

## Session 1 done

Your personalized catalog is live on the internet. Right now the forms do not save anything yet. That is expected. In **[Part 3: Provision Your Backend](./Part-3-Provision-Your-Backend.md)** you create your own database, and the listings you wrote today get copied into it.

> Hit a snag? Check the [Troubleshooting](./Troubleshooting.md) page.
