import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'

export default function App() {
  // Sementara disimpan di state. Nanti diganti token sesi (JWT) dari backend.
  const [user, setUser] = useState(null)

  if (!user) return <LoginPage onLogin={setUser} />
  return <DashboardPage user={user} onLogout={() => setUser(null)} />
}
