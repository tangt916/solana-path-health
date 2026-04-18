export const MOCK_PATIENT = {
  firstName: "Sarah",
  lastName: "Johnson",
  email: "test@solanahealth.co",
  phone: "+13035551234",
  dob: "1988-03-15",
  gender: "FEMALE",
  state: "CO",
  address: null,
  medication: "Semaglutide",
  dose: "0.25mg",
  planMonths: 1,
  programStartDate: "2025-12-15",
  refillsRemaining: 3,
  injectionDay: "Monday",
  startingWeight: 215,
  currentWeight: 197,
  goalWeight: 170,
  caseStatus: "APPROVED" as const,
  referralCode: "SARAH25",
  referralCount: 2,
  referralCredits: 25,
  allergies: "None",
  currentMedications: "None",
  healthConditions: [] as string[],
};

export const MOCK_ORDERS = [
  {
    id: "order-001",
    status: "Shipped",
    pharmacyName: "Strive Pharmacy",
    trackingId: "1Z999AA10123456784",
    carrierName: "UPS",
    trackingUrl: "https://www.ups.com/track",
    estDeliveryAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    items: [{ name: "Semaglutide 0.25mg", quantity: "4 vials" }],
    shippingLogs: [
      {
        status: "Picked Up",
        message: "Package picked up by carrier",
        statusUpdatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Denver, CO",
      },
      {
        status: "In Transit",
        message: "Package in transit to destination",
        statusUpdatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        location: "Salt Lake City, UT",
      },
    ],
  },
];

export const MOCK_APPOINTMENTS = [
  {
    id: "appt-001",
    providerName: "Dr. Amanda Torres",
    providerEmail: "dr.torres@solanahealth.co",
    startTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000).toISOString(),
    timezone: "America/Denver",
    meetingLink: "https://meet.google.com/mock-link",
    status: "scheduled",
    type: "video",
  },
];

export const MOCK_MESSAGES = [
  {
    id: "msg-001",
    authorName: "Dr. Amanda Torres",
    text: "Hi Sarah! Great progress this week. How are you feeling on the new dose?",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    fromProvider: true,
  },
  {
    id: "msg-002",
    authorName: "Sarah Johnson",
    text: "Feeling good! A little nausea the first day but it passed.",
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
    read: true,
    fromProvider: false,
  },
  {
    id: "msg-003",
    authorName: "Dr. Amanda Torres",
    text: "That is very normal. Make sure you eat a small meal before your injection.",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    fromProvider: true,
  },
  {
    id: "msg-004",
    authorName: "Dr. Amanda Torres",
    text: "Your lab results came back — everything looks great! Keep it up 🎉",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
    fromProvider: true,
  },
];

export const MOCK_PAYMENTS = [
  { date: "4 months ago", amount: "$297.00", status: "Paid" },
  { date: "3 months ago", amount: "$297.00", status: "Paid" },
  { date: "2 months ago", amount: "$297.00", status: "Paid" },
  { date: "1 month ago",  amount: "$297.00", status: "Paid" },
];
