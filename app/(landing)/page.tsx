import { getShows } from '@/app/actions';
import RecentlyPlayed from './components/RecentlyPlayed';
import Link from 'next/link';
import SongCard from '@/components/ui/SongCard';
import ShowCard from '@/components/ui/ShowCard';
import { splitAds } from '@/lib/Ads';
import Image from 'next/image';

export default async function Page() {
  const upcomingShows = await getShows();
  const { leftAds, rightAds } = splitAds();
  const getFallbackAd = () => {
      if (rightAds.length > 0) return rightAds[0];
      if (leftAds.length > 0) return leftAds[0];
      return null;
    };

    const fallbackAd = getFallbackAd();

  return (
      <div className='space-y-16'>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 container max-w-screen-lg">
          <div className="space-y-4">
            <h1 className="font-bold text-2xl">Upcoming Shows</h1>
            {upcomingShows.length > 0 ? upcomingShows.map((show) => (
              <ShowCard
                key={show.id}
                show={{
                  ...show,
                  startTime: new Date(show.startTime),
                  endTime: new Date(show.endTime),
                }}
              />
            )) : (
              <div className="space-y-4">
                <p>No upcoming shows</p>
                {fallbackAd && (
                  <Link href={fallbackAd.href} className="block mx-auto hidden 2xl:block" target="_blank">
                    <Image
                      className="rounded-box"
                      src={fallbackAd.src}
                      height={600}
                      width={600}
                      alt={fallbackAd.alt}
                    />
                  </Link>
                )}
              </div>
            )}
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-2xl">Recently Played</h2>
            <RecentlyPlayed/>
          </div>
        </section>
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 container max-w-screen-lg">
          <div className="space-y-4">
            <h2 className="font-bold text-2xl">Support SWR</h2>
            <div className="flex bg-base-100 rounded-box min-w-96 shadow-xl">
              <div className="p-2 w-full overflow-hidden">
                <h2 className="font-bold text-xl truncate">Want to support the station?</h2>
                <p className="opacity-75">Use the button below to support your favourite station!</p>
                <Link href={"https://ko-fi.com/shockwavesradio"} target="_blank" className="btn btn-primary btn-block btn-sm">
                  Ko-Fi
                </Link>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="font-bold text-2xl">Tune of the week</h2>
            <SongCard name="wokeuplikethis*" artist="Playboi Carti" timeAgo={1730781783} url=""/>
          </div>
        </section>
      </div>
  );
}
