import { HostWithShowCount } from "@/types/Prisma";
import Image from "next/image";

export default function HostCard({ host }: { host: HostWithShowCount }) {
    return (
        <div className="flex bg-base-100 rounded-box shadow-xl">
            {host.imageUrl ? (
                <Image
                    src={host.imageUrl}
                    alt="Host Icon"
                    className="rounded-l-box aspect-square"
                    width={100}
                    height={100}
                />
            ) : (
                <div className="rounded-l-box bg-gray-300 aspect-square flex items-center justify-center" style={{height: "100px"}} />
            )}
          <div className="p-2 w-full overflow-hidden">
            <h2 className="font-bold text-xl truncate">{host.name}</h2>
            <p className="opacity-75 truncate">Total Shows: {host._count.shows}</p>
          </div>
        </div>
      );
}
