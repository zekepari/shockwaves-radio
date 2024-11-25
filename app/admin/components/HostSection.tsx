"use client";

import HostCard from "@/components/ui/HostCard";
import { useDashboard } from "@/contexts/DashboardContext";
import CreateHostForm from "./CreateHostForm";

export default function HostSection() {
  const { hosts, refreshHosts } = useDashboard();

  return (
    <section>
      <h2 className="text-2xl font-bold">Hosts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {hosts.length > 0 ? (
          hosts.map((host) => <HostCard key={host.id} host={host} />)
        ) : (
          <div>No hosts available</div>
        )}
      </div>
      <div className="bg-base-100 p-4 rounded-lg shadow-md mt-6">
        <h3 className="font-bold text-lg">Create a New Host</h3>
        <CreateHostForm onHostCreated={refreshHosts} />
      </div>
    </section>
  );
}
