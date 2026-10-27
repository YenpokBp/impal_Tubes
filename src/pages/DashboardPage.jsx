import { useMemo, useRef, useState } from 'react'
import Icon from '../components/Icon.jsx'
import {
  MASTER_INGREDIENTS, DIET_OPTIONS, ALLERGY_OPTIONS, INITIAL_HISTORY, generateRecipeMock,
} from '../data/mock.js'
import './DashboardPage.css'

const DISCLAIMER =
  'Estimasi nutrisi dan informasi alergi dihasilkan oleh AI dan bersifat perkiraan, bukan saran medis.'

/* ---------- Autocomplete bahan ---------- */
function IngredientInput({ selected, onAdd }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(0)
  const inputRef = useRef(null)

  const options = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return MASTER_INGREDIENTS.filter((i) => i.toLowerCase().includes(q) && !selected.includes(i)).slice(0, 6)
  }, [query, selected])

  function pick(item) {
    onAdd(item)
    setQuery('')
    setOpen(false)
    setActive(0)
    inputRef.current?.focus()
  }

  function onKeyDown(e) {
    if (!options.length) return
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => (a + 1) % options.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => (a - 1 + options.length) % options.length) }
    else if (e.key === 'Enter') { e.preventDefault(); pick(options[active]) }
    else if (e.key === 'Escape') setOpen(false)
  }

  const showList = open && query.trim()

  return (
    <div className="ac">
      <label htmlFor="bahan" className="label">Bahan yang kamu punya</label>
      <input
        id="bahan" ref={inputRef} className="field-input" value={query} autoComplete="off"
        placeholder="Ketik bahan, misalnya telur"
        role="combobox" aria-expanded={!!showList} aria-controls="bahan-list" aria-autocomplete="list"
        onChange={(e) => { setQuery(e.target.value); setOpen(true); setActive(0) }}
        onKeyDown={onKeyDown} onFocus={() => setOpen(true)} onBlur={() => setTimeout(() => setOpen(false), 120)}
      />
      {showList && (
        <ul id="bahan-list" className="ac-list" role="listbox">
          {options.length === 0 && <li className="ac-empty">Bahan tidak ditemukan di master data.</li>}
          {options.map((o, i) => (
            <li key={o} role="option" aria-selected={i === active}
              className={i === active ? 'on' : ''}
              onMouseDown={(e) => { e.preventDefault(); pick(o) }}>
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

/* ---------- Kartu resep ---------- */
function RecipeCard({ recipe }) {
  const main = recipe.ingredients.filter((i) => i.category === 'MAIN')
  const pantry = recipe.ingredients.filter((i) => i.category === 'PANTRY')
  return (
    <article className="recipe">
      <header>
        <h3>{recipe.title}</h3>
        <p className="muted">
          <Icon name="clock" size={15} /> {recipe.prep} menit, {recipe.servings} porsi
        </p>
      </header>

      <dl className="macros">
        <div><dt>Kalori</dt><dd>{recipe.calories} kkal</dd></div>
        <div><dt>Protein</dt><dd>{recipe.protein} g</dd></div>
        <div><dt>Karbo</dt><dd>{recipe.carbs} g</dd></div>
        <div><dt>Lemak</dt><dd>{recipe.fat} g</dd></div>
      </dl>

      <div className="recipe-cols">
        <div>
          <h4>Bahan utama</h4>
          <ul className="plain">{main.map((i) => <li key={i.name}>{i.name}</li>)}</ul>
          {pantry.length > 0 && (<>
            <h4>Bahan dapur</h4>
            <ul className="plain">{pantry.map((i) => <li key={i.name}>{i.name}</li>)}</ul>
          </>)}
        </div>
        <div>
          <h4>Langkah memasak</h4>
          <ol className="steps">{recipe.steps.map((s, i) => <li key={i}>{s}</li>)}</ol>
        </div>
      </div>

      <p className="disclaimer"><Icon name="alert" size={16} /> {DISCLAIMER}</p>
    </article>
  )
}

/* ---------- Daftar riwayat ---------- */
function HistoryList({ items, activeId, onSelect, onDelete }) {
  const [confirmId, setConfirmId] = useState(null)
  if (!items.length) return <p className="muted empty">Belum ada resep tersimpan.</p>
  return (
    <ul className="history">
      {items.map((r) => (
        <li key={r.id} className={r.id === activeId ? 'on' : ''}>
          <button type="button" className="h-main" onClick={() => onSelect(r)}>
            <span className="h-title">{r.title}</span>
            <span className="muted">{r.date}, {r.calories} kkal</span>
          </button>
          {confirmId === r.id ? (
            <span className="h-confirm">
              <button type="button" className="link danger" onClick={() => { onDelete(r.id); setConfirmId(null) }}>Hapus</button>
              <button type="button" className="link" onClick={() => setConfirmId(null)}>Batal</button>
            </span>
          ) : (
            <button type="button" className="icon-btn" aria-label={`Hapus ${r.title}`} onClick={() => setConfirmId(r.id)}>
              <Icon name="trash" size={17} />
            </button>
          )}
        </li>
      ))}
    </ul>
  )
}

/* ---------- Preferensi diet dan alergi ---------- */
function PreferenceFields({ diet, setDiet, allergies, setAllergies }) {
  const toggle = (a) => setAllergies((cur) => (cur.includes(a) ? cur.filter((x) => x !== a) : [...cur, a]))
  return (
    <div className="prefs">
      <div>
        <label htmlFor="diet" className="label">Preferensi diet</label>
        <select id="diet" className="field-input" value={diet} onChange={(e) => setDiet(e.target.value)}>
          {DIET_OPTIONS.map((d) => <option key={d}>{d}</option>)}
        </select>
      </div>
      <fieldset>
        <legend className="label">Alergi</legend>
        <div className="chips">
          {ALLERGY_OPTIONS.map((a) => (
            <button key={a} type="button" aria-pressed={allergies.includes(a)}
              className={`chip toggle ${allergies.includes(a) ? 'on' : ''}`} onClick={() => toggle(a)}>
              {a}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  )
}

/* ---------- Halaman utama ---------- */
const NAV = [
  { id: 'beranda', label: 'Beranda', icon: 'home' },
  { id: 'generate', label: 'Generate Resep', icon: 'pot' },
  { id: 'riwayat', label: 'Riwayat Resep', icon: 'history' },
  { id: 'profil', label: 'Profil', icon: 'user' },
]
const NAV_ADMIN = [
  { id: 'admin-bahan', label: 'Kelola Master Bahan', icon: 'basket' },
  { id: 'admin-akun', label: 'Kelola Akun Pengguna', icon: 'users' },
]

export default function DashboardPage({ user, onLogout }) {
  const [view, setView] = useState('beranda')
  const [ingredients, setIngredients] = useState([])
  const [diet, setDiet] = useState('Tinggi Protein') // contoh data profil
  const [allergies, setAllergies] = useState(['Seafood'])
  const [history, setHistory] = useState(INITIAL_HISTORY)
  const [current, setCurrent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(false)
  const [detailFrom, setDetailFrom] = useState('generate')

  const isAdmin = user.role === 'ADMIN'
  const navItems = isAdmin ? [...NAV, ...NAV_ADMIN] : NAV

  async function handleGenerate() {
    if (!ingredients.length || loading) return
    setLoading(true); setError(''); setCurrent(null)
    try {
      const recipe = await generateRecipeMock({ ingredients, diet, allergies })
      setCurrent(recipe)
      setHistory((h) => [recipe, ...h]) // resep otomatis masuk riwayat (UC-06)
      setDetailFrom('generate')
      setView('detail') // pindah ke halaman detail resep
    } catch {
      setError('Gagal terhubung ke Layanan AI. Silakan coba beberapa saat lagi.')
    } finally {
      setLoading(false)
    }
  }

  function goTo(id) {
    if (id === 'generate') { setCurrent(null); setError('') }
    setView(id)
  }

  function openFromHistory(recipe) {
    setCurrent(recipe)
    setDetailFrom(view)
    setView('detail')
  }

  const activeNav = view === 'detail' ? detailFrom : view
  const backLabel = { generate: 'Generate Resep', riwayat: 'Riwayat Resep', beranda: 'Beranda' }[detailFrom]

  function handleDelete(id) {
    setHistory((h) => h.filter((r) => r.id !== id))
    setCurrent((c) => (c && c.id === id ? null : c))
  }

  function savePrefs() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="side-brand">
          <span className="brand-mark"><Icon name="pot" size={22} /></span>
          <span>GYEZI SmartReGen</span>
        </div>
        <nav aria-label="Navigasi utama">
          {navItems.map((n) => (
            <button key={n.id} type="button" className={`nav-item ${activeNav === n.id ? 'on' : ''}`}
              aria-current={activeNav === n.id ? 'page' : undefined} onClick={() => goTo(n.id)}>
              <Icon name={n.icon} size={19} /> <span>{n.label}</span>
            </button>
          ))}
        </nav>
        <div className="side-user">
          <div className="avatar" aria-hidden="true">{user.nama.charAt(0).toUpperCase()}</div>
          <div className="who">
            <strong>{user.nama}</strong>
            <span className="muted">{isAdmin ? 'Admin' : 'Pengguna'}</span>
          </div>
          <button type="button" className="icon-btn" onClick={onLogout} aria-label="Keluar">
            <Icon name="logout" size={19} />
          </button>
        </div>
      </aside>

      <main className="content">
        {view === 'beranda' && (
          <>
            <header className="page-head">
              <h1>Halo, {user.nama}. Mau masak apa hari ini?</h1>
              <p className="muted">Ada bahan sisa di kulkas? Kami bantu carikan resepnya.</p>
            </header>

            <div className="grid">
              <section className="panel cta" aria-labelledby="cta-title">
                <h2 id="cta-title">Mulai masak dari bahan yang ada</h2>
                <p>Masukkan bahan, pilih diet dan alergi, lalu AI menyusun resep lengkap dengan estimasi nutrisinya.</p>
                <button type="button" className="btn generate" onClick={() => goTo('generate')}>
                  <Icon name="pot" size={19} /> Generate Resep
                </button>
              </section>

              <section className="panel" aria-labelledby="hist-title">
                <h2 id="hist-title">Riwayat terbaru</h2>
                <HistoryList items={history.slice(0, 4)} activeId={null} onSelect={openFromHistory} onDelete={handleDelete} />
                {history.length > 4 && (
                  <button type="button" className="link more" onClick={() => setView('riwayat')}>Lihat semua ({history.length})</button>
                )}
              </section>
            </div>
          </>
        )}

        {view === 'generate' && (
          <>
            <header className="page-head">
              <h1>Generate resep</h1>
              <p className="muted">Tambahkan bahan yang kamu punya, sisanya biar kami yang pikirkan.</p>
            </header>

            <section className="panel generator" aria-labelledby="gen-title">
              <h2 id="gen-title">Bahan dan preferensi</h2>

              <IngredientInput selected={ingredients} onAdd={(i) => setIngredients((s) => [...s, i])} />

              {ingredients.length > 0 && (
                <ul className="chips picked" aria-label="Bahan terpilih">
                  {ingredients.map((i) => (
                    <li key={i} className="chip">
                      {i}
                      <button type="button" aria-label={`Hapus ${i}`}
                        onClick={() => setIngredients((s) => s.filter((x) => x !== i))}>
                        <Icon name="x" size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <PreferenceFields diet={diet} setDiet={setDiet} allergies={allergies} setAllergies={setAllergies} />
              <p className="hint">Terisi otomatis dari profilmu. Ubah di sini jika perlu.</p>

              {!ingredients.length && <p className="hint">Minimal masukkan 1 bahan makanan.</p>}
              <button type="button" className="btn generate" disabled={!ingredients.length || loading} onClick={handleGenerate}>
                {loading ? 'Memasak resep...' : 'Generate Resep'}
              </button>
            </section>

            <div aria-live="polite">
              {loading && (
                <div className="panel status" role="status">
                  <span className="spinner" /> AI sedang menyusun resep dari bahanmu, mohon tunggu sebentar.
                </div>
              )}
              {error && <div className="panel status error" role="alert"><Icon name="alert" size={18} /> {error}</div>}
            </div>
          </>
        )}

        {view === 'detail' && current && (
          <>
            <button type="button" className="btn btn-ghost back" onClick={() => setView(detailFrom)}>
              <Icon name="arrowleft" size={18} /> Kembali ke {backLabel}
            </button>
            <RecipeCard recipe={current} />
            <div className="detail-actions">
              <button type="button" className="btn" onClick={() => goTo('generate')}>Generate resep lain</button>
              <button type="button" className="btn btn-ghost" onClick={() => setView('riwayat')}>Lihat riwayat</button>
            </div>
          </>
        )}

        {view === 'riwayat' && (
          <>
            <header className="page-head"><h1>Riwayat resep</h1><p className="muted">Lihat detail atau hapus resep yang tersimpan.</p></header>
            <section className="panel">
              <HistoryList items={history} activeId={null} onSelect={openFromHistory} onDelete={handleDelete} />
            </section>
          </>
        )}

        {view === 'profil' && (
          <>
            <header className="page-head"><h1>Profil</h1><p className="muted">{user.email}</p></header>
            <section className="panel">
              <h2>Preferensi diet dan alergi</h2>
              <PreferenceFields diet={diet} setDiet={setDiet} allergies={allergies} setAllergies={setAllergies} />
              <div className="save-row">
                <button type="button" className="btn" onClick={savePrefs}>Simpan preferensi</button>
                {saved && <span className="ok" role="status">Preferensi tersimpan.</span>}
              </div>
            </section>
          </>
        )}

        {(view === 'admin-bahan' || view === 'admin-akun') && (
          <>
            <header className="page-head">
              <h1>{view === 'admin-bahan' ? 'Kelola master bahan' : 'Kelola akun pengguna'}</h1>
            </header>
            <section className="panel"><p className="muted">Halaman ini akan dibuat pada sprint berikutnya.</p></section>
          </>
        )}
      </main>
    </div>
  )
}
