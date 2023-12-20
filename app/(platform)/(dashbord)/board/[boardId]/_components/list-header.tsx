"use client";

import { updateList } from "@/actions/update-list";
import { FormInput } from "@/components/form/form-input";
import { useAction } from "@/hooks/use-action";
import { List } from "@prisma/client";
import { ElementRef, useRef, useState } from "react";
import { toast } from "sonner";
import { useEventListener } from "usehooks-ts";
import { ListOptions } from "./list-options";

interface ListHeaderProps {
  data: List;
  index: number;
  onAddCard: () => void;
}

export const ListHeader = ({ data, index, onAddCard }: ListHeaderProps) => {
  const [title, setTitle] = useState(data.title);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<"form">>(null);
  const inputRef = useRef<ElementRef<"input">>(null);

  const enableEditing = () => {
    setIsEditing(() => true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });
  };

  const disableEditing = () => {
    setIsEditing(() => false);
  };

  const { execute } = useAction(updateList, {
    onSuccess: (data) => {
      toast.success(`Renamed to ${data.title}`);
      setTitle(data.title);
      disableEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener("keydown", onKeyDown);

  const onSubmit = (formData: FormData) => {
    const title = formData.get("title") as string;
    const id = formData.get("id") as string;
    const boardId = formData.get("boardId") as string;

    if (title === data.title) return disableEditing();
    execute({ title, id, boardId });
  };

  const onBlur = () => {
    formRef.current?.requestSubmit();
  };

  return (
    <div
      key={index}
      className="border-spacing-5 border-black items-center flex justify-center w-[200px] h-[37px]"
    >
      {isEditing ? (
        <form action={onSubmit} ref={formRef} className="flex-1 px-[2px]">
          <input hidden id="id" name="id" defaultValue={data.id} />
          <input
            hidden
            id="boardId"
            name="boardId"
            defaultValue={data.boardId}
          />
          <FormInput
            type="text"
            id="title"
            placeholder="Enter list title"
            onBlur={onBlur}
            ref={inputRef}
            defaultValue={title}
            className="text-sm px-[7px] py-1 h-7 font-medium border-transparent hover:border-input focus:border-input transition truncate bg-transparent focus:bg-white"
          />
          <button type="submit" hidden />
        </form>
      ) : (
        <div
          onClick={enableEditing}
          className="cursor-pointer w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent"
        >
          {data.title}
        </div>
      )}

      <ListOptions onAddCard={onAddCard} data={data} />
    </div>
  );
};
