'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { CgArrowTopRight } from 'react-icons/cg'
import { HiOutlineMenuAlt4 } from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { MdOutlineNavigateNext } from 'react-icons/md'
import {
    BsFillArrowDownSquareFill,
    BsFillArrowLeftSquareFill,
    BsFillArrowRightSquareFill,
    BsFillArrowUpSquareFill,
} from 'react-icons/bs'
import { SidebarEntry } from '@/helpers/types'
import Logo from '../../public/logo.svg'
import { useTheme } from 'next-themes'

export default function Sidebar() {
    const { theme, setTheme } = useTheme()
    const [open, setOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const path = usePathname()
    const router = useRouter()

    // Sidebar keyboard navigation.
    useEffect(() => {
        const nonExternalEntries = sidebarEntries.filter(
            (entry) => !entry.external
        )

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp') {
                const currentIndex = nonExternalEntries.findIndex(
                    (entry) => entry.link === path
                )
                const nextIndex =
                    (currentIndex - 1 + nonExternalEntries.length) %
                    nonExternalEntries.length
                router.push(nonExternalEntries[nextIndex].link!) // We skip external links.
            } else if (e.key === 'ArrowDown') {
                const currentIndex = nonExternalEntries.findIndex(
                    (entry) => entry.link === path
                )
                const nextIndex = (currentIndex + 1) % nonExternalEntries.length
                router.push(nonExternalEntries[nextIndex].link!) // We skip external links.
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [path, router])

    // Sidebar theme keyboard switch.
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['d', 'D'].includes(e.key)) {
                setTheme(theme === 'dark' ? 'light' : 'dark')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [setTheme, theme])

    useEffect(() => {
        setOpen(false)
    }, [path])

    useEffect(() => setMounted(true), [])

    return (
        <>
            <div
                style={{
                    // Safe center does not exist in Tailwind yet.
                    justifyContent: 'safe center',
                }}
                className="relative gradientParent md:flex select-none hidden min-h-fit overflow-auto flex-col gap-4 border-r-[1px] dark:border-white border-black border-opacity-10 dark:border-opacity-10 items-end p-8 w-1/3 min-w-fit brightness-95 max-w-[1000px] h-full"
            >
                {/*gradient sphere*/}
                <div className="gradient" />

                <div className="relative group w-[300px] min-h-[50px] select-none p-2 text-2xl flex justify-end items-center">
                    <Link
                        href={'/'}
                        className="absolute scale-100 group-hover:scale-0 transition-all origin-left"
                    >
                        omar žunić
                    </Link>
                    <Logo
                        viewBox="0 0 805 142"
                        className={`absolute z-50 w-[150px] ${
                            theme === 'light' ? 'invert' : ''
                        } scale-0 group-hover:scale-100 transition-all origin-right`}
                    />
                </div>

                <div className="w-[100px] -mr-8 h-[1px] bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10" />

                <div className="flex flex-col items-center justify-center gap-4 p-2 w-[300px]">
                    {sidebarEntries.map((entry) => (
                        <SidebarElement
                            key={entry.link}
                            title={entry.title}
                            link={entry.link}
                            external={entry.external}
                        />
                    ))}
                </div>
                <div className="w-[100px] -mr-8 h-[1px] bg-black bg-opacity-10 dark:bg-white dark:bg-opacity-10" />
                <div className="flex flex-col items-center justify-center gap-4 p-2 w-[300px]">
                    {mounted && (
                        <SidebarElement
                            title={
                                // nested ternary operators are fun, right?
                                theme === 'system'
                                    ? 'switch it up'
                                    : theme === 'light'
                                      ? 'go to sleep'
                                      : 'rise and shine'
                            }
                            onClick={() => {
                                if (theme !== 'system') {
                                    setTheme(
                                        theme === 'light' ? 'dark' : 'light'
                                    )
                                    return
                                }
                                const prefersDarkScheme = window.matchMedia(
                                    '(prefers-color-scheme: dark)'
                                )
                                if (prefersDarkScheme.matches) {
                                    setTheme('light')
                                } else {
                                    setTheme('dark')
                                }
                            }}
                            noArrow
                            fadeIn
                        />
                    )}
                </div>
                <div className="group overflow-hidden flex flex-col items-end gap-2">
                    <div className="inline-flex pr-2 transition-all select-none justify-center items-center gap-2 opacity-25">
                        <BsFillArrowUpSquareFill title={'Go up'} />
                        <BsFillArrowDownSquareFill title={'Go down'} />
                        <div
                            className="rounded-sm text-xs bg-black transition-all aspect-square dark:bg-white text-white dark:text-black h-4 p-1 w-auto flex justify-center items-center"
                            title={'Toggle theme'}
                        >
                            D
                        </div>
                    </div>
                    <div className="opacity-0 overflow-hidden inline-flex pr-2 transition-all select-none justify-center items-center gap-2 group-hover:opacity-10 translate-x-full group-hover:translate-x-0">
                        <BsFillArrowUpSquareFill />
                        <BsFillArrowUpSquareFill />
                        <BsFillArrowDownSquareFill />
                        <BsFillArrowDownSquareFill />
                        <BsFillArrowLeftSquareFill />
                        <BsFillArrowRightSquareFill />
                        <BsFillArrowLeftSquareFill />
                        <BsFillArrowRightSquareFill />
                        <div className="rounded-sm text-xs bg-black transition-all aspect-square dark:bg-white text-white dark:text-black h-4 p-1 w-auto flex justify-center items-center">
                            B
                        </div>
                        <div className="rounded-sm text-xs bg-black transition-all aspect-square dark:bg-white text-white dark:text-black h-4 p-1 w-auto flex justify-center items-center">
                            A
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex md:hidden w-full h-fit flex-col justify-center items-center border-b-[1px] dark:border-white border-black border-opacity-10 dark:border-opacity-10">
                <div className="w-full select-none p-8 text-2xl flex justify-between items-center">
                    <Link href={'/'}>omar žunić</Link>
                    <HiOutlineMenuAlt4
                        className="text-4xl cursor-pointer transition-all"
                        onClick={() => setOpen(!open)}
                    />
                </div>
                {open && <MobileNavigation setOpen={setOpen} />}
            </div>
        </>
    )
}

const sidebarEntries: SidebarEntry[] = [
    {
        title: 'home',
        link: '/',
        external: false,
    },
    {
        title: 'projects',
        link: '/projects',
        external: false,
    },
    {
        title: 'experience',
        link: '/experience',
        external: false,
    },
    {
        title: 'contact',
        link: '/contact',
        external: false,
    },
    {
        title: "let's talk",
        link: 'https://cal.com/omznc',
        external: true,
    },
    {
        title: 'linkedin',
        link: 'https://www.linkedin.com/in/omznc/',
        external: true,
    },
    {
        title: 'resume',
        link: '/resume.pdf',
        external: true,
    },
]

type MobileNavigationProps = {
    setOpen: (open: boolean) => void
}
const MobileNavigation = ({ setOpen }: MobileNavigationProps) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <div className="fixed z-50 bottom-0 top-0 w-full gap-8 h-full justify-start items-center flex flex-col bg-white dark:bg-background">
            <div className="w-full  select-none p-8 text-2xl flex justify-between items-center">
                <Link href={'/'}>omar žunić</Link>
                <HiOutlineMenuAlt4
                    className="text-4xl cursor-pointer transition-all"
                    onClick={() => setOpen(false)}
                />
            </div>
            <div className="gap-8 justify-center items-start flex flex-col">
                {sidebarEntries.map((entry) => (
                    <SidebarElement
                        key={entry.link}
                        title={entry.title}
                        link={entry.link}
                        external={entry.external}
                    />
                ))}
                {mounted && (
                    <SidebarElement
                        title={
                            theme === 'system'
                                ? 'switch it up'
                                : theme === 'light'
                                  ? 'go to sleep'
                                  : 'rise and shine'
                        }
                        onClick={() => {
                            if (theme !== 'system') {
                                setTheme(theme === 'light' ? 'dark' : 'light')
                                return
                            }
                            const prefersDarkScheme = window.matchMedia(
                                '(prefers-color-scheme: dark)'
                            )
                            if (prefersDarkScheme.matches) {
                                setTheme('light')
                            } else {
                                setTheme('dark')
                            }
                        }}
                        noArrow
                        fadeIn
                    />
                )}
            </div>
        </div>
    )
}

export function SidebarElement({
    title,
    link,
    onClick,
    external,
    noArrow,
    fadeIn,
}: SidebarEntry) {
    const path = usePathname()

    const active = (path.includes(link ?? '') && link !== '/') || path === link

    return (
        <div
            onClick={onClick}
            className={`${
                active ? 'opacity-100' : 'opacity-60'
            } group transition-all md:justify-end justify-center items-center flex w-full ${
                fadeIn ? 'animate-fade-in' : ''
            }`}
        >
            <Link
                href={link ?? '#'}
                target={external ? '_blank' : undefined}
                className={`text-lg items-center justify-center text-center flex gap-1 transition-all hover:underline ${
                    external ? 'mr-4 md:mr-0' : ''
                }`}
                prefetch={title !== 'resume'}
            >
                {!noArrow && (
                    <MdOutlineNavigateNext
                        className={active ? 'block -ml-5' : 'hidden'}
                    />
                )}
                {external && (
                    <CgArrowTopRight className="group-hover:opacity-100 transition-all opacity-50 mt-1" />
                )}
                {title}
            </Link>
        </div>
    )
}
