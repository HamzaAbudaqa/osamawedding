/**
 * RSVP submission → Google Sheets via Apps Script Web App.
 *
 * Configure the endpoint in `.env` as `VITE_RSVP_ENDPOINT`.
 * See SHEETS_SETUP.md for the Apps Script and deploy steps.
 */

const ENDPOINT = import.meta.env.VITE_RSVP_ENDPOINT;

export const MEAL_OPTIONS = [
  { value: 'chicken', label: 'Grilled Chicken Breast Fillet', description: '' },
  { value: 'salmon', label: 'Grilled Salmon', description: '' },
  { value: 'vegetarian', label: 'Vegetarian', description: '' },
];

export async function submitRSVP(party) {
  const guest = party.guests?.[0] ?? {};
  const payload = {
    submittedAt: new Date().toISOString(),
    fullName: guest.fullName ?? party.primaryGuest?.fullName ?? '',
    mealChoice: guest.mealChoice ?? '',
    dietaryNotes: guest.dietaryNotes ?? '',
  };

  if (!ENDPOINT) {
    console.warn(
      '[RSVP] VITE_RSVP_ENDPOINT is not set. Submission logged to console only:',
      payload,
    );
    await new Promise((r) => setTimeout(r, 600));
    return payload;
  }

  // Apps Script web apps don't accept preflighted CORS requests,
  // so we send as text/plain (simple request) and parse JSON on the server.
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`RSVP submit failed: ${res.status}`);
  }

  return payload;
}
