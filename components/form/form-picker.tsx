"use client";
import { useEffect, useState } from "react";
import { unsplash } from "@/lib/unsplash";
import { Check, Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { defaultImages } from "@/constants/images";

interface FormPickerProps {
  id: string;
  errors?: Record<string, string[] | undefined>;
  onHandleImage: (image: any) => void;
}

export const FormPicker = ({ id, errors, onHandleImage }: FormPickerProps) => {
  const { pending } = useFormStatus();

  const [images, setImages] =
    useState<Array<Record<string, any>>>(defaultImages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [image, setImage] = useState(null);

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

  useEffect(() => {
    if (!image) onHandleImage(image as any);
  }, [selectedImageId]);

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
              setImage(image.urls.thumb);
            }}
          >
            <Image
              src={image.urls.thumb}
              alt="unsplash image"
              className={cn("object-cover rounded-sm")}
              fill
              priority
            />
            {selectedImageId === image.id && (
              <Check className="absolute text-white w-5 h-5 ease-out duration-200 bottom-2 right-2 font-extrabold bg-blue-700 rounded-full p-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
