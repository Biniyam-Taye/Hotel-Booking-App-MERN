import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Chat / ticket UI — sidebar channels, message-style content */
const SupportLayout = ({ page }) => {
    usePageScroll(page.slug)
    const topics = page.sections[0]
    const channels = page.sections[1]

    return (
        <div className="min-h-screen bg-slate-200 flex flex-col">
            <div className="flex-1 flex flex-col lg:flex-row max-w-6xl mx-auto w-full lg:my-8 lg:rounded-3xl lg:overflow-hidden lg:shadow-2xl lg:min-h-[calc(100vh-4rem)]">
                <aside className="lg:w-72 bg-slate-900 text-white p-6 pt-28 lg:pt-6 shrink-0">
                    <BackLink className="text-slate-400 hover:text-white mb-6" />
                    <h1 className="font-playfair text-2xl font-bold">{page.titleHighlight}</h1>
                    <p className="text-slate-400 text-xs mt-2">{page.badge}</p>
                    <p className="text-slate-500 text-sm mt-4">{page.subtitle}</p>
                    <nav className="mt-8 space-y-2">
                        {topics.items.map((item, i) => (
                            <div
                                key={item.title}
                                className={`p-3 rounded-xl text-sm cursor-default ${i === 0 ? 'bg-cyan-600' : 'hover:bg-slate-800'}`}
                            >
                                <span className="mr-2">{item.icon}</span>
                                {item.title}
                            </div>
                        ))}
                    </nav>
                    <div className="mt-8 pt-6 border-t border-slate-700 grid grid-cols-2 gap-3">
                        {page.stats.map((s) => (
                            <div key={s.label}>
                                <p className="text-cyan-400 font-bold text-sm">{s.value}</p>
                                <p className="text-slate-500 text-[10px]">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </aside>

                <main className="flex-1 bg-slate-100 flex flex-col min-h-[60vh] lg:min-h-0">
                    <div className="p-4 bg-white border-b border-slate-200 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                            HD
                        </div>
                        <div>
                            <p className="font-semibold text-sm text-gray-900">HotelDemo Support</p>
                            <p className="text-xs text-green-600">Typically replies in under 4 hours</p>
                        </div>
                    </div>

                    <div className="flex-1 p-6 space-y-4 overflow-y-auto">
                        {page.intro.map((p, i) => (
                            <div key={i} className="flex justify-start">
                                <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm text-sm text-gray-700">
                                    {p}
                                </div>
                            </div>
                        ))}
                        <div className="flex justify-start">
                            <div className="max-w-[85%] bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                                <p className="text-xs font-bold text-gray-500 mb-3">{channels.heading}</p>
                                <div className="space-y-3">
                                    {channels.items.map((item) => (
                                        <div key={item.title} className="text-sm border-l-2 border-cyan-400 pl-3">
                                            <p className="font-semibold text-gray-900">{item.title}</p>
                                            <p className="text-gray-500 text-xs mt-0.5">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <div className="max-w-[75%] bg-cyan-600 text-white rounded-2xl rounded-tr-sm px-4 py-3 text-sm">
                                Include your booking ID (HB-XXXXXX) when you reach out — we respond faster.
                            </div>
                        </div>
                    </div>

                    <div className="p-4 bg-white border-t border-slate-200">
                        <div className="h-12 rounded-full bg-slate-100 flex items-center px-4 text-slate-400 text-sm">
                            Type a message… (email support@hoteldemo.com)
                        </div>
                    </div>
                </main>
            </div>

            <section className="px-6 py-12 max-w-2xl mx-auto w-full">
                <ContactPanel block={page.contactBlock} theme="dark" />
            </section>
        </div>
    )
}

export default SupportLayout
