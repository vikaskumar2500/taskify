import React, { ReactNode } from "react";
import { Sidebar } from "../_components/sidebar";

const OrganizationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="pt-20 md:pt-24 px-4 grid grid-cols-4 gap-10 mx-auto">
      <div className="w-64 col-span-1 shrink-0 hidden md:block">
        <Sidebar />
      </div>
      <section className="px-4 mx-auto col-span-3 w-full">
        {children}
      </section>
    </main>
  );
};

export default OrganizationLayout;
