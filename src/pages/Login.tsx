import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Languages } from 'lucide-react';
import i18n from '@/i18n/config';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
];

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'ta'>(
    (localStorage.getItem('ki_language') as 'en' | 'ta') || 'en'
  );
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLangChange = (code: 'en' | 'ta') => {
    setSelectedLang(code);
    i18n.changeLanguage(code);
    localStorage.setItem('ki_language', code);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Login failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex">
      {/* LEFT — Branding panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-forest)] flex-col justify-between p-12 relative overflow-hidden">
        {/* Subtle background circles */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-white/10" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/10" />
        <div className="absolute top-1/2 right-0 w-64 h-64 rounded-full border border-white/5" />

        <div className="relative z-10">
          <h1 className="font-serif text-4xl text-white">Kangeyam Insight</h1>
          <p className="text-white/50 mt-2 text-sm tracking-widest uppercase">Decision Support</p>
        </div>

        <div className="relative z-10 space-y-8">
          {/* Decision flow */}
          {['Cattle Data', 'Analysis', 'Scores', 'Decision', 'Explanation'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-4">
              <div className="w-2 h-2 rounded-full bg-white/60" />
              <span className="text-white/70 font-medium">{step}</span>
              {i < arr.length - 1 && (
                <div className="ml-auto w-px h-6 bg-white/20 absolute left-[22px] mt-8" />
              )}
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <p className="text-white/40 text-sm italic">"From Cattle Data to Better Decisions."</p>
        </div>
      </div>

      {/* RIGHT — Login form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">

          {/* Language selector */}
          <div className="flex items-center justify-end gap-2">
            <Languages className="w-4 h-4 text-[var(--color-charcoal-light)]" />
            <span className="text-sm text-[var(--color-charcoal-light)]">{t('login.languages')}:</span>
            <div className="flex gap-1">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.code}
                  onClick={() => handleLangChange(lang.code as 'en' | 'ta')}
                  className={`px-3 py-1 text-sm font-medium transition-all border ${
                    selectedLang === lang.code
                      ? 'bg-[var(--color-forest)] text-white border-[var(--color-forest)]'
                      : 'bg-white text-[var(--color-charcoal-light)] border-black/10 hover:border-[var(--color-forest)]'
                  }`}
                >
                  {lang.native}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-serif text-4xl text-[var(--color-forest)]">{t('login.title')}</h2>
            <p className="mt-2 text-[var(--color-charcoal-light)]">{t('login.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5">
                {t('login.email')}
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full h-11 px-4 border border-black/15 bg-white focus:outline-none focus:border-[var(--color-forest)] focus:ring-1 focus:ring-[var(--color-forest)] transition-colors text-sm"
                placeholder="farmer@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5">
                {t('login.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="w-full h-11 px-4 pr-11 border border-black/15 bg-white focus:outline-none focus:border-[var(--color-forest)] focus:ring-1 focus:ring-[var(--color-forest)] transition-colors text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-charcoal-light)] hover:text-[var(--color-charcoal)]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="px-4 py-3 bg-[var(--color-decision-red-light)] border border-[var(--color-decision-red)]/20 text-[var(--color-decision-red)] text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-[var(--color-forest)] text-white font-medium hover:bg-[var(--color-forest-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? t('common.loading') : t('login.submit')}
            </button>
          </form>

          <p className="text-sm text-center text-[var(--color-charcoal-light)]">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-[var(--color-forest)] font-medium hover:underline">
              {t('login.register')}
            </Link>
          </p>

          {/* Demo credentials hint */}
          <div className="border border-black/10 p-4 bg-[var(--color-ivory-dark)] text-xs text-[var(--color-charcoal-light)] space-y-1">
            <p className="font-medium text-[var(--color-charcoal)]">First time? Register above.</p>
            <p>Or use demo: <span className="font-mono">demo@kangeyam.in</span> / <span className="font-mono">demo1234</span></p>
          </div>

        </div>
      </div>
    </div>
  );
}
