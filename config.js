/* ============================================================
   VASQUEZ TACOS — SITE SETTINGS
   Edit this file to update the website. No other files need
   to change for everyday updates (menu, prices, meal deals,
   booked dates, payment links, contact info).
   ============================================================ */

const SITE = {
  business: {
    name: "Vasquez Tacos",
    tagline: "Homemade Mexican Taco Catering",
    phone: "(909) 900-5672",
    email: "",                         // TODO: add email, e.g. "hello@vasqueztacos.com"
    city: "Fontana, California",
    website: "",                       // your live site URL once it's published
    serviceArea: "Fontana & the Inland Empire",
    hours: "Events 7 days a week · Calls & texts 9am–8pm",
    pickup: "Call, text or message us on Facebook to order. Delivery available for 5+ orders. Please order the day before for party trays.",
    googleReviews: "",                 // link from your Google Business Profile
    yelp: "",                          // link to your Yelp page
    /* Only list what you actually have. Each shows as a badge
       near the top of the site. Examples:
       "Licensed & Insured", "San Bernardino County Health Permit",
       "ServSafe Certified"                                          */
    credentials: [],
  },

  /* ---------- SOCIAL MEDIA ----------
     Type just the handle (no @). Leave "" for ones you don't use.
     Each one shows a Follow button on the site.                     */
  social: {
    instagram: "vasquez_tacos",
    tiktok: "",           // e.g. "vasqueztacos"
    facebook: "",         // page name from facebook.com/____
    youtube: "",          // e.g. "vasqueztacos"
  },

  /* ---------- SOCIAL CLIPS ----------
     Paste links to your best posts, reels or videos. They show as
     playable previews in the "Follow along" section. Works with:
       Instagram posts/reels:  https://www.instagram.com/reel/ABC123/
       TikTok videos:          https://www.tiktok.com/@vasqueztacos/video/1234567890
       YouTube videos/shorts:  https://youtube.com/shorts/abc123
       Facebook videos/reels:  https://www.facebook.com/reel/1234567890
     The section stays hidden until you add a handle or a clip.       */
  socialClips: [],

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

  /* ---------- EVENT CATERING PACKAGES (price per guest) ----------
     Premium positioning: priced at the top of the Inland Empire
     market (big chains run $12–$19/guest; full-service $20–$35).
     minGuests: smaller parties pay the minimum.
     Events over customQuoteOver guests get a custom quote.         */
  customQuoteOver: 250,
  packages: [
    {
      id: "dropoff",
      name: "Taco Bar Buffet",
      perGuest: 13.99,
      minGuests: 25,
      blurb: "Grilled fresh at your event, served buffet-style. Great for offices and small parties.",
      includes: [
        "2 meats, grilled on-site on our flat-top",
        "Mexican rice & refried beans",
        "Warm corn tortillas",
        "Salsa roja, salsa verde, onion, cilantro & limes",
        "Chafing dishes & full buffet setup",
        "Plates, napkins & utensils",
        "Self-serve buffet, kept hot the whole time",
      ],
    },
    {
      id: "clasico",
      name: "Clásico Taquero",
      perGuest: 17.99,
      minGuests: 30,
      blurb: "A taquero at your party, grilling every taco fresh on our professional flat-top.",
      includes: [
        "3 meats: asada, pastor, chicken or chorizo",
        "Mexican rice & refried beans",
        "Warm corn tortillas off the flat-top",
        "House salsas, onion, cilantro & limes",
        "Tortilla chips & salsa",
        "Plates, napkins & utensils",
        "2.5 hours of serving",
      ],
    },
    {
      id: "fiesta",
      name: "Fiesta",
      perGuest: 22.99,
      minGuests: 40,
      popular: true,
      blurb: "Our most booked package: tacos, burritos, sodas and a full setup.",
      includes: [
        "All 4 meats: asada, pastor, chicken & chorizo",
        "Tacos + made-to-order burritos",
        "Rice, beans, chips & salsa",
        "Full salsa & toppings bar",
        "Sodas: Coke, Coke Zero & Sprite",
        "Serving tables, décor & full cleanup",
        "3 hours of serving",
      ],
    },
    {
      id: "lacasa",
      name: "La Casa Premium",
      perGuest: 32.99,
      minGuests: 60,
      blurb: "Our showpiece for weddings and quinceañeras. Nothing held back.",
      includes: [
        "Everything in Fiesta, with extra-large portions",
        "2 taqueros for fast lines",
        "A server + a dedicated event lead",
        "Styled buffet with linens & décor",
        "Unlimited sodas for the whole event",
        "4 hours of serving & full cleanup",
      ],
    },
  ],

  /* ---------- ADD-ONS (for event quotes) ---------- */
  addons: [
    { id: "burritos", name: "Add burritos to any package",  price: 4,   per: "guest" },
    { id: "chips",    name: "Tortilla chips & salsa",        price: 3,   per: "guest" },
    { id: "sodas",    name: "Sodas (Coke, Coke Zero, Sprite)", price: 2.5, per: "guest" },
    { id: "hour",     name: "Extra hour of serving",         price: 195, per: "event" },
    { id: "taquero",  name: "Extra taquero (faster lines)",  price: 225, per: "event" },
  ],

  /* ---------- COMING SOON ----------
     Items you plan to add. They show in a "Coming soon" section.
     When one is ready, move it into the menu above.               */
  comingSoon: [
    ["Holiday menu", "Tamales, pozole, menudo & champurrado"],
    ["Aguas frescas", "Horchata, jamaica & piña"],
    ["Quesabirria", "With consommé for dipping"],
    ["Al pastor trompo", "Carved live at your event"],
    ["Elote", "Street corn with crema & cotija"],
    ["Churros", "With chocolate dipping sauce"],
  ],

  /* ---------- MEAL DEALS (pickup & orders) ----------
     day: 0=Sun … 6=Sat for a weekly deal (highlighted on its day),
     or leave day out for a deal that's available every day.        */
  specials: [
    {
      day: 4, name: "Taco Thursday", video: "media/taco-plate-to-go.mp4",
      deal: "Fresh, hot taco plates",
      items: [
        ["3 tacos (asada, pastor or chicken)", ""],
        ["Rice, beans, chips & salsa", ""],
        ["Taco plate", "$13.99"],
        ["Add a drink", "+$2.50"],
        ["Extra tacos", "$3 each"],
      ],
    },
    {
      name: "Burrito Special", label: "Weekly special", img: "images/burrito.jpg",
      deal: "$12 with chips, salsa & a drink",
      items: [
        ["Asada or chicken burrito", ""],
        ["Rice, beans, cilantro, onions & cheese", ""],
        ["Chips & salsa + Coke, Coke Zero or Sprite", ""],
        ["Burrito special", "$12"],
      ],
    },
    {
      day: 5, name: "Family Taco Night", video: "media/chicken-taco-plate.mp4",
      deal: "Feeds 4 for $42",
      items: [
        ["16 tacos, 2 meats of your choice", ""],
        ["Rice, beans, chips & salsa", ""],
        ["4 sodas", ""],
        ["Family meal", "$42"],
      ],
    },
    {
      name: "Party Trays & Boxed Meals", label: "Every day · order a day ahead", img: "images/boxed-meals.jpg",
      deal: "Offices, teams & game day",
      items: [
        ["Boxed taco plates (10+ orders)", "$13.99 each"],
        ["50 tacos, 2 meats + salsas & toppings", "$115"],
        ["100 tacos, 3 meats + salsas & toppings", "$215"],
        ["Rice & beans tray (serves 20)", "$50"],
      ],
    },
  ],
  /* ---------- HOLIDAY MENU ----------
     The only place tamales, pozole and menudo appear.
     Set showHoliday to false to hide it outside the season.       */
  showHoliday: false,   // coming soon: set to true when the holiday menu launches
  holiday: {
    title: "Holiday Menu",
    note: "For holiday parties and pre-orders. Christmas Eve and New Year's Eve orders close December 20.",
    items: [
      ["Tamales by the dozen (pork rojo, chicken verde, rajas, sweet)", "$38 / dozen"],
      ["Tamalada tray: 4 dozen, mix & match", "$140"],
      ["Pozole rojo party pot (serves 10–12)", "$90"],
      ["Menudo party pot (serves 10–12)", "$95"],
      ["Champurrado (hot chocolate-masa drink), gallon", "$30"],
      ["Buñuelos with piloncillo syrup, dozen", "$20"],
      ["Fiesta Navideña catering: tacos, tamales, pozole, rice, beans & champurrado", "$27.99 / guest"],
    ],
  },

  /* ---------- GALLERY ----------
     Hidden until photos are added. Put your photos in the "images"
     folder and list them like:
     { img: "images/party-1.jpg", caption: "Backyard birthday", wide: true }
     wide = big 2x2 tile, long = 2 columns wide.                      */
  gallery: [
    { img: "images/wedding-setup.jpg", caption: "Wedding taco bar", wide: true },
    { img: "images/salsa-bar.jpg", caption: "Salsa bar & toppings" },
    { img: "images/chafing-trays.jpg", caption: "Party setup" },
    { img: "images/salsa-prep.jpg", caption: "Salsa prep" },
    { img: "images/taco-plate.jpg", caption: "Taco plate" },
    { img: "images/boxed-meals.jpg", caption: "Boxed meals for a big order", long: true },
    { img: "images/taco-thursday.jpg", caption: "Taco Thursday plate" },
    { img: "images/burrito.jpg", caption: "Burrito special" },
  ],

  /* ---------- YOUR PHOTOS & VIDEOS ----------
     Upload photos (.jpg .png .webp) and videos (.mp4 .mov .webm) to the
     "media" folder of the GitHub repo. They appear in the gallery
     automatically, newest file name first. No code changes needed.   */
  media: {
    repo: "mariobejarano14mb-creator/VasquezTacos",
    folder: "media",
    branch: "main",
  },

  /* ---------- FLAT-TOP VIDEOS ----------
     Short muted clips that loop in the "Cooked fresh" section.
     Put the .mp4 (and a .jpg preview with the same name) in media/. */
  heroVideo: "media/flat-top-sizzle.mp4",   // plays in the video card at the top of the page
  whyVideo: "media/flat-top-grilling.mp4",   // "Why choose us" section
  eventsVideo: "",   // optional clip behind the Birthdays event card

  /* ---------- REAL CUSTOMER POSTS ----------
     Customer stories that tagged @vasquez_tacos. Shown under Reviews.  */
  customerPosts: [
    { video: "media/customer-lunch-date.mp4", quote: "So bomb!! Lunch date with my bestie.", source: "Customer story on Instagram" },
    { video: "media/customer-taco-plate.mp4", quote: "Yummy 😋", source: "Customer story on Instagram" },
  ],

  /* ---------- THE VASQUEZ PROMISE ---------- */
  promise: [
    ["Cooked at your event", "Every taco is grilled fresh on our professional flat-top, right in front of your guests."],
    ["Here early, set up right", "We arrive ahead of serving time so food is hot and ready when your guests are."],
    ["Your price, upfront", "Your estimate shows before you book. No surprise fees on the day of your party."],
    ["We leave it clean", "When the party's over, we pack up and clean our area so you don't have to."],
  ],
  flatTopVideos: ["media/flat-top-at-the-event.mp4", "media/flat-top-al-pastor.mp4", "media/flat-top-pastor-for-a-crowd.mp4"],

  /* ---------- MENU ----------
     Optional: add img: "images/your-photo.jpg" to any item. */
  menu: [
    {
      category: "Tacos",
      items: [
        { name: "Carne Asada", desc: "Marinated steak, seared on the flat-top and chopped to order." },
        { name: "Al Pastor", desc: "Chile-marinated pork, our family recipe." },
        { name: "Chicken", desc: "Seasoned chicken, grilled on the flat-top, juicy and full of flavor." },
        { name: "Chorizo", desc: "Spicy Mexican pork chorizo, cooked on the flat-top until crispy." },
      ],
    },
    {
      category: "Burritos",
      items: [
        { name: "Asada Burrito", desc: "Asada, rice, beans, cilantro, onions & cheese in a warm flour tortilla." },
        { name: "Chicken Burrito", desc: "Chicken, rice, beans, cilantro, onions & cheese in a warm flour tortilla." },
      ],
    },
    {
      category: "Sides",
      items: [
        { name: "Rice & Beans", desc: "Mexican rice and refried beans, made from scratch." },
        { name: "Tortilla Chips & Salsa", desc: "Crispy tortilla chips with our house salsa roja and verde." },
      ],
    },
    {
      category: "Drinks",
      items: [
        { name: "Sodas", desc: "Coke, Coke Zero & Sprite." },
      ],
    },
  ],
  /* ---------- MERCH (merch.html) ----------
     type:   tee, longsleeve, crewneck, hoodie, snapback, dadhat, beanie,
             apron, cooler, opener, tote, keychain, sticker
     design: logo, taco-thursday, best-in-town, script, varsity,
             chest (small logo), monogram (caps), crew, vasquez,
             name-number (VASQUEZ 909 jersey back)
     back:   optional design for the back (adds a Front/Back toggle)
     colors: [name, hex] pairs. The first one shows by default.
     badge:  optional tag like "New" or "Best seller".               */
  merchNote: "Fontana blue gear for the Vasquez Tacos crew and fans. Order by text, pick up at any event or meal-deal pickup.",
  merch: [
    { name: "Vasquez Script Jersey", type: "jersey", design: "jersey-front", back: "name-number", price: 79.95, badge: "New",
      colors: [["White", "#f7f7f5"], ["Fontana Blue", "#005a9c"], ["Road Gray", "#a7aaad"]] },
    { name: "VT Fitted Cap", type: "snapback", design: "monogram", sidePatch: true, sticker: "7⅜", price: 39.95, badge: "Best seller",
      colors: [["Fontana Blue", "#005a9c"], ["White", "#f4f4f2"], ["Black", "#1f1f22"]] },
    { name: "Vasquez Script Tee", type: "tee", design: "script-vasquez", back: "name-number", price: 34.95, badge: "New",
      colors: [["Fontana Blue", "#005a9c"], ["White", "#f7f7f5"], ["Heather Gray", "#b9b8b6"]] },
    { name: "Fontana Badge Tee", type: "tee", design: "badge", price: 32.95,
      colors: [["White", "#f7f7f5"], ["Fontana Blue", "#005a9c"], ["Cream", "#efe8da"]] },
    { name: "909 Varsity Tee", type: "tee", design: "varsity", price: 32.95,
      colors: [["Heather Gray", "#b9b8b6"], ["Fontana Blue", "#005a9c"], ["White", "#f7f7f5"]] },
    { name: "Taco Thursday Tee", type: "tee", design: "taco-thursday", price: 29.95,
      colors: [["White", "#f7f7f5"], ["Fontana Blue", "#005a9c"], ["Heather Gray", "#b9b8b6"]] },
    { name: "Original Logo Tee", type: "tee", design: "logo", back: "badge", price: 29.95,
      colors: [["Black", "#1f1f22"], ["White", "#f7f7f5"], ["Fontana Blue", "#005a9c"]] },
    { name: "VT Long Sleeve", type: "longsleeve", design: "chest-vt", back: "badge", price: 44.95,
      colors: [["White", "#f7f7f5"], ["Fontana Blue", "#005a9c"], ["Navy", "#1c2d45"]] },
    { name: "Fontana Badge Crewneck", type: "crewneck", design: "badge", price: 49.95, badge: "New",
      colors: [["Heather Gray", "#b9b8b6"], ["Fontana Blue", "#005a9c"], ["Cream", "#efe8da"]] },
    { name: "Vasquez Script Hoodie", type: "hoodie", design: "script-vasquez", back: "name-number", price: 59.95, badge: "Best seller",
      colors: [["Fontana Blue", "#005a9c"], ["Heather Gray", "#b9b8b6"], ["Navy", "#1c2d45"]] },
    { name: "Script Dad Hat", type: "dadhat", design: "script", price: 29.95,
      colors: [["White", "#f4f4f2"], ["Fontana Blue", "#005a9c"], ["Stone", "#cfc6b4"]] },
    { name: "Taco Snapback", type: "snapback", design: "taco", price: 34.95,
      colors: [["Fontana Blue", "#005a9c"], ["Black", "#1f1f22"], ["White", "#f4f4f2"]] },
    { name: "Leather Patch Beanie", type: "beanie", design: "monogram", price: 29.95,
      colors: [["Fontana Blue", "#005a9c"], ["Heather Gray", "#9e9d9b"], ["Navy", "#1c2d45"]] },
    { name: "Backyard Taquero Apron", type: "apron", design: "badge", price: 39.95,
      colors: [["Fontana Blue", "#005a9c"], ["Denim", "#3b5068"], ["Black", "#1f1f22"]] },
    { name: "Badge Can Cooler", type: "cooler", design: "badge", price: 12.95,
      colors: [["Fontana Blue", "#005a9c"], ["White", "#f4f4f2"], ["Black", "#1f1f22"]] },
    { name: "Bottle Opener Keychain", type: "opener", design: "badge", price: 12.95,
      colors: [["Steel", "#c9ccd1"], ["Blue anodized", "#2d6fa6"], ["Black", "#2a2a2c"]] },
    { name: "Canvas Tote", type: "tote", design: "badge", price: 24.95,
      colors: [["Natural", "#e6dcc6"], ["Fontana Blue", "#005a9c"]] },
    { name: "Badge Keychain", type: "keychain", design: "badge", price: 8.95,
      colors: [["Silver ring", "#c9ccd1"], ["Gold ring", "#c8a24a"]] },
    { name: "Sticker Pack (4)", type: "sticker", design: "badge", price: 6.95,
      colors: [["Full color", "#ffffff"]] },
  ],  /* Crew uniforms: not for sale. Specs are for ordering from a print shop. */
  crew: [
    { name: "Crew Tee", type: "tee", design: "chest-vt", back: "crew", colors: [["Fontana Blue", "#005a9c"]],
      spec: "Fontana Blue heavyweight tee. Front: 3.5\" white VT on left chest. Back: 11\" \"VASQUEZ TACOS · CREW\" in white with red." },
    { name: "Crew Hoodie", type: "hoodie", design: "chest-vt", back: "crew", colors: [["Navy", "#1c2d45"]],
      spec: "Navy pullover for night events. Front: left-chest VT. Back: \"CREW\" print in white with red." },
    { name: "Taquero Apron", type: "apron", design: "badge", colors: [["Black", "#1f1f22"]],
      spec: "Black twill bib apron with 2 pockets. Front: 6\" Fontana badge in white. Heavy-duty, machine washable." },
    { name: "Crew Fitted Cap", type: "snapback", design: "monogram", sidePatch: true, colors: [["Fontana Blue", "#005a9c"]],
      spec: "Fontana Blue structured cap. Front: 3D-embroidered white VT. Side: taco patch." },
  ],
  /* ---------- POLICIES (shown on the site) ---------- */
  policies: [
    ["Deposit", "A 30% deposit holds your date. The balance is due 3 days before your event."],
    ["Guest count", "Final guest count is due 7 days before your event. You can add guests after that if we have food available."],
    ["Travel", "Free within 25 miles of Fontana. Farther events are $1.50 per mile each way."],
    ["Changes & cancellations", "Cancel 30+ days out for a full refund. Inside 30 days, your deposit can move to a new date within 6 months."],
    ["Setup space", "We need a flat 10×10 ft area near your party. For outdoor events we bring a canopy."],
    ["Tax & tips", "Prices don't include California sales tax. Tips for our crew are appreciated, never required."],
  ],

  /* ---------- FAQ ---------- */
  faq: [
    { q: "How much food do I get?",
      a: "Plan on 3–4 tacos per adult plus rice and beans. Our taqueros keep serving for the whole service window, so nobody goes hungry." },
    { q: "How far in advance should I book?",
      a: "Most weekends book 4–8 weeks out, especially May through October. We need at least one week's notice for any event." },
    { q: "Is there a minimum?",
      a: "Drop-off starts at 25 guests, Clásico Taquero at 30, Fiesta at 40 and La Casa Premium at 60. Smaller parties are welcome and pay the minimum." },
    { q: "Is everything really homemade?",
      a: "Yes. Our salsas, rice, beans and meats are made from scratch by our family using our own recipes." },
    { q: "Do you cater holiday parties?",
      a: "Yes. We cater office and family holiday parties with our full taco setup. A holiday menu with tamales and pozole is coming soon. Book early, since December fills up fast." },
    { q: "Can you handle dietary needs?",
      a: "Our corn tortillas are naturally gluten-free. Tell us about any allergies when you book and we'll work with you." },
    { q: "What if I have more than 250 guests?",
      a: "We cater big events too. Send a request with your guest count and we'll put together a custom quote." },
  ],

  /* ---------- PHOTO CREDITS ----------
     Only needed for photos you didn't take yourself.
     Format: ["What", "Photographer", "License", "Link"]             */
  credits: [],
};
