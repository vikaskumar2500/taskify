"use client";

import React, { createContext, useContext, useState } from "react";
interface titleProps {
  id: string;
  title: string;
}

interface selectDataProps {
  data: titleProps;
  image: any;
}
const titleContext = createContext({} as selectDataProps);

export const titleProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedData, setSelectedData] = useState<selectDataProps | null>(
    null
  );

  return (
    <titleContext.Provider value={selectedData as selectDataProps}>
      {children}
    </titleContext.Provider>
  );
};

export default function useTitle() {
  return useContext(titleContext);
}
