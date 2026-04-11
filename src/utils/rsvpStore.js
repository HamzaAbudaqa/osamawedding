/**
 * RSVP Data Store
 *
 * Data Model:
 * {
 *   id: string (UUID),
 *   submittedAt: ISO timestamp,
 *   primaryGuest: {
 *     fullName: string,
 *     email: string (optional),
 *   },
 *   guests: [
 *     {
 *       id: string (UUID),
 *       fullName: string,
 *       mealChoice: 'filet-mignon' | 'salmon' | 'chicken' | 'vegetarian' | 'vegan',
 *       dietaryNotes: string,
 *       isAttending: boolean,
 *     }
 *   ],
 *   message: string (optional note to the couple),
 * }
 *
 * Currently uses localStorage. Architected so the storage backend
 * can be swapped to Supabase, Firebase, or any REST API by replacing
 * the functions below.
 */

const STORAGE_KEY = 'osama_joud_rsvps';

function getAll() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function save(rsvpParty) {
  const all = getAll();
  all.push({
    ...rsvpParty,
    submittedAt: new Date().toISOString(),
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return rsvpParty;
}

/**
 * Replace this function to connect to a real backend.
 * Expected signature: submitRSVP(party) => Promise<party>
 */
export async function submitRSVP(party) {
  // Simulate network latency for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 1200));
  return save(party);
}

export async function getAllRSVPs() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return getAll();
}

export const MEAL_OPTIONS = [
  { value: 'filet-mignon', label: 'Filet Mignon', description: 'Pan-seared with truffle butter' },
  { value: 'salmon', label: 'Atlantic Salmon', description: 'Herb-crusted with lemon beurre blanc' },
  { value: 'chicken', label: 'Roasted Chicken', description: 'Free-range with rosemary jus' },
  { value: 'vegetarian', label: 'Garden Risotto', description: 'Wild mushroom & parmesan risotto' },
  { value: 'vegan', label: 'Grilled Vegetables', description: 'Seasonal vegetables with quinoa' },
];
