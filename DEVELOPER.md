# Developer Guide - Nice Digital City

## 🏗️ Architecture Overview

### Frontend-Only Application
```
┌─────────────────────────────────────────┐
│         Browser (Client-Side)            │
├─────────────────────────────────────────┤
│  Next.js App Router (React Components)   │
│  ├── Pages (Public, Auth, Protected)    │
│  ├── Components (UI, Layout, Booking)   │
│  └── Hooks (useAuth, useBookings)      │
├─────────────────────────────────────────┤
│  Context API (State Management)          │
│  ├── AuthContext (User, login, logout)  │
│  └── BookingContext (Bookings CRUD)     │
├─────────────────────────────────────────┤
│  Browser Storage (Persistence)           │
│  ├── localStorage (bookings, user)      │
│  └── sessionStorage (optional)          │
└─────────────────────────────────────────┘
```

## 🎯 State Flow

### Authentication Flow
```
Login Page → login() → AuthContext → localStorage
                           ↓
                       setUser(userData)
                           ↓
                    Redirect to dashboard
                           ↓
                    useAuth() hook reads user
                           ↓
                    Protected routes check user
```

### Booking Flow
```
Browse Service → BookingModal → User fills form → BookingContext.addBooking()
                                      ↓
                               localStorage.setItem('bookings')
                                      ↓
                                Dashboard displays booking
                                      ↓
                          Admin can approve/reject
```

## 📁 File Organization

### `/app` - Routes & Pages
```
app/
├── (auth)/
│   ├── login/page.tsx          # Login UI
│   └── register/page.tsx       # Register UI
├── (public)/
│   ├── page.tsx                # Home page
│   ├── accommodation/page.tsx   # Rooms list
│   ├── about/page.tsx          # About page
│   └── ...                     # Other service pages
├── admin/
│   └── dashboard/page.tsx      # Admin panel
├── dashboard/
│   └── page.tsx                # User bookings
├── layout.tsx                  # Root layout with providers
└── globals.css                 # Global styles
```

### `/components` - Reusable UI
```
components/
├── ui/
│   ├── Button.tsx              # Reusable button
│   ├── Card.tsx                # Card component
│   ├── Input.tsx               # Form input
│   ├── Select.tsx              # Dropdown
│   ├── Alert.tsx               # Alerts & badges
│   └── Modal.tsx               # Modal dialog
├── booking/
│   ├── BookingModal.tsx        # Booking form modal
│   └── ServiceCard.tsx         # Service display card
└── layout/
    ├── Header.tsx              # Navigation header
    └── Footer.tsx              # Footer
```

### `/lib` - Logic & Data
```
lib/
├── types.ts                    # TypeScript interfaces
├── mock-data.ts                # All mock data (rooms, halls, etc.)
├── context.tsx                 # Auth & Booking context
├── utils.ts                    # Utility functions
└── validation.ts               # Zod schemas (optional)
```

## 🔌 Adding New Features

### 1. Add New Service Type

**Step 1: Update mock-data.ts**
```typescript
export const newServices: YourServiceType[] = [
  {
    id: 'service-1',
    name: 'Service Name',
    description: 'Description',
    price: 100,
    image: '/images/...',
    // other fields
  },
];
```

**Step 2: Create page**
```typescript
// app/(public)/new-service/page.tsx
'use client';
import { ServiceCard } from '@/components/booking/ServiceCard';
import { newServices } from '@/lib/mock-data';

export default function NewServicePage() {
  return (
    <div>
      {newServices.map(service => (
        <ServiceCard key={service.id} {...service} serviceType="NEW_TYPE" />
      ))}
    </div>
  );
}
```

**Step 3: Update Header navigation**
```typescript
// components/layout/Header.tsx
const navLinks = [
  // ... existing links
  { href: '/new-service', label: 'New Service' },
];
```

### 2. Add New UI Component

```typescript
// components/ui/MyComponent.tsx
import React from 'react';
import { cn } from '@/lib/utils';

interface MyComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'custom';
}

export function MyComponent({ className, variant = 'default', ...props }: MyComponentProps) {
  return (
    <div
      className={cn('base-styles', variant && `variant-${variant}`, className)}
      {...props}
    />
  );
}
```

### 3. Extend Booking Logic

