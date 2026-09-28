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
    pickup: "Call or text to order meal deals for pickup. Please order the day before for party trays.",
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
      name: "Taco Bar Drop-Off",
      perGuest: 13.99,
      minGuests: 25,
      blurb: "Hot, homemade and set up for you. Great for offices and small parties.",
      includes: [
        "2 taco meats, delivered hot",
        "Mexican rice & refried beans",
        "Corn tortillas, kept warm",
        "Salsa roja, salsa verde & toppings",
        "Chafing dishes & full buffet setup",
        "Plates, napkins & utensils",
        "Delivered & set up 30 min before serving",
      ],
    },
    {
      id: "clasico",
      name: "Clásico Taquero",
      perGuest: 17.99,
      minGuests: 30,
      blurb: "A taquero at your party, cooking every taco to order.",
      includes: [
        "3 taco meats, cooked on-site by our taquero",
        "Mexican rice & refried beans",
        "Handmade corn tortillas off the comal",
        "3 house salsas + fresh guacamole",
        "Onion, cilantro, limes, radishes & grilled onions",
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
      blurb: "Our most booked package: the full taquería experience at your event.",
      includes: [
        "4 taco meats, including al pastor",
        "Rice, beans & elote (street corn)",
        "Handmade corn & flour tortillas",
        "Full salsa bar + fresh guacamole",
        "2 aguas frescas in glass vitroleros",
        "Chips & salsa while guests arrive",
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
        "5 meats, with al pastor carved off a live trompo",
        "Quesabirria & consommé station",
        "Rice, beans, elote & nopales salad",
        "Handmade tortillas pressed to order",
        "Premium salsa bar + guacamole",
        "3 aguas frescas + churro station",
        "2 taqueros, a server & a dedicated event lead",
        "Custom décor, 4 hours of serving & full cleanup",
      ],
    },
  ],

  /* ---------- ADD-ONS (for event quotes) ---------- */
  addons: [
    { id: "trompo",   name: "Live al pastor trompo, carved on-site", price: 350, per: "event" },
    { id: "birria",   name: "Quesabirria & consommé station",       price: 6,   per: "guest" },
    { id: "churros",  name: "Churro station with dipping sauces",   price: 5,   per: "guest" },
    { id: "elote",    name: "Elote cart (street corn)",             price: 5,   per: "guest" },
    { id: "aguas",    name: "Aguas frescas bar (3 flavors)",        price: 4,   per: "guest" },
    { id: "chips",    name: "Chips, salsa & queso",                 price: 4,   per: "guest" },
    { id: "hour",     name: "Extra hour of serving",                price: 195, per: "event" },
    { id: "taquero",  name: "Extra taquero (faster lines)",         price: 225, per: "event" },
  ],

  /* ---------- MEAL DEALS (pickup & orders) ----------
     day: 0=Sun … 6=Sat for a weekly deal (highlighted on its day),
     or leave day out for a deal that's available every day.        */
  specials: [
    {
      day: 2, name: "Taco Tuesday", img: "images/street-tacos.jpg",
      deal: "$2 street tacos",
      items: [
        ["Street tacos (asada, pastor, pollo)", "$2 each"],
        ["10 tacos + chips & salsa", "$22"],
        ["Party tray: 30 tacos", "$60"],
      ],
    },
    {
      day: 5, name: "Family Taco Night", img: "images/carnitas.jpg",
      deal: "Feeds 4 for $42",
      items: [
        ["16 tacos, 2 meats of your choice", ""],
        ["Rice, beans, chips & salsa", ""],
        ["1 large agua fresca", ""],
        ["Family meal", "$42"],
      ],
    },
    {
      name: "Taco Plates", label: "Every day", img: "images/barbacoa.jpg",
      deal: "Plates from $13.99",
      items: [
        ["3 tacos + rice & beans", "$13.99"],
        ["Add an agua fresca", "+$3.50"],
        ["Quesabirria tacos (3), with consommé", "$16.99"],
      ],
    },
    {
      name: "Party Trays", label: "Every day · order a day ahead", img: "images/taquero.jpg",
      deal: "Perfect for game day",
      items: [
        ["50 tacos, 2 meats + salsas & toppings", "$115"],
        ["100 tacos, 3 meats + salsas & toppings", "$215"],
        ["Rice & beans tray (serves 20)", "$50"],
      ],
    },
  ],

  /* ---------- HOLIDAY MENU ----------
     The only place tamales, pozole and menudo appear.
     Set showHoliday to false to hide it outside the season.       */
  showHoliday: true,
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
     { img: "images/party-1.jpg", caption: "Backyard birthday", wide: true } */
  gallery: [],

  /* ---------- MENU ----------
     Optional: add img: "images/your-photo.jpg" to any item. */
  menu: [
    {
      category: "Taco Meats",
      items: [
        { name: "Carne Asada", desc: "Marinated flank steak, grilled over open flame.", img: "images/carne-asada.jpg" },
        { name: "Al Pastor", desc: "Chile-marinated pork with pineapple, family recipe.", img: "images/al-pastor.jpg" },
        { name: "Pollo Asado", desc: "Citrus & achiote chicken, grilled and chopped." },
        { name: "Carnitas", desc: "Slow-cooked pork, crispy on the edges.", img: "images/carnitas.jpg" },
        { name: "Barbacoa", desc: "Beef braised for hours in chiles and spices.", img: "images/barbacoa.jpg" },
        { name: "Veggie", desc: "Grilled peppers, onions, calabacitas & beans.", tag: "Vegetarian" },
      ],
    },
    {
      category: "Sides",
      items: [
        { name: "Mexican Rice", desc: "Tomato-simmered rice made from scratch." },
        { name: "Refried Beans", desc: "Pinto beans cooked daily, finished with queso fresco." },
        { name: "Elote", desc: "Street corn with crema, cotija & chile.", img: "images/elote.jpg" },
        { name: "Chips & Salsa", desc: "Fresh-fried tortilla chips with house salsa." },
      ],
    },
    {
      category: "Salsas",
      items: [
        { name: "Salsa Roja", desc: "Roasted tomato & chile de árbol.", tag: "Medium", img: "images/salsa-molcajete.jpg" },
        { name: "Salsa Verde", desc: "Tomatillo, serrano & cilantro.", tag: "Mild" },
        { name: "Salsa Taquera", desc: "Our hottest salsa. Ask the family about it.", tag: "Hot" },
        { name: "Guacamole", desc: "Mashed fresh at every event." },
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

  /* ---------- MERCH (merch.html) ----------
     type: tee, hoodie, hat, tote, apron, sticker
     color: garment color. print: "logo" (big front), "chest" (small
     left-chest logo), or any text to print, e.g. "TACO TUESDAY".
     back: optional text printed on the back (shown as a 2nd view).  */
  merchNote: "Call or text to order. Pick up at any Vasquez Tacos event or meal-deal pickup. Sizes S–3XL.",
  merch: [
    { name: "Classic Logo Tee", type: "tee", color: "#1c1210", print: "logo", price: 32, colors: "Black, Cream, Red" },
    { name: "Taco Tuesday Tee", type: "tee", color: "#f6bd2f", print: "TACO TUESDAY", price: 32, colors: "Gold, Black" },
    { name: "Logo Hoodie", type: "hoodie", color: "#7a1d16", print: "logo", price: 60, colors: "Maroon, Black" },
    { name: "Snapback Hat", type: "hat", color: "#1c1210", print: "logo", price: 36, colors: "Black, Red" },
    { name: "Dad Hat", type: "hat", color: "#efe3cf", print: "logo", price: 32, colors: "Cream, Tan" },
    { name: "Tote Bag", type: "tote", color: "#efe3cf", print: "logo", price: 24, colors: "Natural canvas" },
    { name: "Backyard Taquero Apron", type: "apron", color: "#d8342a", print: "logo", price: 42, colors: "Red, Black" },
    { name: "Sticker Pack (3)", type: "sticker", color: "#ffffff", print: "logo", price: 7, colors: "Logo, Taco Tuesday, Salsa Taquera" },
  ],
  /* Crew uniforms: not for sale. Specs are for ordering from a print shop. */
  crew: [
    { name: "Crew Tee", type: "tee", color: "#1c1210", print: "chest", back: "CREW", spec: "Black tee. Front: 3.5\" left-chest logo. Back: 11\" \"VASQUEZ TACOS · CREW\" in gold." },
    { name: "Taquero Apron", type: "apron", color: "#1c1210", print: "logo", spec: "Black twill bib apron with 2 pockets. Front: 6\" logo. Heavy-duty, machine washable." },
    { name: "Crew Snapback", type: "hat", color: "#d8342a", print: "logo", spec: "Red structured snapback. Front: 2.5\" embroidered logo." },
    { name: "Crew Hoodie", type: "hoodie", color: "#1c1210", print: "chest", back: "CREW", spec: "Black pullover for night events. Front: left-chest logo. Back: \"CREW\" in gold." },
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
      a: "Yes. Our salsas, rice, beans, meats and aguas frescas are made from scratch by our family using our own recipes." },
    { q: "Do you cater holiday parties?",
      a: "Yes. For holiday events we add our holiday menu with tamales, pozole, menudo and champurrado. Book early, since December fills up fast." },
    { q: "Can you handle dietary needs?",
      a: "We offer vegetarian options, and our corn tortillas are naturally gluten-free. Tell us about allergies when you book." },
    { q: "What if I have more than 250 guests?",
      a: "We cater big events too. Send a request with your guest count and we'll put together a custom quote." },
  ],

  /* ---------- PHOTO CREDITS ----------
     Only needed for photos you didn't take yourself.
     Format: ["What", "Photographer", "License", "Link"]             */
  credits: [
    ["Al pastor tacos (hero)", "City Foodsters", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:(El_Flaco)_Al_Pastor_Tacos.jpg"],
    ["Trompo", "ProtoplasmaKid", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Trompo_de_tacos_al_pastor.jpg"],
    ["Al pastor close-up", "Koffermejia", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Trompo_de_pastor,_detalle_-_festival_del_taco_en_xalapa_2023.jpg"],
    ["Street tacos", "LWYang", "CC BY 2.0", "https://commons.wikimedia.org/wiki/File:Street_tacos_in_Mexico_City_(8495923877).jpg"],
    ["Carne asada", "Sarah Stierch", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:Carne_Asada_-_Taqueria_La_Hacienda_-_December_2022_-_Sarah_Stierch_01.jpg"],
    ["Carnitas", "Ferfive", "CC BY 4.0", "https://commons.wikimedia.org/wiki/File:CAZO_DE_CARNITAS.jpg"],
    ["Barbacoa tacos", "Jj saezdeo", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Barbacoa_tacos_from_Actopan_in_Mexico_City.jpg"],
    ["Taquero", "Daniel Case", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Man_making_tacos_on_the_street_in_Mexico_City.jpg"],
    ["Elote", "ProtoplasmaKid", "CC BY-SA 3.0", "https://commons.wikimedia.org/wiki/File:Elote_as%C3%A1ndose.jpg"],
    ["Salsa in molcajete", "ProtoplasmaKid", "CC BY-SA 4.0", "https://commons.wikimedia.org/wiki/File:Molcajete_con_salsa_roja_mexicana_-_1.jpg"],
    ["Tortillas on the comal", "Artemisa Martínez", "CC0", "https://commons.wikimedia.org/wiki/File:Tortillas_en_comal.jpg"],
    ["Tamales", "Public domain", "Public domain", "https://commons.wikimedia.org/wiki/File:Tamales_mexicanos_navidad2004.jpg"],
  ],
};
