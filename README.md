# ARTHIVE - Art Gallery Platform

## Overview

ARTHIVE is an elegant and minimal web platform where artists can showcase their artwork and art enthusiasts can discover amazing pieces. Built with HTML, CSS, and JavaScript, it provides a clean, aesthetic interface for browsing, searching, and interacting with art.

## Features

### 🎨 Artist Features
- **Portfolio Creation**: Artists can create profiles and upload their artwork
- **Artwork Management**: Upload images with titles, descriptions, tags, and categories
- **Artist Profiles**: Dedicated pages showcasing artist information and their complete portfolio
- **Analytics**: Track likes, saves, and views on artwork

### 👥 User Features
- **Browse Gallery**: Explore artworks by category (painting, digital, photography, sculpture, mixed)
- **Search Functionality**: Search artworks by title, artist name, or tags
- **Interactive Actions**: Like, save, and comment on artworks
- **Artist Discovery**: Browse and follow favorite artists
- **Responsive Design**: Beautiful experience on all devices

### 🎯 Platform Features
- **Minimal UI/UX**: Clean, aesthetic design with subtle animations
- **Category Filtering**: Filter artworks by type
- **Modal Views**: Detailed artwork and artist views in elegant modals
- **Data Persistence**: RESTful API integration for data storage
- **Sample Data**: Pre-loaded with beautiful artwork samples

## Design Philosophy

The platform follows a **minimal aesthetic** with:
- **Soft color palette**: Muted blues, purples, and neutrals
- **Clean typography**: Inter font family for modern readability
- **Subtle animations**: Gentle hover effects and transitions
- **Glassmorphism**: Light glass-like panels with backdrop blur
- **Ample whitespace**: Breathing room between elements

## Pages & Navigation

### 1. Home Page (`#home-page`)
- Clean hero section with elegant call-to-action
- Featured artworks in a minimal grid
- Trending artists showcase with subtle animations
- Simple navigation to other sections

### 2. Gallery Page (`#gallery-page`)
- Grid view of all artworks with clean cards
- Category filters (All, Paintings, Digital, Photography, Sculpture)
- Search functionality with instant results
- Click artwork for detailed modal view

### 3. Artists Page (`#artists-page`)
- Browse all artists in elegant cards
- Artist information with bio and stats
- Click to view full artist profile modal

### 4. Upload Page (`#upload-page`)
- Minimal artwork upload form
- Image preview with fallback placeholders
- Category and tag selection
- Drag-and-drop file upload

### 5. Artwork Detail Modal
- Full-size artwork display
- Detailed information
- Like and save functionality
- Artist profile link

### 6. Artist Profile Modal
- Artist information
- Portfolio showcase
- Follow functionality
- Artwork statistics

## Data Models

### Artworks Table
- `id`: Unique identifier
- `title`: Artwork title
- `description`: Detailed description
- `image_url`: Image URL
- `category`: Category (painting, digital, photography, sculpture, mixed)
- `tags`: Array of tags
- `artist_id`: Artist reference
- `artist_name`: Artist name
- `likes`: Like count
- `saves`: Save count
- `views`: View count
- `created_at`: Creation timestamp

### Artists Table
- `id`: Unique identifier
- `name`: Artist name
- `bio`: Artist biography
- `avatar`: Avatar URL or initials
- `followers`: Follower count
- `artwork_count`: Number of artworks
- `joined_at`: Registration date

### Users Table
- `id`: Unique identifier
- `username`: Username
- `email`: Email address
- `bio`: User bio
- `avatar`: Avatar URL
- `role`: User role (artist, viewer)
- `created_at`: Registration date

### Comments Table
- `id`: Unique identifier
- `artwork_id`: Artwork reference
- `user_id`: User reference
- `user_name`: User name
- `content`: Comment content
- `created_at`: Creation timestamp

### Likes Table
- `id`: Unique identifier
- `artwork_id`: Artwork reference
- `user_id`: User reference
- `created_at`: Creation timestamp

