import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Newspaper: full-width masthead, banner image, 3-column body */
const PressLayout = ({ page }) => {
    usePageScroll(page.slug)
    const news = page.sections[0]
    const brand = page.sections[1]

    return (
        <div className="min-h-screen bg-[#faf8f5]">
            <div className="border-y-4 border-black bg-white">
                <div className="max-w-6xl mx-auto px-6 pt-28 pb-6 text-center">
                    <BackLink className="!mb-6" />
                    <p className="text-[10px] uppercase tracking-[0.5em] text-gray-500 mb-4">{page.badge} · EST. 2010</p>
                    <h1 className="font-playfair text-6xl md:text-8xl font-black text-black uppercase leading-none tracking-tight">
                        {page.titleLead}
                    </h1>
                    <p className="font-playfair text-2xl md:text-4xl italic text-gray-600 mt-2">{page.titleHighlight}</p>
                    <p className="text-sm text-gray-500 mt-6 max-w-lg mx-auto border-t border-b border-gray-300 py-3">{page.subtitle}</p>
                </div>
            </div>

            <img src={page.heroImage} alt="" className="w-full h-[40vh] md:h-[50vh] object-cover grayscale hover:grayscale-0 transition-all duration-700" />

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-black border border-black mb-12">
                    {page.stats.map((s) => (
                        <div key={s.label} className="bg-white p-4 text-center">
                            <p className="text-2xl font-black font-playfair">{s.value}</p>
                            <p className="text-[10px] uppercase tracking-widest mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="columns-1 md:columns-3 gap-8 space-y-0">
                    {page.intro.map((p, i) => (
                        <p key={i} className="text-gray-700 text-sm leading-relaxed mb-4 break-inside-avoid first:text-lg first:font-serif first:text-black">
                            {p}
                        </p>
                    ))}
                </div>

                <hr className="my-12 border-black" />

                <h2 className="text-center font-playfair text-4xl font-bold mb-10 uppercase tracking-wide">{news.heading}</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {news.items.map((item, i) => (
                        <article key={item.title} className="border-t-4 border-black pt-4">
                            <span className="text-xs font-mono">0{i + 1}</span>
                            <h3 className="font-playfair text-xl font-bold mt-2 mb-3">{item.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </article>
                    ))}
                </div>

                <hr className="my-12 border-dashed border-gray-400" />

                <h2 className="font-playfair text-2xl font-bold mb-6">{brand.heading}</h2>
                <div className="grid sm:grid-cols-2 gap-0 border border-black">
                    {brand.items.map((item, i) => (
                        <div key={item.title} className={`p-6 ${i % 2 === 0 ? 'bg-white' : 'bg-black text-white'}`}>
                            <h3 className="font-bold text-sm mb-2">{item.title}</h3>
                            <p className="text-xs leading-relaxed opacity-80">{item.description}</p>
                        </div>
                    ))}
                </div>

                <div className="mt-16">
                    <ContactPanel block={page.contactBlock} />
                </div>
            </div>
        </div>
    )
}

export default PressLayout
