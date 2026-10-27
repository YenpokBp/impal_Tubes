// Data sementara (mock) untuk tampilan. Ganti dengan pemanggilan REST API ke backend
// (Node.js + Express) saat backend sudah siap.

export const MASTER_INGREDIENTS = [
  'Telur Ayam', 'Tomat Segar', 'Nasi Putih', 'Dada Ayam Fillet', 'Bawang Merah', 'Bawang Putih',
  'Bawang Bombay', 'Wortel', 'Kentang', 'Kol', 'Brokoli', 'Bayam', 'Kangkung', 'Tahu', 'Tempe',
  'Cabai Merah', 'Jamur Kancing', 'Pisang', 'Oat', 'Mie Instan', 'Sosis Sapi', 'Ikan Kembung',
  'Udang', 'Daging Sapi Giling', 'Santan', 'Keju Cheddar', 'Susu Segar', 'Roti Tawar',
  'Jagung Manis', 'Timun',
]

export const DIET_OPTIONS = [
  'Tidak ada', 'Vegetarian', 'Keto', 'Rendah Karbohidrat', 'Tinggi Protein', 'Rendah Lemak',
]

export const ALLERGY_OPTIONS = ['Kacang', 'Seafood', 'Susu/Laktosa', 'Telur', 'Gluten']

// Contoh data awal, mengikuti isi tabel recipes pada smart_recipe_db.
export const INITIAL_HISTORY = [
  {
    id: 1, title: 'Orak Arik Telur Tomat', prep: 15, servings: 2,
    calories: 210, protein: 12.5, carbs: 4.2, fat: 16, date: '20 Okt 2026',
    ingredients: [
      { name: 'Telur Ayam', category: 'MAIN' }, { name: 'Tomat Segar', category: 'MAIN' },
      { name: 'Minyak Goreng', category: 'PANTRY' },
    ],
    steps: [
      'Kocok telur dalam wadah dan beri sedikit garam.',
      'Tumis tomat dan bawang hingga harum lalu masukkan kocokan telur.',
    ],
  },
  {
    id: 2, title: 'Nasi Goreng Ayam Simple', prep: 20, servings: 1,
    calories: 450, protein: 22, carbs: 55, fat: 15, date: '20 Okt 2026',
    ingredients: [
      { name: 'Nasi Putih', category: 'MAIN' }, { name: 'Dada Ayam Fillet', category: 'MAIN' },
    ],
    steps: [
      'Panaskan minyak, tumis bumbu halus hingga wangi.',
      'Masukkan potongan ayam, masak hingga berubah warna lalu tambahkan nasi.',
    ],
  },
  {
    id: 3, title: 'Sup Sayur Bening', prep: 25, servings: 3,
    calories: 120, protein: 4, carbs: 20, fat: 2, date: '19 Okt 2026',
    ingredients: [{ name: 'Wortel', category: 'MAIN' }, { name: 'Kentang', category: 'MAIN' }],
    steps: ['Rebus air hingga mendidih, masukkan wortel dan kentang terlebih dahulu.'],
  },
]

let nextId = 100

// Simulasi Layanan AI Eksternal (Gemini / OpenAI). Ganti dengan:
// fetch('/api/recipes/generate', { method: 'POST', headers: {...}, body: JSON.stringify(payload) })
export function generateRecipeMock({ ingredients, diet, allergies }) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const [a, b] = ingredients
      const title = b ? `Tumis ${a} dan ${b}` : `Tumis ${a} Bawang Putih`
      resolve({
        id: nextId++, title, prep: 20, servings: 2,
        calories: 180 + ingredients.length * 55,
        protein: 8 + ingredients.length * 3, carbs: 22, fat: 9, date: 'Hari ini',
        diet, allergies,
        ingredients: [
          ...ingredients.map((name) => ({ name, category: 'MAIN' })),
          { name: 'Bawang Putih', category: 'PANTRY' },
          { name: 'Minyak Goreng', category: 'PANTRY' },
          { name: 'Garam', category: 'PANTRY' },
        ],
        steps: [
          'Siapkan semua bahan, cuci bersih lalu potong sesuai selera.',
          'Panaskan sedikit minyak, tumis bawang putih hingga harum.',
          `Masukkan ${ingredients.join(', ')}, aduk rata hingga setengah matang.`,
          'Beri garam secukupnya, koreksi rasa, lalu angkat dan sajikan hangat.',
        ],
      })
    }, 1800)
  })
}
