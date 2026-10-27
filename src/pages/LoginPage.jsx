import { useState } from 'react'
import Icon from '../components/Icon.jsx'
import logoChef from '../assets/logo-chef.png'
import './LoginPage.css'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function passwordStrength(pw) {
  let score = 0
  if (pw.length >= 8) score++
  if (/[a-zA-Z]/.test(pw) && /\d/.test(pw)) score++
  if (pw.length >= 12 || /[^a-zA-Z0-9]/.test(pw)) score++
  return score
}

export default function LoginPage({ onLogin }) {
  const [mode, setMode] = useState('masuk')
  const [nama, setNama] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [touched, setTouched] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const isRegister = mode === 'daftar'
  const strength = passwordStrength(password)

  const errors = {
    nama: isRegister && nama.trim().length < 2 ? 'Nama minimal 2 karakter.' : '',
    email: !EMAIL_RE.test(email) ? 'Format email belum benar, contoh: nama@email.com.' : '',
    password: !password
      ? 'Password wajib diisi.'
      : isRegister && strength < 2
        ? 'Minimal 8 karakter dengan kombinasi huruf dan angka.'
        : '',
  }
  const valid = !errors.nama && !errors.email && !errors.password

  const touch = (field) => setTouched((t) => ({ ...t, [field]: true }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (!valid || loading) return
    setLoading(true)
    setError('')
    try {
      // TODO: ganti dengan fetch ke backend:
      // POST /api/auth/login atau /api/auth/register (HTTPS, JSON) lalu simpan token sesi.
      await new Promise((r) => setTimeout(r, 900))
      const local = email.split('@')[0]
      onLogin({
        nama: isRegister ? nama.trim() : local.charAt(0).toUpperCase() + local.slice(1),
        email,
        role: email.startsWith('admin') ? 'ADMIN' : 'USER', // demo RBAC: awali email dengan "admin"
      })
    } catch {
      setError('Gagal terhubung ke server. Silakan coba beberapa saat lagi.')
      setLoading(false)
    }
  }

  function switchMode(next) {
    setMode(next)
    setTouched({})
    setError('')
  }

  return (
    <main className="login">
      <section className="login-board" aria-hidden="true">
        <div className="board-copy">
          <h1>Isi kulkasmu, biar AI yang cari idenya.</h1>
          <p>Masukkan bahan sisa, pilih diet dan alergi, resep siap dalam hitungan detik.</p>
        </div>

        <img className="board-logo" src={logoChef} alt="" />
      </section>

      <section className="login-panel">
        <form className="login-form" onSubmit={handleSubmit} noValidate>
          <div className="brand">
            <span className="brand-mark"><Icon name="pot" size={22} /></span>
            <span className="brand-name">Smart Recipe Generator</span>
          </div>

          <h2>{isRegister ? 'Buat akun baru' : 'Selamat datang kembali'}</h2>
          <p className="form-sub">
            {isRegister ? 'Daftar untuk menyimpan resep dan preferensi dietmu.' : 'Masuk untuk mulai memasak dari bahan yang ada.'}
          </p>

          {error && (
            <div className="alert" role="alert"><Icon name="alert" size={18} /> {error}</div>
          )}

          {isRegister && (
            <div className="field">
              <label htmlFor="nama">Nama</label>
              <input id="nama" className="field-input" value={nama} autoComplete="name"
                onChange={(e) => setNama(e.target.value)} onBlur={() => touch('nama')}
                aria-invalid={touched.nama && !!errors.nama} placeholder="Nama lengkap" />
              {touched.nama && errors.nama && <p className="field-error">{errors.nama}</p>}
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" className="field-input" value={email} autoComplete="email"
              onChange={(e) => setEmail(e.target.value)} onBlur={() => touch('email')}
              aria-invalid={touched.email && !!errors.email} placeholder="nama@email.com" />
            {touched.email && errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          <div className="field">
            <label htmlFor="password">Password</label>
            <div className="pw-wrap">
              <input id="password" type={showPw ? 'text' : 'password'} className="field-input" value={password}
                autoComplete={isRegister ? 'new-password' : 'current-password'}
                onChange={(e) => setPassword(e.target.value)} onBlur={() => touch('password')}
                aria-invalid={touched.password && !!errors.password} placeholder="Masukkan password" />
              <button type="button" className="pw-toggle" onClick={() => setShowPw((s) => !s)}
                aria-label={showPw ? 'Sembunyikan password' : 'Tampilkan password'}>
                <Icon name={showPw ? 'eyeoff' : 'eye'} size={18} />
              </button>
            </div>
            {isRegister && password && (
              <div className="strength" aria-live="polite">
                <div className="strength-bar">
                  {[1, 2, 3].map((n) => <span key={n} className={n <= strength ? `on s${strength}` : ''} />)}
                </div>
                <span>{['Lemah', 'Lemah', 'Cukup', 'Kuat'][strength]}</span>
              </div>
            )}
            {touched.password && errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button type="submit" className="btn submit" disabled={!valid || loading}>
            {loading ? 'Memproses...' : isRegister ? 'Daftar' : 'Masuk'}
          </button>

          <p className="switch">
            {isRegister ? 'Sudah punya akun?' : 'Belum punya akun?'}{' '}
            <button type="button" onClick={() => switchMode(isRegister ? 'masuk' : 'daftar')}>
              {isRegister ? 'Masuk' : 'Daftar sekarang'}
            </button>
          </p>
        </form>
      </section>
    </main>
  )
}
