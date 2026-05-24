import { useState } from 'react'
import Navbar from './components/Navbar'
import UploadZone from './components/UploadZone'
import PreviewPanel from './components/PreviewPanel'
import ModelSelector from './components/ModelSelector'
import BgSwatches from './components/BgSwatches'
import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

function App() {
  const [files, setFiles] = useState([])
  const [model, setModel] = useState('u2net')
  const [alphaMatting, setAlphaMatting] = useState(false)
  const [bgColor, setBgColor] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [modelDownloading, setModelDownloading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleUpload = (uploadedFiles) => {
    setFiles(uploadedFiles)
    setResults([])
  }

const handleProcess = async () => {
    if (!files.length) return
    setLoading(true)
    setProgress(0)
    setModelDownloading(true)

    // fake progress
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 8
      if (current >= 90) {
        current = 90
        clearInterval(interval)
      }
      setProgress(Math.round(current))
    }, 400)

    try {
      if (files.length === 1) {
        const formData = new FormData()
        formData.append('file', files[0])
        formData.append('model', model)
        formData.append('alpha_matting', alphaMatting)

        const res = await axios.post(`${API_URL}/api/remove-bg`, formData, {
          responseType: 'blob',
          timeout: 0,
        })

        clearInterval(interval)
        setProgress(100)

        const url = URL.createObjectURL(res.data)
        setResults([{ filename: files[0].name, url, original: URL.createObjectURL(files[0]) }])
      } else {
        const formData = new FormData()
        files.forEach(f => formData.append('files', f))
        formData.append('model', model)
        formData.append('alpha_matting', alphaMatting)

        const res = await axios.post(`${API_URL}/api/remove-bg/batch`, formData, {
          timeout: 0,
        })

        clearInterval(interval)
        setProgress(100)

        const mapped = res.data.results.map((r, i) => {
          const bytes = new Uint8Array(r.data.match(/.{1,2}/g).map(b => parseInt(b, 16)))
          const blob = new Blob([bytes], { type: 'image/png' })
          return {
            filename: r.filename,
            url: URL.createObjectURL(blob),
            original: URL.createObjectURL(files[i]),
          }
        })
        setResults(mapped)
      }
    } catch (err) {
      clearInterval(interval)
      console.error(err)
    } finally {
      setLoading(false)
      setModelDownloading(false)
    }
  }

  const handleDownloadAll = () => {
    results.forEach((r) => {
      const a = document.createElement('a')
      a.href = r.url
      a.download = r.filename.replace(/\.[^.]+$/, '') + '_nobg.png'
      a.click()
    })
  }

  return (
    <div className="min-h-screen bg-cream font-sans">
      <div className="max-w-xl mx-auto px-4 py-8">
        <Navbar />

        <UploadZone onUpload={handleUpload} files={files} />

        <ModelSelector
          model={model}
          setModel={setModel}
          alphaMatting={alphaMatting}
          setAlphaMatting={setAlphaMatting}
        />

        <BgSwatches bgColor={bgColor} setBgColor={setBgColor} />

        {loading && (
          <div className="mb-4 bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-sam font-medium flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-sam rounded-full animate-pulse" />
                {progress < 90 ? 'Memproses gambar...' : progress === 100 ? 'Selesai!' : 'Hampir selesai...'}
              </p>
              <p className="text-xs font-semibold text-sam">{progress}%</p>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-sam h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {progress < 30 ? 'Menginisialisasi model...' : progress < 70 ? 'Menghapus background...' : 'Menyiapkan hasil...'}
            </p>
          </div>
        )}

        <PreviewPanel results={results} bgColor={bgColor} files={files} />

        <button
          onClick={handleProcess}
          disabled={!files.length || loading}
          className="w-full py-3.5 bg-sam hover:bg-sam-hover disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 hover:-translate-y-0.5 mb-3"
        >
          {loading ? 'Memproses...' : `Hapus Background${files.length > 1 ? ` (${files.length} foto)` : ''}`}
        </button>

        <button
          onClick={handleDownloadAll}
          disabled={!results.length}
          className="w-full py-3 border border-gray-300 disabled:opacity-40 disabled:cursor-not-allowed font-medium rounded-xl transition-all hover:bg-gray-100 flex items-center justify-center gap-2"
        >
          Download {results.length > 1 ? `Semua (${results.length})` : 'PNG'}
        </button>
      </div>
    </div>
  )
}

export default App