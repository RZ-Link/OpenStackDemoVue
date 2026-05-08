// import { http } from "@/utils/http";

// type Result = {
//   success: boolean;
//   data: Array<any>;
// };

export const getAsyncRoutes = async () => {
  /**
   * roles：页面级别权限，这里模拟二种 "admin"、"common"
   * admin：管理员角色
   * common：普通角色
   */
  const permissionRouter = {
    path: "/permission",
    meta: {
      title: "权限管理",
      icon: "ep:lollipop",
      rank: 10
    },
    children: [
      {
        path: "/permission/page/index",
        name: "PermissionPage",
        meta: {
          title: "页面权限",
          roles: ["admin", "common"]
        }
      },
      {
        path: "/permission/button",
        meta: {
          title: "按钮权限",
          roles: ["admin", "common"]
        },
        children: [
          {
            path: "/permission/button/router",
            component: "permission/button/index",
            name: "PermissionButtonRouter",
            meta: {
              title: "路由返回按钮权限",
              auths: [
                "permission:btn:add",
                "permission:btn:edit",
                "permission:btn:delete"
              ]
            }
          },
          {
            path: "/permission/button/login",
            component: "permission/button/perms",
            name: "PermissionButtonLogin",
            meta: {
              title: "登录接口返回按钮权限"
            }
          }
        ]
      }
    ]
  };
  return {
    success: true,
    data: [permissionRouter]
  };
  // return http.request<Result>("get", "/get-async-routes");
};
