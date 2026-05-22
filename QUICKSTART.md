# Quick Start Guide - Nice Digital City

## Installation & Setup

### 1. Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:3000**

## 🎯 Testing the Application

### Demo Accounts

#### Regular User
```
Email: user@example.com
Password: password123
```

#### Admin User
```
Email: admin@example.com
Password: admin123
```

## 📍 Key Pages to Explore

### Public Pages
- **Home** - `http://localhost:3000/`
- **Accommodation** - `http://localhost:3000/accommodation`
- **Conferencing** - `http://localhost:3000/conferencing`
- **Dining** - `http://localhost:3000/eat-and-drink`
- **Amenities** - `http://localhost:3000/amenities`
- **Activities** - `http://localhost:3000/activities`
- **About** - `http://localhost:3000/about`
- **Contact** - `http://localhost:3000/contact`

### Authentication Pages
- **Login** - `http://localhost:3000/login`
- **Register** - `http://localhost:3000/register`

### Protected Pages
- **User Dashboard** - `http://localhost:3000/dashboard`
  - View your bookings
  - Cancel bookings
  - Booking status tracking

- **Admin Dashboard** - `http://localhost:3000/admin/dashboard`
  - View all bookings
  - Approve/reject pending bookings
  - View analytics
  - Service statistics

## 🔄 Testing Workflow

### 1. Register or Login
- Use demo credentials above or create a new account
- Check localStorage: `currentUser` is saved

### 2. Browse Services
- Visit any service page (rooms, halls, restaurants, etc.)
- Use search and filter functionality
- Click "Book Now" button

### 3. Create a Booking
- Fill in booking details (dates, time, guests)
- Review calculated price
- Submit booking
- Booking appears in dashboard as "PENDING"

### 4. Admin Approval
- Login as admin user
- Go to admin dashboard
- Find pending bookings
- Approve or reject booking
- Check localStorage: `bookings` is updated

### 5. Verify Data Persistence
- Open browser DevTools (F12)
- Go to Application → LocalStorage
- Check `currentUser` and `bookings` values
- Refresh page - data persists!

## 🛠️ Available Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Generate Prisma client (optional, for future backend)
npm run prisma:generate
```

## 📱 Mobile Testing

The application is fully responsive. Test on:
- Desktop browsers (Chrome, Firefox, Safari, Edge)
- Mobile view (Chrome DevTools)
- Tablet view

## 🗂️ File Structure for Reference

- **Pages**: `app/(public)/*/page.tsx`
- **Components**: `components/ui/` & `components/booking/`
- **Context/State**: `lib/context.tsx`
- **Mock Data**: `lib/mock-data.ts`
- **Types**: `lib/types.ts`
- **Utils**: `lib/utils.ts`

## 💾 LocalStorage Data

The app stores three main items:

1. **currentUser**
   ```json
   {
     "id": "user-1",
     "name": "John Doe",
     "email": "user@example.com",
     "phone": "254712345678",
     "role": "USER"
   }
   ```

2. **bookings**
   ```json
   [{
     "id": "booking-1234567890",
     "userId": "user-1",
     "serviceType": "ROOM",
     "serviceName": "Executive Suite",
     "totalPrice": 900,
     "status": "PENDING",
     ...
   }]
   ```

3. **contactMessages** (from contact form)
   ```json
   [{
     "id": "msg-1234567890",
     "name": "Jane Smith",
     "email": "jane@example.com",
     "message": "...",
     "status": "new"
   }]
   ```

## 🐛 Troubleshooting

### Issue: Bookings not saving
- **Solution**: Check browser localStorage is enabled
- Open DevTools → Application → LocalStorage

### Issue: Login not working
- **Solution**: Verify credentials exactly match
- Check demo accounts above

### Issue: Styles not loading
- **Solution**: Ensure Tailwind CSS build is running
- Try: `npm run dev` again

### Issue: Components not rendering
- **Solution**: Clear `.next` folder and rebuild
- ```bash
  rm -rf .next
  npm run build
  npm run dev
  ```

## 🚀 Next Steps

1. **Explore the codebase**
   - Study component structure
   - Review context API usage
   - Check Tailwind CSS styling

2. **Test all features**
   - Create multiple bookings
   - Test admin approval flow
   - Submit contact messages
   - Test search and filters

3. **Customize (Optional)**
   - Update mock data in `lib/mock-data.ts`
   - Change colors in `tailwind.config.js`
   - Add new service types
   - Modify booking form fields

4. **Backend Integration (Optional)**
   - Replace mock data with API calls
   - Connect to PostgreSQL database
   - Implement real authentication
   - Add payment processing

## 📖 Documentation Files

- **README.md** - Full project documentation
- **QUICKSTART.md** - This file
- **Code comments** - In-line documentation

## 🎓 Learning Resources

The project demonstrates:
- ✅ Next.js 14 App Router
- ✅ React Context API
- ✅ TypeScript best practices
- ✅ Tailwind CSS responsive design
- ✅ Component composition
- ✅ localStorage API
- ✅ Form handling & validation
- ✅ Conditional rendering
- ✅ Array/Object manipulation

## 📞 Need Help?

Check the README.md file for:
- Full architecture overview
- Component documentation
- Feature list
- Project structure

---

**Happy coding! 🚀**

For questions, refer to:
- Official Next.js docs: https://nextjs.org/docs
- Tailwind CSS docs: https://tailwindcss.com/docs
- React docs: https://react.dev
