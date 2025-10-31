# GanitAI Website

A modern, responsive website for GanitAI - GenAI Adaptive Numeracy Improvement & Training, a nonprofit organization focused on improving access to quality education through innovative AI-driven math learning tools.

## Project Theme

**Quality Education** – Projects that improve access to education, promote lifelong learning, or enhance teaching and learning experiences.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Animated Statistics Counter**: Rising counter animation on the homepage showing impact metrics
- **Video Testimonials Carousel**: Interactive carousel for testimonial videos
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Four Main Pages**:
  - Home: Overview of GanitAI with features and statistics
  - Research: Evidence-based research and validation data
  - Impact: Story of the organization's journey and impact
  - Contact: Contact form and information

## File Structure

```
ganitai/
├── index.html          # Home page
├── research.html       # Research page
├── impact.html         # Impact page
├── contact.html        # Contact page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── testimonials/       # Folder for testimonial videos
└── README.md          # This file
```

## Adding Testimonial Videos

1. Place your video files (`.mp4`, `.webm`, `.ogg`, or `.mov`) in the `testimonials/` folder
2. Open `script.js` and find the `videos` array in the `initVideoCarousel()` function
3. Add your video filenames to the array:

```javascript
const videos = [
    'testimonial1.mp4',
    'testimonial2.mp4',
    'testimonial3.mp4',
    'testimonial4.mp4',
];
```

The carousel will automatically create navigation controls and indicators for all videos.

## Running the Website

Simply open `index.html` in a web browser. For best results, use a local web server:

```bash
# Using Python 3
python3 -m http.server 8000

# Using Python 2
python -m SimpleHTTPServer 8000

# Using Node.js (with http-server installed)
npx http-server
```

Then navigate to `http://localhost:8000` in your browser.

## Customization

- **Colors**: Edit the CSS variables in `styles.css` under `:root` to change the color scheme
- **Content**: Update HTML files directly to modify text content
- **Statistics**: Update the counter targets in `index.html` (data-target attributes)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The contact form currently shows a success message on submission. For production use, connect it to a backend service or email handler.
- Video carousel requires videos to be added manually to the `videos` array in `script.js` for now.

## License

© 2024 GanitAI. All rights reserved. Nonprofit Organization.

