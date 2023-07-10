import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const sleep = (duration: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("promise resolved");
    }, duration);
  });
};
