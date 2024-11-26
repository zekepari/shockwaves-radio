import { faDiscord, faFacebook, faSnapchat, faXTwitter, faYoutube, IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface NavLink {
  name: string;
  href: string;
  external?: boolean;
}

export const navLinks: NavLink[] = [
  { href: "/", name: "Home" },
  { href: "https://discord.gg/PAAJvRpDVN", name: "Discord", external: true },
  { href: "https://ko-fi.com/shockwavesradio", name: "Ko-Fi", external: true},
  { href: "/terms-of-service", name: "Terms of Service" },
];

interface SocialLink {
  href: string;
  icon: IconDefinition;
}

export const socialLinks: SocialLink[] = [
  { href: "https://discord.gg/PAAJvRpDVN", icon: faDiscord },
  { href: "https://x.com/shockwavesradio", icon: faXTwitter },
  { href: "https://www.facebook.com/profile.php?id=61569582290661", icon: faFacebook },
  { href: "https://www.youtube.com/@shockwavesradio", icon: faYoutube },
  { href: "https://www.snapchat.com/add/shockwavesradio", icon: faSnapchat}
];
