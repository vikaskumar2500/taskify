import React, { ReactNode } from "react";
import { DashboardNavbar } from "./_components/navbar";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <DashboardNavbar />
      {children}
    </div>
  );
};

export default DashboardLayout;
