import { ClassValue, clsx } from "clsx";
import { StringifyOptions } from "querystring";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const uploadMedia = async (
  files: File,
  mediaType: string
): Promise<string | Error> => {
  if (files === undefined) {
    throw new Error("Please select a file");
  }

  const formData = new FormData();
  formData.append("file", files);
  formData.append(
    "upload_preset",
    `${process.env.NEXT_PUBLIC_CLOUD_UPLOAD_PRESET}`
  );
  formData.append("cloud_name", `${process.env.NEXT_PUBLIC_CLOUD_USER}`);

  try {
    let url: string;
    if (mediaType === "image")
      url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_USER}/image/upload`;
    else if (mediaType === "video")
      url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_USER}/video/upload`;
    else throw new Error("Invalid media type");

    const response = await fetch(url, {
      method: "post",
      body: formData,
    });
    const data = await response.json();
    console.log(data.url);
    return data.url;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
