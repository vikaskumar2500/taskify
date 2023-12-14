"use client";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAction } from "@/hooks/use-action";

import { FormInput } from "./form-input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { FormSubmit } from "./form-submit";
import { createBoard } from "@/actions/create-board";
import { toast } from "sonner";
import { FormPicker } from "./form-picker";
import { useState } from "react";

export interface dataProps {
  id: string;
  title: string;
}
interface FormPopoverProps {
  children: React.ReactNode;
  side?: "left" | "right" | "top" | "bottom";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  onHandleImageId: ({ image, data }: { image: any; data: dataProps }) => void;
}

export const FormPopover = ({
  children,
  align,
  side = "bottom",
  sideOffset = 0,
  onHandleImageId,
}: FormPopoverProps) => {
  const [data, setData] = useState<dataProps>({} as dataProps);
  const [image, setImage] = useState<any | null>(null);

  const { execute, fieldErrors } = useAction(createBoard, {
    onSuccess: (data) => {
      console.log("data", data);
      toast.success("Board created!");
    },
    onError: (error: any) => {
      console.log("errors", error);

      toast.error(error);
    },
  });

  const handleSelectImage = (image: any) => {
    setImage(() => {
      image;
    });
  };

  const onSubmit = (formData: FormData) => {
  
    const title = formData.get("title") as string;
    execute({ title });
    if (!image) onHandleImageId({ image, data });
  };
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={align}
        side={side}
        sideOffset={sideOffset}
        className="w-80 pt-3"
      >
        <div className="text-sm font-medium text-center text-neutral-600">
          Create Board
        </div>
        <PopoverClose asChild>
          <Button
            className="h-auto w-auto p-2 absolute top-2 right-2"
            variant={"ghost"}
          >
            <X className="w-4 h-4" />
          </Button>
        </PopoverClose>
        <form action={onSubmit}>
          <div className="space-y-4 mb-2">
            <FormPicker
              id="image"
              errors={fieldErrors}
              onHandleImage={handleSelectImage}
            />
            <FormInput
              id="title"
              label="Board title"
              type="text"
              errors={fieldErrors}
            />
          </div>
          <FormSubmit className="w-full">Create</FormSubmit>
        </form>
      </PopoverContent>
    </Popover>
  );
};
