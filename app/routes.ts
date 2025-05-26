import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  layout(
    "routes/admin/admin-layout.tsx", // Your layout component
    [
    //   route("admin", "routes/admin/Dashboard.tsx"), // Default route for /admin
      route("dashboard", "routes/admin/Dashboard.tsx"), // /admin/dashboard
      route("all-users", "routes/admin/all-users.tsx"), // /admin/dashboard
    ]
  ),
] satisfies RouteConfig;



// import { type RouteConfig, layout, route } from "@react-router/dev/routes";

// export default [

//      layout( "routes/admin/AdminLayout.tsx", [
//     route("Dashboard", 'routes/admin/Dashboard.tsx'),
//     route("AdminLayout", 'routes/admin/AdminLayout.tsx'),
//   ])
// //     layout(file : "routes/admin/AdminLayout.tsx" ,[
// //   route("Dashboard", 'routes/admin/Dashboard.tsx')
// //     ])
// ] satisfies RouteConfig;
