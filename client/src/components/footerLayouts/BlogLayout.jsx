import React, { useState } from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'
import { FooterIcon } from './FooterIcons'

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80`

const articles = [
    {
        imgId: '1510414842594-a61c69b5ae57',
        category: 'Destination',
        date: 'May 2026',
        readTime: '6 min',
        author: 'Sofia Almeida',
        authorAvatar: '1438761681033-6461ffad8d80',
        title: 'Five Coastal Hotels Perfect for a Summer Escape',
        excerpt: 'From the rugged Algarve cliffs to the turquoise Amalfi shores — our curated selection of oceanfront stays that deliver on every promise of sun, sea, and service.',
        tag: 'Travel',
        featured: true,
    },
    {
        imgId: '1414235077428-338989a2e8c0',
        category: 'Hospitality',
        date: 'Apr 2026',
        readTime: '4 min',
        author: 'Marco Chen',
        authorAvatar: '1472099645785-5658abf4ff4e',
        title: 'Romantic Getaway: The Perfect Two-Night Itinerary',
        excerpt: 'Spa timing, private dinners, and room upgrade secrets that transform a weekend break into a once-in-a-lifetime memory.',
        tag: 'Romance',
        featured: false,
    },
    {
        imgId: '1542314831-068cd1dbfeeb',
        category: 'Luxury',
        date: 'Apr 2026',
        readTime: '5 min',
        author: 'Isabelle Moreau',
        authorAvatar: '1494790108377-be9c29b29330',
        title: 'Booking 60 Days Ahead: Inside the Luxury Retreat Offer',
        excerpt: 'Maximize savings without sacrificing flexibility. We unpack the math behind early-bird pricing and when to hold for a better deal.',
        tag: 'Tips',
        featured: false,
    },
    {
        imgId: '1544161515-4ab6ce6db874',
        category: 'Sustainable',
        date: 'Mar 2026',
        readTime: '5 min',
        author: 'Lena Braun',
        authorAvatar: '1499952127939-350e0aef4ec4',
        title: 'Hospitality Beyond the Room: Spa, Dining & Tours',
        excerpt: "A guest guide to our new in-stay services marketplace — how to book a private massage, reserve a sunset boat tour, and pair it with a chef's tasting menu.",
        tag: 'Lifestyle',
        featured: false,
    },
]

const topicColors = [
    'from-rose-500 to-orange-500',
    'from-amber-600 to-yellow-500',
    'from-violet-700 to-purple-500',
    'from-teal-700 to-emerald-500',
]

const BlogLayout = ({ page }) => {
    usePageScroll(page.slug)
    const topics = page.sections[0]
    const articlesSection = page.sections[1]
    const [activeTopic, setActiveTopic] = useState(null)

    const displayed = activeTopic
        ? articles.filter(a => a.tag === activeTopic || a.category === activeTopic)
        : articles

    return (
        <div className="min-h-screen bg-neutral-950 text-white">
            {/* ─── HERO (preserved) ─── */}
            <section className="pt-28 px-6 md:px-12">
                <BackLink className="text-neutral-500 hover:text-white" />
                <p className="text-rose-400 text-sm font-bold mt-8 mb-2">{page.badge}</p>
                <h1 className="font-playfair text-6xl md:text-7xl font-bold max-w-4xl">{page.titleHighlight}</h1>
                <p className="text-neutral-400 mt-4 max-w-md">{page.subtitle}</p>
            </section>

            {/* ─── TOPICS MOSAIC ─── */}
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
                        onClick={() => setActiveTopic(activeTopic === t.title ? null : t.title)}
                        className={`rounded-2xl p-4 flex flex-col justify-end cursor-pointer transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br ${topicColors[i]} ${i === 0 ? 'row-span-2' : ''} ${activeTopic === t.title ? 'ring-2 ring-white ring-offset-2 ring-offset-neutral-950' : ''}`}
                    >
                        <FooterIcon name={t.icon} className="w-8 h-8 text-white mb-2" />
                        <p className="font-bold text-sm mt-2">{t.title}</p>
                        <p className="text-white/70 text-xs mt-1 hidden md:block">{t.description}</p>
                    </div>
                ))}
            </section>

            {/* ─── FEATURED ARTICLE ─── */}
            <section className="px-6 md:px-12 pt-6 pb-4">
                <div className="group relative rounded-3xl overflow-hidden cursor-pointer hover:shadow-2xl transition-all duration-500">
                    <img
                        src={unsplash(articles[0].imgId)}
                        alt={articles[0].title}
                        className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 max-w-2xl">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">Featured</span>
                            <span className="text-neutral-300 text-xs">{articles[0].date} · {articles[0].readTime} read</span>
                        </div>
                        <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white mb-3 leading-snug">{articles[0].title}</h2>
                        <p className="text-neutral-300 text-sm leading-relaxed mb-5">{articles[0].excerpt}</p>
                        <div className="flex items-center gap-3">
                            <img
                                src={`https://images.unsplash.com/photo-${articles[0].authorAvatar}?w=80&q=80`}
                                alt={articles[0].author}
                                className="w-8 h-8 rounded-full object-cover border border-white/30"
                            />
                            <span className="text-white text-sm font-medium">{articles[0].author}</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── ARTICLES GRID ─── */}
            <section className="px-6 md:px-12 py-16">
                <div className="flex items-center justify-between mb-10">
                    <h2 className="text-neutral-400 text-xs uppercase tracking-[0.3em]">{articlesSection.heading}</h2>
                    {activeTopic && (
                        <button
                            onClick={() => setActiveTopic(null)}
                            className="text-xs text-rose-400 hover:text-rose-300 transition-colors"
                        >
                            Clear filter ×
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayed.slice(1).map((article, i) => (
                        <article
                            key={article.title}
                            className="group bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-800 hover:border-neutral-600 hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 cursor-pointer flex flex-col"
                        >
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={unsplash(article.imgId)}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
                                <span className="absolute top-3 left-3 bg-white/10 backdrop-blur text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">
                                    {article.category}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-1">
                                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3">
                                    <span>{article.date}</span>
                                    <span>·</span>
                                    <span>{article.readTime} read</span>
                                </div>
                                <h3 className="font-playfair text-xl font-bold text-white mb-3 group-hover:text-rose-300 transition-colors leading-snug">
                                    {article.title}
                                </h3>
                                <p className="text-neutral-400 text-sm leading-relaxed flex-1">{article.excerpt}</p>
                                <div className="flex items-center gap-3 mt-5 pt-4 border-t border-neutral-800">
                                    <img
                                        src={`https://images.unsplash.com/photo-${article.authorAvatar}?w=80&q=80`}
                                        alt={article.author}
                                        className="w-7 h-7 rounded-full object-cover"
                                    />
                                    <span className="text-neutral-400 text-xs">{article.author}</span>
                                    <span className="ml-auto text-xs text-rose-400 font-semibold group-hover:translate-x-1 transition-transform">Read →</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                {/* Newsletter strip */}
                <div className="mt-16 rounded-3xl bg-gradient-to-br from-rose-900/40 to-orange-900/30 border border-rose-800/40 p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1">
                        <p className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-2">Stay Inspired</p>
                        <h3 className="font-playfair text-2xl font-bold text-white mb-2">Get the Weekly Journal</h3>
                        <p className="text-neutral-400 text-sm">Curated hotel stories, destination tips, and exclusive offer previews — every Friday morning.</p>
                    </div>
                    <div className="flex gap-3 w-full md:w-auto">
                        <input
                            className="flex-1 md:w-64 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-rose-400 transition-colors"
                            placeholder="Your email address"
                        />
                        <button className="bg-rose-500 hover:bg-rose-400 text-white rounded-xl px-5 py-3 text-sm font-semibold transition-colors shrink-0">
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── CONTACT ─── */}
            <section className="px-6 md:px-12 pb-24 max-w-2xl">
                <ContactPanel block={page.contactBlock} theme="dark" />
            </section>
        </div>
    )
}

export default BlogLayout
