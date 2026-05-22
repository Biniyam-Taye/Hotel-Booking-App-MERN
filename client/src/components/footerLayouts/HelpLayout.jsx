import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Help hub: centered, no hero image — horizontal stepper + FAQ stack */
const HelpLayout = ({ page }) => {
    usePageScroll(page.slug)
    const steps = page.sections[0]
    const faqs = page.sections[1]

    return (
        <div className="min-h-screen bg-white">
            <section className="pt-28 pb-16 px-6 bg-[#49B9FF] text-white text-center">
                <div className="max-w-2xl mx-auto">
                    <BackLink className="text-white/80 hover:text-white justify-center !flex" />
                    <h1 className="font-playfair text-5xl md:text-6xl font-bold mt-8">
                        {page.titleLead} {page.titleHighlight}
                    </h1>
                    <p className="mt-4 text-white/90 text-lg">{page.subtitle}</p>
                    <div className="mt-10 mx-auto max-w-md h-14 rounded-full bg-white/20 backdrop-blur flex items-center px-6 text-white/70 text-sm">
                        Search help articles… (browse below)
                    </div>
                </div>
            </section>

            <section className="px-6 md:px-16 -mt-8 relative z-10">
                <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
                    {page.intro.map((p, i) => (
                        <p key={i} className="text-gray-600 text-center mb-3 last:mb-0">
                            {p}
                        </p>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-16 py-20 overflow-x-auto">
                <h2 className="font-playfair text-2xl font-bold text-center mb-12">{steps.heading}</h2>
                <div className="flex gap-0 min-w-max md:min-w-0 md:grid md:grid-cols-4 max-w-5xl mx-auto">
                    {steps.items.map((item, i) => (
                        <div key={item.title} className="relative flex-1 min-w-[200px] md:min-w-0 px-4 text-center">
                            {i < steps.items.length - 1 && (
                                <div className="hidden md:block absolute top-6 left-[60%] right-0 h-0.5 bg-[#49B9FF]/30" />
                            )}
                            <div className="w-12 h-12 rounded-full bg-[#49B9FF] text-white font-bold flex items-center justify-center mx-auto mb-4 relative z-10">
                                {i + 1}
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm mb-2">{item.title}</h3>
                            <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="bg-gray-50 px-6 md:px-16 py-20">
                <h2 className="font-playfair text-3xl font-bold text-center mb-10">{faqs.heading}</h2>
                <div className="max-w-2xl mx-auto space-y-3">
                    {faqs.items.map((item, i) => (
                        <details
                            key={item.title}
                            className="bg-white rounded-2xl border-2 border-gray-100 open:border-[#49B9FF] open:shadow-lg"
                            open={i === 0}
                        >
                            <summary className="cursor-pointer list-none p-5 font-semibold text-gray-900">
                                {item.title}
                            </summary>
                            <p className="px-5 pb-5 text-gray-500 text-sm">{item.description}</p>
                        </details>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-16 pb-24 max-w-2xl mx-auto">
                <ContactPanel block={page.contactBlock} theme="emerald" />
            </section>
        </div>
    )
}

export default HelpLayout
