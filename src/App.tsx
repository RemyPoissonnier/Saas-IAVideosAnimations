import { useEffect, useState } from 'react'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'

const resolvePageFromPath = (): 'home' | 'auth' => {
  if (typeof window === 'undefined') return 'home'
  const normalized = window.location.pathname.replace(/\/+$/, '') || '/'
  return normalized === '/login' ? 'auth' : 'home'
}

function App() {
  const [page, setPage] = useState<'home' | 'auth'>(() => resolvePageFromPath())
  const isAuthPage = page === 'auth'

  useEffect(() => {
    const handlePop = () => setPage(resolvePageFromPath())
    window.addEventListener('popstate', handlePop)
    return () => window.removeEventListener('popstate', handlePop)
  }, [])

  const navigate = (path: '/' | '/login', target: 'home' | 'auth') => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path)
    }
    setPage(target)
  }

  const goToAuth = () => navigate('/login', 'auth')
  const goHome = () => navigate('/', 'home')

  return (
    <div className="min-h-screen bg-bg text-text">
      {!isAuthPage ? <Header onOpenAuth={goToAuth} isAuthPage={isAuthPage} /> : null}
      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-6 pb-10 pt-6 md:px-8">
        {isAuthPage ? (
          <Login onBackHome={goHome} />
        ) : (
          <Home onOpenAuth={goToAuth} />
        )}
      </main>
    </div>
  )
}

export default App
