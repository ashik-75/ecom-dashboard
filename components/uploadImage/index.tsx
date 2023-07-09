"use client";

import { ImagePlus, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface ImageUploadProps {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: () => void;
  value: string[];
}

function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  return (
    <div>
      <div className="flex gap-4 items-center mb-4 mt-4">
        {value.map((url) => (
          <div
            key={url}
            className="relative h-[200px] w-[200px] rounded-lg overflow-hidden "
          >
            <div className="absolute z-10 w-fit top-2 right-2">
              <Button
                onClick={() => onRemove()}
                variant={"destructive"}
                size={"sm"}
              >
                <Trash className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
            <Image
              alt="Image"
              fill
              src={url}
              className="object-cover h-full w-full"
            />
          </div>
        ))}
      </div>

      <CldUploadWidget onUpload={onUpload} uploadPreset="eubewnhz">
        {({ open }) => {
          const onClick = () => {
            open();
          };

          return (
            <Button
              onClick={onClick}
              variant={"secondary"}
              disabled={disabled}
              type="button"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}

export default ImageUpload;
