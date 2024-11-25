
import { ShowWithHost } from "@/types/Prisma";
import Image from "next/image";

function formatTime(unixTimestamp: number) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date);
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);

  return { day, time };
}

export default function ShowCard({ show }: { show: ShowWithHost }) {
  const timeStart = Math.floor(new Date(show.startTime).getTime() / 1000);
  const timeEnd = Math.floor(new Date(show.endTime).getTime() / 1000);
  const start = formatTime(timeStart);
  const end = formatTime(timeEnd);

  return (
    <div className="flex bg-base-100 rounded-box min-w-96 shadow-xl">
      {show.host.imageUrl ? (
        <Image
          src={show.host.imageUrl}
          alt="Host Icon"
          className="rounded-l-box aspect-square"
          width={100}
          height={100}
        />
      ) : (
        <div className="rounded-l-box bg-gray-300 aspect-square flex items-center justify-center" style={{height: "100px"}} />
      )}
      <div className="p-2 w-full overflow-hidden">
        <h2 className="font-bold text-xl truncate">{show.name}</h2>
        <p className="opacity-75 truncate">{show.host.name}</p>
        <p className="font-semibold mt-2">
          {start.day} at {start.time} - {end.time}
        </p>
      </div>
    </div>
  );
}
