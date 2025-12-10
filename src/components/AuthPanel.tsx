import { useState } from 'react'
import type { FormEvent } from 'react'
import { useI18n } from '../i18n'
import { card, inputBase, label, primaryButton, subText } from '../theme/styles'
import { useAuth } from '../context/AuthContext'

type SocialProvider = 'google'

const providerProfiles: Record<SocialProvider, { name: string; email: string }> = {
  google: { name: 'Google user', email: 'google.user@example.com' },
}

type AuthPanelProps = {
  onAuthComplete?: () => void
  onNavigateToRegister?: () => void // Callback to switch to the registration page
}

export function AuthPanel({ onAuthComplete, onNavigateToRegister }: AuthPanelProps) {
  const { login } = useAuth() // using login instead of register
  const { t } = useI18n()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const finishAuthFlow = () => {
    if (onAuthComplete) onAuthComplete()
  }

  const handleSocialSignIn = (provider: SocialProvider) => {
    // const profile = providerProfiles[provider]
    // login(profile) // Assuming your auth context handles social login similarly
    finishAuthFlow()
  }

  const handleManualLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    if (!email || !password) return

    try {
      await login(email, password)
      finishAuthFlow()
    } catch (err) {
      setError('Invalid email or password') // You might want to add a translation key here
    }
  }

  return (
    <div className={`${card} space-y-4`}>
      <div className="space-y-1">
        {/* Changed translation keys to specific Login titles */}
        <h3 className="text-xl font-semibold text-text">{t('auth.signInTitle') || 'Welcome Back'}</h3>
        <p className={subText}>{t('auth.signInSubtitle') || 'Enter your credentials to access your account'}</p>
      </div>

      <div className="space-y-3">
        {/* Social Login Section */}
        <div className={label}>{t('auth.socialTitle')}</div>
        <div className="grid grid-cols-1 gap-2">
          <button
            className="flex items-center justify-center gap-3 rounded-xl border border-border/60 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow"
            type="button"
            onClick={() => handleSocialSignIn('google')}
          >
            <span className="h-5 w-5" aria-hidden="true">
              <svg viewBox="0 0 48 48" role="presentation" focusable="false">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.15 0 5.8 1.08 7.97 3.2l5.94-5.94C33.84 3.06 29.46 1 24 1 14.62 1 6.4 6.54 2.64 14.26l6.94 5.39C11.84 13.58 17.38 9.5 24 9.5z"
                />
                <path
                  fill="#4285F4"
                  d="M46.5 24c0-1.39-.12-2.42-.38-3.48H24v6.96h12.78c-.26 1.75-1.67 4.38-4.81 6.15l7.42 5.77C43.78 35.4 46.5 30.37 46.5 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M9.58 28.35c-.47-1.41-.73-2.92-.73-4.45 0-1.53.26-3.04.73-4.45L2.64 14.06C1.09 17.14.25 20.48.25 23.9c0 3.42.84 6.76 2.39 9.84l6.94-5.39z"
                />
                <path
                  fill="#34A853"
                  d="M24 46.5c6.21 0 11.44-2.04 15.25-5.56l-7.42-5.77c-1.98 1.33-4.65 2.27-7.83 2.27-6.62 0-12.16-4.08-14.42-9.98l-6.94 5.39C6.4 41.46 14.62 46.5 24 46.5z"
                />
                <path fill="none" d="M0 0h48v48H0z" />
              </svg>
            </span>
            {t('auth.social.google')}
          </button>
        </div>
      </div>

      <div className="h-px w-full bg-border/60" />
      <div className={label}>{t('auth.manualTitle')}</div>

      <form className="grid grid-cols-1 gap-3" onSubmit={handleManualLogin}>
        {error && <p className="text-xs text-red-500">{error}</p>}
        
        <div className="space-y-2">
          <label className="text-sm font-semibold text-text" htmlFor="email">
            {t('auth.email')}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputBase}
          />
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm font-semibold text-text" htmlFor="password">
              {t('auth.password')}
            </label>
            {/* Optional: Forgot Password Link */}
            <button type="button" className="text-xs text-slate-500 hover:text-slate-800">
               {t('auth.forgotPassword') || 'Forgot?'}
            </button>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputBase}
          />
        </div>
        <div className="flex justify-end pt-2">
          <button className={primaryButton} type="submit">
            {t('auth.signin') || 'Sign In'}
          </button>
        </div>
      </form>

      {/* The Link to Create an Account */}
      <div className="pt-2 text-center text-xs text-muted">
        {t('auth.noAccount') || "Don't have an account?"}{' '}
        <button 
          type="button" 
          onClick={onNavigateToRegister}
          className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-800"
        >
          {t('auth.signupLink') || 'Create one'}
        </button>
      </div>
    </div>
  )
}

export default AuthPanel