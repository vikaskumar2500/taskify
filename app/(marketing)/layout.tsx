import React, { ReactNode } from "react";
import { Navbar } from "./_navbar/Navbar";
import { Footer } from "./_navbar/Footer";

const MarketingLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar/>
      <main className="pt-40 pb-20 bg-slate-100">{children}</main>
      <Footer/>
    </div>
  );
};

export default MarketingLayout;
