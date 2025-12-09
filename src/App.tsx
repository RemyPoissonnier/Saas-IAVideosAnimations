import { useEffect, useState } from 'react'
import Header from './components/Header'
import Landing from './pages/Landing'
import CatHome from './pages/CatHome'
import Login from './pages/Login'
import DogHome from './pages/DogHome'
import Tokens from './pages/Tokens'

type Page = 'landing' | 'animal' | 'auth' | 'tokens'
type Animal = 'cat' | 'dog'
type Path = '/home' | '/cat' | '/dog' | '/login' | '/tokens'

const parsePath = (): { page: Page; animal: Animal } => {
  if (typeof window === 'undefined') return { page: 'landing', animal: 'cat' }
  const normalized = window.location.pathname.replace(/\/+$/, '') || '/'
  if (normalized === '/login') return { page: 'auth', animal: 'cat' }
  if (normalized === '/tokens') return { page: 'tokens', animal: 'cat' }
  if (normalized === '/dog') return { page: 'animal', animal: 'dog' }
  if (normalized === '/cat') return { page: 'animal', animal: 'cat' }
  if (normalized === '/' || normalized === '/home') return { page: 'landing', animal: 'cat' }
  return { page: 'landing', animal: 'cat' }
}

function App() {
  const [{ page, animal }, setRoute] = useState<{ page: Page; animal: Animal }>(() => parsePath())
  const isAuthPage = page === 'auth'

  useEffect(() => {
    const handlePop = () => setRoute(parsePath())
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (path: Path, target: Page, nextAnimal: Animal) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
    }
    setRoute({ page: target, animal: nextAnimal })
  }

  const goToAuth = () => navigate('/login', 'auth', animal)
  const goLanding = () => navigate('/home', 'landing', animal)
  const goCat = () => navigate('/cat', 'animal', 'cat')
  const goDog = () => navigate('/dog', 'animal', 'dog')

  const handleSelectAnimal = (next: Animal) => {
    if (isAuthPage) {
      // stay on auth but update remembered animal for when exiting
      setRoute({ page, animal: next })
      return
    }
    navigate(next === 'dog' ? '/dog' : '/cat', 'animal', next)
  }

  return (
    <div className="min-h-screen bg-bg text-text">
      {!isAuthPage ? (
        <div className="mx-auto w-full max-w-5xl px-6 pt-4 md:px-8">
          <Header
            onOpenAuth={goToAuth}
            isAuthPage={isAuthPage}
            activeAnimal={animal}
            onSelectAnimal={handleSelectAnimal}
            onBackHome={page !== 'landing' ? goLanding : undefined}
            tokensHref="/tokens"
            />
        </div>
      ) : null}
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-12 pt-8 md:px-8">
        {isAuthPage ? (
          <Login onBackHome={goLanding} />
        ) : page === 'landing' ? (
          <Landing onGoCat={goCat} onGoDog={goDog} />
        ) : page === 'tokens' ? (
          <Tokens />
        ) : (
          animal === 'dog' ? <DogHome onOpenAuth={goToAuth} /> : <CatHome onOpenAuth={goToAuth} />
        )}
      </main>
    </div>
  )
}

export default App
