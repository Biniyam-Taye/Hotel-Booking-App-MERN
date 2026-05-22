import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Centered typographic hero + full-width image strip + job table — no title/photo split */
const CareersLayout = ({ page }) => {
    usePageScroll(page.slug)
    const benefits = page.sections[0]
    const jobs = page.sections[1]

    return (
        <div className="min-h-screen bg-[#0a1628] text-white">
            <section className="pt-28 px-6 md:px-20 pb-16 text-center max-w-5xl mx-auto">
                <BackLink className="text-slate-400 hover:text-white !mb-10" />
                <p className="text-[#49B9FF] text-xs font-bold uppercase tracking-[0.4em] mb-6">{page.badge}</p>
                <h1 className="font-playfair text-5xl md:text-8xl font-bold leading-[0.95]">
                    {page.titleLead}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#49B9FF] to-cyan-300">
                        {page.titleHighlight}
                    </span>
                </h1>
                <p className="text-slate-400 text-lg md:text-xl mt-8 max-w-2xl mx-auto">{page.subtitle}</p>
            </section>

            <section className="relative h-56 md:h-72 overflow-hidden">
                <img src={page.heroImage} alt="" className="w-full h-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628] via-transparent to-[#0a1628]/80" />
                <div className="absolute bottom-0 left-0 right-0 flex overflow-x-auto gap-4 px-6 pb-6">
                    {page.stats.map((s) => (
                        <div
                            key={s.label}
                            className="flex-shrink-0 min-w-[140px] px-5 py-4 rounded-2xl bg-white/10 backdrop-blur border border-white/20 text-center"
                        >
                            <p className="text-2xl font-bold text-[#49B9FF]">{s.value}</p>
                            <p className="text-xs text-slate-300 mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-20 py-16 max-w-4xl mx-auto">
                {page.intro.map((p, i) => (
                    <p key={i} className="text-slate-300 text-lg leading-relaxed mb-5">
                        {p}
                    </p>
                ))}
            </section>

            <section className="px-6 md:px-20 py-12 bg-white text-gray-900 rounded-t-[3rem]">
                <h2 className="font-playfair text-3xl font-bold mb-10 text-center">{benefits.heading}</h2>
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                    {benefits.items.map((item, i) => (
                        <div
                            key={item.title}
                            className={`p-6 rounded-2xl ${i % 3 === 2 ? 'bg-[#0a1628] text-white' : i % 2 === 0 ? 'bg-blue-50' : 'bg-slate-100'}`}
                        >
                            <span className="text-3xl">{item.icon}</span>
                            <h3 className="font-bold mt-3 mb-2">{item.title}</h3>
                            <p className={`text-sm ${i % 3 === 2 ? 'text-slate-300' : 'text-gray-500'}`}>{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-20 py-20 bg-slate-100">
                <h2 className="font-playfair text-3xl font-bold mb-8">{jobs.heading}</h2>
                <div className="max-w-4xl divide-y divide-slate-300">
                    {jobs.items.map((job) => (
                        <div key={job.title} className="py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                                <p className="text-gray-500 mt-2 max-w-xl">{job.description}</p>
                            </div>
                            <span className="text-sm font-semibold text-[#49B9FF] uppercase tracking-wider">Open role</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-20 pb-24 pt-8 max-w-3xl mx-auto">
                <ContactPanel block={page.contactBlock} theme="dark" />
            </section>
        </div>
    )
}

export default CareersLayout
