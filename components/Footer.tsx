import React from 'react';
import { socialLinks } from '@/lib/Links';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Footer() {
  return (
    <footer className="bg-base-200 text-white py-8">
      <div className="container mx-auto space-y-8 max-w-screen-lg">
        {/* Logo and Description */}
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center gap-2 mb-4">
            <img
              src="/shockwaves_1.png"
              alt="Shockwaves Radio Logo"
              width={40}
              height={40}
              className="rounded-full"
            />
            <h1 className="text-2xl font-black">Shockwaves Radio</h1>
          </Link>
          <p className="text-center text-lg opacity-80">
            Your go-to station for the best hits and live shows. Tune in now!
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-lg opacity-80 hover:opacity-100">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <h3 className="font-bold text-xl">Follow Us</h3>
            <div className="flex space-x-4 mt-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  target="_blank"
                  aria-label={`Link to ${social.href}`}
                  className="text-lg opacity-80 hover:opacity-100"
                >
                  <FontAwesomeIcon icon={social.icon} size="lg" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright and Legal */}
        <div className="text-center text-sm opacity-60 space-y-2">
          <p>&copy; {new Date().getFullYear()} Shockwaves Radio. All rights reserved.</p>
          <Link href="/terms-of-service" className="opacity-80 hover:opacity-100">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
