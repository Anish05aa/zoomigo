import { GoogleOAuthProvider } from '@react-oauth/google'; // ✅ NEW
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import AdminContextProvider from './context/AdminContext.jsx';
import AppContextProvider from './context/AppContext.jsx';
import OwnerContextProvider from './context/OwnerContext.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider
    clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
    redirectUri={window.location.origin}
    onScriptLoadError={() => console.error("Google OAuth failed to load")}
  > {/* ✅ REPLACE THIS */}
    <BrowserRouter>
      <AdminContextProvider>
        <OwnerContextProvider>
          <AppContextProvider>
            <App />
          </AppContextProvider>
        </OwnerContextProvider>
      </AdminContextProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>
);