### Follows Table
- `id`: Unique identifier
- `follower_id`: Follower user ID
- `following_id`: Following user ID
- `created_at`: Creation timestamp

## Technical Implementation

### Frontend Technologies
- **HTML5**: Semantic structure with modern elements
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript ES6+**: Modern JavaScript with classes and async/await
- **Font Awesome**: Icons throughout the interface
- **Google Fonts**: Typography (Inter and Playfair Display)

### Key JavaScript Features
- **Class-based Architecture**: Organized code structure
- **Event Delegation**: Efficient event handling
- **Modal Management**: Smooth modal interactions
- **Image Preview**: Client-side image preview functionality
- **Form Validation**: Client-side form validation
- **Responsive Navigation**: Mobile-friendly navigation

### CSS Features
- **CSS Custom Properties**: Consistent theming
- **CSS Grid & Flexbox**: Responsive layouts
- **Smooth Animations**: Subtle hover effects and transitions
- **Mobile-first Design**: Responsive breakpoints
- **Minimal Color Scheme**: Elegant, simplified color palette

## Recent Improvements
- **Simplified Aesthetic**: Reduced color palette for elegant minimalism
- **Image Fallbacks**: Placeholder images when artwork images fail to load
- **Enhanced Performance**: Optimized animations and reduced visual noise
- **Better Typography**: Clean font hierarchy with Inter family

## File Structure

```
ARTHIVE/
├── index.html              # Main HTML file
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── app.js             # Main JavaScript file
└── README.md              # This file
```

## API Integration

The platform includes RESTful API endpoints for data management:

- `GET /tables/{table}` - List records with pagination
- `GET /tables/{table}/{id}` - Get single record
- `POST /tables/{table}` - Create new record
- `PUT /tables/{table}/{id}` - Update record
- `PATCH /tables/{table}/{id}` - Partial update
- `DELETE /tables/{table}/{id}` - Delete record

## Usage Instructions

### Browsing Artworks
1. Navigate to the Gallery page
2. Use category filters to browse specific types
3. Click on any artwork to view details
4. Use like/save buttons to interact

### Searching
1. Use the search bar in the navigation
2. Search by artwork title, artist name, or tags
3. Results appear instantly as you type

### Artist Profiles
1. Click on artist names or visit the Artists page
2. View artist information and portfolio
3. Follow artists to stay updated

### Uploading Artwork
1. Navigate to the Upload page
2. Fill in the form with artwork details
3. Select an image file
4. Add relevant tags and category
5. Submit to publish your artwork

## Responsive Design

The platform is fully responsive with breakpoints for:
- **Desktop**: 1200px+ (Multi-column layouts)
- **Tablet**: 768px-1199px (Adjusted grids)
- **Mobile**: <768px (Single column layouts)

## Performance Features

- **Lazy Loading**: Images load as needed
- **Optimized Images**: Responsive image sizing
- **Efficient JavaScript**: Minimal DOM manipulation
- **CSS Optimizations**: Modern CSS features for performance

## Future Enhancements

Potential features for expansion:
- User authentication system
- Advanced search filters
- Artwork comments and discussions
- Artist verification system
- Artwork collections and albums
- Social sharing features
- Mobile app development
- AI-powered art recommendations
- Virtual gallery tours
- Artwork printing services

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Deployment

To deploy this project:
1. Host the static files on any web server
2. Ensure CORS is configured for API access
3. Configure the RESTful API endpoints
4. Test all functionality in production environment

## Demo Data

The platform comes pre-loaded with:
- 6 Artists with profiles
- 6 Artworks across different categories
- 1 Demo user account
- Realistic engagement metrics (likes, saves, views)

## License

This project is created for educational and demonstration purposes. Feel free to use and modify as needed for your projects.

---

**ARTHIVE** - Discover Amazing Art, Connect with Talented Artists