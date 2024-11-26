import { StaticImageData } from "next/image";

export interface Ad {
  href: string;
  src: string | StaticImageData;
  alt: string;
}

export const ads: Ad[] = [
  { href: "/", src: "/shockwaves_1.png", alt: "Advertisement 1" },
  { href: "/", src: "/shockwaves_1.png", alt: "Advertisement 2" },
  { href: "/", src: "/shockwaves_1.png", alt: "Advertisement 3" },
  { href: "/", src: "/shockwaves_1.png", alt: "Advertisement 4" },
  { href: "/", src: "/shockwaves_1.png", alt: "Advertisement 5" },
  { href: "/", src: "/shockwaves_1.png", alt: "Advertisement 6" },
];

export function splitAds(): { leftAds: Ad[]; rightAds: Ad[] } {
  const middleIndex = Math.ceil(ads.length / 2);
  return {
    leftAds: ads.slice(0, middleIndex),
    rightAds: ads.slice(middleIndex),
  };
}
