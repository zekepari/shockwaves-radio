import { redirect } from "next/navigation";
import DashboardProvider from "@/contexts/DashboardContext";
import { auth } from "@/auth";
import HostSection from "./components/HostSection";
import ShowSection from "./components/ShowSection";
import { isStaff } from "@/lib/Staff";

export default async function Page() {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    redirect("/auth/signin");
  }

  if (!isStaff(session.user.id)) {
    return <div className="text-center text-red-500 font-bold mt-8">Not staff</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-8">
      <header className="border-b pb-4">
        <h1 className="text-4xl font-black">Dashboard</h1>
        <p className="opacity-75 text-lg">Welcome, {session.user.name}!</p>
      </header>

      <DashboardProvider>
        <HostSection />
        <ShowSection />
      </DashboardProvider>
    </div>
  );
}
