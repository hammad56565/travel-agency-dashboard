 import { Header ,StatsCard ,TripCard } from "components"
import { getUser } from "~/appwrite/auth";
import { dashbardStats ,user ,allTrips } from "~/constants";
import type { Route } from "./+types/admin-layout";

const { totalUsers, userJoined, totalTrips, tripsCreated, userRole } = dashbardStats;

export const clientLoader = async ()=>  await getUser()

const Dashboard = ( {loaderData} : Route.ComponentProps ) => {
  const user   = loaderData as User | null;


  return (
    <main className="px-4">
      <Header
       title={`Welcome ${user?.name ?? 'Guest'} 👋  `} 
       description="Track activity,trends and popular destination in real time"
      />
      <section className="dashboard-stats flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard  
                headerTitle="Total Users"
                total={totalUsers} 
                currentMonth={userJoined.currentMonth}
                lastMonth={userJoined.lastMonth}
          />
          <StatsCard  
                headerTitle="Total Trips"
                total={totalTrips} 
                currentMonth={tripsCreated.currentMonth}
                lastMonth={tripsCreated.lastMonth}
          />
          <StatsCard  
                headerTitle="Total Users"
                total={userRole.total} 
                currentMonth={userRole.currentMonth}
                lastMonth={userRole.lastMonth}
          />
        </div>
        </section>
        <section className="container">
          <h1 className="text-xl font-semibold text-gray-100">Created Trips</h1>
          <div className="trip-grid">
            {/* {allTrips.slice(0 , 4).map((trip) => (
              <TripCard/>
            )) } */}
            {allTrips.slice(0, 4).map(({id,name,imageUrls,itinerary,estimatedPrice,tags,travelStyle}) => ( 
            <TripCard key={id}
              id={id.toString()}
              name={name}
              imageUrl={imageUrls[0]}
              location={itinerary?.[0]?.location ?? ' '}
              price={estimatedPrice}
              tags={tags}
            />
            ))  
            }
          </div>
        </section>
    </main>
  )
}

export default Dashboard
