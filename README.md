# Nice Digital City - Frontend Application

## 🎯 Project Overview

A modern, fully functional hospitality booking platform built with Next.js, React, TypeScript, and Tailwind CSS. This is a **frontend-only** application with mock data and localStorage persistence.

## 🏗️ Architecture

### Tech Stack
- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Data Storage**: Mock JSON + localStorage
- **UI Components**: Custom built components (Card, Button, Input, Select, Modal, etc.)

### No Backend Required
- All data is mocked and stored in localStorage
- Zero backend API calls
- Fully functional offline

## 📁 Folder Structure

```
/nice-digital-city/
├── app/
│   ├── (auth)/              # Authentication routes
│   │   ├── login/
│   │   └── register/
│   ├── (public)/            # Public routes
│   │   ├── page.tsx         # Home
│   │   ├── about/
│   │   ├── accommodation/
│   │   ├── conferencing/
│   │   ├── eat-and-drink/
│   │   ├── activities/
│   │   ├── amenities/
│   │   └── contact/
│   ├── admin/               # Admin routes
│   │   └── dashboard/
│   ├── dashboard/           # User dashboard
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Alert.tsx
│   │   └── Modal.tsx
│   ├── booking/             # Booking components
│   │   ├── BookingModal.tsx
│   │   └── ServiceCard.tsx
│   └── layout/              # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── types.ts             # TypeScript interfaces
│   ├── mock-data.ts         # Mock data for all services
│   ├── context.tsx          # Auth & Booking context
│   ├── utils.ts             # Utility functions
│   └── validation.ts        # Validation schemas (Zod)
├── public/
│   └── images/              # Image assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🔐 Authentication System

### Context-Based Authentication
- **File**: `lib/context.tsx`
- **Provider**: `AuthProvider` + `BookingProvider`
- **State**: localStorage persisted
- **Mock Users**:
  - User: `user@example.com` / `password123`
  - Admin: `admin@example.com` / `admin123`

### Protected Routes
- `/dashboard` - User bookings (requires login)
- `/admin/dashboard` - Admin panel (requires admin role)

## 📋 Mock Data

### Services Available
- **6 Room Types** (rooms.ts)
  - Executive Suite
  - Super Standard Room
  - Garden View Room
  - Road View Room
  - Twin Room
  - Family Room

- **3 Conference Halls** (halls.ts)
  - Simba Hall (500 capacity)
  - VIP Hall (150 capacity)
  - Nyati Hall (200 capacity)

- **5 Restaurants** (restaurants.ts)
  - Main Restaurant
  - Garden Bistro
  - Nice Xpress
  - Choma Zone
  - Nice Club

- **6 Amenities** (amenities.ts)
  - MiniMart
  - Parking
  - Service Bay
  - Gym
  - Swimming Pool
  - Fun Park

- **4 Activities** (activities.ts)
  - City Tour
  - Cooking Class
  - Spa & Wellness
  - Team Building

## 💾 Data Persistence

### localStorage Keys
- `currentUser` - Current logged-in user
- `bookings` - All bookings
- `contactMessages` - Contact form submissions

### Booking Structure
```typescript
{
  id: string;
  userId: string;
  serviceType: string;
  serviceId: string;
  serviceName: string;
  checkInDate: string;
  checkOutDate?: string;
  timeSlot?: string;
  guests: number;
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  notes?: string;
  createdAt: string;
}
```

## 🎨 UI Components

### Available Components
- **Button** - Multiple variants (primary, secondary, outline, ghost, danger)
- **Card** - Flexible card component
- **Input** - Form input with label and error support
- **Select** - Dropdown select component
- **Alert** - Alert/notification component
- **Badge** - Status badge component
- **Modal** - Modal/dialog component

### Features
- Responsive design (mobile-first)
- Dark/light mode support
- Smooth transitions and animations
- Accessible WCAG 2.1 compliant

## 📖 Features

### Public Features
✅ Browse all services (rooms, halls, restaurants, etc.)
✅ Search and filter services
✅ View detailed service information
✅ Contact form
✅ About page
✅ Responsive design

### User Features
✅ Register and login
✅ Create bookings
✅ View booking history
✅ Cancel bookings
✅ Track booking status

### Admin Features
✅ View all bookings
✅ Approve/reject pending bookings
✅ View analytics dashboard
✅ Service count overview
✅ Revenue tracking

## 🚀 How to Run

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Visit `http://localhost:3000`

### Production Build
```bash
npm run build
npm start
```

## 🔗 Page Routes

### Public Routes
- `/` - Home page
- `/about` - About page
- `/accommodation` - Rooms/Suites
- `/conferencing` - Conference Halls
- `/eat-and-drink` - Restaurants
- `/amenities` - Amenities & Services
- `/activities` - Activities & Entertainment
- `/contact` - Contact form

### Authentication Routes
- `/login` - Login page
- `/register` - Registration page

### Protected Routes
- `/dashboard` - User dashboard (requires login)
- `/admin/dashboard` - Admin panel (requires admin role)

## 🎯 Booking Flow

1. User browses services
2. Clicks "Book Now" button
3. Modal appears with booking form
4. User fills in details (dates, time, guests, notes)
5. System calculates total price
6. Booking is created with PENDING status
7. Admin can approve/reject from dashboard
8. User sees booking in dashboard

## 💡 Design Highlights

### Modern UI/UX
- Clean, professional design
- Consistent color scheme (Blue primary)
- Smooth animations and transitions
- Responsive grid layouts
- Card-based design system

### Service-Specific Pages
Each service type has dedicated page with:
- Hero section
- Search/filter functionality
- Grid display of services
- Service cards with details
- Booking integration

### Admin Dashboard
- Real-time statistics
- Pending bookings list
- Booking approval workflow
- Analytics overview
- Service management view

## 🔄 State Management Flow

```
AuthProvider (login/logout/register)
    ↓
BookingProvider (CRUD bookings)
    ↓
useAuth() hook
useBookings() hook
    ↓
Components consume via hooks
    ↓
localStorage auto-syncs
```

## 📝 Validation

### Zod Schemas
- `loginSchema` - Email + password validation
- `registerSchema` - Name, email, password, phone validation
- `bookingSchema` - Service type, dates, guests validation

## 🎨 Color Palette

- **Primary**: Blue (#2563eb)
- **Secondary**: Gray (#6b7280)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#dc2626)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## ✅ Complete Feature List

- ✅ Mock data system
- ✅ localStorage persistence
- ✅ User authentication
- ✅ Admin role system
- ✅ Booking creation
- ✅ Booking management
- ✅ Search & filter
- ✅ Responsive design
- ✅ Contact form
- ✅ Dashboard analytics
- ✅ Admin dashboard
- ✅ Error handling
- ✅ Smooth UI transitions

## 🔒 Security (Frontend Only)

- Password stored locally (demo only)
- No real authentication backend
- Client-side validation
- XSS protection via React
- CSRF N/A (no backend)

## 🚧 Demo Credentials

### User Account
- **Email**: user@example.com
- **Password**: password123
- **Role**: USER

### Admin Account
- **Email**: admin@example.com
- **Password**: admin123
- **Role**: ADMIN

## 📞 Support

For issues or questions, please contact:
- Email: info@nicedigitalcity.com
- Phone: +254 (0) 123 456 789

---

**Last Updated**: May 2026
**Version**: 1.0.0
