import Sidebar from "./Sidebar";
import Header from "./Header";


import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-64 w-full">
        <Header />

        <section className="p-6">
          <Outlet />
        </section>
      </main>
    </div>
  );
}