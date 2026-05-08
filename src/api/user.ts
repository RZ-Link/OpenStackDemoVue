// import { http } from "@/utils/http";

export type UserResult = {
  success: boolean;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = async (data?: any) => {
  if (data.username === "admin") {
    return {
      success: true,
      data: {
        avatar: "https://avatars.githubusercontent.com/u/44761321",
        username: "admin",
        nickname: "小铭",
        // 一个用户可能有多个角色
        roles: ["admin"],
        // 按钮级别权限
        permissions: ["*:*:*"],
        accessToken: "eyJhbGciOiJIUzUxMiJ9.admin",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.adminRefresh",
        expires: new Date("2030/10/30 00:00:00")
      }
    };
  } else {
    return {
      success: true,
      data: {
        avatar: "https://avatars.githubusercontent.com/u/52823142",
        username: "common",
        nickname: "小林",
        roles: ["common"],
        permissions: ["permission:btn:add", "permission:btn:edit"],
        accessToken: "eyJhbGciOiJIUzUxMiJ9.common",
        refreshToken: "eyJhbGciOiJIUzUxMiJ9.commonRefresh",
        expires: new Date("2030/10/30 00:00:00")
      }
    };
  }
  // return http.request<UserResult>("post", "/login", { data });
};

/** 刷新`token` */
export const refreshTokenApi = async (data?: object) => {
  console.log("refreshTokenApi", data);
  return {
    success: true,
    data: {
      accessToken: "eyJhbGciOiJIUzUxMiJ9.newAdmin",
      refreshToken: "eyJhbGciOiJIUzUxMiJ9.newAdminRefresh",
      // `expires`选择这种日期格式是为了方便调试，后端直接设置时间戳或许更方便（每次都应该递增）。如果后端返回的是时间戳格式，前端开发请来到这个目录`src/utils/auth.ts`，把第`38`行的代码换成expires = data.expires即可。
      expires: new Date("2030/10/30 23:59:59")
    }
  };
  // return http.request<RefreshTokenResult>("post", "/refresh-token", { data });
};
