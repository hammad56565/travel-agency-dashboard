import { Header, StatsCard, TripCard } from "components"
import { getAllUsers, getUser } from "~/appwrite/auth";
import { dashboardStats, user, allTrips } from "~/constants";
import type { Route } from "./+types/admin-layout";
import { getTripsByTravelStyle, getUserGrowthPerDay, getUsersAndTripsStats } from "~/appwrite/dashboard";
import { getAllTrips } from "~/appwrite/trips";
import { parseTripData } from "~/lib/utils";
import { tripXAxis, tripyAxis, userXAxis, useryAxis } from "~/constants";
import React, { useEffect, useState } from "react";


const { totalUsers, userJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

export const clientLoader = async () => {
  const [user, dashboardStats, trips, userGrowth, tripsByTravelStyle, allUsers] = await Promise.all([
    getUser(),
    getUsersAndTripsStats(),
    getAllTrips(4, 0),
    getUserGrowthPerDay(),
    getTripsByTravelStyle(),
    getAllUsers(4, 0),
  ]);
  const allTrips = trips.allTrips.map(({ $id, tripDetails, imageUrls }) => ({
    id: $id,
    ...parseTripData(tripDetails),
    imageUrls: imageUrls ?? []
  }))
  const mappedUsers: UsersItineraryCount[] = allUsers.users.map((user) => ({
    imageUrl: user.imageUrl,
    name: user.name,
    count: user.itineraryCount ?? Math.floor(Math.random() * 10),
  }))

  return {
    user,
    dashboardStats,
    allTrips,
    userGrowth,
    tripsByTravelStyle,
    allUsers: mappedUsers
  }
}


// type DashboardLoaderData = Awaited<ReturnType<typeof clientLoader>>;

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData?.user as User | null;
  const { dashboardStats, allTrips, userGrowth, tripsByTravelStyle, allUsers } = loaderData;

  const [ChartComponents, setChartComponents] = useState<any>({});
const [SyncfusionComponents, setSyncfusionComponents] = React.useState<{
    ButtonComponent?: any;
    GridComponent?: any;
    ColumnDirective?: any;
    ColumnsDirective?: any;
    Filter?: any;
    Group?: any;
    Inject?: any;
    Page?: any;
    PageSettingsModel?: any;
    Sort?: any;
  }>({});
  useEffect(() => {
    const loadSyncfusionChart = async () => {
      try {
        const chartPkg = await import('@syncfusion/ej2-react-charts');
         // Dynamic import for CommonJS modules
        const basePkg = await import('@syncfusion/ej2-base');
        const buttonsPkg = await import('@syncfusion/ej2-react-buttons');
        const gridsPkg = await import('@syncfusion/ej2-react-grids');

                setSyncfusionComponents({
                  ButtonComponent: buttonsPkg.ButtonComponent,
          GridComponent: gridsPkg.GridComponent,
          ColumnDirective: gridsPkg.ColumnDirective,
          ColumnsDirective: gridsPkg.ColumnsDirective,
          Filter: gridsPkg.Filter,
          Group: gridsPkg.Group,
          // Inject: gridsPkg.Inject,
          Page: gridsPkg.Page,
          // PageSettingsModel: gridsPkg.PageSettingsModel,
          Sort: gridsPkg.Sort})
        setChartComponents({
          
          ChartComponent: chartPkg.ChartComponent,
          SeriesCollectionDirective: chartPkg.SeriesCollectionDirective,
          SeriesDirective: chartPkg.SeriesDirective,
          ColumnSeries: chartPkg.ColumnSeries,
          DataLabel: chartPkg.DataLabel,
          Tooltip: chartPkg.Tooltip,
          Legend: chartPkg.Legend,
          LineSeries: chartPkg.LineSeries,
          Category: chartPkg.Category,
          Inject: chartPkg.Inject,
          SplineAreaSeries : chartPkg.SplineAreaSeries
        });
      } catch (error) {
        console.error("Failed to load Syncfusion Chart:", error);
      }
    };

    loadSyncfusionChart();
  }, []);

    // if (!SyncfusionComponents.GridComponent) return <div>Loading  Sync...</div>;

   const { 
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Filter,
    Group,
    Page,
    PageSettingsModel,
    Sort
  } = SyncfusionComponents;
  const {
    ChartComponent,
    SeriesCollectionDirective,
    SeriesDirective,
    Inject,
    SplineAreaSeries,
    ColumnSeries,
    DataLabel,
    Tooltip,
    Legend,
    LineSeries,
    Category,
  } = ChartComponents;
if (
  !GridComponent 
) {
  return <div>Loading Syncfusion Components...</div>;
}

  const tooltip = { enable: true, shared: false };
  const primaryYAxis = { labelFormat: '${value}K' };
  const primaryXAxis = { valueType: 'Category' };
  const legendSettings = { visible: true };
  const marker = {
    dataLabel: { visible: true }
  }
  if (!dashboardStats) return <div>Loading...</div>;
   const trips = allTrips.map((trip) => ({
        imageUrl: trip.imageUrls[0],
        name: trip.name,
        interest: trip.interests,
    }))
 const usersAndTrips = [
        {
            title: 'Latest user signups',
            dataSource: allUsers,
            field: 'count',
            headerText: 'Trips created'
        },
        {
            title: 'Trips based on interests',
            dataSource: trips,
            field: 'interest',
            headerText: 'Interests'
        }
    ]
  //  console.log(dashboardStats)
  //  console.log(dashboardStats.usersJoined)

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
            total={dashboardStats.totalUsers}
            currentMonth={dashboardStats.usersJoined.currentMonth}
            lastMonth={dashboardStats.usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={dashboardStats.totalTrips}
            currentMonth={dashboardStats.tripsCreated.currentMonth}
            lastMonth={dashboardStats.tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={dashboardStats.userRole.total}
            currentMonth={dashboardStats.userRole.currentMonth}
            lastMonth={dashboardStats.userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-gray-100 mt-6">Created Trips</h1>
        <div className="trip-grid">
          {/* {allTrips.slice(0 , 4).map((trip) => (
              <TripCard/>
            )) } */}
          {allTrips.map((trip) => (
            <TripCard
              key={trip.id}
              id={trip.id.toString()}
              name={trip.name!}
              imageUrl={trip.imageUrls[0]}
              location={trip.itinerary?.[0]?.location ?? ''}
              tags={[trip.interests!, trip.travelStyle!]}
              price={trip.estimatedPrice!}
            />
          ))}
        </div>
      </section>
{!ChartComponent ? (
  <div className="text-white">Loading charts...</div>
) : (
      <section className="grid grid-cols-1 lg:grid-cols-2 my-3 gap-5">
        <ChartComponent
          id="chart-1"
          primaryXAxis={userXAxis}
          primaryYAxis={useryAxis}
          title="User Growth"
          tooltip={{ enable: true }}
        >
          <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="Column"
              name="Column"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />

            <SeriesDirective
              dataSource={userGrowth}
              xName="day"
              yName="count"
              type="SplineArea"
              name="Wave"
              fill="rgba(71, 132, 238, 0.3)"
              border={{ width: 2, color: '#4784EE' }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>

        <ChartComponent
          id="chart-2"
          primaryXAxis={tripXAxis}
          primaryYAxis={tripyAxis}
          title="Trip Trends"
          tooltip={{ enable: true }}
        >
          <Inject services={[ColumnSeries, SplineAreaSeries, Category, DataLabel, Tooltip]} />

          <SeriesCollectionDirective>
            <SeriesDirective
              dataSource={tripsByTravelStyle}
              xName="travelStyle"
              yName="count"
              type="Column"
              name="day"
              columnWidth={0.3}
              cornerRadius={{ topLeft: 10, topRight: 10 }}
            />
          </SeriesCollectionDirective>
        </ChartComponent>
      </section>)}
      <section className="user-trip wrapper">
        {usersAndTrips.map(({title,dataSource,field,headerText},i)=>(
            <div key={i} className="flex flex-col gap-5">
                        <h3 className="p-20-semibold text-dark-100">{title}</h3>

                        <GridComponent dataSource={dataSource} gridLines="None">
                            <ColumnsDirective>
                                <ColumnDirective
                                    field="name"
                                    headerText="Name"
                                    width="200"
                                    textAlign="Left"
                                    template={(props: UserData) => (
                                        <div className="flex items-center gap-1.5 px-4">
                                            <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer" />
                                            <span>{props.name}</span>
                                        </div>
                                    )}
                                />

                                <ColumnDirective
                                    field={field}
                                    headerText={headerText}
                                    width="150"
                                    textAlign="Left"
                                />
                            </ColumnsDirective>
                        </GridComponent>

                    </div>
        ) )}
      </section>
    </main>
  )
}

export default Dashboard
