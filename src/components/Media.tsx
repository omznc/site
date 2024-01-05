'use client'

import Image from 'next/image'
import Link from 'next/link'
import { CgArrowTopRight } from 'react-icons/cg'
import { ImSpinner3 } from 'react-icons/im'
import { useEffect, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import useSWR from 'swr'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'

const SHOWS = 'https://api.trakt.tv/users/kewlkez/watched/shows'
const MOVIES = 'https://api.trakt.tv/users/kewlkez/watched/movies'
const API_KEY = ''
const TMDB_API_KEY = ''

type Show = {
    plays: number
    last_watched_at: string
    last_updated_at: string
    reset_at: string | null
    show: {
        title: string
        year: number
        ids: {
            trakt: number
            slug: string
            tvdb: number
            imdb: string
            tmdb: number
            tvrage: number | null
        }
    }
    seasons: {
        number: number
        episodes: {
            number: number
            plays: number
            last_watched_at: string
        }[]
    }[]
}

type Movie = {
    plays: number
    last_watched_at: string
    last_updated_at: string
    movie: {
        title: string
        year: number
        ids: {
            trakt: number
            slug: string
            imdb: string
            tmdb: number
        }
    }
}

interface LastWatched {
    type: 'show' | 'movie'
    show?: Show & { cover: string }
    movie?: Movie & { cover: string }
}

export default function Media() {
    const { data: movies } = useSWR(
        MOVIES,
        (url: string) =>
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'trakt-api-version': '2',
                    'trakt-api-key': API_KEY,
                },
            }).then((res) => res.json()),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    const { data: shows } = useSWR(
        SHOWS,
        (url: string) =>
            fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'trakt-api-version': '2',
                    'trakt-api-key': API_KEY,
                },
            }).then((res) => res.json()),
        {
            revalidateIfStale: false,
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
        }
    )

    const [lastWatched, setLastWatched] = useState<LastWatched | null>(null)

    useEffect(() => {
        if (movies && shows) {
            const lastWatchedShow = (shows as Show[]).reduce((prev, current) =>
                prev.last_watched_at > current.last_watched_at ? prev : current
            )
            const lastWatchedMovie = (movies as Movie[]).reduce(
                (prev, current) =>
                    prev.last_watched_at > current.last_watched_at
                        ? prev
                        : current
            )

            if (
                lastWatchedShow.last_watched_at >
                lastWatchedMovie.last_watched_at
            ) {
                const details = fetch(
                    `https://api.themoviedb.org/3/tv/${lastWatchedShow.show.ids.tmdb}?api_key=${TMDB_API_KEY}`
                )

                details.then(async (res) => {
                    const show = await res.json()

                    setLastWatched({
                        type: 'show',
                        show: {
                            ...lastWatchedShow,
                            cover: `https://image.tmdb.org/t/p/original${show.poster_path}`,
                        },
                    })
                })
            } else {
                const details = fetch(
                    `https://api.themoviedb.org/3/movie/${lastWatchedMovie.movie.ids.tmdb}?api_key=${TMDB_API_KEY}`
                )
                details.then(async (res) => {
                    const movie = await res.json()

                    setLastWatched({
                        type: 'movie',
                        movie: {
                            ...lastWatchedMovie,
                            cover: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                        },
                    })
                })
            }
        }
    }, [movies, shows])

    return (
        <div className="flex flex-col gap-2 min-h-[100px]">
            {!lastWatched && !movies && !shows && (
                <div className="animate-pulse flex flex-row gap-2">
                    <div className="rounded-md flex items-center justify-center bg-gray-300 dark:bg-neutral-700 h-[100px] w-[66px]">
                        <ImSpinner3 className="animate-spin dark:text-black text-white text-4xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="rounded-md bg-gray-300 dark:bg-neutral-700 h-4 w-36"></div>
                        <div className="rounded-md bg-gray-300 dark:bg-neutral-700 h-4 w-24"></div>
                        <div className="rounded-md bg-gray-300 dark:bg-neutral-700 h-4 w-16"></div>
                    </div>
                </div>
            )}
            {lastWatched && (
                <Link
                    className="group flex animate-fade-in flex-row gap-2"
                    target={'_blank'}
                    rel={'noopener noreferrer'}
                    href={
                        lastWatched.type === 'show'
                            ? `https://trakt.tv/shows/${lastWatched.show?.show.ids.slug}`
                            : `https://trakt.tv/movies/${lastWatched.movie?.movie.ids.slug}`
                    }
                >
                    <Image
                        src={
                            lastWatched.type === 'show'
                                ? lastWatched.show?.cover!
                                : lastWatched.movie?.cover!
                        }
                        alt="album art"
                        className="rounded-md h-[100px] w-auto object-cover z-30 md:hover:scale-125 transition-all hover:shadow-lg opacity-80 group-hover:opacity-100"
                        width={80}
                        height={100}
                        draggable={false}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm inline-flex font-bold group-hover:underline transition-all">
                            {lastWatched.type === 'show'
                                ? lastWatched.show?.show.title
                                : lastWatched.movie?.movie.title}
                            <CgArrowTopRight className="opacity-50 w-6 group-hover:opacity-100 transition-all mt-1" />
                        </p>
                        <p className="text-sm">
                            {lastWatched.type === 'show'
                                ? `S${lastWatched.show?.seasons[0].number}E${lastWatched.show?.seasons[0].episodes[0].number} - Show`
                                : `${lastWatched.movie?.movie.year} - Movie`}
                        </p>
                        <p className="text-sm opacity-70">
                            {`Watched ${
                                Math.floor(
                                    (new Date().getTime() -
                                        new Date(
                                            lastWatched.type === 'show'
                                                ? lastWatched.show
                                                      ?.last_watched_at!
                                                : lastWatched.movie
                                                      ?.last_watched_at!
                                        ).getTime()) /
                                        1000 /
                                        60 /
                                        60 /
                                        24
                                ) + 1
                            } days ago`}
                        </p>
                        <p className="text-sm opacity-70">Trakt Activity</p>
                    </div>
                </Link>
            )}
        </div>
    )
}
