import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

/** list */
export const createStack = (data?: object) => {
  return http.request<any>("post", baseUrlApi("orchestration/createStack"), {
    data
  });
};

export const getStackDetails = (data?: object) => {
  return http.request<any>(
    "post",
    baseUrlApi("orchestration/getStackDetails"),
    {
      data
    }
  );
};
