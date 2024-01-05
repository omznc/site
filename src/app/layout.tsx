import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import { Metadata } from 'next'
import ThemeProvider from '@/components/ThemeProvider'
import Script from 'next/script'
import dynamic from 'next/dynamic'

const inter = Inter({ subsets: ['latin'] })

// This loads a gif, so we're loading it dynamically.
const Konami = dynamic(() => import('@/components/Konami'), { ssr: false })

export const metadata: Metadata = {
    title: 'Omar Žunić - Software Engineer',
    metadataBase: new URL('https://omarzunic.com'),
    description:
        'A personal website containing information, projects, blog posts, socials, and other information you may find interesting.',
    authors: [
        {
            name: 'Omar Žunić',
            url: 'https://omarzunic.com',
        },
    ],
    keywords: [
        'Omar Žunić',
        'Omar Zunic',
        'Omar',
        'Žunić',
        'Zunic',
        'Software Engineer',
        'Software',
        'Bosnia',
        'ZenDev',
        'Rust',
        'React',
        'Next.js',
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <Script
                defer
                data-domain="omarzunic.com"
                src="https://analytics.omarzunic.com/js/script.js" // Plausible Analytics
            />
            <body
                className={[
                    inter.className,
                    'h-[100dvh] w-screen justify-center items-center flex dark:bg-background dark:text-white bg-white text-black',
                ].join(' ')}
                suppressHydrationWarning
            >
                <Konami />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    disableTransitionOnChange
                >
                    <div className="h-full w-full flex md:flex-row flex-col items-center gap-0">
                        <Sidebar />
                        <div
                            className="h-full w-full  overflow-auto flex justify-start p-8 md:py-32"
                            id="content"
                        >
                            {children}
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}
