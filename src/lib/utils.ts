import { modelsInfo } from "@/constants/ModelInfo";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getConfigurationByModelPath(pathName: string): any {
  let modelPath: string | string[] = pathName.split("/");
  modelPath = modelPath?.[2];

  const selectedModel = modelsInfo.filter(
    (x) => x.model3DFile === modelPath
  )?.[0];
  return selectedModel?.configuration;
}
