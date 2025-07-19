# Gaydar

A map-based web application showing queer events in London during Pride season.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/amodeus4/PrideMap.git
   cd PrideMap
   ```

2. **Get a Mapbox API token:**

   - Go to [Mapbox](https://account.mapbox.com/)
   - Create an account and get your access token
   - Copy the token

3. **Configure your API token:**

   - Copy `js/config.example.js` to `js/config.js`
   - Replace `YOUR_MAPBOX_TOKEN_HERE` with your actual Mapbox token

4. **Open the project:**
   - Open `index.html` in your browser
   - Or host it on GitHub Pages (see below)

## Hosting on GitHub Pages

1. Push your code to GitHub
2. Go to your repository Settings → Pages
3. Set source to "Deploy from a branch" → "main" → "/ (root)"
4. Your site will be available at `https://yourusername.github.io/PrideMap/`

## Custom Domain Setup (onmygaydar.com)

### DNS Configuration in GoDaddy:

1. Log into your GoDaddy account
2. Go to DNS Management for onmygaydar.com
3. Add these A records:
   - `@` → `185.199.108.153`
   - `@` → `185.199.109.153`
   - `@` → `185.199.110.153`
   - `@` → `185.199.111.153`
4. Add CNAME record:
   - `www` → `yourusername.github.io` (replace with your GitHub username)

### GitHub Pages Settings:

1. In your repository Settings → Pages
2. Enter `onmygaydar.com` in the Custom domain field
3. **Check "Enforce HTTPS"** (this is crucial for SSL)
4. Save the settings

### SSL Certificate:

- GitHub Pages will automatically provision an SSL certificate
- It may take up to 24 hours for the certificate to be active
- The CNAME file in this repository should contain: `onmygaydar.com`

## Security Note

Monitoring usage of API key, please use your own.

## Features

- Interactive map showing event locations
- Filter events by type (party, social, workshop)
- Event details with images and descriptions
- Mobile-responsive design
- Real-time geocoding of event addresses

## Technologies Used

- HTML5, CSS3, JavaScript
- Mapbox GL JS for mapping
- Mapbox Geocoding API
