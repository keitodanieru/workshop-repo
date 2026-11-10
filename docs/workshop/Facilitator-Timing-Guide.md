# Facilitator Timing Guide

Run-of-show for all three sessions. Each day runs **12:30 to 4:00 PM (210 minutes)**. This guide maps the student guide (`docs/workshop/guide/`) to time blocks, places breaks, and leaves buffer. It's for facilitators and is not part of the student repo.

## Before Day 1 (facilitator checklist)

- [ ] The student repo is **public**, so students can fork it.
- [ ] Everything students need is on its **default branch** (`main`). A fork copies only that branch.
- [ ] You forked the student repo yourself, ran `npm install` and `npm run dev`, and deployed it to a fresh Vercel project. The catalog shows the three sample listings.
- [ ] You have the student repo link ready to share (slides, chat, or a short link).
- [ ] Before Day 2: run Part 3 once on a brand-new Supabase project, to confirm `db/setup.sql` runs cleanly and the menu names in the guide still match Supabase.

## Ground rules that protect the clock

- **Prerequisites are done before Day 1.** Accounts (GitHub/Supabase/Vercel) and installs (Node/VS Code/Git) are not class time. Verify them in the first 10 minutes, don't perform them. See [Prerequisites](./guide/Prerequisites.md).
- **Two breaks per day** (about 10 min each), plus a start buffer and a wrap buffer.
- **Checkpoints are hard stops.** If most of the room isn't at the checkpoint, use buffer time before moving on.
- **Session 2 is the tight one** (provisioning a backend). It has the least slack, so guard it.

## Standard day skeleton

| Block | Time | Minutes |
|-------|------|---------|
| Arrival + setup check | 12:30 to 12:40 | 10 |
| Work block 1 | 12:40 to 1:30 | 50 |
| Break 1 | 1:30 to 1:40 | 10 |
| Work block 2 | 1:40 to 2:40 | 60 |
| Break 2 | 2:40 to 2:50 | 10 |
| Work block 3 | 2:50 to 3:40 | 50 |
| Wrap + checkpoint + Q&A | 3:40 to 4:00 | 20 |
| **Total** | **12:30 to 4:00** | **210** |

Working time is about **160 min/day** (50+60+50), with 30 min of structured non-work (arrival, wrap) and 20 min of breaks. The wrap block doubles as **buffer**. If a work block overruns, borrow from wrap.

---

## Day 1: Build the Storefront

Maps to [Part 2: Build the Storefront](./guide/Part-2-Build-the-Storefront.md). Goal: a live, personalized catalog on the student's own Vercel URL.

| Time | Activity | Doc step |
|------|----------|----------|
| 12:30 to 12:40 | Arrival. Confirm GitHub login works, `node -v` and `git --version` pass | Prereqs check |
| 12:40 to 1:00 | Welcome and three-tier architecture overview (keep to 20 min) |  |
| 1:00 to 1:30 | Fork, clone, run locally (`npm install`, `npm run dev`) | Steps 1 to 5 |
| 1:30 to 1:40 | **Break 1** |  |
| 1:40 to 2:20 | Deploy to own Vercel. Get live URL | Step 6 |
| 2:20 to 2:40 | Customize landing page (`content/site.ts`) | Step 7 |
| 2:40 to 2:50 | **Break 2** |  |
| 2:50 to 3:40 | Customize catalog (`content/listings.ts` and `public/images/`). Push with `git add`, `git commit`, `git push` | Steps 8 to 9, Phase 5 |
| 3:40 to 4:00 | **Checkpoint:** catalog and forms render on live URL. Q&A | Session 1 checklist |

**Risk and buffer:** the `npm install` and first local run is the most likely snag. Watch for Windows PowerShell's "running scripts is disabled" error (one-line fix in Troubleshooting) and for students who can't find their cloned folder (have them use **File -> Open Folder**). The first `git push` asks for a GitHub sign-in, so allow a few minutes for that in the catalog block. A red error screen after editing a content file almost always means a deleted quote or comma. If it runs long, trim the architecture talk and borrow from the wrap block. Deployment is usually smooth since Vercel auto-detects Next.js.

---

## Day 2: Make It Real (Provision Your Backend) ⚠️ tightest day

