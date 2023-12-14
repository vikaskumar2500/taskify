"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FormPopover, dataProps } from "@/components/form/form-popover";
import { Hint } from "@/components/ui/hint";

import { HelpCircle, User2 } from "lucide-react";
import { cn } from "@/lib/utils";
interface selectDataProps {
  image: any;
  data: dataProps;
}

const BoardList = () => {
  const [isClient, setIsClient] = useState(false);
  const [selectedImages, setSelectedImages] = useState<selectDataProps[]>([]);

  useEffect(() => {
    // this is prevent the hydration!!
    setIsClient(true);
  }, []);

  const handleSelectedImages = ({ image, data }: selectDataProps) => {
    setSelectedImages((prev) => [...prev, { image, data }]);
  };

  console.log("Selected Data", selectedImages);

  return (
    <>
      {isClient ? (
        <div className="space-y-4">
          <div className="flex items-center font-semibold text-lg">
            <User2 className="h-6 w-6 mr-2" />
          </div>
          <div className="flex items-start justify-start gap-3">
            <div className="">
              {selectedImages.map((selectImage: selectDataProps) => (
                <div
                  key={selectImage.data.id}
                  className="w-[150px] h-[120px] rounded-lg"
                >
                  <p className="text-sm text-black">{selectImage.data.title}</p>
                  <div className="aspect-video relative bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition p-4">
                    <Image
                      src={selectImage.image}
                      alt={selectImage.data.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <FormPopover
                side="right"
                sideOffset={10}
                onHandleImageId={handleSelectedImages}
              >
                <span className="aspect-video relative w-full h-full bg-muted rounded-sm flex flex-col gap-y-1 items-center justify-center hover:opacity-75 transition p-4">
                  <p className="text-sm text-black">Create new board</p>
                  <span className="text-xs">5 remaining</span>
                  <Hint
                    sideOffset={40}
                    description="Free workspaces can have up to 5 open boards. For unlimited boards upgrade this workspace."
                  >
                    <HelpCircle className="absolute bottom-2 right-2 h-[14px] w-[14px]" />
                  </Hint>
                </span>
              </FormPopover>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default BoardList;
