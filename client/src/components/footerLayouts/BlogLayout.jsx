import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Masonry journal — image tiles, no split hero */
const BlogLayout = ({ page }) => {
    usePageScroll(page.slug)
    const topics = page.sections[0]
    const articles = page.sections[1]

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            <section className="pt-28 px-6 md:px-12">
                <BackLink className="text-neutral-500 hover:text-white" />
                <p className="text-rose-400 text-sm font-bold mt-8 mb-2">{page.badge}</p>
                <h1 className="font-playfair text-6xl md:text-7xl font-bold max-w-4xl">{page.titleHighlight}</h1>
                <p className="text-neutral-400 mt-4 max-w-md">{page.subtitle}</p>
            </section>

            <section className="px-4 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[120px] md:auto-rows-[160px]">
                <div className="col-span-2 row-span-2 relative rounded-2xl overflow-hidden">
                    <img src={page.heroImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 p-6">
                        {page.intro.map((p, i) => (
                            <p key={i} className="text-sm text-neutral-200 leading-relaxed">{p}</p>
                        ))}
                    </div>
                </div>
                {topics.items.map((t, i) => (
                    <div
                        key={t.title}
                        className={`rounded-2xl p-4 flex flex-col justify-end ${
                            i === 0 ? 'bg-rose-600' : i === 1 ? 'bg-amber-700' : i === 2 ? 'bg-violet-800' : 'bg-teal-800'
                        } ${i === 0 ? 'row-span-2' : ''}`}
                    >
                        <span className="text-2xl">{t.icon}</span>
                        <p className="font-bold text-sm mt-2">{t.title}</p>
                    </div>
                ))}
            </section>

            <section className="px-6 md:px-12 py-16">
                <h2 className="text-neutral-500 text-xs uppercase tracking-[0.3em] mb-10">{articles.heading}</h2>
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                    {articles.items.map((article, i) => (
                        <article
                            key={article.title}
                            className="break-inside-avoid bg-neutral-900 rounded-2xl p-6 border border-neutral-800"
                            style={{ marginBottom: i % 2 === 0 ? '1.5rem' : '0.5rem' }}
                        >
                            <span className="text-rose-400 text-xs font-mono">#{String(i + 1).padStart(2, '0')}</span>
                            <h3 className="font-playfair text-xl font-bold mt-3 mb-3">{article.title}</h3>
                            <p className="text-neutral-400 text-sm leading-relaxed">{article.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            <section className="px-6 md:px-12 pb-24 max-w-2xl">
                <ContactPanel block={page.contactBlock} theme="dark" />
            </section>
        </div>
    )
}

export default BlogLayout
