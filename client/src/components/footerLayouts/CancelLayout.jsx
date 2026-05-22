import React from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'

/** Legal document — narrow column, comparison table, no hero image */
const CancelLayout = ({ page }) => {
    usePageScroll(page.slug)
    const types = page.sections[0]
    const howTo = page.sections[1]
    const hospitality = page.sections[2]

    return (
        <div className="min-h-screen bg-amber-50">
            <article className="max-w-xl mx-auto px-6 pt-28 pb-24">
                <BackLink />
                <p className="text-amber-700 text-xs font-bold uppercase tracking-widest mt-8">{page.badge}</p>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mt-4 leading-snug">
                    {page.titleLead} {page.titleHighlight}
                </h1>
                <p className="text-gray-600 mt-4 text-sm border-l-4 border-amber-500 pl-4">{page.subtitle}</p>

                <div className="mt-10 space-y-4 text-sm text-gray-700 leading-relaxed">
                    {page.intro.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>

                {page.stats?.length > 0 && (
                    <div className="my-10 flex flex-wrap gap-3">
                        {page.stats.map((s) => (
                            <span key={s.label} className="text-xs bg-white px-3 py-1 rounded border border-amber-200">
                                {s.value} {s.label}
                            </span>
                        ))}
                    </div>
                )}

                <h2 className="text-lg font-bold text-gray-900 mt-12 mb-4 pb-2 border-b-2 border-amber-400">
                    {types.heading}
                </h2>
                <table className="w-full text-sm border-collapse mb-12">
                    <thead>
                        <tr className="bg-amber-100">
                            <th className="text-left p-3 font-bold border border-amber-200">Type</th>
                            <th className="text-left p-3 font-bold border border-amber-200">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {types.items.map((item) => (
                            <tr key={item.title}>
                                <td className="p-3 border border-amber-200 font-semibold align-top w-1/3">{item.title}</td>
                                <td className="p-3 border border-amber-200 text-gray-600 align-top">{item.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <h2 className="text-lg font-bold text-gray-900 mb-6 pb-2 border-b-2 border-amber-400">{howTo.heading}</h2>
                <ol className="list-decimal list-inside space-y-4 text-sm text-gray-700 mb-12">
                    {howTo.items.map((item) => (
                        <li key={item.title}>
                            <strong className="text-gray-900">{item.title}.</strong> {item.description}
                        </li>
                    ))}
                </ol>

                <h2 className="text-lg font-bold text-gray-900 mb-4">{hospitality.heading}</h2>
                <div className="space-y-4 text-sm">
                    {hospitality.items.map((item) => (
                        <blockquote key={item.title} className="border-l-4 border-amber-300 pl-4 italic text-gray-600">
                            <strong className="text-gray-900 not-italic block mb-1">{item.title}</strong>
                            {item.description}
                        </blockquote>
                    ))}
                </div>

                <div className="mt-16 pt-8 border-t border-amber-200">
                    <ContactPanel block={page.contactBlock} theme="orange" />
                </div>
            </article>
        </div>
    )
}

export default CancelLayout
