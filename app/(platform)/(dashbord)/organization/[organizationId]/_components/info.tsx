"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrganization } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import Image from "next/image";
import React from "react";
interface InforProps {
  isPro: boolean;
}

const Info = ({ isPro }: InforProps) => {
  const { organization } = useOrganization();
  if (!organization) return <Info.Skeleton />

  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Image
          fill
          src={organization?.imageUrl!}
          alt="Organization"
          className="rounded-md object-cover"
        />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-xl">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCard className="h-3 w-3 mr-1" />
          {isPro ? "Pro" : "Free"}
        </div>
      </div>
    </div>
  );
};

export default Info;

Info.Skeleton = function SkeletonInfo() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="w-[60px] h-[60px] relative">
        <Skeleton className="w-full h-full absolute" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[100px]" />
        </div>
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 mr2" />
          <Skeleton className="h-4 w-[40px]" />
        </div>
      </div>
    </div>
  );
};
