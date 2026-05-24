import { useMemo } from 'react'

function PreviewPanel({ results, bgColor, files }) {
  const originalUrls = useMemo(() => {
    return files.map(f => URL.createObjectURL(f))
  }, [files])

  if (!files.length && !results.length) return null

  if (files.length <= 1) {
    const original = originalUrls[0] ?? null
    const result = results[0]?.url ?? null

    return (
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Original</p>
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {original
              ? <img src={original} alt="original" className="w-full h-full object-cover" />
              : <span className="text-gray-300 text-xs">—</span>}
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-3">
          <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Hasil</p>
          <div
            className="aspect-square rounded-lg overflow-hidden flex items-center justify-center"
            style={{ background: bgColor ?? 'repeating-conic-gradient(#ddd 0% 25%, white 0% 50%) 0 0 / 12px 12px' }}
          >
            {result
              ? <img src={result} alt="result" className="w-full h-full object-contain" />
              : <span className="text-gray-300 text-xs">—</span>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="mb-4 space-y-2">
      <p className="text-xs text-gray-400">
        {results.length ? `${results.length} foto selesai` : `${files.length} foto dipilih`}
      </p>
      <div className="grid grid-cols-3 gap-2">
        {results.length
          ? results.map((item, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-2">
              <div
                className="aspect-square rounded-lg overflow-hidden"
                style={{ background: bgColor ?? 'repeating-conic-gradient(#ddd 0% 25%, white 0% 50%) 0 0 / 10px 10px' }}
              >
                <img src={item.url} alt={`hasil ${i + 1}`} className="w-full h-full object-contain" />
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{item.filename}</p>
            </div>
          ))
          : originalUrls.map((url, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-2">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img src={url} alt={`foto ${i + 1}`} className="w-full h-full object-contain" />
              </div>
              <p className="text-xs text-gray-400 mt-1 truncate">{files[i].name}</p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default PreviewPanel