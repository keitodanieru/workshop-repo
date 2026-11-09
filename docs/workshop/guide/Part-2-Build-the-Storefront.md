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

1. Open **VS Code** and open a terminal (**Terminal -> New Terminal**).
2. Move into the folder where you want to keep the project. For example, your Desktop:

```bash
cd Desktop
```

3. Clone your fork. Paste the link you copied, replacing the example below:

```bash
git clone https://github.com/your-username/your-fork.git
```

VS Code downloads all the files into a new folder named after the project.

4. Move into that folder and open it in VS Code:

```bash
cd your-fork
code .
```

   ![screenshot: project open in VS Code](./images/s1-project-in-vscode.png)

- [ ] The project files are open in VS Code

---

## Phase 2: Run it on your computer

### Step 4: Install the project's building blocks

**What is this?** The project depends on some ready-made code packages. This command downloads them. You only do it once.

In the VS Code terminal, run:

```bash
npm install
```

Wait for it to finish. It may take a minute and print a lot of text. That is normal.

- [ ] `npm install` finished without red error text

### Step 5: Start the site locally

**What is "locally"?** It means running the site on your own computer so only you can see it, before it goes online.

Run:

```bash
npm run dev
```

The terminal prints a web address, usually `http://localhost:3000`. Hold Ctrl (or Cmd on Mac) and click it, or paste it into your browser.

   ![screenshot: site running at localhost:3000](./images/s1-localhost.png)

You should see the landing page with a sample catalog. It shows the default "Acme Consulting" branding for now. You will change that soon.

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

You customize the site by editing just three files in the `content` folder. You do not need to touch anything else.

> After each edit, **save the file** (`Ctrl+S` or `Cmd+S`). If your local site is running, refresh your browser to see the change right away.

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
   - `category`: pick one of `CONSULTING`, `WEB_DEV`, or `CUSTOM_SOFTWARE`. Keep the quotes and the exact spelling in capitals.
   - `inquiry_type`: pick one of `DEMO`, `QUOTE`, or `INQUIRE`. This decides which contact form shows on that listing's page.
   - `image_url`: the picture for the card (see Step 9).
   - `slug`: the short name used in the page address, for example `/catalog/my-new-service`. Use lowercase words joined by dashes. Keep it unique.

> To add a listing, copy one whole item block, paste it below the last one, and add a comma after the previous block's closing brace. Then change its values. To remove one, delete its whole block.

4. Save and refresh your browser.

- [ ] Your catalog shows your own listings

### Step 9: Add your own images

1. Put your image files into the `public/images/` folder in the project.
2. In `content/listings.ts`, set each `image_url` to the path of your file under `/images/`. For example, if you added `public/images/my-service.png`, set:

```ts
image_url: "/images/my-service.png",
```

3. Save and refresh. Your pictures appear on the cards.

> The project ships with placeholder images like `/images/placeholder-consulting.svg`. You can keep those for now and replace them later.

- [ ] Your catalog cards show your own images (or the placeholders)

---

## Phase 5: Save your work and publish it

So far your changes are only on your computer. Now you push them to GitHub, which tells Vercel to republish your live site.

1. In the VS Code terminal, make sure you are inside your project folder. Then stage your changes:

```bash
git add .
```

2. Save them with a short message describing what you did:

```bash
git commit -m "Customize branding and catalog"
```

3. Push them to your GitHub fork:

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
