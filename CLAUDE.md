# Giovanni Londi - Design & Development Preferences

## Design Philosophy

### Aesthetic Preferences
- **Minimalistic Design**: Clean, uncluttered layouts with focus on content
- **Professional & Eye-catching**: Balance between sophistication and visual appeal
- **Whitespace Management**: Strategic use of negative space for breathing room
- **Accessible Design**: Easy to navigate and understand for all users

### Visual Style
- **Typography**:
  - System fonts preferred: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif`
  - Light font weights (200-400) for headings
  - Letter spacing adjustments for refinement
  - Clear hierarchy through size and weight

- **Color Palette**:
  - Neutral base: blacks, whites, grays
  - Minimal use of color for maximum impact
  - High contrast for readability
  - Subtle hover effects with opacity changes

- **Layout**:
  - Fixed navigation with backdrop blur
  - Full-screen hero sections with background images
  - Grid-based content sections
  - Centered, max-width containers (1200px typical)
  - Responsive design for all devices

### Interaction & Animation
- **Subtle Transitions**: 0.3s-0.5s ease for hover effects
- **Smooth Scrolling**: `scroll-behavior: smooth`
- **Hover Effects**:
  - Opacity changes
  - Transform (translateY, scale)
  - Color transitions
- **No Heavy Animations**: Keep performance in mind

## Technical Preferences

### Technology Stack
- **Pure HTML5/CSS3**: No frameworks unless necessary
- **Vanilla JavaScript**: For navigation and interactions
- **Single-Page Architecture**: JavaScript-powered page transitions
- **Semantic HTML**: Proper use of tags for accessibility

### Code Structure
- **Separated Files**: External CSS (styles.css) and JavaScript (script.js) files for clean, maintainable structure
- **Clean Code**: Well-organized, readable, maintainable
- **Performance First**: Optimized images, minimal JavaScript
- **Accessibility**: WCAG compliance, proper contrast ratios

### Layout Patterns
- **Navigation**: Fixed header with blur backdrop
- **Page Sections**: Hide/show with `.active` class
- **Responsive Grid**: `repeat(auto-fit, minmax(350px, 1fr))`
- **Padding Scale**:
  - Desktop headers: `8rem 5% 2rem`
  - Desktop content: `1rem 5% 4rem`
  - Mobile adjustments: Reduce by ~1rem

### Component Preferences
- **Project Cards**:
  - Image preview with hover zoom
  - Clean info sections
  - Bordered, subtle shadows

- **Automation Cards**:
  - Flexbox layout (`display: flex; flex-direction: column`)
  - Info section with `flex: 1` to ensure equal card heights
  - Tags aligned at bottom with `margin-top: auto`
  - Ensures all cards have tags at same vertical position

- **Contact Sections**:
  - Two-column grid on desktop
  - Stacked on mobile
  - Clear labels with large, readable values

- **Navigation Buttons**:
  - Black background with white text
  - Smooth hover transitions
  - Letter spacing for clarity

## Project Workflow

### When Starting a New Project
1. Understand the minimalist aesthetic requirement
2. Use existing portfolio as style reference
3. Prioritize content visibility (avoid excessive scrolling)
4. Implement responsive design from the start
5. Test on multiple screen sizes

### Design Decisions
- **Always prefer**: Clean over cluttered, simple over complex
- **Spacing**: More whitespace is better than cramped layouts
- **Images**: Full-width with proper aspect ratios
- **Typography**: Clear hierarchy, readable sizes
- **Mobile**: Ensure critical content is visible without scrolling

### Quality Standards
- ✅ Fast loading times
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth transitions and interactions
- ✅ Accessible for all users
- ✅ Clean, maintainable code
- ✅ Professional appearance
- ✅ Minimalist aesthetic

## Reference Projects

### Portfolio Site (giovanni-londi-portfolio.html)
- Hero section with background image and subtle overlay
- Single-page navigation with JavaScript
- Project cards with screenshots
- Detailed project pages with descriptions
- Contact and reviews sections
- Full responsive design

### Style Inspiration (sitotommimiosito.html)
- Minimal color palette
- Clean typography
- Strategic use of whitespace
- Subtle animations
- Professional aesthetic

## Automation Services Offered

### Email Marketing Automation - €19.99/month
- Custom HTML email templates
- Email list management & segmentation
- Real-time open & click tracking
- Customer retention campaigns
- GDPR compliant infrastructure

### Personal Assistant Automation - €19.99/month
- Intelligent email management
- Automated responses with AI
- Google Calendar integration
- Meeting confirmations & scheduling
- OAuth 2.0 secure authentication

### Form Automation & Data Management - €19.99/month
- Automatic confirmation & thank you emails
- Google Sheets database integration
- GDPR-compliant consent management
- Real-time data organization & cataloging
- Unlimited form submissions with automatic backup

### AI Chatbot Integration - €49.99/month
- Custom-trained on business data
- 24/7 instant customer support
- Lead qualification & data collection
- Seamless website integration
- Unlimited conversations with ongoing optimization

### Automation Design Principles
- **GDPR Compliance**: All services use OAuth 2.0, never store passwords
- **EU Infrastructure**: Primary storage and processing within GDPR jurisdiction
- **Minimal Data Access**: Only access data strictly necessary for automation
- **Revocable Access**: Clients maintain full control and can revoke access anytime
- **Monthly Subscriptions**: Flexible pricing, no long-term contracts
- **Professional Support**: Ongoing support, updates, and optimization included

## Notes
- Avoid emojis unless explicitly requested
- Focus on functionality and aesthetics equally
- Always consider mobile users
- Keep file sizes optimized
- Prioritize user experience over complex features
