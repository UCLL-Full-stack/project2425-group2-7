// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Header from '@components/header';
// import { useRouter } from 'next/router';

// // Mock next/router
// jest.mock('next/router', () => ({
//   useRouter: jest.fn()
// }));

// // Mock next-i18next without TypeScript syntax
// jest.mock('next-i18next', () => ({
//   useTranslation: () => ({
//     t: (str: keyof typeof translations) => {
//       const translations = {
//         'header.nav.login': 'Login',
//         'header.nav.home': 'Home',
//         'header.nav.cars': 'Cars',
//         'header.nav.logout': 'Logout',
//         'header.nav.welcome': 'Welcome',
//         'header.nav.view_trades': 'View Trades',
//         'header.nav.trade_in': 'Trade In',
//         'header.logo': 'Logo'
//       };
//       return translations[str] || str;
//     }
//   })
// }));

// // Mock Language component
// jest.mock('./Language', () => function MockLanguage() {
//   return <div data-testid="language-selector">Language Selector</div>;
// });

// describe('Header', () => {
//   const mockPush = jest.fn();

//   beforeEach(() => {
//     (useRouter as jest.Mock).mockReturnValue({
//       push: mockPush,
//     });
//     sessionStorage.clear();
//     jest.clearAllMocks();
//   });

//   it('renders the header with public links when not logged in', () => {
//     render(<Header />);

//     expect(screen.getByText('Login')).toBeInTheDocument();
//     expect(screen.getByText('Home')).toBeInTheDocument();
//     expect(screen.getByText('Cars')).toBeInTheDocument();
    
//     expect(screen.queryByText('View Trades')).not.toBeInTheDocument();
//     expect(screen.queryByText('Trade In')).not.toBeInTheDocument();
//     expect(screen.queryByText('Logout')).not.toBeInTheDocument();
//   });

//   it('shows admin-specific links when user is admin', () => {
//     const mockAdminUser = {
//       token: 'fake-token',
//       fullName: 'Admin User',
//       username: 'admin',
//       role: 'ADMIN'
//     };
    
//     sessionStorage.setItem('loggedInUser', JSON.stringify(mockAdminUser));
//     render(<Header />);

//     expect(screen.getByText('View Trades')).toBeInTheDocument();
//     expect(screen.getByText('Logout')).toBeInTheDocument();
//     expect(screen.getByText('Welcome')).toBeInTheDocument();
    
//     expect(screen.queryByText('Login')).not.toBeInTheDocument();
//     expect(screen.queryByText('Trade In')).not.toBeInTheDocument();
//   });

//   it('handles logout correctly', () => {
//     const mockUser = {
//       token: 'fake-token',
//       fullName: 'Test User',
//       username: 'test',
//       role: 'CUSTOMER'
//     };
    
//     sessionStorage.setItem('loggedInUser', JSON.stringify(mockUser));
//     render(<Header />);

//     const logoutButton = screen.getByText('Logout');
//     fireEvent.click(logoutButton);

//     expect(sessionStorage.getItem('loggedInUser')).toBeNull();
//     expect(mockPush).toHaveBeenCalledWith('/');
//   });

//   it('renders language selector', () => {
//     render(<Header />);
//     expect(screen.getByTestId('language-selector')).toBeInTheDocument();
//   });
// });