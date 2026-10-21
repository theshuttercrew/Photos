# Face-Match Photo Delivery — Setup Guide (no coding needed)

Clients open your link, upload a selfie, and see only the photos they're in.
Their selfie never leaves their phone. Your photos stay in your Google Drive.

You set it up **once**. After that, each new event takes about 5 minutes (see "Adding a new event" at the end).

---

## Step 1 — Make one master folder, with one subfolder per event
1. In Google Drive, create a master folder, e.g. "My Events".
2. Inside it, create one subfolder per event and name it the way clients should see it, e.g. "Priya & Arjun Wedding" or "Hyderabad Marathon". Upload that event's photos into it.
3. Right-click the **master folder** → **Share** → "General access": **Anyone with the link** → **Viewer**. (Subfolders inherit this.)
4. Copy the master folder link. You'll paste it in Step 4.

> Anyone with a Drive link can open the folder. Only share your *website* link with clients, not the Drive link.

## Step 2 — Branding (already done for The Shutter Crew)
Your logo, yellow colour, WhatsApp and Instagram are already set in `config.js`. To change them later, open `config.js` in Notepad (or any text editor). Change the studio name, tagline, colours, and add your WhatsApp number / Instagram. Save.
To add a logo: copy your logo file (e.g. `logo.png`) into this folder and set `logoUrl: "logo.png"`.

## Step 3 — Get a free Google API key (5 minutes, one time)
This lets the app read your Drive folder.
1. Go to https://console.cloud.google.com and sign in with the same Google account.
2. Top bar → project picker → **New project** → name it "Photo delivery" → Create.
3. Search **"Google Drive API"** → open it → **Enable**.
4. Left menu → **APIs & Services → Credentials → Create credentials → API key**. Copy the key.
5. (Recommended) Click the key → **API restrictions → Restrict key → Google Drive API → Save**.

## Step 4 — Scan the photos
1. Open `admin.html` by double-clicking it (works in Chrome).
   If Chrome blocks it, put the folder online first (Step 5) and open `yoursite/admin.html`.
2. Paste the master folder link and the API key → **Find events**. Your event subfolders appear as a list. Tick the ones to scan → **Scan selected events**.
3. Keep the tab open. Roughly 1–3 seconds per photo on a laptop (500 photos ≈ 10–20 min).
4. When finished, click **Download index.json**. Put it in this folder, replacing any old one.

## Step 5 — Put it online (free)
Easiest: **Netlify Drop**
1. Go to https://app.netlify.com/drop and drag this whole folder onto the page.
2. You get a link like `https://something.netlify.app`. Share it with clients.
3. For your own address (e.g. `photos.yourstudio.com`), add a custom domain in Netlify's settings.

## Adding a new event later
1. Create a new subfolder in your master folder and upload the photos.
2. Open `admin.html`, paste the same link and key, and under "Your previous index.json" choose your current `index.json`. Click **Find events**. Only the new event is ticked.
3. Scan, download the new `index.json`, replace the old one in your folder, and drag the folder to Netlify again (same site link, so clients keep using the same URL).

## What clients see
They open your one link and see all your events as cards (newest first). They tap their event, upload a selfie, and get only their photos from that event.

## Tips for good matches
- Clients should use a clear, front-facing selfie in good light, no sunglasses.
- If clients get wrong photos, lower `matchThreshold` in `config.js` (e.g. 0.45). If they miss photos, raise it (0.55).
- Photos where faces are tiny or turned away may not match. That's normal for any face search.

## Privacy note (important)
Your clients' faces are being matched, which is biometric data in many places (including under India's DPDP Act). Tell clients on the invitation that the selfie is processed only on their device and not stored, and only share the link with people who attended that event.
