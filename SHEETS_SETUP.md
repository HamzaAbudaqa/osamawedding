# Google Sheets RSVP Backend — Setup

This wires the RSVP form to append each submission as a row in a Google Sheet you own.
No servers, no database, no monthly cost.

## 1. Create the sheet

1. Go to <https://sheets.new> — a new blank sheet opens.
2. Rename it to something like `Osama & Joud — RSVPs`.
3. In row 1, add these headers across columns A–D:

   | A | B | C | D |
   |---|---|---|---|
   | submittedAt | fullName | mealChoice | dietaryNotes |

## 2. Add the Apps Script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete any placeholder code and paste the script below.
3. Click the 💾 save icon. Name the project anything (e.g. `RSVP webhook`).

```js
const SHEET_NAME = 'Sheet1'; // change if your tab is named differently

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(SHEET_NAME);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.fullName    || '',
      data.mealChoice  || '',
      data.dietaryNotes|| '',
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

## 3. Deploy it as a Web App

1. In the Apps Script editor, click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" → choose **Web app**.
3. Fill in:
   - **Description:** `RSVP webhook v1`
   - **Execute as:** `Me`
   - **Who has access:** `Anyone` ← important, this is what lets the website POST to it
4. Click **Deploy**.
5. Google will ask you to authorize — click through, pick your account, click **Advanced → Go to (your project) (unsafe)** (it says "unsafe" because it's your own script), then **Allow**.
6. Copy the **Web app URL**. It looks like:
   `https://script.google.com/macros/s/AKfyc.../exec`

## 4. Put the URL in `.env`

In the project root (same folder as `package.json`), create a file called `.env`:

```
VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/YOUR_ID_HERE/exec
```

Restart the dev server so Vite picks up the new env var:

```bash
npm run dev
```

## 5. Test it

1. Open the site, submit a test RSVP.
2. Go back to your sheet — you should see a new row appear within a second.

## Updating the script later

If you ever change the Apps Script, you must **redeploy**:

- **Deploy → Manage deployments** → pencil icon → **Version: New version** → Deploy.
- The URL stays the same, no `.env` change needed.

(If you make a *new deployment* instead of a new version, the URL changes and you'd need to update `.env`.)

## Production (Vercel)

Add the same env var in Vercel:

1. Vercel dashboard → your project → **Settings → Environment Variables**.
2. Add `VITE_RSVP_ENDPOINT` with the same URL. Apply to Production (and Preview if you want).
3. Redeploy.
