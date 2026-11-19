# Page Structure & Section Ownership Map

Every section in Aurelle Bridal Studio belongs to **one page only** (Rule 1). Below is the complete inventory of all 36 HTML files and their exclusive sections.

## 1. Public Marketing & Booking Pages (`pages/`)

| File | Page Title | Exclusive Owned Sections |
| :--- | :--- | :--- |
| `index.html` (Root) | Root Redirector | Instant redirect to `pages/index.html` |
| `pages/index.html` | **Home 1 — Cinematic Arch** | Split-Screen Arch Hero with Ken-Burns & Floating Glass Badges, Signature Bridal Looks (6 tilt cards), Our 5-Step Bridal Journey Timeline, Transformation Before/After Drag Slider, Artist Signature Techniques (sticky image swap), Bride Love Wall Testimonials, Closing "Reserve Your Date" Strip |
| `pages/home-2.html` | **Home 2 — Editorial Collage** | Centered Typographic Headline + 4-Frame Staggered Collage + Quick-Availability Bar + Marquee Ribbon, Look by Occasion (6 interactive tabs), Bridal Pro Kit (4 tool/product cards), Wedding Season 8-Month Availability Calendar, Real Bride Stories (3 palace/villa dispatches), Seasonal Offers with Countdown, Studio Journal Preview |
| `pages/about.html` | **About Us** | Page Hero, Our Story (Atelier & Philosophy), Mission/Vision/Values, Meet the Master Artists (4 team cards), Studio Tour Mosaic Gallery (4 suites), Animated Stat Counters, Awards & Certifications / Brands We Trust |
| `pages/services.html` | **Services & Pricing** | Page Hero, 8-Discipline Services Grid (stroke-draw icons), 3-Tier Packages with "At Studio / At Your Venue" Toggle, Bespoke Bridal Add-Ons, Interactive Service Price Calculator, What's Included Comparison Table, 4-Phase "How We Prepare Your Skin" Guide, FAQ Accordion |
| `pages/service-details.html` | **Service Details** | Service Banner, Detailed Dossier, What's Included Checklist, 4 In-Suite Process Steps, Skin-Type Formulation Matrix, Sticky Booking Sidebar, 3 Related Complementary Commissions |
| `pages/portfolio.html` | **Gallery / Lookbook** | Page Hero, 8-Category Filter Bar, 9-Look Masonry Grid with Accessible Lightbox Inspector, 3 Backstage Video Reels Strip (Poster + Modal), Featured 3-Day Jaipur Palace Case Study |
| `pages/look-details.html` | **Look Details** | Look Hero, Look Story, 3-Angle Macro Detail Slider, Products Used Recipe, Skin Tone & Occasion Match Matrix, Artist Metadata & "Select This Look" Sidebar, Next/Previous Look Archive |
| `pages/book-now.html` | **Multi-Step Booking** | 5-Step Progress Bar, Step 1 Service Selector, Step 2 Date & Slot Calendar, Step 3 Look & Skin Dossier, Step 4 Contact & Inspiration File Upload, Step 5 Review & 25% Retainer (Stripe/PayPal), Sticky Live Summary Sidebar |
| `pages/booking-confirmation.html` | **Booking Confirmation** | Official Commission Receipt, `.ICS` Add-to-Calendar Download Generator, Dispatched Email Notification Preview |
| `pages/blog.html` | **Bridal Beauty Journal** | Featured Editorial Article, Category Filter Tabs, 6-Article Post Grid with Pagination, Journal Sidebar (Search, Categories, Most Read, Tags) |
| `pages/blog-single.html` | **Single Article** | Article Hero, Long-Form Dermatological Timeline, Sticky Table of Contents, Social Share Bar, Author Box, Related Dispatches, Validated Comments Form |
| `pages/contact.html` | **Contact Concierge** | Contact Hero, Formspree/Netlify Validated Inquiry Form, Flagship Studio Card, WhatsApp Quick-Chat Card, Google Maps API Container, Valet & Arrival Etiquette, 4-Channel Social Grid |
| `pages/login.html` | **Bride Login** | Split Photo Panel + Validated Login Form with Password Show/Hide & OAuth Placeholders |
| `pages/register.html` | **Bride Registration** | Split Photo Panel + Bride Dossier Registration Form |
| `pages/forgot-password.html` | **Password Recovery** | Split Photo Panel + Encrypted Recovery Link Form |
| `pages/404.html` | **404 Error** | Editorial Error Card, Archive Search Bar, Quick Navigation Buttons |
| `pages/coming-soon.html` | **Coming Soon** | 2027 Lookbook Preview, Live Countdown Cells, VIP Preview Key Signup |
| `pages/privacy-policy.html` | **Privacy Policy** | Sticky Table of Contents + Bridal Dossier & NDA Portrait Privacy Clauses |
| `pages/terms.html` | **Terms of Service** | Sticky Table of Contents + Retainer, Rescheduling & Destination Clauses |

## 2. Bride Portal Dashboard (`pages/dashboard/`)

- `index.html`: Wedding Countdown, Next Appointment Card, 75% Payment Progress Ring, Locked Ceremony Look Preview, Pre-Bridal Readiness Checklist, Live Studio Notifications
- `book-trial.html`: 3-Hour Private Trial Slot Picker, Artist Pairing Selector, Active Reservation Reschedule/Cancel Card
- `my-looks.html`: 4 Saved Moodboard Looks, Lock Primary Look Toggle, Side-by-Side 2-Look Technical Comparison Matrix
- `payments.html`: Commission Total & Instalment Tracker, Stripe/PayPal Final Balance Triggers, Downloadable Invoice Ledger
- `appointments.html`: 4-Milestone Synchronized Itinerary (Trial, Cryo-Facial, Ceremony Morning, Reception Switch)
- `messages.html`: Direct Encrypted Chat Thread with Aurelia Vance & Concierge
- `profile.html`: Bride Identity Card, Uploaded Reference Swatches, Editable Skin & Allergy Dossier Form
- `settings.html`: Notification Preferences, Light/Dark & LTR/RTL Controls, Password Update

## 3. Studio Admin Portal (`pages/dashboard/admin/`)

- `index.html`: Monthly Escrow KPI, Active Contracted Brides, Weekly Trials, Creative Director Card, Suite Dispatch List, 92% December Utilization Ring
- `bookings.html`: Filterable Master Booking Ledger with One-Click Status Cycling
- `brides.html`: Contracted Bride Dossier & Skin Allergy Directory
- `services.html`: Studio vs. On-Venue Rate & Retainer Catalog
- `payments.html`: Cleared Escrow Retainer & Milestone Ledger with Export
- `messages.html`: Admin Concierge Reply Console
- `reports.html`: Interactive 6-Month Revenue Bar Chart & Look Popularity Bar Chart
- `settings.html`: Weekend Capacity Cap, Retainer %, Reschedule Window & Gateway Hooks
