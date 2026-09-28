# Vasquez Tacos Website

Open `index.html` in a browser to preview the site.

## Everyday updates: edit `config.js` only
- **Booked dates**: add dates to `booked` (or `limited`) as `"YYYY-MM-DD"`.
- **Prices and packages**: `packages` and `addons`.
- **Menu**: `menu`.
- **Reviews**: paste real customer reviews into `reviews`.
- **Phone, email, hours, social links**: `business`.

## Photos
Save these in the `images` folder (JPG, about 1600px wide for the hero photo):
- `logo.png`: the round logo (save it in the main folder next to `index.html`)
- `images/hero.jpg`: big taco photo for the top of the page
- `images/gallery-1.jpg` … `gallery-4.jpg`: photos from real events

Until a photo is added, the site shows a colored background in its place.

## Setup checklist (one time)
1. **Payments**: create a free **Square** account (squareup.com). Go to Online Checkout, then Payment Links, and make a "Deposit" link and a "Balance" link. Paste both into `payments` in `config.js`. Square takes cards, Apple Pay and Google Pay and deposits the money into your bank. (Stripe Payment Links or PayPal work the same way.) Add your Venmo, Zelle or Cash App handles too.
2. **Booking requests by email**: create a free form at **formspree.io**, then paste its URL into `formEndpoint`.
3. **Put the site online (free)**: drag this folder onto **Netlify Drop** (app.netlify.com/drop), or use **Cloudflare Pages**. Buy a domain like `vasqueztacos.com` (about $12 a year at Cloudflare, Namecheap or Porkbun) and connect it.
4. **Get found locally**: set up a free **Google Business Profile** (business.google.com) as a catering business in Fontana, CA. Add the website link, photos and hours, and ask happy customers for reviews. Then add the review link to `googleReviews`. Also claim your free **Yelp for Business** page and list the site on your Instagram and Facebook.
