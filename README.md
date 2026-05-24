# rm.bg — Remove Background App

App remove background foto menggunakan AI, dibangun dengan React + FastAPI + rembg.

![stack](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?style=flat-square)
![stack](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square)
![stack](https://img.shields.io/badge/AI-rembg-C1440E?style=flat-square)

## Fitur
- Upload single atau banyak foto sekaligus
- Progress bar saat proses
- Pilih model AI (u2net, birefnet, dll)
- Alpha matting untuk tepi lebih halus
- Ganti warna background hasil
- Download hasil PNG transparan

---

## Cara Install & Jalankan

### Kebutuhan
- Python 3.10+
- Node.js 18+
- Git

---

### 1. Clone Repository

```bash
git clone https://github.com/USERNAME/removebg-app.git
cd removebg-app
```

---

### 2. Setup Backend

#### Linux / Mac
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

#### Windows
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

Jalankan backend:
```bash
uvicorn main:app --reload --port 8000
```

Backend jalan di `http://localhost:8000`

> **Catatan:** Request pertama akan download model AI (~43MB–300MB tergantung model yang dipilih). Proses ini hanya terjadi sekali.

---

### 3. Setup Frontend

Buka terminal baru:

```bash
cd frontend
npm install
```

Buat file `.env` di folder `frontend/`:

#### Linux / Mac
```bash
echo "VITE_API_URL=http://localhost:8000" > .env
```

#### Windows (Command Prompt)
```bash
echo VITE_API_URL=http://localhost:8000 > .env
```

Jalankan frontend:
```bash
npm run dev
```

Frontend jalan di `http://localhost:5173`

---

### 4. Buka di Browser
http://localhost:5173

---

## Model AI yang Tersedia

| Model | Ukuran | Kegunaan |
|---|---|---|
| `u2net` | 176MB | Umum, cocok untuk semua gambar |
| `u2net_human_seg` | 176MB | Khusus foto orang |
| `birefnet-general` | ~300MB | Kualitas tinggi, lebih lambat |
| `silueta` | 43MB | Paling ringan |

---

## Struktur Project

```
removebg-app/
├── backend/
│   ├── main.py
│   └── requirements.txt
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── BgSwatches.jsx
    │   │   ├── ModelSelector.jsx
    │   │   ├── Navbar.jsx
    │   │   ├── PreviewPanel.jsx
    │   │   └── UploadZone.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── .env
    ├── tailwind.config.js
    └── package.json
```

---

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Axios
- **Backend:** FastAPI, Uvicorn
- **AI:** rembg (u2net, birefnet)