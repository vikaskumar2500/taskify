import React, { ReactNode } from "react";
import { DashboardNavbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
