import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'
import { I18nProvider } from './i18n.tsx'
import { ThemeProvider } from './theme.tsx'
import { BrowserRouter } from 'react-router-dom'; // <--- Import essentiel

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
