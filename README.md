# Portfolio Website

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Modern UI/UX**: Clean and professional design
- **Interactive Animations**: Smooth animations using Framer Motion
- **Contact Form**: Functional contact form with EmailJS integration
- **SEO Optimized**: Proper meta tags and structure
- **Fast Loading**: Optimized for performance

## Sections

1. **Home**: Welcome message with animated titles
2. **About**: Personal introduction and statistics
3. **Skills**: Technical skills and tools
4. **Education**: Academic background
5. **Experience**: Projects and internships
6. **Awards**: Achievements and recognition
7. **Contact**: Contact form and information

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons
- EmailJS
- React Hook Form

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create a service and template
   - Update the EmailJS configuration in `src/components/Contact.tsx`

4. Add your images:
   - Add your profile image as `public/images/profile.webp`
   - Add your professional image as `public/images/professional.webp`
   - Add education images as needed

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

### Personal Information

Update the following files with your personal information:
- `src/components/Hero.tsx` - Update name and titles
- `src/components/About.tsx` - Update personal description
- `src/components/Skills.tsx` - Update skills and technologies
- `src/components/Education.tsx` - Update education details
- `src/components/Experience.tsx` - Update projects and experience
- `src/components/Awards.tsx` - Update achievements
- `src/components/Contact.tsx` - Update contact information

### Styling

The website uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Global styles in `src/styles/globals.css`
- Component-specific styles in individual components

### EmailJS Setup

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service (Gmail, Outlook, etc.)
3. Create an email template
4. Update the following in `src/components/Contact.tsx`:
   - `YOUR_PUBLIC_KEY`
   - `YOUR_SERVICE_ID`
   - `YOUR_TEMPLATE_ID`
   - Your email address

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds

### Other Platforms

The project can be deployed to any platform that supports Next.js:
- Netlify
- Heroku
- AWS
- DigitalOcean

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

VANN Seavlong - vannseavlong@gmail.com

Project Link: [https://github.com/vannseavlong/portfolio](https://github.com/vannseavlong/portfolio)
