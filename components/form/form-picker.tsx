"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constants/images";
import Link from "next/link";
import { FormErrors } from "./form-errors";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: ["317099"],
          count: 9,
        });

        if (result && result.response) {
          const img = result.response as Array<Record<string, any>>;
          setImages(img);
        } else {
          console.error("Failed to get images from unsplash!");
        }
      } catch (error) {
        console.log(error);
        setImages(defaultImages);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-2 mb2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              "cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted",
              pending && "opacity-50 hover:opacity-50 cursor-auto"
            )}
            onClick={() => {
              if (pending) return;
              setSelectedImageId(image.id);
            }}
          >
            <input
              id={id}
              name={id}
              type="radio"
              checked={selectedImageId === image.id}
              disabled={pending}
              className="hidden"
              value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.user.name}|${image.links.html}`}
            />
            <Image
              src={image.urls.thumb}
              alt="unsplash image"
              className={cn("object-cover rounded-sm")}
              fill
              priority
            />
            <Link
              href={image.links.html}
              target="_blank"
              className="opacity-0 group-hover:opacity-100 h-[15px] text-center absolute bottom-0 w-full text-[10px] truncate text-white hover:underline bg-black/50"
            >
              {image.user.name}
            </Link>
            {selectedImageId === image.id && (
              <div className=" relative flex items-center justify-center w-auto h-[50px]">
                <Check className=" text-white" />
              </div>
            )}
          </div>
        ))}
      </div>
      <FormErrors id="image" errors={errors} />
    </div>
  );
};
