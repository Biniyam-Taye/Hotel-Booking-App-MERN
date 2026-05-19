import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import StaticPageLayout from '../components/StaticPageLayout'
import { getFooterPage } from '../data/footerPagesData'

const pathToSlug = {
    '/careers': 'careers',
    '/press': 'press',
    '/blog': 'blog',
    '/partners': 'partners',
    '/help': 'help',
    '/safety': 'safety',
    '/cancel-policy': 'cancel',
    '/support': 'support',
    '/access': 'access',
}

const FooterStaticPage = () => {
    const { pathname } = useLocation()
    const slug = pathToSlug[pathname]
    const page = slug ? getFooterPage(slug) : null

    if (!page) {
        return (
            <div className="pt-32 pb-24 px-6 text-center min-h-[60vh]">
                <h1 className="font-playfair text-3xl font-bold text-gray-900 mb-4">Page not found</h1>
                <Link to="/" className="text-[#49B9FF] font-medium hover:underline">Return home</Link>
            </div>
        )
    }

    return <StaticPageLayout page={page} />
}

export default FooterStaticPage
