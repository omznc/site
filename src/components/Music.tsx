'use client'

import { useLastFM } from 'use-last-fm'
import Image from 'next/image'
import Link from 'next/link'
import { CgArrowTopRight } from 'react-icons/cg'
import { ImSpinner3 } from 'react-icons/im'
import { PiTidalLogoFill } from 'react-icons/pi'
import { useEffect, useState } from 'react'

interface Song {
    name: string
    artist: string
    art: string
    url: string
    album: string
    timestamp: number
}

const USER = 'Omznc'
const API_KEY = ''

export default function Music() {
    const lastFM = useLastFM(USER, API_KEY)
    const [lastSong, setLastSong] = useState<Song | null>(null)

    useEffect(() => {
        if (!lastSong) {
            const lastSong = localStorage.getItem('lastSong')
            if (lastSong) {
                setLastSong({
                    ...JSON.parse(lastSong),
                })
            }
        }
        if (lastFM.status === 'playing' && lastFM.song.url !== lastSong?.url) {
            const obj = {
                ...lastFM.song,
                timestamp: Date.now(),
            }
            localStorage.setItem('lastSong', JSON.stringify(obj))
            setLastSong(obj)
        }
    }, [lastFM, lastSong])

    return (
        <div className="flex h-full flex-col gap-2 min-h-[100px]">
            {lastFM.status === 'connecting' && (
                <div className="animate-pulse animate-fade-in flex flex-row gap-2">
                    <div className="rounded-md flex items-center justify-center bg-gray-300 dark:bg-neutral-700 h-[100px] w-[100px]">
                        <ImSpinner3 className="animate-spin dark:text-black text-white text-4xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="rounded-md bg-gray-300 dark:bg-neutral-700 h-4 w-36"></div>
                        <div className="rounded-md bg-gray-300 dark:bg-neutral-700 h-4 w-24"></div>
                        <div className="rounded-md bg-gray-300 dark:bg-neutral-700 h-4 w-16"></div>
                    </div>
                </div>
            )}
            {lastFM.status === 'playing' && (
                <Link
                    className="group h-full flex animate-fade-in flex-row gap-2"
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    href={lastFM.song.url}
                >
                    <Image
                        src={lastFM.song.art}
                        alt="album art"
                        className="rounded-md h-[100px] w-auto object-cover z-30 md:hover:scale-125 transition-all hover:shadow-lg opacity-80 group-hover:opacity-100"
                        width={100}
                        height={100}
                        draggable={false}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm inline-flex font-bold group-hover:underline transition-all">
                            {lastFM.song.name}
                            <CgArrowTopRight className="opacity-50 w-6 group-hover:opacity-100 transition-all mt-1" />
                        </p>
                        <p className="text-sm">{lastFM.song.artist}</p>
                        <p className="text-sm opacity-70">Tidal Activity</p>
                    </div>
                </Link>
            )}
            {['idle', 'error'].includes(lastFM.status) && lastSong && (
                <Link
                    className="group h-full flex animate-fade-in flex-row gap-2"
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    href={lastSong.url}
                >
                    <Image
                        src={lastSong.art}
                        alt="album art"
                        className="rounded-md h-[100px] w-auto object-cover z-30 md:hover:scale-125 transition-all hover:shadow-lg opacity-80 group-hover:opacity-100"
                        width={100}
                        height={100}
                        draggable={false}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm inline-flex font-bold group-hover:underline transition-all">
                            {lastSong.name}
                            <CgArrowTopRight className="opacity-50 w-6 group-hover:opacity-100 transition-all mt-1" />
                        </p>
                        <p className="text-sm">{lastSong.artist}</p>
                        <p className="text-sm opacity-70">
                            {(() => {
                                const diff = Date.now() - lastSong.timestamp
                                const days = Math.floor(
                                    diff / (1000 * 60 * 60 * 24)
                                )
                                const hours = Math.floor(
                                    diff / (1000 * 60 * 60)
                                )
                                const minutes = Math.floor(diff / (1000 * 60))
                                if (days > 0) {
                                    return `Listened to ${days} days ago`
                                } else if (hours > 0) {
                                    return `Listened to  ${hours} hours ago`
                                } else if (minutes > 0) {
                                    return `Listened to ${minutes} minutes ago`
                                } else {
                                    return `Listened to just now`
                                }
                            })()}
                        </p>
                        <p className="text-sm opacity-70">Tidal Activity</p>
                    </div>
                </Link>
            )}
            {['idle', 'error'].includes(lastFM.status) && !lastSong && (
                <div className="flex  flex-row gap-2">
                    <div className="rounded-md flex items-center justify-center bg-gray-300 dark:bg-neutral-700 h-[100px] w-[100px]">
                        <PiTidalLogoFill className="w-10 h-10 text-white dark:text-black" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-sm font-bold">
                            Not listening to anything right now
                        </p>
                        <p className="text-sm">
                            {"But if I were, it'd show up here"}
                        </p>
                        <p className="text-sm opacity-70">Tidal Activity</p>
                    </div>
                </div>
            )}
        </div>
    )
}
