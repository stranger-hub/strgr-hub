"use client";
import useWindowSize from "@/hooks/useWindowSize";
import { post } from "@/lib/api";
import { uploadToS3 } from "@/lib/s3Upload";
import Image from "next/image";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsImageFill } from "react-icons/bs";

export default function ImageInput({ user }: { 
  user : {
    id: string,
    image: string | null | undefined 
  }
}) {
  const [hovering, setHovering] = useState(false);
  const [image, setImage] = useState(user.image);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
  
    // Restrict file size to 5MB
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds 5MB. Please upload a smaller file.", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "file-size-error",
      });
      return;
    }
  
    if (file) {
      try {
        const croppedAndResizedFile = await cropAndResizeImage(file);
  
        const imageUrl = await uploadToS3(croppedAndResizedFile, user.id);
        let response;
        if (imageUrl) {
          response = await post(`/api/user/image`, { id: user.id, image: imageUrl });
          if (response.success) {
            setImage(`${imageUrl}?t=${new Date().getTime()}`); 
            toast.success("Image uploaded successfully", {
              style: {
                background: '#333',
                color: '#fff',
              },
              id: "image-upload-success",
            });
          } else {
            toast.error("Failed to update user image on the server.", {
              style: {
                background: '#333',
                color: '#fff',
              },
              id: "server-update-error",
            });
          }
        } else {
          toast.error("Image upload failed", {
            style: {
              background: '#333',
              color: '#fff',
            },
            id: "image-upload-error",
          });
        }
      } catch (error) {
        console.error("Error processing image:", error);
        toast.error((error instanceof Error ? error.message : "Failed to process the image. Please try again."), {
          style: {
            background: '#333',
            color: '#fff',
          },
          id: "image-processing-error",
        });
      }
    } else {
      toast.error("No file selected", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: "image-upload-error",
      });
    }
  
    // Reset the file input to allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  const cropAndResizeImage = async (file: File): Promise<File> => {
    const imageToCrop = await createImageBitmap(file);
  
    // Determine the square dimensions
    const size = Math.min(imageToCrop.width, imageToCrop.height);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
  
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");
  
    // Draw the cropped square image
    ctx.drawImage(
      imageToCrop,
      (imageToCrop.width - size) / 2, // Start x
      (imageToCrop.height - size) / 2, // Start y
      size, // Source width
      size, // Source height
      0, // Destination x
      0, // Destination y
      size, // Destination width
      size // Destination height
    );
  
    // Convert the canvas to a Blob and compress it
    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/jpeg", 0.8) // Adjust compression quality (0.8 = 80%)
    );
    if (!blob) throw new Error("Failed to create Blob from canvas");
  
    // Convert the Blob back to a File
    return new File([blob], file.name, { type: "image/jpeg" });
  };

  return (
    <div className="absolute w-full flex justify-center items-center gap-10 left-0 top-[-75px]">
      {width > 700 && <p className="text-2xl font-semibold text-primary">STRANGER?!</p>}
      <div
        className="relative p-0 h-[150px] w-[150px] bg-base-100 rounded-full border border-primary cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {image && <Image height={150} width={150} alt="profile pic" className={`m-0 rounded-full mask mask-circle ${hovering && "opacity-30"}`} src={image} />}
        {hovering && <BsImageFill size={20} className="text-white absolute top-[48%] left-[45%]" />}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      {width > 700 && <p className="text-2xl font-semibold text-primary">STRANGER?!</p>}
    </div>
  );
}
