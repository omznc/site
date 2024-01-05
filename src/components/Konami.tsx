'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import konamiGif from '../../public/konami.webp'

export default function Konami() {
    const konamiRef = useRef<HTMLDivElement>(null)
    const konamiImageRef = useRef<HTMLImageElement>(null)
    const [mounted, setMounted] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [active, setActive] = useState(false)

    useEffect(() => {
        setIsMobile(
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            )
        )
    }, [])

    useEffect(() => {
        if (!mounted) {
            setMounted(true)
            return
        }
        console.clear()
        console.log('%cYou should try the Konami code ;)', 'font-size: 3rem;')
    }, [mounted])

    useEffect(() => {
        if (isMobile) return
        const konami = [
            'ArrowUp',
            'ArrowUp',
            'ArrowDown',
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
            'ArrowLeft',
            'ArrowRight',
            'b',
            'a',
        ]
        let konamiPos = 0

        function keyHandler(e: KeyboardEvent) {
            if (e.key === konami[konamiPos]) {
                konamiPos++
                if (konamiPos === konami.length) {
                    setActive(true)
                    konamiRef.current?.style.setProperty('z-index', '50')
                    konamiRef.current?.animate(
                        [
                            {
                                // scale: 0,
                                opacity: 0,
                                backdropFilter: 'blur(0px)',
                            },
                            {
                                // scale: 1,
                                opacity: 1,
                                backdropFilter: 'blur(5px)',
                            },
                        ],
                        {
                            duration: 500,
                            iterations: 1,
                            easing: 'ease-in-out',
                            fill: 'forwards',
                        }
                    )
                    konamiImageRef.current?.animate(
                        [
                            {
                                scale: 0,
                            },
                            {
                                scale: 1,
                            },
                        ],
                        {
                            duration: 500,
                            iterations: 1,
                            easing: 'ease-in-out',
                            fill: 'forwards',
                        }
                    )

                    setTimeout(() => {
                        konamiRef.current?.animate(
                            [
                                {
                                    // scale: 1,
                                    opacity: 1,
                                    backdropFilter: 'blur(5px)',
                                },
                                {
                                    // scale: 0,
                                    opacity: 0,
                                    backdropFilter: 'blur(0px)',
                                },
                            ],
                            {
                                duration: 300,
                                iterations: 1,
                                easing: 'ease-in-out',
                                fill: 'forwards',
                            }
                        )
                        konamiImageRef.current?.animate(
                            [
                                {
                                    scale: 1,
                                },
                                {
                                    scale: 0,
                                },
                            ],
                            {
                                duration: 300,
                                iterations: 1,
                                easing: 'ease-in-out',
                                fill: 'forwards',
                            }
                        )

                        setTimeout(() => {
                            konamiRef.current?.style.setProperty(
                                'z-index',
                                '-50'
                            )
                            konamiPos = 0
                            setActive(false)
                        }, 300)
                    }, 4000)
                }
            } else {
                konamiPos = 0
            }
        }

        document.addEventListener('keydown', keyHandler)

        return () => {
            document.removeEventListener('keydown', keyHandler)
        }
    }, [isMobile])

    return (
        <div
            className="absolute top-0 left-0 flex justify-center items-center w-full h-full -z-50 opacity-0"
            ref={konamiRef}
        >
            {!isMobile && (
                <Image
                    src={konamiGif}
                    alt={'Konami'}
                    placeholder={'blur'}
                    blurDataURL={
                        'data:image/jpeg;base64,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ACaaTQTTSaCWBNJRSUxBSUUlMYUUUUxhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAX80ZpKKkQtLTaM0AOopKM0DFpc02jNADqM0lGaBjqM0lFAC0tNozQMdRmkooAdmjNNzRmgY6ikozQAuaM0maM0ALmjNNzRQAuaM0maM0ALmkzSZozQAuaSkzRmgBc0maSkzQAuaTNGaTNAgzSZozSZpABNITSE0hNAgJppNBNNJoEBNJQTSVQgpKKSmAUUUUDCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKALlLmm5ozUiHZoptLQAuaWm0UAOzRSUUDHUU2loAWlptFAx1FJRQMdRTaWgBaKSigBaKSigYtGaTNFAC0UlFAC0lFJQAtGaSkoAXNGaSkzQAtJmjNJmgAzSZozSZoACaQmgmmk0hCk00mgmmk0CAmkJoJptUSLSUlFMYUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAFqikozUki0UmaKAHUUlFAxaWm0tAxaWm0UAOopKKBjqKSigYtFJRQA6ikooAWikooGLRSUUALRSUlAC0UlFAC0lJRQAtJSUUAGaTNFJQAZpM0ZpDSACaQmgmmk0CAmkJoJppNUIKSiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAnopKKkgdRSUUALS02loGLS02loGLRSUtAxaKSigY6ikooAWikpaBi0UlFAxaKSimAtFJRQAtJRSUALRSUUDCikopAFFJSUCFpKKQ0AFITSZpDQAGkNBpDQIQ0lLSVRIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAS0UUVJAtFJRQAtLTaWgBaWkooKFpaSigYtLSUUDFopKWgBaKSimMWikpaBhRRRQAUUUlAC0UlFAC0lFJQMWkopKACiikoAKSikpABpppaSgQlJS0lMTEooopkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBLRRRUkBRRRQAUUUUALS0lFAxaWkooGLS0lFMYtFFFAxaKSloGFFFFABRRRQMKKKKACiiigYlFFFABSUUUAJSUtJQAlJS0hoASkpaSgApKWkoJYlFFFMkKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAJaKKKkgKKKKACiiimAUtJS0DClpKWgYtFFFAxaKKKBhS0lLQMKKKKACiiigYUUUUAFFFFAxKKKKAEopaSgBKSlpKAEpKWkoASkpTSUAFJS0lBLEooopkhRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBLRRRSICiiigAooooAWiiigYtFFLQMKKKWgYUUUtAwooooGFFFLQAlLRRQMSilooASilpKACkpaKBiUlLRQAlJS0lACUlLSUANopaSgBKSlooJY2ilpKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAS0UUUiAooooAKKKWgApaSloGFLRRQMWiiigYtFFFAwpaKKBhRRRQAUUtFAxKKWigBKKKKACkpaKAEpKWigY2ilpKAEpKWkNADTSU40hoAbRS0lAhKSlopksSiiigQUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBLRRRSICilopiCiiloGFLSUtAwpaKKQwpaKKBhS0UUDCiiloGFFFFABRRRQAUUtFAxKKKKACkpaKAEpKWigBtFLSUxiUhpaKAGmmmnGkNADaSnGkpAJSUtJQSxKKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQBNRRRQZhRRS0AFFFLQMKKKWgYUtJS0DClpKWkMKKKWgYUUUtABRRRQMKKKKACiiigYUUUUAJRS0UAJSUtFACUlLSUwEpKdSUDGmkpxppoAaaSnGm0AJRS0lITEpKWkpkhRRRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigCailooMxKWiigYUtFFABS0UUFC0UUtABRRS0hhRRRQMWiiigAopaKBhRRRQAUUUUDCkpaKAEopaSgApKWkoAKSlpKAEpKWimMaaQ0ppDQA00hpxppoASkpaSkISkp1JTJYlFFFAgooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKAJ6KKKDMKWkpaBhRRS0DClpKWgYUtJS0DCloopAFLRRQMKKKWgAooooGFFFLQAlFLSUDCilpKACkpaKAEooooASkpaKAEpKWkpjENNNOpDQA000040hoAbSUtFACUlLSUiWJRRRTJCiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAnooooMwpaSloGFLSUtAwpaSloGFLSUtAxaKKKAFooopDClpKWgAooooGFLSUtABRRRQMKSlooASiiigBKKKKAEopaSgBKSlpKYxDSGlNIaAGmkNKaQ0ANooooASkpaSkSxKKKKZIUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFABRRRQAUUUUAFFFFAH/9k='
                    }
                    className={'h-1/2 w-auto'}
                    ref={konamiImageRef}
                />
            )}
        </div>
    )
}
