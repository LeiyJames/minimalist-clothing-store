# Minimalist Clothing Store

A modern, minimalist e-commerce platform built with Next.js 13, featuring smooth animations, 3D product visualization, and a clean shopping experience.

![Minimalist Clothing Store](https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200&h=600)

## ✨ Features

### 🛍️ E-commerce Functionality
- **Product Catalog**: Browse curated collections with filtering
- **Shopping Cart**: Add items with size/color variants
- **Checkout Process**: Complete purchase flow with order summary
- **Product Details**: Detailed product pages with multiple images

### 🎨 Design & UI/UX
- **Minimalist Design**: Clean, modern interface following design principles
- **Dark/Light Mode**: Seamless theme switching
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Powered by Framer Motion for fluid interactions

### 🖼️ Visual Experience
- **Image Optimization**: Next.js Image component for fast loading
- **Fabric Textures**: Rotating fabric showcase (Cotton, Denim, Linen)
- **Lookbook Gallery**: Curated fashion photography
- **3D Product Viewer**: Interactive 3D models (React Three Fiber)

### 🚀 Performance & Technical
- **Next.js 13**: Latest App Router with Server Components
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first styling with custom design tokens
- **Optimized Loading**: Image optimization and smooth scrolling

## 🛠️ Tech Stack

- **Framework**: Next.js 13.5.6
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **3D Graphics**: React Three Fiber + Three.js
- **Icons**: Heroicons
- **UI Components**: Headless UI
- **Smooth Scrolling**: Lenis
- **Theme**: next-themes

## 📁 Project Structure

```
src/
├── app/                    # Next.js 13 App Router
│   ├── about/             # About page
│   ├── checkout/          # Checkout flow
│   ├── collection/        # Product collections
│   ├── lookbook/          # Fashion lookbook
│   └── product/[id]/      # Dynamic product pages
├── components/
│   ├── animations/        # Reusable animations
│   ├── cart/             # Shopping cart components
│   ├── layout/           # Layout components
│   ├── navigation/       # Navigation components
│   ├── product/          # Product-related components
│   ├── providers/        # Context providers
│   ├── sections/         # Page sections
│   └── ui/               # UI components
├── constants/            # App constants and configurations
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── styles/               # Global styles
└── types/                # TypeScript type definitions

public/
└── images/
    ├── fabrics/          # Fabric texture images
    ├── lookbook/         # Lookbook photography
    └── products/         # Product images
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/minimalist-clothing-store.git
   cd minimalist-clothing-store
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📱 Pages & Features

### Home Page
- Hero section with smooth scrolling
- Featured collections showcase
- Fabric texture animations
- Lookbook preview

### Collection Page
- Filter by categories (All, Essentials, New Arrivals, Best Sellers)
- Product grid with hover effects
- Add to cart functionality

### Product Page
- High-quality product images
- Size and color selection
- 3D model viewer (where available)
- Detailed product information
- Add to cart with variants

### Checkout Page
- Order summary
- Shipping information form
- Payment method selection
- Floating back navigation

### Additional Pages
- **About**: Company story and fabric showcase
- **Lookbook**: Fashion photography gallery

## 🎨 Design System

### Color Palette
- **Primary**: Clean whites and soft grays
- **Accent**: Deep blacks for contrast
- **Theme Support**: Automatic dark/light mode switching

### Typography
- **Font**: Inter (Google Fonts)
- **Hierarchy**: Consistent heading and body text scaling
- **Readability**: Optimized for all screen sizes

### Components
- **Cards**: Product cards with hover animations
- **Buttons**: Consistent styling with hover states
- **Forms**: Clean input design with validation states
- **Navigation**: Floating and static navigation options

## 🛒 Shopping Experience

### Cart Management
- Add items with size/color variants
- Quantity adjustment with (+) and (-) controls
- Remove items from cart
- Real-time total calculation
- Persistent cart state

### Product Variants
- **Sizes**: XS, S, M, L, XL
- **Colors**: Multiple color options per product
- **Unique Items**: Cart handles same product with different variants

## 🎭 Animations & Interactions

- **Scroll Animations**: Reveal animations on scroll
- **Hover Effects**: Subtle product card animations
- **Page Transitions**: Smooth navigation between pages
- **Loading States**: Skeleton loaders and suspense
- **Micro-interactions**: Button press feedback

## 📱 Responsive Design

- **Mobile First**: Designed for mobile, enhanced for desktop
- **Breakpoints**: Tailored for phone, tablet, and desktop
- **Touch Friendly**: Optimized for touch interactions
- **Performance**: Fast loading on all devices

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Quality
- **ESLint**: Configured with Next.js recommended rules
- **TypeScript**: Strict mode enabled
- **Prettier**: Code formatting (recommended)
- **Git Hooks**: Pre-commit linting (optional)

## 🎯 Future Enhancements

- [ ] User authentication and accounts
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced filtering and search
- [ ] Payment integration (Stripe)
- [ ] Inventory management
- [ ] Email notifications
- [ ] Analytics integration

## 📈 Performance

- **Lighthouse Score**: Optimized for Core Web Vitals
- **Image Optimization**: WebP/AVIF format support
- **Code Splitting**: Automatic route-based splitting
- **Bundle Size**: Optimized with tree shaking

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Minimalist fashion brands
- **Images**: Unsplash for hero and placeholder images
- **Icons**: Heroicons for consistent iconography
- **Fonts**: Google Fonts for typography

> This project demonstrates modern e-commerce development practices with a focus on performance, user experience, and maintainable code.
