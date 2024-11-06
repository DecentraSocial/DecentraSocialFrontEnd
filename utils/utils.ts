import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const postdetails=(files:string):void=>{
  if (files === undefined) {
    return alert('Please select a file')
  }

  const formData = new FormData();
  formData.append('file', files);
  formData.append('upload_preset', 'chat-app');
  formData.append('cloud_name', 'dxdctwwyf');

  fetch(`https://api.cloudinary..com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_USER}/image/upload`, {
    method: 'post',
    body: formData,
  })
  .then((res) => res.json())
  .then((data) => {
    console.log('' + data.url + 'dataurl')
  })
  .catch((err) => {
    console.log(err)
  })
}