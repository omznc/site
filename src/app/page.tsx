import { Link, Paragraph, Subtitle, Title } from '@/components/Text'
import Music from '@/components/Music'
import { SiNextdotjs, SiStrapi, SiTailwindcss } from 'react-icons/si'
import Media from '@/components/Media'

export default function Home() {
    return (
        <div className="flex flex-col gap-8">
            <div>
                <Title>{"who's this guy?"}</Title>
                <Subtitle>about me</Subtitle>
            </div>
            <Paragraph>
                {`I am a 22-year-old Software Engineering Student, a GoLang Backend Developer, and a creator`}
            </Paragraph>
            <Paragraph>
                {`Typescript and Python are my biggest strengths, but I have also
                    worked with C#, C++, Go, CSS, HTML, Rust, and with technologies
                    such as React, NextJS, Unity, Tailwind, and probably anything
                    else you could think of`}
            </Paragraph>
            <Paragraph>
                I am currently working on a few projects, but I am always open
                to new opportunities. Feel free to{' '}
                <Link href={'/contact'}>contact me</Link>
                {' anytime, with anything'}
            </Paragraph>
            <div className="h-fit w-fit flex flex-col lg:items-center lg:flex-row gap-4">
                <Music />
                <Media />
            </div>
            <div className="opacity-50 transition-all cursor-default flex items-center gap-1">
                <span className="flex items-center gap-1 px-2 py-0.5">
                    <SiNextdotjs className="inline" /> NextJS
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5">
                    <SiTailwindcss className="inline" /> Tailwind
                </span>
                <span className="flex items-center gap-1 px-2 py-0.5">
                    <SiStrapi className="inline" /> Strapi
                </span>
            </div>
        </div>
    )
}
