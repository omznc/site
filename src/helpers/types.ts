import { ReactNode } from 'react'

export interface Timestamps {
    start: number
    end?: number // end is optional
}

export interface Party {
    id: string
}

export interface Assets {
    large_text: string
    large_image: string
    small_text?: string // small_text is optional
    small_image?: string // small_image is optional
}

export interface Activity {
    type: number
    timestamps: Timestamps
    state?: string // state is optional
    sync_id?: string // sync_id is optional
    session_id?: string // session_id is optional
    party?: Party // party is optional
    name: string
    id: string
    flags?: number // flags is optional
    details?: string // details is optional
    created_at: number
    assets?: Assets // assets is optional
    application_id?: string // application_id is optional
}

export interface SpotifyData {
    track_id: string
    timestamps: Timestamps
    song: string
    artist: string
    album_art_url: string
    album: string
}

export interface DiscordUser {
    username: string
    public_flags: number
    id: string
    discriminator: string
    avatar: string
}

export interface LanyardKV {
    location: string
}

export interface DiscordData {
    active_on_discord_mobile: boolean
    active_on_discord_desktop: boolean
    listening_to_spotify: boolean
    kv: LanyardKV
    spotify?: SpotifyData // spotify is optional
    discord_user: DiscordUser
    discord_status: string
    activities: Activity[]
}

export interface ApiResponse {
    success: boolean
    data: DiscordData
}

export interface SidebarEntry {
    title: string | ReactNode
    link?: string
    external?: boolean
    onClick?: () => void
    noArrow?: boolean
    fadeIn?: boolean
}
