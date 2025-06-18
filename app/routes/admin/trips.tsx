

import type { Route } from "./+types/trips";
import { cn, parseTripData ,getFirstWord } from '~/lib/utils';
import {useSearchParams, type LoaderFunctionArgs} from "react-router";
import { Header, TripCard } from "../../../components";
import * as React from 'react';

import { getAllTrips } from "~/appwrite/trips";
import { useState, type SetStateAction } from "react";


export const loader = async ({ request}: LoaderFunctionArgs) => {
   const limit = 8
   const url = new URL(request.url)
   const page = parseInt(url.searchParams.get('page') ?? '1', 10)
   const offset = (page - 1 )  * limit
     const {allTrips,total}= await getAllTrips(limit,offset)
    return {
     
      trips: allTrips.map(({$id,tripDetails,imageUrls})=>({
        id: $id,
        ...parseTripData(tripDetails),
        imageUrls: imageUrls || [],
      })),
      total
    };

}


const Trips = ({ loaderData } : Route.ComponentProps) => {
   
  const [SyncfusionComponents, setSyncfusionComponents] = React.useState<{
  PagerComponent?: any;
}>({});


  React.useEffect(() => {
  async function loadSyncfusion() {
    try {
      const gridPkg = await import('@syncfusion/ej2-react-grids');

      setSyncfusionComponents({
        PagerComponent: gridPkg.PagerComponent
      });
    } catch (error) {
      console.error('Error loading Syncfusion components:', error);
    }
  }

  loadSyncfusion();
}, []);
 
       const { PagerComponent } = SyncfusionComponents;


   const trips = loaderData.trips || []
   const [searchParams] = useSearchParams()
   const initialPage = Number(searchParams.get('page') ?? '1')
   const [currentPage,setCurrentPage] = useState(initialPage)
   const handlePageChange = (page: number) =>{
    setCurrentPage(page)
    window.location.search = `?page=${page}`
   }
  return (
    <main className='all-users wrapper'>
        <Header title="Trips" description="View and edit  AI-generated travel plans" ctaText="Create a Trip" ctaUrl="/trips/create"  />
        <section>
          <h1 className="p-24-semibold text-dark-100 mb-4">Manage Created Trips</h1>

            <div className="trip-grid">
                {trips.map((trip) => ( 
                         < TripCard 
                          id={trip.id}
                          key={trip.id}
                          name={trip.name ?? 'Unnamed Trip'}
                          imageUrl={trip.imageUrls[0]}
                          tags={[trip.travelStyle, trip.interests].filter((tag): tag is string => typeof tag === 'string')}
                          location={trip.itinerary?.[0]?.location ?? 'Unknown Location'}
                          // interests={trip.interests}
                          // travelStyle={trip.travelStyle}
                          price={trip.estimatedPrice ?? 'N/A'}

                         />
                ))}
              </div>
             {PagerComponent && (
  <PagerComponent
    totalRecordsCount={loaderData.total}
    pageSize={8}
    currentPage={currentPage}
    click={(args) => handlePageChange(args.currentPage)}
    cssClass="!mb-4 !mt-4"
  />
)}

        </section>
        
        </main>
  )
}

export default Trips
