import { default as NextLink } from 'next/link'
import { CgArrowTopRight } from 'react-icons/cg'
import { ReactNode } from 'react'

export function Title({ children }: Readonly<{ children: ReactNode }>) {
    return <h1 className="text-3xl font-semibold">{children}</h1>
}

export function TitleSecondary({
    children,
}: Readonly<{ children: ReactNode }>) {
    return <h1 className="text-2xl">{children}</h1>
}

export function Subtitle({ children }: Readonly<{ children: ReactNode }>) {
    return <h2 className="text-xl opacity-70">{children}</h2>
}

export function Paragraph({ children }: Readonly<{ children: ReactNode }>) {
    return <p className="text-base">{children}</p>
}

export function Link({
    children,
    href,
}: Readonly<{
    children: ReactNode
    href: string
}>) {
    return (
        <NextLink
            href={href}
            className="text-base font-semibold transition-all hover:underline"
        >
            {children}
        </NextLink>
    )
}

type LinkExternalProps = {
    text: string
    href: string
}

export function LinkExternal({ text, href }: Readonly<LinkExternalProps>) {
    return (
        <NextLink
            href={href}
            target={'_blank'}
            className="hover:underline group block"
        >
            {text}
            <CgArrowTopRight className="inline ml-1 opacity-50 group-hover:opacity-100 transition-all " />
        </NextLink>
    )
}
