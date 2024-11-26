import Image from "next/image";
import Link from "next/link";
import { splitAds } from "@/lib/Ads";

export default function Layout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    const { leftAds, rightAds } = splitAds();
  
    return (
      <div className="flex justify-center gap-16">
        <div className="hidden 2xl:flex flex-col space-y-4">
          {leftAds.map((ad, index) => (
            <Link key={index} href={ad.href} className="mx-auto">
              <Image
                className="rounded-box"
                src={ad.src}
                height={300}
                width={300}
                alt={ad.alt}
              />
            </Link>
          ))}
        </div>
  
        {children}
  
        <div className="hidden 2xl:flex flex-col space-y-4">
          {rightAds.map((ad, index) => (
            <Link key={index} href={ad.href} className="mx-auto">
              <Image
                className="rounded-box"
                src={ad.src}
                height={300}
                width={300}
                alt={ad.alt}
              />
            </Link>
          ))}
        </div>
      </div>
    );
  }