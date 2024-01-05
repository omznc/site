import { LinkExternal, Subtitle, Title } from '@/components/Text'

const socials = [
    {
        name: 'meet',
        url: 'https://cal.com/omznc',
    },
    {
        name: 'email',
        url: 'mailto:omznc@protonmail.com',
    },
    {
        name: 'github',
        url: 'https://github.com/omznc',
    },
    {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/omznc/',
    },
    {
        name: 'instagram',
        url: 'https://www.instagram.com/omznc/',
    },
    {
        name: 'x, formerly twitter',
        url: 'https://twitter.com/omarzunic',
    },
]
export default function Page() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <Title>contact</Title>
                <Subtitle>{"let's talk"}</Subtitle>
            </div>

            <div className="flex flex-col gap-2">
                {socials.map((social) => (
                    <LinkExternal
                        text={social.name}
                        href={social.url}
                        key={social.name}
                    />
                ))}
            </div>
        </div>
    )
}
