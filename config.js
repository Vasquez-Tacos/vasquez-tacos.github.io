/* ============================================================
   VASQUEZ TACOS — SITE SETTINGS
   Edit this file to update the website. No other files need
   to change for everyday updates (menu, prices, booked dates,
   payment links, contact info).
   ============================================================ */

const SITE = {
  business: {
    name: "Vasquez Tacos",
    tagline: "Homemade Mexican Taco Catering",
    phone: "(909) 900-5672",
    email: "",                         // TODO: add email, e.g. "hello@vasqueztacos.com"
    city: "Fontana, California",
    serviceArea: "Fontana & the Inland Empire", // TODO: confirm area
    hours: "",                         // e.g. "Events 7 days a week · Calls 9am–7pm"
    instagram: "",                     // e.g. "https://instagram.com/vasqueztacos"
    facebook: "",                      // e.g. "https://facebook.com/vasqueztacos"
    googleReviews: "",                 // link from your Google Business Profile
    yelp: "",                          // link to your Yelp page
  },

  /* ---------- REVIEWS ----------
     Paste real reviews from customers (Google, Yelp, texts, etc.).
     The section asks visitors to leave a review until you add some.
     Example: { name: "Maria G.", event: "Quinceañera", text: "...", stars: 5 } */
  reviews: [],

  /* ---------- PAYMENTS ----------
     Create payment links in Square, Stripe, or PayPal and paste
     them here. Leave a link as "" to hide that button.            */
  payments: {
    depositPercent: 30,   // deposit required to hold a date
    depositLink: "",      // e.g. "https://square.link/u/XXXX"
    balanceLink: "",      // link for paying the remaining balance
    venmo: "",            // e.g. "@VasquezTacos"
    zelle: "",            // e.g. "payments@vasqueztacos.com"
    cashApp: "",          // e.g. "$VasquezTacos"
  },

  /* ---------- BOOKING FORM ----------
     Create a free form at https://formspree.io and paste the
     endpoint here so booking requests arrive in your email.
     Until then, the form opens the customer's email app.          */
  formEndpoint: "",       // e.g. "https://formspree.io/f/abcdwxyz"

  /* ---------- AVAILABILITY ----------
     Dates are YYYY-MM-DD. "booked" = fully booked,
     "limited" = one event already, may fit a small one.           */
  booked: [
    "2026-10-03", "2026-10-10", "2026-10-17", "2026-10-24",
    "2026-10-31", "2026-11-07", "2026-11-14", "2026-12-12",
    "2026-12-19",
  ],
  limited: [
    "2026-10-04", "2026-10-18", "2026-11-21", "2026-12-05",
  ],
  closedWeekdays: [],     // 0=Sun … 6=Sat, e.g. [0] to close Sundays
  minDaysNotice: 7,       // how far ahead customers must book

  /* ---------- PACKAGES (flat price per event) ----------
     color: "red", "green", or "gold" (the ribbon on each card).
     Events larger than the biggest package get a custom quote.     */
  packages: [
    {
      id: "small",
      name: "Small Party",
      price: 399,
      maxGuests: 30,
      guestsLabel: "Up to 30 guests",
      color: "red",
      includes: [
        "2 taco meats",
        "Homemade rice & beans",
        "Handmade tortillas",
        "House salsas & toppings",
        "Plates, napkins & utensils",
      ],
    },
    {
      id: "medium",
      name: "Medium Event",
      price: 749,
      maxGuests: 75,
      guestsLabel: "31 to 75 guests",
      color: "green",
      popular: true,
      includes: [
        "3 taco meats",
        "Homemade rice & beans",
        "Handmade tortillas",
        "Salsas, toppings & guacamole",
        "Tables & serving setup",
        "On-site cooking",
      ],
    },
    {
      id: "large",
      name: "Large Event",
      price: 999,
      maxGuests: 100,
      guestsLabel: "76 to 100 guests",
      color: "gold",
      includes: [
        "3 taco meats",
        "Homemade rice & beans",
        "Handmade tortillas",
        "Full salsa bar & guacamole",
        "Tables, plates, setup & cleanup",
        "On-site cooking & taqueros",
      ],
    },
  ],

  /* ---------- GALLERY ----------
     Put photos in the "images" folder and list the file names here. */
  gallery: [
    { img: "images/gallery-1.jpg", caption: "Weddings" },
    { img: "images/gallery-2.jpg", caption: "Birthdays" },
    { img: "images/gallery-3.jpg", caption: "Quinceañeras" },
    { img: "images/gallery-4.jpg", caption: "Corporate & Church Events" },
  ],

  /* ---------- ADD-ONS ---------- */
  addons: [
    { id: "churros",  name: "Churros with chocolate",   price: 3,   per: "guest" },
    { id: "aguas",    name: "Extra agua fresca flavor", price: 2,   per: "guest" },
    { id: "chips",    name: "Chips, salsa & queso",     price: 3,   per: "guest" },
    { id: "chairs",   name: "Chair rental",             price: 2.5, per: "guest" },
    { id: "server",   name: "Extra server (4 hrs)",     price: 120, per: "event" },
  ],

  /* ---------- MENU ---------- */
  menu: [
    {
      category: "Meats",
      items: [
        { name: "Carne Asada", desc: "Marinated flank steak, grilled over open flame." },
        { name: "Al Pastor", desc: "Chile-marinated pork with pineapple, family recipe." },
        { name: "Pollo Asado", desc: "Citrus & achiote chicken, grilled and chopped." },
        { name: "Carnitas", desc: "Slow-cooked pork, crispy on the edges." },
        { name: "Barbacoa", desc: "Beef braised for hours in chiles and spices." },
        { name: "Veggie", desc: "Grilled peppers, onions, calabacitas & beans.", tag: "Vegetarian" },
      ],
    },
    {
      category: "Sides",
      items: [
        { name: "Mexican Rice", desc: "Tomato-simmered rice made from scratch." },
        { name: "Refried Beans", desc: "Pinto beans cooked daily, finished with queso fresco." },
        { name: "Elote", desc: "Street corn with crema, cotija & chile." },
        { name: "Nopales Salad", desc: "Cactus, tomato, onion, cilantro & lime." },
      ],
    },
    {
      category: "Salsas & Toppings",
      items: [
        { name: "Salsa Roja", desc: "Roasted tomato & chile de árbol.", tag: "Medium" },
        { name: "Salsa Verde", desc: "Tomatillo, serrano & cilantro.", tag: "Mild" },
        { name: "Salsa Taquera", desc: "Our hottest salsa — ask the family about it.", tag: "Hot" },
        { name: "Guacamole", desc: "Mashed fresh each event." },
        { name: "Toppings Bar", desc: "Onion, cilantro, limes, radishes, pickled jalapeños." },
      ],
    },
    {
      category: "Drinks & Dessert",
      items: [
        { name: "Horchata", desc: "Rice & cinnamon, made the night before." },
        { name: "Jamaica", desc: "Hibiscus agua fresca." },
        { name: "Agua de Piña", desc: "Fresh pineapple agua fresca." },
        { name: "Churros", desc: "Cinnamon sugar with chocolate dipping sauce." },
      ],
    },
  ],

  /* ---------- FAQ ---------- */
  faq: [
    { q: "How far in advance should I book?",
      a: "Most weekends book 4–8 weeks out, especially May through October. We need at least one week's notice for any event." },
    { q: "How does payment work?",
      a: "A 30% deposit holds your date. The remaining balance is due 3 days before your event. We accept card, Venmo, Zelle and Cash App." },
    { q: "Is everything really homemade?",
      a: "Yes. Our salsas, rice, beans, meats, and aguas frescas are made from scratch by our family using our own recipes." },
    { q: "What's included with setup?",
      a: "Depending on your package: tables, serving equipment, plates, napkins, utensils, on-site cooking, and full cleanup when the party's over." },
    { q: "Can you handle dietary needs?",
      a: "We offer a vegetarian option, and our corn tortillas are naturally gluten-free. Tell us about allergies when you book." },
    { q: "What if I have more than 100 guests?",
      a: "We cater big events too. Send a request with your guest count and we'll put together a custom quote." },
    { q: "Do you travel?",
      a: "We're based in Fontana and serve the Inland Empire at no extra charge. Events farther out may include a travel fee." },
  ],
};
