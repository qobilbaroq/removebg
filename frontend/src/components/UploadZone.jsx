import { useRef } from 'react'

function UploadZone({ onUpload, files }) {
  const inputRef = useRef()

  const handleDrop = (e) => {
    e.preventDefault()
    const f = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith('image/'))
    if (f.length) onUpload(f)
  }

  const handleChange = (e) => {
    const f = Array.from(e.target.files)
    if (f.length) onUpload(f)
  }

  return (
    <div
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 mb-4
        ${files.length ? 'border-sam bg-sam/5' : 'border-gray-300 bg-white hover:border-sam hover:bg-sam/5'}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleChange}
      />
      {files.length ? (
        <>
          <p className="font-semibold text-sm text-sam">{files.length} foto siap diproses ✓</p>
          <p className="text-xs text-gray-400 mt-1">{files.map(f => f.name).join(', ')}</p>
        </>
      ) : (
        <>
          <p className="font-semibold text-sm text-gray-800">Drop foto atau klik untuk upload</p>
          <p className="text-xs text-gray-400 mt-1">Bisa pilih banyak foto sekaligus • PNG, JPG, WebP</p>
        </>
      )}
    </div>
  )
}

export default UploadZone