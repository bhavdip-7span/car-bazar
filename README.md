🚗 Car Bazar – Used Car Listing Platform
-----------------------------------------------
Car Bazar is a modern used car marketplace built with Next.js and TypeScript, allowing users to browse, search, filter, and explore used cars with a fast and responsive experience. The platform provides advanced filtering, sorting, SEO-friendly pages, recently viewed cars, smooth animations, and optimized image delivery for a seamless car-buying journey.

## Features

| Feature                 | Description                                                |
| ----------------------- | ---------------------------------------------------------- |
| 🚘 Car Listings         | Browse and explore used car listings                       |
| 🔍 Advanced Search      | Search cars by brand,model and variant and filters                        |
| 🎯 Smart Filtering      | Filter cars by price, year, brand, fuel type, and more     |
| 📊 Sorting Options      | Sort cars by relevance, price, year           |
| 👀 Recently Viewed      | Quickly access recently viewed cars                        |
| 📱 Responsive Design    | Optimized for mobile, tablet, and desktop devices          |
| ⚡ Performance Optimized | Fast loading and smooth user experience                    |
| 🖼️ Image Optimization  | Optimized image delivery with Cloudinary                   |
| 🎨 Modern Animations    | Smooth interactions using Framer Motion and Lottie         |
| 🔎 SEO Friendly         | Optimized metadata, structured URLs, and search visibility |
| 📦 PWA Support          | Installable app with offline capabilities                  |



## Tech Stack

| Feature | Technology |
|----------|----------|
| Frontend Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Backend & Database | Supabase |
| State Management | Zustand |
| Image Management | Cloudinary |
| Animations | Framer Motion |
| Loading Animations | Lottie |
| Icons | Lucide React |
| Progressive Web App | next-pwa |
| Deployment | Vercel |


## 📂 Project Structure

```bash
src
├── app/                    # Next.js App Router pages and layouts
├── components/
│   ├── car-details/        # Car details page components
│   ├── car-listing/        # Car listing page components
│   ├── common/             # Shared reusable components
│   ├── home/               # Home page components
│   ├── icons/              # Custom SVG and icon components
│   └── ui/                 # Reusable UI components
├── constant/              # Application constants
├── hook/                  # Custom React hooks
├── lib/                   # Utility libraries and configurations
├── service/               # API and data fetching services
├── store/                 # Zustand state management stores
├── types/                 # TypeScript type definitions
├── utils/                 # Helper utility functions
└── ...
```
## 🚀 Installation

### Prerequisites

Make sure you have installed:

* Node.js (v18 or later)
* npm, yarn, pnpm, or bun
* Supabase Project
* Cloudinary Account

### Clone the Repository

```bash id="3j0e2l"
git clone https://github.com/bhavdip-7span/car-bazar.git
cd car-bazar
```

### Install Dependencies

```bash id="8r0s8g"
pnpm install
```

### Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
```

### Run Development Server

```bash id="juzjls"
pnpm run dev 
```

Open http://localhost:3000 in your browser.

### Build for Production

```bash id="2sbxmq"
pnpm run build
```

---

## 📜 Available Scripts

```bash id="f0x3zl"
pnpm run dev      # Start development server
pnpm run build    # Create production build
pnpm run start    # Start production server
pnpm run lint     # Run ESLint
```

---

## 🌟 Key Highlights

* SEO Optimized with dynamic metadata
* Progressive Web App (PWA)
* Responsive Design
* Cloudinary Image Optimization
* Zustand State Management
* Advanced Search & Filtering
* Type-Safe Development with TypeScript
* Smooth Animations using Framer Motion & Lottie
* Fast Performance with Next.js App Router

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch

```bash id="m56bl4"
git checkout -b feature/your-feature-name
```

3. Commit your changes

```bash id="r6x25o"
git commit -m "feat: add new feature"
```

4. Push to your branch

```bash id="jdj0ta"
git push origin feature/your-feature-name
```

5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

## 🚀 Core Features

### 🔍 Advanced Search & Filtering

Users can quickly find cars using multiple filtering options:

* Brand
* Fuel Type
* Transmission
* Body Type
* Ownership
* Registration Year
* Price Range
* KM Driven
* engine cc
* color
* seats
* model
* km driven
  

### 📊 Smart Sorting

Sort vehicles based on:

* Price: Low to High
* Price: High to Low
* Newest First
* Oldest First
* KM: Low to High
* KM: High to Low

### ⚖️ Car Comparison

Compare multiple cars side-by-side to evaluate:

* Price
* Specifications
* Fuel Type
* Transmission
* Mileage
* Ownership Details
* power
* km driven
* mileage

### ♾️ Infinite Scroll Pagination

Seamlessly browse car listings with automatic loading as users scroll.

### 👀 Recently Viewed Cars

Quickly revisit previously viewed vehicles without searching again.

### 🖼️ Optimized Image Gallery

High-quality images delivered through Cloudinary with optimized loading.

### 🔎 SEO Optimized

* Dynamic Metadata
* SEO-Friendly URLs
* Open Graph Tags
* Structured Data

### 📱 Progressive Web App (PWA)

* Installable on mobile and desktop
* Offline support
* Fast loading experience

### ⚡ Performance Focused

* Next.js App Router
* Server Components
* Optimized image delivery
* Efficient state management with Zustand

| `types`       | TypeScript interfaces and types                      |
| `utils`       | Utility and helper functions                         |

```
```