**Add new booking type:**
```typescript
// lib/context.tsx
const addBooking = (booking: Booking) => {
  // Add custom logic here
  const updated = [...bookings, booking];
  saveBookings(updated);
  // Optional: trigger email, notification, etc.
};
```

### 4. Add Form Validation

```typescript
// lib/validation.ts
import { z } from 'zod';

export const myFormSchema = z.object({
  field1: z.string().min(1, 'Required'),
  field2: z.number().positive(),
});

export type MyFormInput = z.infer<typeof myFormSchema>;
```

## 🎨 Styling Guide

### Tailwind Configuration
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // Blue
        secondary: '#6b7280', // Gray
      },
    },
  },
};
```

### Creating Responsive Layouts
```typescript
// Mobile-first approach
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Columns adjust at breakpoints */}
</div>
```

### Common Utility Classes
```
Spacing: p-4, m-2, gap-6, px-4
Display: flex, grid, block, hidden
Sizing: w-full, h-screen, max-w-4xl
Colors: bg-blue-600, text-gray-700, border-gray-200
Typography: font-bold, text-lg, leading-relaxed
```

## 🧪 Testing Checklist

### Component Testing
- [ ] Component renders without errors
- [ ] Props are applied correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Hover states work
- [ ] Disabled states work

### Feature Testing
- [ ] Create booking
- [ ] View bookings
- [ ] Update booking
- [ ] Cancel booking
- [ ] Admin approve/reject
- [ ] Data persists in localStorage

### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

## 🚀 Performance Tips

### Code Splitting
```typescript
// Lazy load components
const AdminDashboard = dynamic(() => import('@/app/admin/dashboard'), {
  loading: () => <p>Loading...</p>,
});
```

### Image Optimization
```typescript
// Use Next.js Image component
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={400}
  height={300}
  priority // for above-the-fold
/>
```

### Memoization
```typescript
import { useMemo } from 'react';

const memoizedData = useMemo(() => {
  return expensiveOperation(data);
}, [data]);
```

## 🔄 Data Flow Examples

### Reading User Data
```typescript
const { user } = useAuth();
console.log(user?.email);
```

### Creating Booking
```typescript
const { addBooking } = useBookings();

addBooking({
  id: 'booking-123',
  userId: user.id,
  serviceType: 'ROOM',
  // ... other fields
});
```

### Updating Booking
```typescript
const { updateBooking } = useBookings();

updateBooking('booking-123', { status: 'CONFIRMED' });
```

## 🛠️ Debugging

### Enable Console Logs
```typescript
// In context.tsx
const addBooking = (booking: Booking) => {
  console.log('Adding booking:', booking);
  // ...
};
```

### Check localStorage
```javascript
// In browser console
localStorage.getItem('currentUser')
localStorage.getItem('bookings')
JSON.parse(localStorage.getItem('bookings'))
```

### React DevTools
- Install React DevTools browser extension
- Inspect component tree
- Track state changes

### Network Tab
- Check API calls (if backend added)
- Monitor performance

## 📝 Code Style Guide

### Naming Conventions
```typescript
// Components: PascalCase
export function MyComponent() {}

// Hooks: camelCase, start with 'use'
export function useMyHook() {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRY_ATTEMPTS = 3;

// Files: kebab-case
my-component.tsx
```

### Component Structure
```typescript
'use client'; // Client component

import React from 'react';
import { useMyHook } from '@/lib/hooks';

// Props interface
interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

// Component
export function MyComponent({ title, onClick }: MyComponentProps) {
  return <div onClick={onClick}>{title}</div>;
}
```

## 🚢 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Environment Variables
Create `.env.local`:
```
NEXT_PUBLIC_APP_NAME=Nice Digital City
```

### Hosting Options
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Heroku

## 🔐 Security Considerations

### Never Store Sensitive Data
```typescript
// ❌ Don't do this
localStorage.setItem('password', password);

// ✅ Do this (if needed at all)
localStorage.setItem('authToken', hashedToken);
```

### Input Validation
```typescript
// Always validate user input
const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

### XSS Protection
- React automatically escapes content
- Never use `dangerouslySetInnerHTML`

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🤝 Contributing

### Before Committing
1. Run linter: `npm run lint`
2. Test all features
3. Check browser console for errors
4. Verify localStorage persistence

### Git Workflow
```bash
git add .
git commit -m "feat: describe change"
git push origin feature-branch
```

---

**Last Updated**: May 2026
