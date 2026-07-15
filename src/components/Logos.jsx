function Logos() {
  const logos = [
    "Doctolib", "BlaBlaCar", "Yousign", "Contentsquare", "Mirakl",
    "Payfit", "Sciences Po", "HEC Paris", "CentraleSupélec", "Polytechnique",
  ]

  return (
    <section className="bg-slate-100 px-16 py-14 text-center">
      <p className="text-slate-400 text-sm font-medium tracking-wide mb-8">
        ILS NOUS FONT CONFIANCE
      </p>
      <div className="flex flex-wrap justify-center gap-x-10 gap-y-4">
        {logos.map((logo) => (
          <span key={logo} className="text-slate-400 font-semibold text-lg">
            {logo}
          </span>
        ))}
      </div>
    </section>
  )
}

export default Logos
