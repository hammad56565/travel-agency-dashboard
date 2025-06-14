import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  route("sign-in", "routes/root/sign-in.tsx"), // /admin/
  route("Grid", "routes/admin/Grid.tsx"), // /admin/
  route("api/create-trip", "routes/api/create-trip.ts"), // /admin/
  route("api/create-trip", "routes/api/testtt.tsx"), // /admin/
  // route("Btn", "routes/admin/Btn.tsx"), // /admin/
  layout(
    "routes/admin/admin-layout.tsx", // Your layout component
    [
    //   route("admin", "routes/admin/Dashboard.tsx"), // Default route for /admin
      route("dashboard", "routes/admin/Dashboard.tsx"), // /admin/dashboard
      route("all-users", "routes/admin/all-users.tsx"), // /admin/allusers
      route("trips", "routes/admin/trips.tsx"), // /admin/allusers
      route("trips/create", "routes/admin/create-trips.tsx"), // /admin/allusers
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
