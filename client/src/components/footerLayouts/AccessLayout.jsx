import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'
import { FooterIcon } from './FooterIcons'

/** Zigzag full-bleed stripes — alternating layout each section */
const AccessLayout = ({ page }) => {
    usePageScroll(page.slug)
    const digital = page.sections[0]
    const property = page.sections[1]
    const request = page.sections[2]

    return (
        <div className="min-h-screen">
            <section className="pt-28 px-6 md:px-20 pb-16 bg-indigo-600 text-white">
                <BackLink className="text-indigo-200 hover:text-white" />
                <p className="text-indigo-200 text-sm font-bold uppercase mt-8 tracking-widest">{page.badge}</p>
                <h1 className="font-playfair text-4xl md:text-6xl font-bold mt-4 max-w-3xl">
                    {page.titleLead} {page.titleHighlight}
                </h1>
                <p className="text-indigo-100 text-xl mt-6 max-w-2xl">{page.subtitle}</p>
            </section>

            <section className="grid md:grid-cols-2 min-h-[320px]">
                <div className="p-10 md:p-16 flex flex-col justify-center bg-white order-2 md:order-1">
                    {page.intro.map((p, i) => (
                        <p key={i} className="text-gray-600 leading-relaxed mb-4">
                            {p}
                        </p>
                    ))}
                    {page.stats && (
                        <div className="flex flex-wrap gap-4 mt-4">
                            {page.stats.map((s) => (
                                <div key={s.label}>
                                    <p className="text-2xl font-bold text-indigo-600">{s.value}</p>
                                    <p className="text-xs text-gray-500">{s.label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <img src={page.heroImage} alt="" className="w-full h-64 md:h-auto object-cover order-1 md:order-2" />
            </section>

            <section className="bg-gray-900 text-white py-16 px-6 md:px-20">
                <h2 className="font-playfair text-3xl font-bold mb-10 text-center">{digital.heading}</h2>
                <div className="max-w-4xl mx-auto grid sm:grid-cols-2 gap-px bg-indigo-500">
                    {digital.items.map((item, i) => (
                        <div key={item.title} className={`p-8 ${i % 2 === 0 ? 'bg-gray-900' : 'bg-indigo-950'}`}>
                            <span className="text-indigo-400 font-mono text-xs">WCAG · 0{i + 1}</span>
                            <h3 className="font-bold text-lg mt-3 mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 md:px-20 bg-indigo-50">
                <h2 className="font-playfair text-3xl font-bold text-gray-900 mb-10 text-right">{property.heading}</h2>
                <div className="max-w-5xl ml-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {property.items.map((item) => (
                        <div key={item.title} className="bg-white p-6 rounded-3xl shadow-md text-center rotate-0 hover:-rotate-1 transition-transform flex flex-col items-center justify-center">
                            <FooterIcon name={item.icon} className="w-10 h-10 text-indigo-600 mb-2" />
                            <h3 className="font-bold mt-4 text-sm">{item.title}</h3>
                            <p className="text-gray-500 text-xs mt-2">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="py-16 px-6 md:px-20 bg-white">
                <h2 className="font-playfair text-2xl font-bold mb-8">{request.heading}</h2>
                <div className="max-w-3xl space-y-6">
                    {request.items.map((item) => (
                        <div key={item.title} className="p-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                            <h3 className="font-bold text-lg">{item.title}</h3>
                            <p className="text-indigo-100 text-sm mt-2">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-20 pb-24 max-w-2xl mx-auto">
                <ContactPanel block={page.contactBlock} />
            </section>
        </div>
    )
}

export default AccessLayout
