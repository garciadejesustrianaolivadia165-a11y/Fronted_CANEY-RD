import { Outlet } from "react-router";
import Sidebar from "./components/sidebar";
import ProfilePanel from "./components/profile-panel";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen gap-6 bg-white p-6 font-inter">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      <ProfilePanel />
    </div>
  );
}
