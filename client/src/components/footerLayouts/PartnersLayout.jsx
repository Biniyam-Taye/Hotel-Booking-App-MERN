import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'
import { FooterIcon } from './FooterIcons'

/** Hub layout: center image, benefits orbit, partner tiers below */
const PartnersLayout = ({ page }) => {
    usePageScroll(page.slug)
    const benefits = page.sections[0]
    const partners = page.sections[1]

    return (
        <div className="min-h-screen bg-gradient-to-b from-indigo-950 via-indigo-900 to-indigo-950 text-white overflow-hidden">
            <section className="pt-28 px-6 text-center relative">
                <BackLink className="text-indigo-300 hover:text-white" />
                <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest mt-8">{page.badge}</p>
                <h1 className="font-playfair text-4xl md:text-6xl font-bold mt-4">
                    {page.titleLead} <span className="text-amber-400">{page.titleHighlight}</span>
                </h1>
                <p className="text-indigo-200 mt-4 max-w-xl mx-auto">{page.subtitle}</p>
            </section>

            <section className="relative py-16 md:py-24 min-h-[420px] flex items-center justify-center">
                <div className="absolute inset-0 flex items-center justify-center">
                    {benefits.items.map((item, i) => {
                        const angle = (i / benefits.items.length) * 360
                        const radius = 180
                        const x = Math.cos((angle * Math.PI) / 180) * radius
                        const y = Math.sin((angle * Math.PI) / 180) * radius
                        return (
                            <div
                                key={item.title}
                                className="absolute hidden lg:block w-40 p-3 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-center text-xs"
                                style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                                <FooterIcon name={item.icon} className="w-6 h-6 mx-auto mb-1 text-amber-400" />
                                <p className="font-bold mt-1">{item.title}</p>
                            </div>
                        )
                    })}
                </div>
                <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden ring-8 ring-amber-400/50 shadow-2xl">
                    <img src={page.heroImage} alt="" className="w-full h-full object-cover" />
                </div>
            </section>

            <section className="flex flex-wrap justify-center gap-8 px-6 py-8 border-y border-indigo-700">
                {page.stats.map((s) => (
                    <div key={s.label} className="text-center">
                        <p className="text-3xl font-bold text-amber-400">{s.value}</p>
                        <p className="text-indigo-300 text-xs mt-1">{s.label}</p>
                    </div>
                ))}
            </section>

            <section className="px-6 md:px-16 py-12 max-w-3xl mx-auto">
                {page.intro.map((p, i) => (
                    <p key={i} className="text-indigo-100 text-center mb-4 leading-relaxed">
                        {p}
                    </p>
                ))}
            </section>

            <section className="lg:hidden px-6 pb-12 grid grid-cols-2 gap-3">
                {benefits.items.map((item) => (
                    <div key={item.title} className="p-4 rounded-xl bg-white/10 text-sm">
                        <FooterIcon name={item.icon} className="w-6 h-6 text-amber-400 mb-2" />
                        <p className="font-bold mt-2">{item.title}</p>
                        <p className="text-indigo-200 text-xs mt-1">{item.description}</p>
                    </div>
                ))}
            </section>

            <section className="bg-white text-gray-900 rounded-t-[3rem] px-6 md:px-16 py-16">
                <h2 className="font-playfair text-3xl font-bold text-center mb-12">{partners.heading}</h2>
                <div className="max-w-4xl mx-auto space-y-6">
                    {partners.items.map((item, i) => (
                        <div
                            key={item.title}
                            className="flex items-center gap-6 p-6 rounded-2xl"
                            style={{ marginLeft: `${i * 12}px`, background: `hsl(${230 + i * 15}, 60%, ${96 - i * 2}%)` }}
                        >
                            <span className="text-4xl font-playfair font-bold text-indigo-300">{i + 1}</span>
                            <div>
                                <h3 className="font-bold text-lg">{item.title}</h3>
                                <p className="text-gray-500 text-sm mt-1">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-16 max-w-2xl mx-auto">
                    <ContactPanel block={page.contactBlock} />
                </div>
            </section>
        </div>
    )
}

export default PartnersLayout
