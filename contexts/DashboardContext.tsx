"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getShows, getHosts } from "@/app/actions";
import { HostWithShowCount, ShowWithHost } from "@/types/Prisma";

interface DashboardContextType {
  shows: ShowWithHost[];
  hosts: HostWithShowCount[];
  refreshHosts: () => Promise<void>;
  addShow: (newShow: ShowWithHost) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
  const [shows, setShows] = useState<ShowWithHost[]>([]);
  const [hosts, setHosts] = useState<HostWithShowCount[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [rawShowData, hostData] = await Promise.all([getShows(), getHosts()]);
        const showData = rawShowData.map((show) => ({
          ...show,
          startTime: new Date(show.startTime),
          endTime: new Date(show.endTime),
        }));

        setShows(showData);
        setHosts(hostData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }

    fetchData();
  }, []);

  const refreshHosts = async () => {
    try {
      const updatedHosts = await getHosts();
      setHosts(updatedHosts);
    } catch (error) {
      console.error("Failed to refresh hosts:", error);
    }
  };

  const addShow = (newShow: ShowWithHost) => {
    setShows((prev) => [...prev, newShow]);
  };

  return (
    <DashboardContext.Provider value={{ shows, hosts, refreshHosts, addShow }}>
      {children}
    </DashboardContext.Provider>
  );
}
