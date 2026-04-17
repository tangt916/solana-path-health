/**
 * Mock calendar availability — used in /get-started Step 4 and dashboard reschedule.
 * NO vendor API calls. All data is generated client-side with a stable seed
 * so slots don't reshuffle on re-render.
 */

export interface TimeSlot {
  date: string;          // "2026-04-21"
  displayDate: string;   // "Monday, April 21"
  dayAbbrev: string;     // "Mon"
  dayNumber: string;     // "21"
  time: string;          // "10:30 AM"
  available: boolean;
  providerId: string;
  providerName: string;
}

export interface Provider {
  id: string;
  name: string;
  title: string;
  specialty: string;
  avatar: string;        // initials
  rating: number;
  patientCount: string;
}

export const MOCK_PROVIDERS: Provider[] = [
  {
    id: "dr-torres",
    name: "Dr. Amanda Torres",
    title: "MD",
    specialty: "Weight Management Specialist",
    avatar: "AT",
    rating: 4.9,
    patientCount: "200+",
  },
];

// Tiny seeded PRNG (mulberry32) so slot availability is stable per (date+time).
function seededRandom(seed: number) {
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const DAY_NAMES_FULL = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const DAY_NAMES_ABBR = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatHour(hour: number, minute: number): string {
  const period = hour >= 12 ? "PM" : "AM";
  const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const m = minute === 0 ? "00" : String(minute).padStart(2, "0");
  return `${h}:${m} ${period}`;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

/**
 * Returns 14 weekdays of mock slots (8 AM – 5 PM, 30-min increments).
 * ~40% of slots are randomly marked unavailable using a stable seed.
 */
export function getMockAvailability(): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const provider = MOCK_PROVIDERS[0];
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let weekdaysFound = 0;
  let dayOffset = 1; // start tomorrow

  while (weekdaysFound < 14) {
    const d = new Date(today);
    d.setDate(d.getDate() + dayOffset);
    dayOffset++;

    const dow = d.getDay();
    if (dow === 0 || dow === 6) continue; // skip weekends
    weekdaysFound++;

    const dateStr = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const displayDate = `${DAY_NAMES_FULL[dow]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}`;

    for (let hour = 8; hour < 17; hour++) {
      for (const minute of [0, 30]) {
        const time = formatHour(hour, minute);
        const seed = hashString(`${dateStr}-${time}-${provider.id}`);
        const available = seededRandom(seed) > 0.4;
        slots.push({
          date: dateStr,
          displayDate,
          dayAbbrev: DAY_NAMES_ABBR[dow],
          dayNumber: String(d.getDate()),
          time,
          available,
          providerId: provider.id,
          providerName: provider.name,
        });
      }
    }
  }

  return slots;
}

export function getMockProviders(): Provider[] {
  return MOCK_PROVIDERS;
}

/** Convenience: get unique sorted dates, with a flag if any slot on that date is available. */
export function getAvailableDates(slots: TimeSlot[]): {
  date: string;
  displayDate: string;
  dayAbbrev: string;
  dayNumber: string;
  hasAvailability: boolean;
}[] {
  const map = new Map<string, { displayDate: string; dayAbbrev: string; dayNumber: string; hasAvailability: boolean }>();
  for (const s of slots) {
    const existing = map.get(s.date);
    if (existing) {
      existing.hasAvailability = existing.hasAvailability || s.available;
    } else {
      map.set(s.date, {
        displayDate: s.displayDate,
        dayAbbrev: s.dayAbbrev,
        dayNumber: s.dayNumber,
        hasAvailability: s.available,
      });
    }
  }
  return Array.from(map.entries()).map(([date, v]) => ({ date, ...v }));
}
