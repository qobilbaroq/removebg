function Navbar() {
  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="font-display font-black text-xl tracking-tight">
        rm<span className="text-sam">.</span>bg
      </h1>
      <span className="text-xs bg-sam/10 text-sam px-3 py-1 rounded-full font-medium">
        powered by rembg
      </span>
    </div>
  )
}

export default Navbar