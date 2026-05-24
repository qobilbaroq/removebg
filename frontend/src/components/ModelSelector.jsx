const MODELS = [
  { id: 'u2net', label: 'u2net', desc: 'Umum, cocok untuk semua gambar', size: '176MB' },
  { id: 'u2net_human_seg', label: 'u2net human seg', desc: 'Khusus foto orang', size: '176MB' },
  { id: 'birefnet-general', label: 'birefnet', desc: 'Kualitas tinggi, lebih lambat', size: '~300MB' },
  { id: 'silueta', label: 'silueta', desc: 'Paling ringan', size: '43MB' },
]

function ModelSelector({ model, setModel, alphaMatting, setAlphaMatting }) {
  const selected = MODELS.find(m => m.id === model)

  return (
    <div className="mb-4 space-y-3">
      <div className="bg-white border border-gray-200 rounded-xl p-4">
        <p className="text-xs text-gray-400 mb-2">Model AI</p>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="w-full bg-transparent text-sm font-medium outline-none cursor-pointer mb-2"
        >
          {MODELS.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400">{selected?.desc}</p>
          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
            {selected?.size}
          </span>
        </div>
        <p className="text-xs text-amber-600 bg-amber-50 rounded-lg px-3 py-2 mt-2">
          ⚠ Ganti model = download ulang jika belum pernah dipakai
        </p>
      </div>

      <div
        onClick={() => setAlphaMatting(!alphaMatting)}
        className={`border rounded-xl p-4 cursor-pointer transition-all duration-200
          ${alphaMatting ? 'border-sam bg-sam/5' : 'bg-white border-gray-200'}`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-400 mb-1">Alpha Matting</p>
            <p className="text-sm font-medium">
              {alphaMatting ? 'On — tepi lebih halus (rambut, bulu)' : 'Off — tepi standard'}
            </p>
          </div>
          <div className={`w-10 h-5 rounded-full transition-all duration-200 ${alphaMatting ? 'bg-sam' : 'bg-gray-200'}`}>
            <div className={`w-4 h-4 bg-white rounded-full mt-0.5 transition-all duration-200 shadow ${alphaMatting ? 'ml-5' : 'ml-0.5'}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModelSelector