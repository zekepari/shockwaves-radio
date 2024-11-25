'use client';

import { useWebSocket } from '@/contexts/WebSocketContext';
import SongCard from '@/components/ui/SongCard';

export default function RecentlyPlayed() {
  const { nowPlaying } = useWebSocket();
  const recentlyPlayed = nowPlaying?.song_history || [];

  return (
    <div className="space-y-2">
      {recentlyPlayed.length > 0 ? recentlyPlayed.map((song, index) => (
        <SongCard
          key={index}
          name={song.song.title}
          artist={song.song.artist}
          timeAgo={song.played_at}
          url={song.song.art}
        />
      )) : (
        <p>No recently played songs</p>
      )}
    </div>
  );
}
