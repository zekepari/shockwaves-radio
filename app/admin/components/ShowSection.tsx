"use client";

import ShowCard from "@/components/ui/ShowCard";
import CreateShowForm from "./CreateShowForm";
import { useDashboard } from "@/contexts/DashboardContext";

export default function ShowSection() {
  const { shows, addShow, hosts } = useDashboard();

  return (
    <section>
      <h2 className="text-2xl font-bold">Shows</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {shows.length > 0 ? (
          shows.map((show) => <ShowCard show={show} key={show.id} />)
        ) : (
          <div>No shows available</div>
        )}
      </div>
      <div className="bg-base-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="font-bold text-lg">Create a New Show</h3>
        <CreateShowForm onShowCreated={addShow} hosts={hosts} />
      </div>
    </section>
  );
}
