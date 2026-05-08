export default {
  path: "/image",
  redirect: "/image/index",
  meta: {
    title: "镜像",
    rank: 1
  },
  children: [
    {
      path: "/image/index",
      name: "image_",
      component: () => import("@/views/image/index.vue"),
      meta: {
        title: "镜像"
      }
    }
  ]
} satisfies RouteConfigsTable;
