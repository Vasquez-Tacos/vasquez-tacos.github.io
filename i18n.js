/* Vasquez Tacos — English / Español.
   The site is written in English; in Spanish mode every visible string is
   swapped using the dictionary below, including text the page adds later
   (calendar, quote estimate, messages). To add a translation, add a line:
   "English text": "Texto en español",                                   */
(() => {
  const ES = {
    // Navigation & common
    "Catering": "Catering", "Meal Deals": "Ofertas", "Events": "Eventos", "Menu": "Menú",
    "Availability": "Disponibilidad", "Merch": "Mercancía", "FAQ": "Preguntas", "Contact": "Contacto",
    "Get a Quote": "Cotiza", "Get a Free Quote": "Cotización gratis", "See Meal Deals": "Ver ofertas",
    "Book Now": "Reserva ya", "Call": "Llamar", "Text": "Mensaje", "Text us": "Mándanos mensaje",
    "Order": "Pedir", "Soon": "Pronto", "Today": "Hoy", "Facebook": "Facebook", "Instagram": "Instagram",
    "Now booking holiday parties. December dates fill fast!": "Ya reservamos fiestas navideñas. ¡Las fechas de diciembre se llenan rápido!",
    "Check dates →": "Ver fechas →",

    // Hero
    "Family owned · Fontana, CA": "Negocio familiar · Fontana, CA",
    "Street tacos for your": "Tacos callejeros para tu",
    "next event.": "próximo evento.",
    "Asada, pastor, chicken and chorizo from our family's recipes, grilled fresh on a professional flat-top right at your event. Premium event catering from":
      "Asada, pastor, pollo y chorizo con las recetas de nuestra familia, a la plancha en tu evento. Catering premium desde",
    "per guest across the Inland Empire, plus weekly taco meal deals.": "por invitado en todo el Inland Empire, además de ofertas semanales de tacos.",
    "Homemade": "Casero", "Guests": "Invitados", "Deposit holds your date": "De depósito aparta tu fecha",
    "Bloopers!": "¡Bloopers!", "Live on the flat-top": "En vivo en la plancha",
    "Tap for sound": "Toca para sonido", "Sound on": "Sonido activado", "Tap to hear this": "Toca para escuchar",

    // Marquee
    "Carne Asada": "Carne Asada", "Al Pastor": "Al Pastor", "Chicken": "Pollo", "Chorizo": "Chorizo",
    "Burritos": "Burritos", "Taco Thursday": "Jueves de Tacos", "Burrito Special": "Especial de Burrito",
    "Chips & Salsa": "Totopos y salsa", "Taco Catering": "Catering de tacos",

    // Packages
    "Catering packages": "Paquetes de catering",
    "Premium taco catering, priced per guest.": "Catering de tacos premium, precio por invitado.",
    "From hot drop-off taco bars to a full taquero setup at your wedding. Setup, serving and cleanup are handled by our family, with no hidden fees.":
      "Desde barras de tacos hasta un taquero completo en tu boda. Nuestra familia se encarga del montaje, el servicio y la limpieza, sin cargos ocultos.",
    "Taco Bar Buffet": "Taco Bar Buffet", "Clásico Taquero": "Clásico Taquero", "Fiesta": "Fiesta", "La Casa Premium": "La Casa Premium",
    "Grilled fresh at your event, served buffet-style. Great for offices and small parties.": "Preparado en tu evento y servido tipo buffet. Ideal para oficinas y fiestas pequeñas.",
    "/ guest": "/ invitado",
    "2 meats, grilled on-site on our flat-top": "2 carnes, a la plancha en el lugar",
    "Mexican rice & refried beans": "Arroz mexicano y frijoles refritos",
    "Warm corn tortillas": "Tortillas de maíz calientitas",
    "Salsa roja, salsa verde, onion, cilantro & limes": "Salsa roja, salsa verde, cebolla, cilantro y limones",
    "Chafing dishes & full buffet setup": "Charolas térmicas y montaje completo de buffet",
    "Plates, napkins & utensils": "Platos, servilletas y cubiertos",
    "Self-serve buffet, kept hot the whole time": "Buffet de autoservicio, siempre caliente",
    "Choose Taco Bar Buffet": "Elegir Taco Bar Buffet",
    "A taquero at your party, grilling every taco fresh on our professional flat-top.": "Un taquero en tu fiesta, preparando cada taco al momento en nuestra plancha profesional.",
    "3 meats: asada, pastor, chicken or chorizo": "3 carnes: asada, pastor, pollo o chorizo",
    "Warm corn tortillas off the flat-top": "Tortillas de maíz recién salidas de la plancha",
    "House salsas, onion, cilantro & limes": "Salsas de la casa, cebolla, cilantro y limones",
    "Tortilla chips & salsa": "Totopos y salsa",
    "2.5 hours of serving": "2.5 horas de servicio",
    "Choose Clásico Taquero": "Elegir Clásico Taquero",
    "Most Popular": "Más popular",
    "Our most booked package: tacos, burritos, sodas and a full setup.": "Nuestro paquete más reservado: tacos, burritos, refrescos y montaje completo.",
    "All 4 meats: asada, pastor, chicken & chorizo": "Las 4 carnes: asada, pastor, pollo y chorizo",
    "Tacos + made-to-order burritos": "Tacos + burritos al momento",
    "Rice, beans, chips & salsa": "Arroz, frijoles, totopos y salsa",
    "Full salsa & toppings bar": "Barra completa de salsas y complementos",
    "Sodas: Coke, Coke Zero & Sprite": "Refrescos: Coca-Cola, Coca-Cola Zero y Sprite",
    "Serving tables, décor & full cleanup": "Mesas de servicio, decoración y limpieza completa",
    "3 hours of serving": "3 horas de servicio",
    "Choose Fiesta": "Elegir Fiesta",
    "Our showpiece for weddings and quinceañeras. Nothing held back.": "Nuestro paquete estrella para bodas y quinceañeras. Con todo.",
    "Everything in Fiesta, with extra-large portions": "Todo lo de Fiesta, con porciones extra grandes",
    "2 taqueros for fast lines": "2 taqueros para filas rápidas",
    "A server + a dedicated event lead": "Un mesero + un encargado de evento",
    "Styled buffet with linens & décor": "Buffet decorado con manteles",
    "Unlimited sodas for the whole event": "Refrescos ilimitados todo el evento",
    "4 hours of serving & full cleanup": "4 horas de servicio y limpieza completa",
    "Choose La Casa Premium": "Elegir La Casa Premium",
    "More than": "¿Más de", "guests or need something different?": "invitados o necesitas algo diferente?",
    "Request a custom quote.": "Pide una cotización personalizada.",

    // Planner
    "Party planner": "Planea tu fiesta", "How much food do you need?": "¿Cuánta comida necesitas?",
    "tacos (about 4 per guest)": "tacos (unos 4 por invitado)", "of meat grilled on-site": "de carne a la plancha en el lugar",
    "taquero(s) on the flat-top": "taquero(s) en la plancha", "Use this for my quote →": "Usar esto en mi cotización →",

    // Flat-top + events
    "Cooked at your event": "Cocinado en tu evento",
    "Grilled fresh on our professional flat-top.": "Recién hecho en nuestra plancha profesional.",
    "Nothing is cooked ahead and reheated. We set up our flat-top at your party and grill every order of asada, pastor, chicken and chorizo right in front of your guests.":
      "Nada se cocina antes ni se recalienta. Instalamos nuestra plancha en tu fiesta y preparamos cada orden de asada, pastor, pollo y chorizo frente a tus invitados.",
    "Events we cater": "Eventos que atendemos",
    "Every celebration is better with tacos.": "Toda celebración es mejor con tacos.",
    "From backyard birthdays to 200-guest weddings, we bring the flat-top, the taquero and everything homemade. You enjoy the party.":
      "Desde cumpleaños en el patio hasta bodas de 200 invitados, llevamos la plancha, el taquero y todo casero. Tú disfruta la fiesta.",
    "Weddings": "Bodas", "A late-night taco bar or the main meal. Guests always remember the tacos.": "Una taquiza de medianoche o la comida principal. Los invitados siempre recuerdan los tacos.",
    "Birthdays": "Cumpleaños", "Backyard parties of every size, from 25 guests up.": "Fiestas en el patio de todos los tamaños, desde 25 invitados.",
    "Quinceañeras": "Quinceañeras", "Full setup with multiple taqueros so every guest eats fast.": "Montaje completo con varios taqueros para que todos coman rápido.",
    "Graduations": "Graduaciones", "Open-house style service that keeps the tacos coming.": "Servicio continuo para que los tacos no paren.",
    "Corporate & Church": "Empresas e iglesias", "Team lunches, fundraisers and community events, with invoices on request.": "Comidas de equipo, recaudaciones y eventos comunitarios, con factura si la necesitas.",
    "Holiday Parties": "Fiestas navideñas", "Office parties and family get-togethers. Holiday menu coming soon.": "Posadas de oficina y reuniones familiares. Menú navideño muy pronto.",
    "Holiday events only": "Solo eventos navideños",

    // Meal deals
    "Meal deals": "Ofertas", "Tacos all week long.": "Tacos toda la semana.",
    "Call, text or message us on Facebook to order. Delivery available for 5+ orders. Please order the day before for party trays.":
      "Llama, manda mensaje o escríbenos en Facebook para pedir. Entrega a domicilio desde 5 órdenes. Pide las charolas con un día de anticipación.",
    "Every Thursday": "Cada jueves", "Fresh, hot taco plates": "Platos de tacos recién hechos",
    "3 tacos (asada, pastor or chicken)": "3 tacos (asada, pastor o pollo)", "Rice, beans, chips & salsa ": "Arroz, frijoles, totopos y salsa",
    "Taco plate": "Plato de tacos", "Add a drink": "Agrega una bebida", "Extra tacos": "Tacos extra", "$3 each": "$3 c/u",
    "Weekly special": "Especial de la semana", "$12 with chips, salsa & a drink": "$12 con totopos, salsa y bebida",
    "Asada or chicken burrito": "Burrito de asada o pollo", "Rice, beans, cilantro, onions & cheese": "Arroz, frijoles, cilantro, cebolla y queso",
    "Chips & salsa + Coke, Coke Zero or Sprite": "Totopos y salsa + Coca-Cola, Coca-Cola Zero o Sprite", "Burrito special": "Especial de burrito",
    "Every Friday": "Cada viernes", "Family Taco Night": "Noche Familiar de Tacos", "Feeds 4 for $42": "Para 4 personas por $42",
    "16 tacos, 2 meats of your choice": "16 tacos, 2 carnes a elegir", "4 sodas": "4 refrescos", "Family meal": "Comida familiar",
    "Every day · order a day ahead": "Todos los días · pide un día antes",
    "Party Trays & Boxed Meals": "Charolas y comidas en caja", "Offices, teams & game day": "Oficinas, equipos y días de partido",
    "Boxed taco plates (10+ orders)": "Platos de tacos en caja (10+ órdenes)", "$13.99 each": "$13.99 c/u",
    "50 tacos, 2 meats + salsas & toppings": "50 tacos, 2 carnes + salsas y complementos",
    "100 tacos, 3 meats + salsas & toppings": "100 tacos, 3 carnes + salsas y complementos",
    "Rice & beans tray (serves 20)": "Charola de arroz y frijoles (para 20)",

    // Why + about
    "At a real event": "En un evento real", "Why Vasquez Tacos": "Por qué Vasquez Tacos",
    "The difference is on the flat-top.": "La diferencia está en la plancha.",
    "Premium, never frozen": "Premium, nunca congelado",
    "Meats marinated overnight and salsas made fresh the morning of every event.": "Carnes marinadas toda la noche y salsas hechas la mañana de cada evento.",
    "Cooked fresh on-site": "Recién hecho en el lugar",
    "Everything is grilled on our professional flat-top right at your event, never from a tray that's been sitting.": "Todo se prepara en nuestra plancha profesional en tu evento, nunca de una charola que lleva horas.",
    "Full setup & cleanup": "Montaje y limpieza completos",
    "We bring the flat-top, tables, serving gear and plates, and leave your space clean.": "Llevamos la plancha, mesas, equipo de servicio y platos, y dejamos tu espacio limpio.",
    "Upfront pricing": "Precios claros",
    "See your full estimate instantly below. You talk to the family that cooks your food, not a call center.": "Ve tu cotización completa al instante. Hablas con la familia que cocina tu comida, no con un centro de llamadas.",
    "Our story": "Nuestra historia", "Meet the Vasquez family.": "Conoce a la familia Vasquez.",
    "Vasquez Tacos is a family business from Fontana, California, built on our own recipes for carne asada, al pastor, chicken and chorizo.":
      "Vasquez Tacos es un negocio familiar de Fontana, California, hecho con nuestras propias recetas de carne asada, al pastor, pollo y chorizo.",
    "We make our salsas, rice and beans from scratch and grill every taco fresh on our flat-top, right at your event. When you book with us, you work directly with the family, from the first text to the last plate.":
      "Hacemos nuestras salsas, arroz y frijoles desde cero y preparamos cada taco al momento en nuestra plancha, en tu evento. Cuando reservas con nosotros, tratas directamente con la familia, desde el primer mensaje hasta el último plato.",
    "And yes, Mr. Vasquez is a proud Dodgers fan. That's where our Fontana blue merch comes from.":
      "Y sí, el Sr. Vasquez es un orgulloso fan de los Dodgers. De ahí viene el azul de nuestra mercancía.",
    "— The Vasquez family": "— La familia Vasquez",
    "From the ballpark to your party.": "Del parque a tu fiesta.",
    "Vasquez Tacos started years ago at the park. While our kids were growing up playing sports, we made tacos for team fundraisers and charity events. Families kept coming back for more, people started asking around, and before long everyone wanted Vasquez Tacos at their parties.":
      "Vasquez Tacos empezó hace años en el parque. Mientras nuestros hijos crecían jugando deportes, hacíamos tacos para recaudar fondos para los equipos y para eventos de caridad. Las familias siempre regresaban por más, la gente empezó a preguntar por nosotros y pronto todos querían Vasquez Tacos en sus fiestas.",
    "Pearl is the backbone of Vasquez Tacos. She makes every batch of rice, beans and salsa from scratch and keeps everything running behind the scenes.":
      "Pearl es el corazón de Vasquez Tacos. Ella prepara desde cero todo el arroz, los frijoles y las salsas, y hace que todo funcione detrás de escena.",
    "Mr. Vasquez runs the flat-top and cooks every order of carne asada, al pastor, chicken and chorizo. He has faced some health challenges over the years, but he's doing great, still going strong and loving every event, with the same energy he brings to feeding his family.":
      "El Sr. Vasquez está en la plancha y cocina cada orden de carne asada, al pastor, pollo y chorizo. Ha enfrentado algunos retos de salud con los años, pero está muy bien, sigue con toda la fuerza y disfruta cada evento, con la misma energía con la que alimenta a su familia.",
    "And yes, he's a proud Dodgers fan. That's where our Fontana blue merch comes from.":
      "Y sí, es un orgulloso fan de los Dodgers. De ahí viene el azul de nuestra mercancía.",
    "— Pearl, Mr. Vasquez & family": "— Pearl, el Sr. Vasquez y familia",

    // Menu
    "Nuestro menú": "Nuestro menú", "Tacos, burritos & the classics.": "Tacos, burritos y los clásicos.",
    "Tacos": "Tacos", "Sides": "Acompañantes", "Drinks": "Bebidas",
    "Marinated steak, seared on the flat-top and chopped to order.": "Carne de res marinada, sellada en la plancha y picada al momento.",
    "Chile-marinated pork, our family recipe.": "Cerdo marinado en chile, receta de la familia.",
    "Seasoned chicken, grilled on the flat-top, juicy and full of flavor.": "Pollo sazonado a la plancha, jugoso y lleno de sabor.",
    "Spicy Mexican pork chorizo, cooked on the flat-top until crispy.": "Chorizo mexicano de cerdo, picosito y doradito en la plancha.",
    "Asada Burrito": "Burrito de asada", "Chicken Burrito": "Burrito de pollo",
    "Asada, rice, beans, cilantro, onions & cheese in a warm flour tortilla.": "Asada, arroz, frijoles, cilantro, cebolla y queso en tortilla de harina calientita.",
    "Chicken, rice, beans, cilantro, onions & cheese in a warm flour tortilla.": "Pollo, arroz, frijoles, cilantro, cebolla y queso en tortilla de harina calientita.",
    "Rice & Beans": "Arroz y frijoles", "Mexican rice and refried beans, made from scratch.": "Arroz mexicano y frijoles refritos, hechos desde cero.",
    "Tortilla Chips & Salsa": "Totopos y salsa", "Crispy tortilla chips with our house salsa roja and verde.": "Totopos crujientes con nuestra salsa roja y verde de la casa.",
    "Sodas": "Refrescos", "Coke, Coke Zero & Sprite.": "Coca-Cola, Coca-Cola Zero y Sprite.",
    "Coming soon": "Muy pronto", "New on the menu": "Nuevo en el menú",
    "We're working on these next. Want one at your event? Mention it when you book.": "Estamos preparando estos platillos. ¿Quieres alguno en tu evento? Menciónalo al reservar.",
    "Holiday menu": "Menú navideño", "Tamales, pozole, menudo & champurrado": "Tamales, pozole, menudo y champurrado",
    "Aguas frescas": "Aguas frescas", "Horchata, jamaica & piña": "Horchata, jamaica y piña",
    "Quesabirria": "Quesabirria", "With consommé for dipping": "Con consomé para remojar",
    "Al pastor trompo": "Trompo al pastor", "Carved live at your event": "Rebanado en vivo en tu evento",
    "Elote": "Elote", "Street corn with crema & cotija": "Elote con crema y queso cotija",
    "Churros": "Churros", "With chocolate dipping sauce": "Con chocolate para remojar",
    "Vasquez Tacos merch": "Mercancía Vasquez Tacos",
    "Jerseys, fitted caps, hoodies, bottle openers & more. Rep the best tacos in town.": "Jerseys, gorras, sudaderas, destapadores y más. Representa los mejores tacos de la ciudad.",
    "Shop Merch": "Ver mercancía",

    // Social + gallery
    "Follow along": "Síguenos", "Fresh off the flat-top, on your feed.": "Recién salidos de la plancha, en tu feed.",
    "Gallery": "Galería", "From our kitchen to your party.": "De nuestra cocina a tu fiesta.",
    "Real photos and videos from Vasquez Tacos events, orders and prep days.": "Fotos y videos reales de eventos, pedidos y días de preparación de Vasquez Tacos.",
    "Wedding taco bar": "Taquiza de boda", "Salsa verde on fresh tacos": "Salsa verde en tacos recién hechos",
    "Salsa bar & toppings": "Barra de salsas y complementos", "Chicken on the flat top": "Pollo en la plancha",
    "Party setup": "Montaje de fiesta", "Salsa prep": "Preparando salsas", "Taco plate": "Plato de tacos",
    "Boxed meals for a big order": "Comidas en caja para un pedido grande", "Taco Thursday plate": "Plato del Jueves de Tacos",
    "Burrito special": "Especial de burrito", "Show less": "Ver menos",
    "Flat top sizzle": "Chisporroteo en la plancha", "Flat top al pastor": "Al pastor en la plancha", "Flat top pastor for a crowd": "Pastor para una multitud",
    "Flat top at the event": "La plancha en el evento", "Flat top grilling": "Asando en la plancha", "Taco plate to go": "Plato de tacos para llevar",
    "Chicken taco plate": "Plato de tacos de pollo", "Vasquez Tacos": "Vasquez Tacos", "Vasquez Tacos video": "Video de Vasquez Tacos", "Vasquez Tacos photo": "Foto de Vasquez Tacos",

    // Service area + calendar
    "Service area": "Zona de servicio", "Taco catering across the Inland Empire.": "Catering de tacos en todo el Inland Empire.",
    "Based in Fontana. Travel is free within 25 miles, and we go farther for bigger events. Don't see your city? Ask us.":
      "Estamos en Fontana. El traslado es gratis dentro de 25 millas, y vamos más lejos para eventos grandes. ¿No ves tu ciudad? Pregúntanos.",
    "Book your date": "Aparta tu fecha", "Check availability.": "Revisa la disponibilidad.",
    "Tap an open date to start your quote. Weekends fill up fast, especially spring through fall.": "Toca una fecha libre para empezar tu cotización. Los fines de semana se llenan rápido, sobre todo de primavera a otoño.",
    "Available": "Disponible", "Limited, small events only": "Limitado, solo eventos pequeños", "Booked": "Reservado",
    "Your date is held once we receive your deposit.": "Tu fecha queda apartada al recibir tu depósito.",
    "● Live availability, synced with our calendar": "● Disponibilidad en vivo, sincronizada con nuestro calendario",
    "Sun": "Dom", "Mon": "Lun", "Tue": "Mar", "Wed": "Mié", "Thu": "Jue", "Fri": "Vie", "Sat": "Sáb",

    // Reviews / trust
    "Reviews": "Reseñas", "Book with confidence.": "Reserva con confianza.",
    "A family business that shows up, cooks fresh and treats your party like our own.": "Un negocio familiar que llega a tiempo, cocina fresco y trata tu fiesta como si fuera nuestra.",
    "The Vasquez promise": "La promesa Vasquez", "What you can count on": "Con lo que puedes contar",
    "Cooked at your event": "Cocinado en tu evento",
    "Every taco is grilled fresh on our professional flat-top, right in front of your guests.": "Cada taco se prepara al momento en nuestra plancha profesional, frente a tus invitados.",
    "Here early, set up right": "Llegamos temprano y bien preparados",
    "We arrive ahead of serving time so food is hot and ready when your guests are.": "Llegamos antes de la hora de servir para que la comida esté caliente cuando tus invitados estén listos.",
    "Your price, upfront": "Tu precio, desde el inicio",
    "Your estimate shows before you book. No surprise fees on the day of your party.": "Ves tu cotización antes de reservar. Sin cargos sorpresa el día de tu fiesta.",
    "We leave it clean": "Lo dejamos limpio",
    "When the party's over, we pack up and clean our area so you don't have to.": "Al terminar la fiesta, recogemos y limpiamos nuestra área para que tú no tengas que hacerlo.",
    "Refer a friend, get $25 off": "Recomienda a un amigo y ahorra $25",
    "Send a friend our way. When they book an event, you get $25 off your next event or meal-deal order. Just have them mention your name.":
      "Recomiéndanos con un amigo. Cuando reserve un evento, te damos $25 de descuento en tu próximo evento o pedido. Solo pídele que mencione tu nombre.",
    "Share with a friend": "Compartir con un amigo", "Link copied!": "¡Enlace copiado!",
    "Real customers, real posts": "Clientes reales, publicaciones reales",
    "People tag us because they love it": "Nos etiquetan porque les encanta",
    "Customer story on Instagram": "Historia de un cliente en Instagram",
    "Had Vasquez Tacos at your event? We'd love to hear about it!": "¿Tuviste Vasquez Tacos en tu evento? ¡Nos encantaría saber cómo te fue!",
    "Review us on Google": "Déjanos una reseña en Google", "Review us on Yelp": "Déjanos una reseña en Yelp",

    // Quote form
    "Get a free quote": "Cotización gratis",
    "See your estimate instantly. We'll call you to confirm your date and details.": "Ve tu cotización al instante. Te llamaremos para confirmar la fecha y los detalles.",
    "Name": "Nombre", "Phone": "Teléfono", "Email": "Correo", "Event date": "Fecha del evento", "Start time": "Hora de inicio",
    "Number of guests": "Número de invitados", "Event type": "Tipo de evento", "Birthday": "Cumpleaños", "Wedding": "Boda",
    "Quinceañera": "Quinceañera", "Graduation": "Graduación", "Baptism": "Bautizo", "Corporate": "Empresa",
    "Church / Community": "Iglesia / Comunidad", "Holiday Party": "Fiesta navideña", "Other": "Otro",
    "Event address / city": "Dirección / ciudad del evento", "Package": "Paquete", "Add-ons": "Extras",
    "Add burritos to any package": "Agregar burritos a cualquier paquete", "Sodas (Coke, Coke Zero, Sprite)": "Refrescos (Coca-Cola, Coca-Cola Zero, Sprite)",
    "Extra hour of serving": "Hora extra de servicio", "Extra taquero (faster lines)": "Taquero extra (filas más rápidas)",
    "Anything else? (meats, allergies, setup details)": "¿Algo más? (carnes, alergias, detalles del montaje)",
    "Estimated total": "Total estimado", "Deposit to hold your date (": "Depósito para apartar tu fecha (",
    "Plus sales tax. Travel is free within 25 miles of Fontana.": "Más impuestos. Traslado gratis dentro de 25 millas de Fontana.",
    "Request My Booking": "Solicitar mi reservación", "Sending…": "Enviando…",
    "Prefer to text?": "¿Prefieres mandar mensaje?", "Text us your event details": "Mándanos los detalles de tu evento", "or call": "o llama al",
    "Please fill in the highlighted fields.": "Por favor llena los campos marcados.",
    "Sorry, that date is booked. Please pick another date from the calendar.": "Lo sentimos, esa fecha ya está reservada. Elige otra fecha del calendario.",
    "Heads up: that date has limited availability. We'll confirm with you.": "Aviso: esa fecha tiene disponibilidad limitada. Te confirmaremos.",
    "¡Gracias! Your request was sent. Our family will call or email you within 24 hours to confirm.": "¡Gracias! Tu solicitud fue enviada. Nuestra familia te llamará o escribirá en menos de 24 horas para confirmar.",
    "Your email app should open with your request filled in. Just press send.": "Tu app de correo se abrirá con tu solicitud lista. Solo presiona enviar.",
    "Contact us": "Contáctanos", "Events 7 days a week · Calls & texts 9am–8pm": "Eventos los 7 días · Llamadas y mensajes de 9am a 8pm",
    "Fontana, California · Serving Fontana & the Inland Empire": "Fontana, California · Atendemos Fontana y el Inland Empire",

    // How it works + policies + FAQ
    "How it works": "Cómo funciona", "Book, pay and relax.": "Reserva, paga y relájate.",
    "Request": "Solicita", "Send your quote request. We'll confirm your date, menu and final price.": "Envía tu solicitud. Confirmamos tu fecha, menú y precio final.",
    "Deposit": "Depósito", "Pay a": "Paga un", "% deposit to lock in your date.": "% de depósito para apartar tu fecha.",
    "Enjoy": "Disfruta", "Pay the balance 3 days before. We show up, cook, serve and clean up.": "Paga el resto 3 días antes. Llegamos, cocinamos, servimos y limpiamos.",
    "Pay by Phone": "Paga por teléfono", "Online payments are coming soon. Call or text us and we'll send you a secure payment link.": "Muy pronto pagos en línea. Llámanos o mándanos mensaje y te enviamos un enlace de pago seguro.",
    "Our policies": "Nuestras políticas",
    "A 30% deposit holds your date. The balance is due 3 days before your event.": "Un depósito del 30% aparta tu fecha. El resto se paga 3 días antes del evento.",
    "Guest count": "Número de invitados",
    "Final guest count is due 7 days before your event. You can add guests after that if we have food available.": "El número final de invitados se confirma 7 días antes. Después puedes agregar invitados si tenemos comida disponible.",
    "Travel": "Traslado", "Free within 25 miles of Fontana. Farther events are $1.50 per mile each way.": "Gratis dentro de 25 millas de Fontana. Más lejos, $1.50 por milla de ida y de vuelta.",
    "Changes & cancellations": "Cambios y cancelaciones",
    "Cancel 30+ days out for a full refund. Inside 30 days, your deposit can move to a new date within 6 months.": "Cancela con 30+ días de anticipación y te devolvemos todo. Con menos de 30 días, tu depósito se puede pasar a otra fecha dentro de 6 meses.",
    "Setup space": "Espacio de montaje", "We need a flat 10×10 ft area near your party. For outdoor events we bring a canopy.": "Necesitamos un área plana de 10×10 pies cerca de tu fiesta. Para eventos al aire libre llevamos un toldo.",
    "Tax & tips": "Impuestos y propinas", "Prices don't include California sales tax. Tips for our crew are appreciated, never required.": "Los precios no incluyen el impuesto de California. Las propinas para el equipo se agradecen, pero no son obligatorias.",
    "Questions? We've got answers.": "¿Preguntas? Tenemos respuestas.",
    "How much food do I get?": "¿Cuánta comida recibo?",
    "Plan on 3–4 tacos per adult plus rice and beans. Our taqueros keep serving for the whole service window, so nobody goes hungry.": "Calcula 3–4 tacos por adulto más arroz y frijoles. Nuestros taqueros sirven durante todo el horario, así que nadie se queda con hambre.",
    "How far in advance should I book?": "¿Con cuánta anticipación debo reservar?",
    "Most weekends book 4–8 weeks out, especially May through October. We need at least one week's notice for any event.": "La mayoría de los fines de semana se reservan con 4–8 semanas, sobre todo de mayo a octubre. Necesitamos al menos una semana de aviso para cualquier evento.",
    "Is there a minimum?": "¿Hay un mínimo?",
    "Drop-off starts at 25 guests, Clásico Taquero at 30, Fiesta at 40 and La Casa Premium at 60. Smaller parties are welcome and pay the minimum.": "El Buffet empieza en 25 invitados, Clásico Taquero en 30, Fiesta en 40 y La Casa Premium en 60. Las fiestas más pequeñas son bienvenidas y pagan el mínimo.",
    "Is everything really homemade?": "¿De verdad todo es casero?",
    "Yes. Our salsas, rice, beans and meats are made from scratch by our family using our own recipes.": "Sí. Nuestras salsas, arroz, frijoles y carnes los hace nuestra familia desde cero con nuestras propias recetas.",
    "Do you cater holiday parties?": "¿Atienden fiestas navideñas?",
    "Yes. We cater office and family holiday parties with our full taco setup. A holiday menu with tamales and pozole is coming soon. Book early, since December fills up fast.": "Sí. Atendemos posadas de oficina y familiares con nuestra taquiza completa. Muy pronto tendremos menú navideño con tamales y pozole. Reserva temprano, diciembre se llena rápido.",
    "Can you handle dietary needs?": "¿Pueden atender dietas especiales?",
    "Our corn tortillas are naturally gluten-free. Tell us about any allergies when you book and we'll work with you.": "Nuestras tortillas de maíz son naturalmente sin gluten. Avísanos de cualquier alergia al reservar y nos adaptamos.",
    "What if I have more than 250 guests?": "¿Y si tengo más de 250 invitados?",
    "We cater big events too. Send a request with your guest count and we'll put together a custom quote.": "También atendemos eventos grandes. Envía una solicitud con tu número de invitados y te preparamos una cotización personalizada.",
    "Let's make your party one to remember.": "Hagamos que tu fiesta sea inolvidable.",

    // Footer
    "Best in Town · Food Events · Catering · Parties": "El mejor de la ciudad · Eventos · Catering · Fiestas",
    "Family-owned Mexican taco catering in Fontana, California.": "Catering familiar de tacos mexicanos en Fontana, California.",
    "Visit": "Visita", "Weekly specials": "Especiales de la semana", "Printable flyer": "Volante para imprimir",
    "Payments": "Pagos", "Follow": "Síguenos", "Photo credits": "Créditos de fotos",
    "Vasquez Tacos. Made from scratch, served with love.": "Vasquez Tacos. Hecho desde cero, servido con cariño.",
    "Book this for your event": "Resérvalo para tu evento",

    // Merch page
    "← Back to site": "← Volver al sitio", "Shop": "Tienda", "Fontana blue collection": "Colección azul Fontana",
    "Rep the": "Representa a la familia", "crew.": "",
    "Fontana blue gear for the Vasquez Tacos crew and fans. Order by text, pick up at any event or meal-deal pickup.": "Ropa azul Fontana para el equipo y los fans de Vasquez Tacos. Pide por mensaje y recoge en cualquier evento o entrega de ofertas.",
    "Shop the collection": "Ver la colección", "Shop all merch": "Toda la mercancía",
    "Tap a color to preview it, flip to the back, pick your size, then send your order by text. We'll confirm and have it ready at your next pickup.":
      "Toca un color para verlo, voltea para ver la espalda, elige tu talla y envía tu pedido por mensaje. Te confirmamos y lo tenemos listo en tu próxima recogida.",
    "All": "Todo", "Jerseys": "Jerseys", "Headwear": "Gorras", "Tees": "Playeras", "Sweatshirts": "Sudaderas",
    "Home & Kitchen": "Casa y cocina", "Accessories": "Accesorios", "Sort": "Ordenar", "Featured": "Destacados",
    "Price: low to high": "Precio: menor a mayor", "Price: high to low": "Precio: mayor a menor",
    "New": "Nuevo", "Best seller": "Más vendido", "Front / Back": "Frente / Espalda",
    "All merch is made to order. Allow 1–2 weeks. Pay by text link, Venmo, Zelle or cash at pickup.": "Toda la mercancía se hace por pedido. Tarda 1–2 semanas. Paga con enlace por mensaje, Venmo, Zelle o efectivo al recoger.",
    "Crew gear": "Uniforme del equipo", "The Vasquez Tacos crew uniform.": "El uniforme del equipo Vasquez Tacos.",
    "What our team wears at every event, so guests know who's cooking. Not for sale. The specs are ready to hand to a print shop.": "Lo que usa nuestro equipo en cada evento, para que los invitados sepan quién cocina. No está a la venta. Las especificaciones están listas para la imprenta.",
    "White": "Blanco", "Black": "Negro", "Fontana Blue": "Azul Fontana", "Heather Gray": "Gris jaspeado", "Road Gray": "Gris",
    "Cream": "Crema", "Navy": "Azul marino", "Stone": "Piedra", "Denim": "Mezclilla", "Steel": "Acero",
    "Blue anodized": "Azul anodizado", "Natural": "Natural", "Silver ring": "Aro plateado", "Gold ring": "Aro dorado", "Full color": "A todo color",
    "Vasquez Script Jersey": "Jersey Vasquez", "VT Fitted Cap": "Gorra VT", "Vasquez Script Tee": "Playera Vasquez",
    "Fontana Badge Tee": "Playera Escudo Fontana", "909 Varsity Tee": "Playera 909", "Taco Thursday Tee": "Playera Jueves de Tacos",
    "Original Logo Tee": "Playera Logo Original", "VT Long Sleeve": "Playera manga larga VT", "Fontana Badge Crewneck": "Sudadera Escudo Fontana",
    "Vasquez Script Hoodie": "Sudadera con gorro Vasquez", "Script Dad Hat": "Gorra Vasquez", "Taco Snapback": "Gorra Taco",
    "Leather Patch Beanie": "Gorro de invierno con parche", "Backyard Taquero Apron": "Mandil Taquero", "Badge Can Cooler": "Portalatas Escudo",
    "Bottle Opener Keychain": "Llavero destapador", "Canvas Tote": "Bolsa de lona", "Badge Keychain": "Llavero Escudo",
    "Sticker Pack (4)": "Paquete de calcomanías (4)",
    "Crew Tee": "Playera del equipo", "Crew Hoodie": "Sudadera del equipo", "Taquero Apron": "Mandil de taquero", "Crew Fitted Cap": "Gorra del equipo",

    // Accessibility labels
    "Dismiss": "Cerrar", "Open menu": "Abrir menú", "Previous month": "Mes anterior", "Next month": "Mes siguiente",
    "Previous video": "Video anterior", "Next video": "Video siguiente", "Mute": "Silenciar", "Unmute": "Activar sonido", "Close": "Cerrar",
    "Quick actions": "Acciones rápidas", "Call us": "Llámanos", "Color": "Color", "Size": "Talla", "Categories": "Categorías",
    "Tap to see the back": "Toca para ver la espalda", "e.g. 60": "ej. 60",
    "Al pastor sizzling on the Vasquez Tacos flat-top": "Al pastor en la plancha de Vasquez Tacos", "Map of Vasquez Tacos location": "Mapa de la zona de Vasquez Tacos",
    "Meat grilling on the flat-top": "Carne asándose en la plancha", "Meat hitting the flat-top at a Vasquez Tacos event": "Carne en la plancha en un evento de Vasquez Tacos",
    "Customer post": "Publicación de cliente", "View the site in English": "View the site in English",
    "Fontana Blue heavyweight tee. Front: 3.5\" white VT on left chest. Back: 11\" \"VASQUEZ TACOS · CREW\" in white with red.": "Playera gruesa azul Fontana. Frente: VT blanca de 3.5\" en el pecho izquierdo. Espalda: \"VASQUEZ TACOS · CREW\" de 11\" en blanco con rojo.",
    "Navy pullover for night events. Front: left-chest VT. Back: \"CREW\" print in white with red.": "Sudadera azul marino para eventos de noche. Frente: VT en el pecho izquierdo. Espalda: \"CREW\" en blanco con rojo.",
    "Black twill bib apron with 2 pockets. Front: 6\" Fontana badge in white. Heavy-duty, machine washable.": "Mandil negro de sarga con 2 bolsas. Frente: escudo Fontana de 6\" en blanco. Resistente, lavable en lavadora.",
    "Fontana Blue structured cap. Front: 3D-embroidered white VT. Side: taco patch.": "Gorra estructurada azul Fontana. Frente: VT blanca bordada en 3D. Lado: parche de taco.",
  };

  const MONTHS = { January: "enero", February: "febrero", March: "marzo", April: "abril", May: "mayo", June: "junio", July: "julio",
    August: "agosto", September: "septiembre", October: "octubre", November: "noviembre", December: "diciembre" };
  const CAT = { Jerseys: "Jerseys", Headwear: "Gorras", Tees: "Playeras", Sweatshirts: "Sudaderas", "Home & Kitchen": "Casa y cocina", Accessories: "Accesorios" };

  // Text that includes numbers or names
  const PATTERNS = [
    [/^(\d+)-guest minimum \((.+)\)$/, (m, n, p) => `Mínimo de ${n} invitados (${p})`],
    [/^(\$[\d.,]+)\/guest$/, (m, p) => `${p}/invitado`],
    [/^(\$[\d.,]+)\/event$/, (m, p) => `${p}/evento`],
    [/^(.+) × (\d+) guests @ (.+)$/, (m, a, n, p) => `${a} × ${n} invitados @ ${p}`],
    [/^(.+) × (\d+) guests, plus tax\.$/, (m, a, n) => `${a} × ${n} invitados, más impuestos.`],
    [/^(.+) has a (\d+)-guest minimum\.$/, (m, a, n) => `${a} tiene un mínimo de ${n} invitados.`],
    [/^(.+): (\$[\d.]+) per guest \((\d+) min\.\)$/, (m, a, p, n) => `${a}: ${p} por invitado (mín. ${n})`],
    [/^Show all (\d+) photos & videos$/, (m, n) => `Ver las ${n} fotos y videos`],
    [/^Showing the (\d+)-guest minimum\. Enter your guest count\.$/, (m, n) => `Se muestra el mínimo de ${n} invitados. Escribe tu número de invitados.`],
    [/^Under (\d+) guests, the package minimum applies\.$/, (m, n) => `Con menos de ${n} invitados se cobra el mínimo del paquete.`],
    [/^(\d+) guests is over (\d+)\. We'll send you a custom quote\.$/, (m, a, b) => `${a} invitados es más de ${b}. Te enviaremos una cotización personalizada.`],
    [/^Please choose a date at least (\d+) days from today\.$/, (m, n) => `Elige una fecha con al menos ${n} días de anticipación.`],
    [/^Your texting app should open with your request filled in\. Just press send\. If it didn't open, call or text us at (.+)\.$/, (m, p) => `Tu app de mensajes se abrirá con tu solicitud lista. Solo presiona enviar. Si no se abrió, llámanos o mándanos mensaje al ${p}.`],
    [/^Something went wrong sending your request\. Please call or text us at (.+)\.$/, (m, p) => `Hubo un problema al enviar tu solicitud. Llámanos o mándanos mensaje al ${p}.`],
    [/^Text us your review: (.+)$/, (m, p) => `Mándanos tu reseña: ${p}`],
    [/^Call us: (.+)$/, (m, p) => `Llámanos: ${p}`],
    [/^(January|February|March|April|May|June|July|August|September|October|November|December) (\d{4})$/, (m, mo, y) => `${MONTHS[mo]} ${y}`],
    [/^(Jerseys|Headwear|Tees|Sweatshirts|Home & Kitchen|Accessories) · (\d+) colors?$/, (m, c, n) => `${CAT[c]} · ${n} ${n === "1" ? "color" : "colores"}`],
    [/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (January|February|March|April|May|June|July|August|September|October|November|December) (\d+), (available|unavailable|limited availability|booked)$/,
      (m, wd, mo, d, st) => `${{ Monday: "lunes", Tuesday: "martes", Wednesday: "miércoles", Thursday: "jueves", Friday: "viernes", Saturday: "sábado", Sunday: "domingo" }[wd]} ${d} de ${MONTHS[mo]}, ${{ available: "disponible", unavailable: "no disponible", "limited availability": "disponibilidad limitada", booked: "reservado" }[st]}`],
    [/^(.+) mockup(, back)?$/, (m, a, b) => `${ES[a] || a}${b ? ", espalda" : ""}`],
  ];

  const toEs = (raw) => {
    const t = raw.replace(/\s+/g, " ").trim();
    if (!t) return null;
    if (Object.prototype.hasOwnProperty.call(ES, t)) return ES[t];
    for (const [re, fn] of PATTERNS) { const m = t.match(re); if (m) return fn(...m); }
    return null;
  };

  // Language: saved choice, then ?lang=, then the visitor's browser language
  const params = new URLSearchParams(location.search);
  let saved = null;
  try { saved = localStorage.getItem("vt-lang"); } catch {}
  const lang = params.get("lang") || saved || (/^es\b/i.test(navigator.language || "") ? "es" : "en");

  function addToggle() {
    const target = document.querySelector(".nav-links");
    if (!target || document.querySelector(".lang-toggle")) return;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "lang-toggle";
    b.lang = lang === "es" ? "en" : "es";
    b.textContent = lang === "es" ? "English" : "Español";
    b.setAttribute("aria-label", lang === "es" ? "View the site in English" : "Ver el sitio en español");
    b.addEventListener("click", () => {
      try { localStorage.setItem("vt-lang", lang === "es" ? "en" : "es"); } catch {}
      const u = new URL(location.href); u.searchParams.delete("lang");
      location.replace(u.href);
    });
    target.prepend(b);
  }
  addToggle();
  if (lang !== "es") return;

  document.documentElement.lang = "es";
  const ATTRS = ["placeholder", "aria-label", "alt", "title"];
  function translateTree(root) {
    if (root.nodeType === 3) { swapText(root); return; }
    if (root.nodeType !== 1) return;
    if (root.matches("svg")) { translateAttrs(root); return; }
    if (root.closest("script, style, svg, .lang-toggle")) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, {
      acceptNode: (n) => {
        if (n.nodeType !== 1) return NodeFilter.FILTER_ACCEPT;
        if (n.matches("svg")) { translateAttrs(n); return NodeFilter.FILTER_REJECT; }   // label the mockup, keep the print text as designed
        return n.matches("script, style, .lang-toggle") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    for (let n = root; n; n = w.nextNode()) {
      if (n.nodeType === 3) swapText(n);
      else translateAttrs(n);
    }
  }
  function translateAttrs(el) {
    ATTRS.forEach((a) => { const v = el.getAttribute(a); const es = v && toEs(v); if (es && es !== v) el.setAttribute(a, es); });
  }
  function swapText(node) {
    const es = toEs(node.nodeValue);
    if (es === null) return;
    const lead = node.nodeValue.match(/^\s*/)[0], trail = node.nodeValue.match(/\s*$/)[0];
    const next = lead + es + trail;
    if (node.nodeValue !== next) node.nodeValue = next;
  }

  const run = () => {
    document.title = document.title.replace("Taco Catering in Fontana, CA", "Catering de Tacos en Fontana, CA").replace("Merch |", "Mercancía |");
    translateTree(document.body);
    new MutationObserver((muts) => muts.forEach((m) => {
      if (m.type === "characterData") swapText(m.target);
      else if (m.type === "attributes") { const v = m.target.getAttribute(m.attributeName); const es = v && toEs(v); if (es && es !== v) m.target.setAttribute(m.attributeName, es); }
      else m.addedNodes.forEach(translateTree);
    })).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ATTRS });
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
})();
