import { createContext, useContext } from "react";
export const LabContext = createContext(null);
export const useLab = () => useContext(LabContext);
export const asset = (path) => import.meta.env.BASE_URL + path;
