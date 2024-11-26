import { WebSocketProvider } from '@/contexts/WebSocketContext';
import { getShows } from '@/app/actions';
import RecentlyPlayed from './components/RecentlyPlayed';
import Link from 'next/link';
import SongCard from '@/components/ui/SongCard';
import ShowCard from '@/components/ui/ShowCard';

export default async function Page() {
  const upcomingShows = await getShows();

  return (
    <WebSocketProvider>
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
              <p>No upcoming shows</p>
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
            <div className="flex bg-base-100 rounded-box shadow-xl">
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
    </WebSocketProvider>
  );
}
