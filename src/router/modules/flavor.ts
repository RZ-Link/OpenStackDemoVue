export default {
  path: "/flavor",
  redirect: "/flavor/index",
  meta: {
    title: "实例类型",
    rank: 2
  },
  children: [
    {
      path: "/flavor/index",
      name: "flavor",
      component: () => import("@/views/flavor/index.vue"),
      meta: {
        title: "实例类型"
      }
    }
  ]
} satisfies RouteConfigsTable;
