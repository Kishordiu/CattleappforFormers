import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Languages } from 'lucide-react';
import i18n from '@/i18n/config';

const LANGUAGES = [
  { code: 'en', native: 'English' },
  { code: 'ta', native: 'தமிழ்' },
];

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', farmName: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [selectedLang, setSelectedLang] = useState<'en' | 'ta'>('en');
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
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    const result = await register({ ...form, language: selectedLang });
    setLoading(false);
    if (result.success) {
      navigate('/dashboard', { replace: true });
    } else {
      setError(result.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--color-ivory)] flex">
      {/* LEFT — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-[var(--color-charcoal)] flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-white/5" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full border border-white/5" />

        <div className="relative z-10">
          <h1 className="font-serif text-4xl text-white">Kangeyam Insight</h1>
          <p className="text-white/40 mt-2 text-sm tracking-widest uppercase">Decision Support for Farmers</p>
        </div>

        <div className="relative z-10 space-y-6">
          {[
            { icon: '❤️', title: 'Health Tracking', desc: 'Record and monitor every medical event' },
            { icon: '🥛', title: 'Productivity Analytics', desc: 'Track milk yields and spot trends' },
            { icon: '🧠', title: 'Decision Intelligence', desc: 'Understand what action to consider next' },
          ].map(item => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <div className="font-medium text-white">{item.title}</div>
                <div className="text-sm text-white/40">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10">
          <p className="text-white/30 text-sm italic">"From Cattle Data to Better Decisions."</p>
        </div>
      </div>

      {/* RIGHT — Register form */}
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
            <h2 className="font-serif text-4xl text-[var(--color-forest)]">{t('register.title')}</h2>
            <p className="mt-2 text-[var(--color-charcoal-light)]">{t('register.subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { key: 'name', label: t('register.name'), type: 'text', placeholder: 'Rajan Kumar' },
              { key: 'email', label: t('register.email'), type: 'email', placeholder: 'farmer@example.com' },
              { key: 'farmName', label: t('register.farmName'), type: 'text', placeholder: 'Kangeyam Heritage Farm' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                  required
                  className="w-full h-11 px-4 border border-black/15 bg-white focus:outline-none focus:border-[var(--color-forest)] focus:ring-1 focus:ring-[var(--color-forest)] transition-colors text-sm"
                  placeholder={field.placeholder}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-[var(--color-charcoal)] mb-1.5">{t('register.password')}</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                  className="w-full h-11 px-4 pr-11 border border-black/15 bg-white focus:outline-none focus:border-[var(--color-forest)] focus:ring-1 focus:ring-[var(--color-forest)] transition-colors text-sm"
                  placeholder="At least 6 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-charcoal-light)]"
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
              className="w-full h-11 bg-[var(--color-forest)] text-white font-medium hover:bg-[var(--color-forest-light)] transition-colors disabled:opacity-60"
            >
              {loading ? t('common.loading') : t('register.submit')}
            </button>
          </form>

          <p className="text-sm text-center text-[var(--color-charcoal-light)]">
            {t('register.hasAccount')}{' '}
            <Link to="/login" className="text-[var(--color-forest)] font-medium hover:underline">
              {t('register.login')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
