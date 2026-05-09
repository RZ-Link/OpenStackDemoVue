import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** list */
export const getFlavorList = (data?: object) => {
  return http.request<any>("get", baseUrlApi("flavor/list"), { data });
};
