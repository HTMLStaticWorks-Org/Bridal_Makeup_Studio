# Customization Guide — Colors, Fonts, Brand & Integrations

## 1. Rebranding Studio Name & Tagline
Search and replace across the `pages/` directory:
- Brand Name: `Aurelle Bridal Studio` / `Aurelle`
- Monogram Badge: `<span class="brand-monogram">A</span>`
- Tagline: `"Where every bride becomes a masterpiece."`

## 2. Customizing the Color System
Open `assets/css/style.css` (Light Mode **"Ivory Rouge"**) and `assets/css/dark-mode.css` (Dark Mode **"Midnight Plum"**):

```css
:root {
  --ink: #2A0F1C;          /* Deep mulberry-black text */
  --primary: #7B1E3A;      /* Oxblood rose / bridal vermilion */
  --secondary: #C9A66B;    /* Antique champagne gold */
  --accent: #E8B4B8;       /* Blush petal */
  --accent-2: #B76E79;     /* Rose-gold */
  --bg: #FFF8F3;           /* Warm ivory background */
  --surface: #FFFFFF;      /* Pure ivory card surface */
  --surface-2: #F8E9E4;    /* Pearl blush secondary surface */
}
```

## 3. Customizing Self-Hosted Typography
All font files live in `assets/fonts/` and are declared at the top of `assets/css/style.css`:
- `--font-heading`: `'Cormorant Garamond', Georgia, serif`
- `--font-body`: `'Jost', sans-serif`
- `--font-script`: `'Pinyon Script', cursive`

## 4. Connecting Live Third-Party Integrations
Search for `TODO:` comments in the HTML files to plug in live endpoints:
- **Contact & Inquiry Forms (`pages/contact.html`)**: Replace `action="#"` with your Formspree URL (`https://formspree.io/f/YOUR_ID`) or keep `data-netlify="true"` on Netlify.
- **Newsletter Forms (Footer & `pages/coming-soon.html`)**: Replace `action="#"` with your Mailchimp or ConvertKit embedded form action URL.
- **Stripe & PayPal Retainer Checkout (`pages/book-now.html`, `pages/dashboard/payments.html`)**: Hook `#wizardNextBtn` in `assets/js/booking.js` to your Stripe Checkout session endpoint or PayPal Smart Payment Buttons.
- **Google Maps (`pages/contact.html`)**: Initialize the Google Maps JavaScript SDK targeting `#aurelleGoogleMap` using `data-lat` and `data-lng`.
