import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** list */
export const getImageList = (data?: object) => {
  return http.request<any>("get", baseUrlApi("image/list"), { data });
};
