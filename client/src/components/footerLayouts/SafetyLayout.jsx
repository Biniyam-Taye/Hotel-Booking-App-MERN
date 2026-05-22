import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Shield / trust badges — small corner image, large pillar cards */
const SafetyLayout = ({ page }) => {
    usePageScroll(page.slug)
    const pillars = page.sections[0]
    const guidelines = page.sections[1]

    return (
        <div className="min-h-screen bg-emerald-950 text-white">
            <section className="pt-28 px-6 md:px-16 pb-20 relative overflow-hidden">
                <div className="absolute top-20 right-6 md:right-16 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-emerald-400 opacity-90">
                    <img src={page.heroImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-3xl relative z-10">
                    <BackLink className="text-emerald-400 hover:text-white" />
                    <div className="mt-8 inline-block px-4 py-2 rounded-lg bg-emerald-800 text-emerald-200 text-xs font-bold">
                        {page.badge}
                    </div>
                    <h1 className="font-playfair text-5xl md:text-7xl font-bold mt-6 leading-tight">
                        {page.titleLead}
                        <br />
                        {page.titleHighlight}
                    </h1>
                    <p className="text-emerald-100/80 text-xl mt-6 max-w-lg">{page.subtitle}</p>
                </div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-[40px] border-emerald-800/50 pointer-events-none" />
            </section>

            <section className="px-6 md:px-16 py-8 flex flex-wrap gap-4 justify-center border-y border-emerald-800">
                {page.stats.map((s) => (
                    <span key={s.label} className="px-5 py-2 rounded-full bg-emerald-900 text-sm">
                        <strong className="text-emerald-300">{s.value}</strong> · {s.label}
                    </span>
                ))}
            </section>

            <section className="px-6 md:px-16 py-12 max-w-3xl">
                {page.intro.map((p, i) => (
                    <p key={i} className="text-emerald-100/70 leading-relaxed mb-4">
                        {p}
                    </p>
                ))}
            </section>

            <section className="px-6 md:px-16 py-16">
                <h2 className="text-center font-playfair text-3xl font-bold mb-12">{pillars.heading}</h2>
                <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {pillars.items.map((item) => (
                        <div
                            key={item.title}
                            className="aspect-square max-w-sm mx-auto sm:max-w-none flex flex-col items-center justify-center p-8 rounded-[2rem] bg-gradient-to-br from-emerald-800 to-emerald-900 border border-emerald-700 text-center"
                        >
                            <span className="text-5xl mb-4">{item.icon}</span>
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-emerald-200/80 text-sm mt-3">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-white text-gray-900 px-6 md:px-16 py-20 rounded-t-[3rem]">
                <h2 className="font-playfair text-3xl font-bold mb-10">{guidelines.heading}</h2>
                <ul className="max-w-3xl space-y-0">
                    {guidelines.items.map((item) => (
                        <li key={item.title} className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
                            <span className="text-emerald-600 text-xl">✓</span>
                            <div>
                                <h3 className="font-bold">{item.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
                <div className="mt-16 max-w-2xl">
                    <ContactPanel block={page.contactBlock} theme="emerald" />
                </div>
            </section>
        </div>
    )
}

export default SafetyLayout
