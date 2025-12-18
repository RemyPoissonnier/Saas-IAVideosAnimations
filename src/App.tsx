import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import CatHome from './pages/CatHome'
import Login from './pages/Login'
import DogHome from './pages/DogHome'
import Tokens from './pages/Tokens'
import Success from './pages/Success'

// On définit les types utiles (optionnel si tu n'utilises plus les props manuelles)
type Animal = 'cat' | 'dog'

function App() {
  const location = useLocation()
  const navigate = useNavigate()

  // 1. Détection de la page Auth via l'URL (plus besoin de state)
  const isAuthPage = location.pathname === '/login'

  // 2. Déduction de l'animal actif basé sur l'URL
  // Si on est sur /dog, c'est dog, sinon par défaut c'est cat (ou selon ta logique)
  const activeAnimal: Animal = location.pathname.includes('/dog') ? 'dog' : 'cat'

  // 3. Gestionnaires de navigation (Wrappers pour garder ton API Header propre)
  const handleSelectAnimal = (next: Animal) => {
    // Si on est sur login, on ne fait rien ou on redirige selon ton besoin métier
    if (isAuthPage) return 
    navigate(next === 'dog' ? '/dog' : '/cat')
  }

  const handleOpenAuth = () => navigate('/login')
  
  // Note: Pour 'onBackHome', on préfère généralement rediriger vers la racine
  const handleBackHome = () => navigate('/home')

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Le Header s'affiche conditionnellement, comme avant */}
      {!isAuthPage && (
        <div className="mx-auto w-full max-w-5xl px-6 pt-4 md:px-8">
          <Header
            onOpenAuth={handleOpenAuth}
            isAuthPage={isAuthPage}
            activeAnimal={activeAnimal}
            onSelectAnimal={handleSelectAnimal}
            onBackHome={location.pathname !== '/home' && location.pathname !== '/' ? handleBackHome : undefined}
            tokensHref="/tokens"
          />
        </div>
      )}

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-12 pt-8 md:px-8">
        {/* Le Cœur du standard : Le Switch de Routes */}
        <Routes>
          {/* Redirection par défaut de / vers /home si nécessaire */}
          <Route path="/" element={<Navigate to="/home" replace />} />
          
          <Route path="/home" element={<Landing onGoCat={() => navigate('/cat')} onGoDog={() => navigate('/dog')} />} />
          <Route path="/login" element={<Login onBackHome={handleBackHome} />} />
          <Route path="/tokens" element={<Tokens />} />
          
          {/* Routes spécifiques aux animaux */}
          <Route path="/cat" element={<CatHome onOpenAuth={handleOpenAuth} />} />
          <Route path="/dog" element={<DogHome onOpenAuth={handleOpenAuth} />} />
          
          <Route path="/success" element={<Success />} />
          
          {/* Route 404 (Optionnel mais recommandé) */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App