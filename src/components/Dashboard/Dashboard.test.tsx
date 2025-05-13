import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

test('renders Dashboard component', () => {
  render(
    <AuthProvider>
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    </AuthProvider>
  );

  expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Total Verifications/i)).toBeInTheDocument();
  expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  expect(screen.getByText(/Completed/i)).toBeInTheDocument();
});