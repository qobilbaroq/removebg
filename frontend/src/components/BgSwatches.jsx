const SWATCHES = [
  { id: 'transparent', color: null, label: 'Transparan' },
  { id: 'white', color: '#ffffff', label: 'Putih' },
  { id: 'cream', color: '#F5EFE6', label: 'Cream' },
  { id: 'sam', color: '#C1440E', label: 'Samantha' },
  { id: 'black', color: '#1a1a1a', label: 'Hitam' },
  { id: 'salmon', color: '#D4521A', label: 'Salmon' },
  { id: 'coral', color: '#E8735A', label: 'Coral' },
]

function BgSwatches({ bgColor, setBgColor }) {
  return (
    <div className="mb-4">
      <p className="text-xs text-gray-400 mb-2">Background pengganti</p>
      <div className="flex gap-2 flex-wrap">
        {SWATCHES.map((s) => (
          <button
            key={s.id}
            onClick={() => setBgColor(s.color)}
            title={s.label}
            className={`w-7 h-7 rounded-lg border-2 transition-all duration-200
              ${bgColor === s.color ? 'border-sam scale-110' : 'border-transparent'}`}
            style={{
              background: s.color ?? 'repeating-conic-gradient(#ccc 0% 25%, white 0% 50%) 0 0 / 10px 10px',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default BgSwatches