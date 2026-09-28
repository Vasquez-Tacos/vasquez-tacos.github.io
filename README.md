# Vasquez Tacos Website

Premium taco catering site for Vasquez Tacos in Fontana, CA.

- `index.html`: main site (catering packages, events, meal deals, menu, booking)
- `merch.html`: merch shop and crew uniform specs

## Preview on your computer
Run `powershell -ExecutionPolicy Bypass -File serve.ps1`, then open http://localhost:8080.

## Everyday updates: edit `config.js` only
- **Booked dates**: add dates to `booked` (or `limited`) as `"YYYY-MM-DD"`.
- **Catering prices**: `packages` (price per guest and minimum guests) and `addons`.
- **Meal deals**: `specials`. Give a deal a `day` (0 = Sunday … 6 = Saturday) and it gets a "Today" tag on that day.
- **Holiday menu**: `holiday`. Set `showHoliday: false` to hide it outside the season.
- **Menu**: `menu`.
- **Merch and crew gear**: `merch` and `crew`.
- **Reviews**: paste real customer reviews into `reviews`.
- **Instagram reels**: paste reel links into `socialClips` to show them on the site. TikTok, YouTube and Facebook video links work too.
- **Badges**: list real credentials (for example "Licensed & Insured") in `business.credentials`.
- **Phone, email, hours**: `business`. The site shows the city and service area only, never a street address.

## Photos
The photos in `images/` are real Vasquez Tacos photos. To replace one, save the new photo in `images/` with the same file name (for example `images/wedding-setup.jpg`). New gallery photos and videos go in `media/` and show up automatically.

## Videos from OneDrive or your phone
Phone videos (.MOV) are big and don't play in every browser. Convert them first:

```
powershell -ExecutionPolicy Bypass -File add-videos.ps1 "C:\path\to\your\OneDrive\folder"
```

This makes a small .mp4 and a .jpg preview for each video in `media/`. Rename them to describe the clip (the name becomes the caption), then push to GitHub. The three clips in the "Grilled fresh on our flat-top" section are listed in `flatTopVideos` in `config.js`.

## Booking requests
Until a form service is set up, "Request My Booking" opens the customer's texting app with their whole request typed out, addressed to the business phone.

## Setup checklist (one time)
1. **Payments**: create a free **Square** account (squareup.com). Go to Online Checkout, then Payment Links, and make a "Deposit" link and a "Balance" link. Paste both into `payments` in `config.js`. Square takes cards, Apple Pay and Google Pay. Add your Venmo, Zelle or Cash App handles too.
2. **Booking requests by email**: create a free form at **formspree.io**, then paste its URL into `formEndpoint`.
3. **Put the site online (free)**: in GitHub go to Settings → Pages, choose **Deploy from a branch**, then **main** and **/(root)**. Or connect this repo to **Cloudflare Pages**. Buy a domain like `vasqueztacos.com` (about $12 a year) and connect it, then put the URL in `business.website`.
4. **Get found locally**: set up a free **Google Business Profile** (business.google.com) as a catering business in Fontana, CA, as a service-area business so no address is shown. Ask happy customers for reviews, then add the review link to `googleReviews`. Also claim your free **Yelp for Business** page.