Maps to [Part 3: Provision Your Backend](./guide/Part-3-Provision-Your-Backend.md). Goal: the student's own Supabase backend connected, with a test inquiry, receipt, and donation persisting. This day has the most steps and the least slack.

| Time | Activity | Doc step |
|------|----------|----------|
| 12:30 to 12:40 | Arrival. Confirm Supabase login works |  |
| 12:40 to 1:00 | Recap and how the backend fits (DB, Auth, Storage, RLS). Keep it brief |  |
| 1:00 to 1:30 | Create Supabase project. Run `db/setup.sql` | Steps 1 to 2 |
| 1:30 to 1:40 | **Break 1** |  |
| 1:40 to 2:10 | Load listings via `/setup` (or `db/seed.sql`). Turn off "Confirm email" | Steps 3 to 4 |
| 2:10 to 2:40 | Copy keys. Set `.env.local` and Vercel env. Redeploy | Steps 5 to 6 |
| 2:40 to 2:50 | **Break 2** |  |
| 2:50 to 3:30 | Add GCash QR (`gcash-qr.png`, `content/payment.ts`). Save test data: 1 inquiry, 2 receipts from 2 accounts, 2 donations | Steps 7 to 8 |
| 3:30 to 4:00 | **Checkpoint:** test inquiry, receipt, and donation persist. Q&A and buffer | Session 2 checklist |

**Risk and buffer (read this one closely):**
- **Project provisioning wait** (1 to 2 min) and **SQL errors from partial copies** are the top time sinks. Tell students to copy the *entire* `db/setup.sql`. Keep the script idempotent so a re-run fixes a partial run.
- **Key and env mistakes** are the second sink: a wrong key in the wrong variable, or forgetting to set them on Vercel *and* redeploy. Walk the three-variable table on screen, and stress that the `service_role` key is server-only.
- This day gives the checkpoint block 30 min (instead of 20) on purpose, because stragglers are most likely here. If the room is on track, use the extra time for the payment customization polish.
- **Fallback if a student is stuck on Supabase:** they can keep customizing `content/` files locally and connect the backend during Day 3's arrival buffer. The catalog still renders without the backend.

---

## Day 3: Operate the Business

Maps to [Part 4: Operate the Business](./guide/Part-4-Operate-the-Business.md). Goal: set up Admin and Staff accounts, run every dashboard, final deploy.

| Time | Activity | Doc step |
|------|----------|----------|
| 12:30 to 12:40 | Arrival. Help any Day 2 backend stragglers catch up |  |
| 12:40 to 1:10 | Register admin and staff accounts on live site. Run `db/seed-roles.sql` | Step 1 |
| 1:10 to 1:30 | Inquiry triage dashboard | Step 2 |
| 1:30 to 1:40 | **Break 1** |  |
| 1:40 to 2:20 | Receipt review: approve to MEMBER, reject with reason | Step 3 |
| 2:20 to 2:40 | Donation review: verify and reject | Step 4 |
| 2:40 to 2:50 | **Break 2** |  |
| 2:50 to 3:20 | Admin: manage listings and assign roles | Step 5 |
| 3:20 to 3:35 | Security demo: website blocks a User (6a), then the database blocks an anonymous query in the SQL Editor (6b) | Step 6 |
| 3:35 to 4:00 | Final deploy. Showcase classmates' sites. Wrap | Step 7 |

**Risk and buffer:** role seeding is the one setup step. Everything after is operating finished UI, so it moves quickly. The security demo (Step 6) is the signature teaching moment, so protect at least 15 min for it even if earlier blocks slip.

---

## If you fall behind (priority order)

Keep these. Cut the rest if time is short:

1. **Day 1:** a live deployed site (even with default content) beats perfect customization.
2. **Day 2:** backend connected and one persisted test record beats payment polish.
3. **Day 3:** approving a receipt (membership granted) and the 403/RLS security demo beats listing/role management.

The three "wow" moments to land, one per day: **it's live** (Day 1), **it saves real data** (Day 2), and **I approved a payment and the security really blocks people** (Day 3).

---

## Quick reference: working time math

- Window: 210 min/day.
- Minus arrival (10), two breaks (20), and wrap/buffer (20), that leaves about **160 min of core working time**.
- Day 2 is the binding constraint. Its steps are sequenced so a stuck step (provisioning) doesn't block the next one, since customizing `content/` can proceed in parallel.
