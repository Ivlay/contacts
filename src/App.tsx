import { lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { CssBaseline } from '@mui/material';

import { CONTACTS, LOGIN } from './constants/routes';

import MainLayout from './layouts/MainLayout';

const LoginPage = lazy(() => import('./pages/Login'));
const ContactsPage = lazy(() => import('./pages/Contacts'));

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={null}>
        <CssBaseline />
        <MainLayout>
          <Routes>
            <Route path={LOGIN} element={<LoginPage />} />
            <Route path={CONTACTS} element={<ContactsPage />} />
            <Route path="*" element={<div>not found page</div>} />
          </Routes>
        </MainLayout>
      </Suspense>
    </Router>
  );
}

export default App;
