import { faDiscord, faFacebook, faInstagram, faKickstarter, faThreads, faTiktok, faTwitch, faXTwitter, faYoutube, IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface NavLink {
  name: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { href: "/", name: "Home" },
  { href: "/", name: "Timetable" },
  { href: "/", name: "Team" },
  { href: "/", name: "News" },
  { href: "/", name: "Apply" },
  { href: "/", name: "Contact" },
];

interface SocialLink {
  href: string;
  icon: IconDefinition;
}

export const socialLinks: SocialLink[] = [
  { href: "https://discord.com", icon: faDiscord },
  { href: "https://twitter.com", icon: faXTwitter },
  { href: "https://facebook.com", icon: faFacebook },
  { href: "https://instagram.com", icon: faInstagram },
  { href: "https://threads.net", icon: faThreads },
  { href: "https://twitch.tv", icon: faTwitch },
  { href: "https://tiktok.com", icon: faTiktok },
  { href: "https://youtube.com", icon: faYoutube },
  { href: "https://kickstarter.com", icon: faKickstarter },
];
