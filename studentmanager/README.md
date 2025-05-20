# Student Management System

A comprehensive student management system built with React and Vite, featuring student registration, login, profile management, scholarship applications, payment processing, and academic performance tracking.

## Features

- User Authentication (Login/Register)
- Student Profile Management
- Scholarship Application System
- Payment Processing
- Academic Performance Tracking (CGPA)
- Responsive Design
- Modern UI with Material-UI

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd studentmanager
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── dashboard/
│   │   └── Dashboard.jsx
│   ├── student/
│   │   └── StudentDetails.jsx
│   ├── scholarship/
│   │   └── Scholarship.jsx
│   ├── payment/
│   │   └── Payment.jsx
│   ├── academic/
│   │   └── CGPA.jsx
│   └── common/
│       └── Navbar.jsx
├── context/
│   └── AuthContext.jsx
├── App.jsx
└── main.jsx
```

## Technologies Used

- React
- Vite
- Material-UI
- React Router
- Formik & Yup (Form handling and validation)
- Context API (State management)

## Development

To start development:

1. Make sure all dependencies are installed:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
