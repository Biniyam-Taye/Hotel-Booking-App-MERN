import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getOfferById, exclusiveOffers, offerTheme } from '../data/exclusiveOffersData'
import { useAppContext } from '../context/AppContext'

const OfferDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { currency } = useAppContext()
    const offer = getOfferById(id)
    const [mainImage, setMainImage] = useState(null)

    useEffect(() => {
        if (offer) {
            setMainImage(offer.image)
            scrollTo(0, 0)
        }
    }, [offer])

    if (!offer) {
        return (
            <div className="pt-32 pb-24 px-6 text-center min-h-[60vh]">
                <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Offer not found</h1>
                <Link to="/offers" className="text-orange-500 font-semibold hover:underline">← Back to all offers</Link>
            </div>
        )
    }

    const related = exclusiveOffers.filter((o) => o._id !== offer._id).slice(0, 2)
    const cfg = offerTheme

    return (
        <div className="relative min-h-screen bg-white overflow-hidden">
            {/* Ambient blobs */}
            <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-orange-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-pink-100/40 rounded-full blur-3xl translate-x-1/3 pointer-events-none" />
            <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-violet-100/30 rounded-full blur-3xl pointer-events-none" />

            {/* Hero */}
            <section className="relative pt-28 pb-12 px-6 md:px-16 lg:px-24 xl:px-32 z-10">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="group/back flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-orange-600 mb-8 transition-colors"
                >
                    <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 group-hover/back:border-orange-300 group-hover/back:bg-orange-50 transition-all">
                        <svg className="w-4 h-4 group-hover/back:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </span>
                    Back to offers
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
                    {/* Gallery */}
                    <div className="group/gallery space-y-4">
                        <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(249,115,22,0.15)] aspect-[4/3]">
                            <img
                                src={mainImage}
                                alt={offer.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover/gallery:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            <div className={`absolute top-4 left-4 bg-gradient-to-r ${cfg.badge} px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg flex items-center gap-2`}>
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                </svg>
                                {offer.priceOff}% OFF
                            </div>
                            <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-xs font-bold text-gray-800">
                                {offer.category}
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-3">
                            {offer.gallery.map((img, i) => (
                                <button
                                    key={i}
                                    type="button"
                                    onClick={() => setMainImage(img)}
                                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-300 hover:-translate-y-1 ${mainImage === img ? 'border-orange-400 shadow-lg shadow-orange-200/50' : 'border-transparent opacity-80 hover:opacity-100'}`}
                                >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Intro */}
                    <div className="flex flex-col">
                        <div className={`inline-flex items-center gap-1.5 ${cfg.tag} border text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit`}>
                            <span>⏱</span> Expires {offer.expiryDate}
                        </div>

                        <h1 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-3 leading-tight">
                            {offer.title}
                        </h1>
                        <p className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500 font-medium mb-6">
                            {offer.tagline}
                        </p>

                        <div className="flex items-center gap-3 mb-6 group/divider">
                            <div className="h-[2px] w-10 bg-gradient-to-r from-transparent to-orange-400 transition-all duration-700 group-hover/divider:w-16" />
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-400 group-hover/divider:scale-125 transition-transform" />
                            <div className="h-[2px] w-10 bg-gradient-to-l from-transparent to-orange-400 transition-all duration-700 group-hover/divider:w-16" />
                        </div>

                        <p className="text-gray-600 leading-relaxed mb-8">{offer.longDescription}</p>

                        <div className="flex flex-wrap gap-4 mb-8">
                            <div className="px-5 py-4 rounded-2xl bg-orange-50/80 border border-orange-100 group/stat hover:border-orange-300 hover:shadow-md transition-all">
                                <p className="text-xs text-gray-500 mb-1">From</p>
                                <p className="text-gray-400 line-through text-sm">{currency}{offer.originalFrom}</p>
                                <p className="text-2xl font-bold text-gray-900">{currency}{offer.discountedFrom}</p>
                                <p className="text-xs text-gray-500 mt-1">{offer.currencyNote}</p>
                            </div>
                            <div className="px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-all">
                                <p className="text-xs text-gray-500 mb-1">Stay length</p>
                                <p className="font-bold text-gray-900">{offer.validNights}</p>
                            </div>
                            <div className="px-5 py-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-orange-200 transition-all">
                                <p className="text-xs text-gray-500 mb-1">Guests</p>
                                <p className="font-bold text-gray-900">Up to {offer.maxGuests}</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <div className="relative group/cta flex-1 min-w-[200px]">
                                <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${cfg.badge} opacity-0 group-hover/cta:opacity-40 blur-md transition-all duration-500`} />
                                <button
                                    type="button"
                                    onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}
                                    className={`relative w-full flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-white bg-gradient-to-r ${cfg.btnAccent} shadow-lg shadow-orange-500/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all overflow-hidden`}
                                >
                                    <span className="relative z-10 flex items-center gap-2">
                                        Claim This Offer
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/cta:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                                </button>
                            </div>
                            <span className="self-center text-sm text-gray-400 font-medium">Save {offer.priceOff}%</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Highlights */}
            <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-16 z-10">
                <div className="text-center mb-12 group/header">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                        Package <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Highlights</span>
                    </h2>
                    <div className="flex items-center justify-center gap-3 group/divider2">
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-orange-400 group-hover/divider2:w-20 transition-all duration-700" />
                        <div className="w-3 h-3 rounded-full bg-orange-400" />
                        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-orange-400 group-hover/divider2:w-20 transition-all duration-700" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {offer.highlights.map((h, i) => (
                        <div
                            key={h.title}
                            className="group p-6 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.06)] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] hover:border-orange-200 transition-all duration-500"
                        >
                            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.badge} flex items-center justify-center text-white font-bold text-lg mb-4 group-hover:scale-110 transition-transform`}>
                                {i + 1}
                            </div>
                            <h3 className="font-playfair text-lg font-bold text-gray-900 mb-2">{h.title}</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">{h.desc}</p>
                            <div className={`mt-4 h-[2px] w-0 bg-gradient-to-r ${cfg.accentLine} group-hover:w-full transition-all duration-500`} />
                        </div>
                    ))}
                </div>
            </section>

            {/* Two columns: inclusions + redeem */}
            <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-16 bg-gradient-to-b from-orange-50/30 to-white z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-orange-100/50 transition-shadow">
                        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">✓</span>
                            What&apos;s Included
                        </h3>
                        <ul className="space-y-4">
                            {offer.inclusions.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-gray-600 group/item hover:text-gray-900 transition-colors">
                                    <span className="mt-1.5 w-2 h-2 rounded-full bg-gradient-to-r from-orange-400 to-pink-500 flex-shrink-0 group-hover/item:scale-125 transition-transform" />
                                    <span className="text-sm md:text-base leading-relaxed">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-orange-100/50 transition-shadow">
                        <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <span className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600">→</span>
                            How to Redeem
                        </h3>
                        <ol className="space-y-5">
                            {offer.howToRedeem.map((step, i) => (
                                <li key={step} className="flex gap-4">
                                    <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${cfg.badge} text-white text-sm font-bold flex items-center justify-center`}>
                                        {i + 1}
                                    </span>
                                    <p className="text-gray-600 text-sm md:text-base leading-relaxed pt-1">{step}</p>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            {/* Destinations */}
            <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-16 z-10">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-6 text-center">
                    Participating <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Destinations</span>
                </h3>
                <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
                    {offer.destinations.map((dest) => (
                        <span
                            key={dest}
                            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 text-orange-700 text-sm font-semibold hover:-translate-y-1 hover:shadow-md hover:border-orange-300 transition-all cursor-default"
                        >
                            {dest}
                        </span>
                    ))}
                </div>
            </section>

            {/* Terms */}
            <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 pb-20 z-10">
                <details className="group max-w-4xl mx-auto rounded-3xl border border-gray-200 bg-gray-50/50 overflow-hidden hover:border-orange-200 transition-colors">
                    <summary className="cursor-pointer list-none px-8 py-5 font-playfair text-xl font-bold text-gray-900 flex items-center justify-between">
                        Terms & Conditions
                        <span className="text-orange-500 group-open:rotate-180 transition-transform">▼</span>
                    </summary>
                    <div className="px-8 pb-8 pt-2 border-t border-gray-100">
                        <p className="text-sm text-gray-500 mb-4">Offer valid until {offer.expiryFull}. Please read carefully before booking.</p>
                        <ul className="space-y-2">
                            {offer.terms.map((t) => (
                                <li key={t} className="text-sm text-gray-600 flex gap-2">
                                    <span className="text-orange-400">•</span>
                                    {t}
                                </li>
                            ))}
                        </ul>
                    </div>
                </details>
            </section>

            {/* Related offers */}
            {related.length > 0 && (
                <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 py-20 border-t border-gray-100 z-10">
                    <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-10 text-center">
                        You May Also <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-500">Like</span>
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {related.map((item) => (
                            <Link
                                key={item._id}
                                to={`/offers/${item._id}`}
                                onClick={() => scrollTo(0, 0)}
                                className="group flex gap-5 p-5 rounded-3xl bg-white border border-gray-100 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(249,115,22,0.15)] hover:border-orange-200 transition-all"
                            >
                                <img src={item.image} alt={item.title} className="w-28 h-28 rounded-2xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform" />
                                <div>
                                    <span className={`inline-block text-xs font-bold text-white bg-gradient-to-r ${cfg.badge} px-2 py-0.5 rounded-full mb-2`}>
                                        {item.priceOff}% OFF
                                    </span>
                                    <p className="font-playfair font-bold text-gray-900 group-hover:text-orange-600 transition-colors">{item.title}</p>
                                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cfg.accentLine} opacity-50`} />
        </div>
    )
}

export default OfferDetail
