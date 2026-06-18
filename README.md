# Telangana GIS Planning Portal

A comprehensive Geographic Information System (GIS) platform for the Planning Department of the Government of Telangana, built with Next.js 16, React, Tailwind CSS, and Leaflet.

## Features

### 🗺️ Interactive Maps
- Full-screen Leaflet-based interactive map viewer
- Real-time GIS data visualization
- Multiple map layer support (Satellite, Terrain, Streets, Hybrid)
- District markers with location information
- Zoom and navigation controls
- Telangana boundary overlay

### 🔍 Location Search
- Advanced search functionality with multiple filters
- Search by location name, building, landmark, or infrastructure
- Category-based filtering (Building, Road, Landmark, Area, Infrastructure, Public Services)
- Detailed location results with geospatial data
- Quick navigation to location details

### 📍 Location Details
- Comprehensive location information pages
- GIS attributes and metadata
- Q&A section for community engagement
- Share location functionality
- Coordinate display (latitude/longitude)

### 🛰️ Satellite Imagery
- High-resolution satellite data repository
- Multi-temporal imagery for change detection
- Advanced metadata (resolution, source, capture date)
- Image preview and download capabilities

### 👁️ Viewpoints
- Strategic viewing locations across Telangana
- Preset map views with camera angles
- Development perspective cards
- Location-based filtering

### 📊 GIS Layers Management
- Publish and manage GIS layers
- Layer visibility toggle
- Opacity control
- Metadata display
- Source attribution

### 🏗️ Admin Data Upload
- GIS data submission portal
- Support for multiple formats (GeoJSON, Shapefile, CSV)
- Data validation and processing

### ℹ️ About & Information
- Project information and mission
- Department contact details
- Achievements and initiatives
- Team information

## Tech Stack

- **Frontend Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **Mapping**: Leaflet.js for interactive maps
- **Styling**: Tailwind CSS
- **State Management**: React Hooks with SWR for data fetching
- **API Routes**: Next.js API routes with mock data
- **Deployment**: Vercel-ready

## Project Structure

```
/app
  /api                    # API routes
    /locations
      /search            # Location search endpoint
      /[id]              # Location details endpoint
    /gis-layers          # GIS layers endpoint
    /satellite           # Satellite imagery endpoint
    /viewpoints          # Viewpoints endpoint
    /admin/upload        # Data upload endpoint
  /maps                  # Interactive map page
  /search                # Location search page
  /location/[id]         # Location details page
  /satellite             # Satellite imagery page
  /viewpoints            # Viewpoints page
  /gis-layers            # GIS layers page
  /about                 # About page
  /admin/upload          # Admin upload page
  /page.tsx              # Home page
  /layout.tsx            # Root layout

/components
  /ui                    # shadcn/ui components
  header.tsx            # Navigation header
  hero.tsx              # Hero section
  services.tsx          # Services showcase
  map-section.tsx       # Map section
  satellite-section.tsx # Satellite section
  initiatives.tsx       # Key initiatives
  contact.tsx           # Contact section
  footer.tsx            # Footer

/public                 # Static assets
```

## Installation & Setup

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm/yarn

### Local Development

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Start development server**
   ```bash
   pnpm dev
   ```

3. **Open in browser**
   - Navigate to `http://localhost:3000`

### Build for Production

```bash
pnpm build
pnpm start
```

## API Endpoints

### Location Search
```
GET /api/locations/search?q=<query>&category=<category>&limit=<limit>
```

### Location Details
```
GET /api/locations/<id>
```

### GIS Layers
```
GET /api/gis-layers
```

### Satellite Imagery
```
GET /api/satellite
```

### Viewpoints
```
GET /api/viewpoints
```

### Data Upload
```
POST /api/admin/upload
Content-Type: multipart/form-data
```

## Features Overview

### Home Page
- Prominent hero section with call-to-action buttons
- Services showcase cards
- Interactive map preview
- Satellite imagery preview
- Key initiatives display
- Contact information

### Maps Page
- Full-screen Leaflet map
- Layer controls (Satellite, Terrain, Streets, Hybrid)
- Quick navigation to districts
- Search functionality
- Map controls (zoom, pan, bearing)

### Search Page
- Advanced search interface
- Multi-criteria filtering
- Results displayed in card grid
- Direct navigation to location details

### Satellite Page
- Image gallery with preview
- Multi-temporal analysis support
- Metadata display
- Image source attribution

### Viewpoints Page
- Strategic viewing locations
- Camera angle information
- Development perspective cards
- Coordinate display

### Admin Upload
- Multi-format support (GeoJSON, Shapefile, CSV)
- File upload interface
- Upload status tracking
- Recent uploads history

## Mock Data

The application includes comprehensive mock data for demonstration:

- **Locations**: 5 sample locations (Hyderabad City Center, Pharma City SEZ, Outer Ring Road, Charminar, T-Hub 2.0)
- **GIS Layers**: 5 sample layers (District Boundaries, Road Network, Land Use, Urban Areas, Water Bodies)
- **Satellite Images**: 4 sample images with metadata
- **Viewpoints**: 5 strategic viewpoints across Telangana

## Database Integration (Future)

To connect to a real database (Supabase, Neon, or AWS Aurora):

1. Update API routes in `/app/api/` to query your database
2. Replace mock data with actual database queries
3. Implement authentication for admin features
4. Add data validation and error handling

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables if needed

3. **Deploy**
   - Click "Deploy"
   - Your site will be live in minutes

### Environment Variables

Create a `.env.local` file for local development:

```env
# Database
DATABASE_URL=your_database_url

# API Keys
NEXT_PUBLIC_API_KEY=your_api_key
```

## Future Enhancements

- [ ] Real-time data synchronization with Supabase
- [ ] Advanced map filtering and analysis tools
- [ ] User authentication and profiles
- [ ] Data export functionality (GeoJSON, Shapefile, CSV)
- [ ] 3D map visualization with Mapbox GL
- [ ] Mobile app with React Native
- [ ] Real satellite data integration (ISRO, USGS)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Accessibility improvements (WCAG 2.1 AAA)

## Support & Contact

For issues, questions, or feedback:
- **Email**: planning@telangana.gov.in
- **Phone**: 040-2345-6789
- **Address**: BRKR Bhavan, Tank Bund Road, Hyderabad - 500 063

## License

This project is developed for the Planning Department, Government of Telangana.

## Credits

- Built with [Next.js](https://nextjs.org)
- UI Components by [shadcn/ui](https://ui.shadcn.com)
- Maps by [Leaflet](https://leafletjs.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)
- Hosted on [Vercel](https://vercel.com)
