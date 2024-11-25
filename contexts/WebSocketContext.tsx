'use client';

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { NowPlayingData } from '@/types/Music';

interface WebSocketContextProps {
  nowPlaying: NowPlayingData | null;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [nowPlaying, setNowPlaying] = useState<NowPlayingData | null>(null);

  useEffect(() => {
    const socket = new WebSocket("wss://vh-azura01.radio.volthosting.co.uk/api/live/nowplaying/websocket");

    socket.onopen = () => {
      socket.send(JSON.stringify({
        "subs": {
          "station:shockwaves_radio": { "recover": true }
        }
      }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data?.pub?.data?.np) {
        setNowPlaying(data.pub.data.np as NowPlayingData);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
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
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
