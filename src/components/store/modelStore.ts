import { modelsInfo } from "@/constants/ModelInfo";
import { atom } from "jotai";

export const modelsAtom = atom(
  modelsInfo?.map((x) => ({ ...x, visible: true }))
);
