export interface Song {
    id: string;
    text: string;
    artist: string;
    title: string;
    album: string;
    genre: string;
    isrc: string;
    lyrics: string;
    art: string;
    custom_fields: Record<string, string>;
  }
  
  export interface NowPlayingSong {
    sh_id: number;
    played_at: number;
    duration: number;
    playlist: string;
    streamer: string;
    is_request: boolean;
    song: Song;
    elapsed: number;
    remaining: number;
  }
  
  export interface Station {
    id: number;
    name: string;
    shortcode: string;
    description: string;
    frontend: string;
    backend: string;
    timezone: string;
    listen_url: string;
    url: string;
    public_player_url: string;
    playlist_pls_url: string;
    playlist_m3u_url: string;
    is_public: boolean;
  }
  
  export interface NowPlayingData {
    station: Station;
    listeners: {
      total: number;
      unique: number;
      current: number;
    };
    live: {
      is_live: boolean;
      streamer_name: string;
      broadcast_start: number | null;
      art: string | null;
    };
    now_playing: NowPlayingSong;
    playing_next: NowPlayingSong | null;
    song_history: NowPlayingSong[];
    is_online: boolean;
    cache: string | null;
  }
  