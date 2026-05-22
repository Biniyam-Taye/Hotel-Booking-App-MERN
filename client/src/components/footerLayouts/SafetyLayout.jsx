import React, { useState } from 'react'
import { BackLink, ContactPanel, usePageScroll } from './FooterShared'
import { FooterIcon } from './FooterIcons'

const unsplash = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80`

const SafetyLayout = ({ page }) => {
    usePageScroll(page.slug)
    const pillars = page.sections[0]
    const guidelines = page.sections[1]

    const [concernForm, setConcernForm] = useState({
        name: '',
        email: '',
        propertyName: '',
        stayDates: '',
        description: '',
        category: 'Property Condition'
    })
    const [submitted, setSubmitted] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setConcernForm(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmitConcern = (e) => {
        e.preventDefault()
        setSubmitted(true)
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            {/* ─── HERO SECTION (preserved) ─── */}
            <section className="pt-28 px-6 md:px-16 pb-20 relative overflow-hidden">
                <div className="absolute top-20 right-6 md:right-16 w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden ring-4 ring-emerald-400 opacity-90">
                    <img src={page.heroImage} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="max-w-3xl relative z-10">
                    <BackLink className="text-emerald-400 hover:text-white" />
                    <div className="mt-8 inline-block px-4 py-2 rounded-lg bg-emerald-900 text-emerald-200 text-xs font-bold uppercase tracking-wider">
                        {page.badge}
                    </div>
                    <h1 className="font-playfair text-5xl md:text-7xl font-bold mt-6 leading-tight">
                        {page.titleLead}
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                            {page.titleHighlight}
                        </span>
                    </h1>
                    <p className="text-emerald-100/80 text-xl mt-6 max-w-lg">{page.subtitle}</p>
                </div>
                <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full border-[40px] border-emerald-800/30 pointer-events-none" />
            </section>

            {/* ─── STATS PILLS ─── */}
            {page.stats && (
                <section className="px-6 md:px-16 py-8 flex flex-wrap gap-4 justify-center bg-slate-900 border-y border-slate-800">
                    {page.stats.map((s) => (
                        <span key={s.label} className="px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-sm flex items-center gap-2">
                            <strong className="text-emerald-400 font-extrabold">{s.value}</strong> 
                            <span className="text-slate-400">·</span> 
                            <span className="text-slate-300 text-xs font-semibold">{s.label}</span>
                        </span>
                    ))}
                </section>
            )}

            {/* ─── INTRO ─── */}
            <section className="px-6 md:px-16 py-12 max-w-4xl mx-auto">
                {page.intro.map((p, i) => (
                    <p key={i} className="text-slate-300 leading-relaxed mb-6 text-lg text-center font-light">
                        {p}
                    </p>
                ))}
            </section>

            {/* ─── SAFETY PILLARS ─── */}
            <section className="px-6 md:px-16 py-20 bg-slate-900/40 border-t border-slate-900">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-3">Our Core Promise</p>
                        <h2 className="font-playfair text-4xl md:text-5xl font-bold">{pillars.heading}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pillars.items.map((item) => (
                            <div
                                key={item.title}
                                className="group relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-950/20 hover:-translate-y-1 transition-all duration-400 flex flex-col justify-between min-h-[260px]"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-950 group-hover:scale-110 transition-transform duration-300">
                                    <FooterIcon name={item.icon} className="w-6 h-6 text-white" />
                                </div>
                                <div className="mt-8">
                                    <h3 className="font-bold text-lg text-white">{item.title}</h3>
                                    <p className="text-slate-400 text-xs mt-3 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── GUEST GUIDELINES ─── */}
            <section className="bg-white text-gray-900 px-6 md:px-16 py-24 rounded-t-[3.5rem] shadow-2xl">
                <div className="max-w-6xl mx-auto grid md:grid-cols-12 gap-12 items-start">
                    
                    {/* Left Column: Guidelines Checklist */}
                    <div className="md:col-span-7">
                        <p className="text-emerald-600 text-xs font-bold uppercase tracking-widest mb-3">Community Safety</p>
                        <h2 className="font-playfair text-4xl font-bold mb-10 text-slate-900">{guidelines.heading}</h2>
                        
                        <div className="space-y-6">
                            {guidelines.items.map((item, index) => (
                                <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-sm shrink-0">
                                        {index + 1}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                                        <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Reporting Form Mockup */}
                    <div className="md:col-span-5 bg-slate-50 border border-slate-150 rounded-3xl p-8 shadow-sm">
                        {!submitted ? (
                            <form onSubmit={handleSubmitConcern} className="space-y-4">
                                <div>
                                    <h3 className="font-playfair text-2xl font-bold text-slate-900">Report a Concern</h3>
                                    <p className="text-slate-500 text-xs mt-1">Submit property, guest, or safety issues directly to our safety desk.</p>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Your Name</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        value={concernForm.name}
                                        onChange={handleInputChange}
                                        placeholder="Alex Miller"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 transition-all text-slate-800"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        value={concernForm.email}
                                        onChange={handleInputChange}
                                        placeholder="alex@example.com"
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 transition-all text-slate-800"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Property Name</label>
                                        <input
                                            type="text"
                                            name="propertyName"
                                            value={concernForm.propertyName}
                                            onChange={handleInputChange}
                                            placeholder="Ocean Crest Villa"
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 transition-all text-slate-800"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Category</label>
                                        <select
                                            name="category"
                                            value={concernForm.category}
                                            onChange={handleInputChange}
                                            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 transition-all text-slate-600"
                                        >
                                            <option value="Property Condition">Property Issue</option>
                                            <option value="Host Misbehavior">Host Issue</option>
                                            <option value="Payment Security">Payment Issue</option>
                                            <option value="Other">Other Concern</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold">Description</label>
                                    <textarea
                                        required
                                        rows="3"
                                        name="description"
                                        value={concernForm.description}
                                        onChange={handleInputChange}
                                        placeholder="Detail what happened. Attachments can be sent in response to our confirmation email."
                                        className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-emerald-500 transition-all resize-none text-slate-800"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl py-3 text-xs font-bold transition-all shadow-md active:scale-[0.98]"
                                >
                                    Send Safety Report
                                </button>
                            </form>
                        ) : (
                            <div className="text-center py-8 space-y-4">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-xl font-bold">
                                    ✓
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Safety Case Logged</h4>
                                    <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                                        We have initiated a safety case review for your report. A trust representative will contact you shortly.
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="text-xs text-emerald-600 hover:underline font-semibold"
                                >
                                    Log another issue
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Contact desk */}
                <div className="mt-20 max-w-4xl mx-auto">
                    <ContactPanel block={page.contactBlock} theme="emerald" />
                </div>
            </section>
        </div>
    )
}

export default SafetyLayout
