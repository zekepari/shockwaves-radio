'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { navLinks, socialLinks } from '@/lib/Links';
import Link from 'next/link';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPauseCircle, faPlayCircle, faHeart } from '@fortawesome/free-regular-svg-icons';
import { isStaff } from '@/lib/Staff';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { Song } from '@/types/Music';

export default function NavbarBanner() {
  const { data: session } = useSession();
  const { nowPlaying } = useWebSocket();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [liked, setLiked] = useState(false);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);

  const streamUrl =
    'https://vh-azura01.radio.volthosting.co.uk/listen/shockwaves_radio/radio.mp3';

    useEffect(() => {
      const newSong = nowPlaying?.now_playing.song;
      
      if (!currentSong || currentSong.id !== newSong?.id) {
        setCurrentSong(newSong || null);
        setLiked(false);
      }
    }, [nowPlaying, currentSong]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(streamUrl);
      audioRef.current.loop = true;
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
    }
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          if (audioRef.current.src !== streamUrl) {
            audioRef.current.src = streamUrl;
            audioRef.current.load();
          }
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error('Error toggling play state:', error);
      }
    }
  };

  return (
    <section className="relative w-full h-[450px] text-white shadow-2xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), transparent 85%), url(${
            currentSong?.art || ""
          })`,
        }}
      ></div>

      {/* Navbar */}
      <header className="absolute top-0 w-full z-50">
        <div className="container max-w-screen-lg mx-auto">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Link href="/">
                <Image
                  src="/shockwaves_1.png"
                  alt="Shockwaves Radio Logo"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </Link>
              <h1 className="text-2xl font-black">Shockwaves Radio</h1>
            </div>

            {/* Hamburger Menu */}
            <button
              className="block lg:hidden btn btn-ghost btn-sm"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="size-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

            {/* Social Links */}
            <div className="hidden lg:flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  aria-label={`Link to ${social.href}`}
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </Link>
              ))}
            </div>
          </div>

          {/* Collapsible Menu */}
          <div
            className={`${
              menuOpen ? 'block' : 'hidden'
            } lg:flex flex-col lg:flex-row items-center justify-between gap-4 bg-base-200 lg:bg-transparent p-4 lg:p-0 rounded-box shadow-xl lg:shadow-none`}
          >
            {/* Navigation Links */}
            <div className="flex flex-col lg:flex-row gap-4">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target={link.external ? "_blank" : ""}
                  className="btn btn-ghost btn-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Session Information */}
            <div className="flex items-center justify-center gap-4 mt-4 lg:mt-0">
              {session?.user ? (
                <>
                  <span className="font-semibold">Welcome, {session.user.name}!</span>
                  {isStaff(session.user.id) && (
                    <Link href="/admin" className="btn btn-accent btn-sm">
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="btn btn-secondary btn-sm"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <button
                  onClick={() => signIn("discord")}
                  className="btn btn-primary btn-sm"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Banner Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-8">
        <div className="relative mb-4">
          <Image
            src={currentSong?.art || "/shockwaves_1.png"}
            alt="Album Cover"
            className="rounded-full shadow-lg"
            width={100}
            height={100}
            style={{
              boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
            }}
            priority
          />
        </div>
        <h2 className="text-3xl font-bold mb-1">
          {currentSong?.title || 'Loading...'}
        </h2>
        <h3 className="text-xl font-light opacity-80">
          {currentSong?.artist || 'Loading...'}
        </h3>
        <div className="mt-4 flex gap-4">
          {/* Play/Pause Button */}
          <button
            onClick={togglePlay}
            className="text-5xl hover:text-indigo-300 transition-transform transform hover:scale-110"
          >
            <FontAwesomeIcon icon={isPlaying ? faPauseCircle : faPlayCircle} />
          </button>

          {/* Like Button */}
          <button
            onClick={() => setLiked(!liked)}
            className="text-5xl hover:text-red-400 transition-transform transform hover:scale-110"
            aria-label="Like song"
          >
            <FontAwesomeIcon icon={liked ? faHeartSolid : faHeart} />
          </button>
        </div>
      </div>
    </section>
  );
}
