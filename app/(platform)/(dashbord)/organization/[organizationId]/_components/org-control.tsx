"use client";

import { useOrganizationList } from "@clerk/nextjs";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export const OrgControl = () => {
  const params = useParams();
  const { setActive } = useOrganizationList();

  useEffect(() => {
    try {
      if (!setActive) return;

      setActive({
        organization: params.organizationId as string,
      });
    } catch (e) {
      console.log(e);
    }
  }, [params.organizationId, setActive]);

  return null;
};
