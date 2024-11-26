import Image from "next/image";

function formatTimeAgo(unixTimestamp: number) {
  const secondsAgo = Math.floor((Date.now() - unixTimestamp * 1000) / 1000);

  if (secondsAgo < 60) return `${secondsAgo}s ago`;
  const minutesAgo = Math.floor(secondsAgo / 60);
  if (minutesAgo < 60) return `${minutesAgo}m ago`;
  const hoursAgo = Math.floor(minutesAgo / 60);
  if (hoursAgo < 24) return `${hoursAgo}h ago`;
  const daysAgo = Math.floor(hoursAgo / 24);
  return `${daysAgo}d ago`;
}

export default function SongCard({ name, artist, timeAgo, url }: { name: string, artist: string, timeAgo: number, url: string | null }) {
  return (
    <div className="flex bg-base-100 rounded-box relative shadow-xl">
      <span className="badge badge-secondary absolute -top-2 -right-3">
        {formatTimeAgo(timeAgo)}
      </span>
      {url ? (
        <Image
          src={url}
          alt="Album Cover"
          className="rounded-l-box aspect-square"
          width={100}
          height={100}
        />
      ) : (
        <div className="rounded-l-box bg-gray-300 aspect-square flex items-center justify-center" style={{height: "100px"}} />
      )}
      <div className="p-2 w-full overflow-hidden">
        <h2 className="font-bold text-xl truncate">{name}</h2>
        <p className="opacity-75 truncate">{artist}</p>
      </div>
    </div>
  );
}
