import StaticPageLayout from '../../components/StaticPageLayout'
import { footerPages } from '../../data/footerPagesData'

const createFooterPage = (slug) => {
    const Page = () => <StaticPageLayout page={footerPages[slug]} />
    Page.displayName = `${slug.charAt(0).toUpperCase() + slug.slice(1)}Page`
    return Page
}

export const CareersPage = createFooterPage('careers')
export const PressPage = createFooterPage('press')
export const BlogPage = createFooterPage('blog')
export const PartnersPage = createFooterPage('partners')
export const HelpPage = createFooterPage('help')
export const SafetyPage = createFooterPage('safety')
export const CancelPolicyPage = createFooterPage('cancel')
export const SupportPage = createFooterPage('support')
export const AccessPage = createFooterPage('access')
