import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'वकिली आणि कायदे',
        short_name: 'Vakili Aani Kayde',
        description: 'दररोज उपयोगी पडणारी कायदेशीर माहिती — थेट आणि स्पष्ट. सामान्य नागरिकांसाठी, त्यांच्या भाषेत.',
        start_url: '/',
        display: 'standalone',
        display_override: ['window-controls-overlay', 'standalone'],
        background_color: '#ffffff',
        theme_color: '#5A1A2B',
        categories: ['education', 'lifestyle', 'books'],
        icons: [
            {
                src: '/web-app-manifest-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable',
            },
            {
                src: '/web-app-manifest-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        shortcuts: [
            {
                name: 'E-Books',
                url: '/ebooks',
            },
            {
                name: 'Combo Packs',
                url: '/combos',
            },
        ],
    };
}
