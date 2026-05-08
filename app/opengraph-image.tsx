
import { generateOgImage, OgImageSize } from '@/lib/og-utils';

export const runtime = 'nodejs';
export const alt = 'वकिली आणि कायदे';
export const size = OgImageSize;
export const contentType = 'image/png';

export default async function Image() {
    return generateOgImage({
        title: 'Kaydyanch Ani Faydyach',
        subtitle: 'Trustworthy Legal Knowledge Center',
        tag: 'Legal Guides & Ebooks',
        coverImageUrl: 'https://www.vakilianikayde.in/opengraph/homep.png' // Optional: Use actual logo or default image if available
    });
}
