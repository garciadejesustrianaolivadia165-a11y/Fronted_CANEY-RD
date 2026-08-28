import { Outlet } from "react-router";
import Sidebar from "./components/sidebar";
import ProfilePanel from "./components/profile-panel";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen gap-6 overflow-x-hidden bg-white p-4 font-inter sm:p-6">
      <Sidebar />
      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
      <ProfilePanel />
    </div>
  );
}
