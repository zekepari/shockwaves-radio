"use client";

import { useEffect, useState, createContext, useContext, ReactNode } from 'react';
import { NowPlayingData } from '@/types/Music';

const WebSocketContext = createContext<{ nowPlaying: NowPlayingData | null }>({ nowPlaying: null });

export const WebSocketProvider = ({ children, initialData }: { children: ReactNode, initialData: NowPlayingData | null }) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(initialData);

  useEffect(() => {
    const socket = new WebSocket(
      'wss://vh-azura01.radio.volthosting.co.uk/api/live/nowplaying/websocket'
    );

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          subs: {
            'station:shockwaves_radio': { recover: true },
          },
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.pub?.data?.np) {
        setNowPlaying(data.pub.data.np as NowPlayingData);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <WebSocketContext.Provider value={{ nowPlaying }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
