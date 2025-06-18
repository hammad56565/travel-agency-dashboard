
import * as React from 'react';
import * as ReactDom from 'react-dom';
import type {LoaderFunctionArgs} from "react-router";
// import { appwriteConfig, database } from '~/appwrite/client';
// import { ID } from 'appwrite';
import { getAllTrips, getTripById } from '~/appwrite/trips';
import type { Route } from './+types/trip-detail';
import { cn, parseTripData ,getFirstWord } from '~/lib/utils';
import { Header, TripCard } from "../../../components";
import { InfoPill } from '../../../components';
import clsx from 'clsx';
// import { allTrips } from '~/constants';
// import { i } from 'node_modules/vite/dist/node/types.d-aGj9QkWt';


export const loader = async ({ params}: LoaderFunctionArgs) => {
  const { tripId } = params; 
    if (!tripId) {
        throw new Error('Trip ID is required');
    }
    const [trips,trip] = await Promise.all([
        getAllTrips(  4,  0 ),
        getTripById(tripId)
    ])
    return {
      trip,
      allTrips: trips.allTrips.map(({$id,tripDetails,imageUrls})=>({
        id: $id,
        ...parseTripData(tripDetails),
        imageUrls: imageUrls || [],
      }))
    };

}


const TripDetail = ({ loaderData } : Route.ComponentProps) => {

      const [SyncfusionComponents, setSyncfusionComponents] = React.useState<{
        ChipListComponent?: any;
        ComboBoxComponent?: any;
        MapsComponent?: any
        ChipsDirective?: any
        ChipDirective?: any
    
      }>({});
     React.useEffect(() => {
        async function loadSyncfusion() {
          try {
            // Dynamic import for CommonJS modules
            const basePkg = await import('@syncfusion/ej2-base');
            const buttonsPkg = await import('@syncfusion/ej2-react-buttons');
            const dropdownPkg = await import('@syncfusion/ej2-react-dropdowns');
          const mapsPkg = await import('@syncfusion/ej2-react-maps');
    
    
            basePkg.registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjXHxecH1VQWJVWUNyWklfag==');
    
            setSyncfusionComponents({
              ChipListComponent: buttonsPkg.ChipListComponent,
              ChipsDirective: buttonsPkg.ChipsDirective,
              ChipDirective: buttonsPkg.ChipDirective,
              ComboBoxComponent: dropdownPkg.ComboBoxComponent,
            //    MapsComponent: mapsPkg.MapsComponent,
            // ChipsDirective: mapsPkg.ChipsDirective,
            // ChipDirective: mapsPkg.ChipDirective,
            });
          } catch (error) {
            console.error('Error loading Syncfusion components:', error);
          }
        }
        loadSyncfusion();
      }, []);

      const { ComboBoxComponent,ChipListComponent, MapsComponent, ChipsDirective, ChipDirective } = SyncfusionComponents;

    const imageUrls = loaderData?.trip?.imageUrls || [];
    const tripData = parseTripData(loaderData?.trip?.tripDetails); 
    const {name,
         duration,travelStyle,budget,groupType, interests,
      itinerary,estimatedPrice,description,bestTimeToVisit,weatherInfo,country
     } = tripData || {}
     const allTrips = loaderData?.allTrips as  Trip[] || [];
     const pillItems = [
             { text: travelStyle || 'No Sugggestion', bgColor: '!bg-yellow-50', textColor: '!text-pink-500' },
             { text: groupType, bgColor: '!bg-primary-50', textColor: '!text-primary-500' },
                { text: budget, bgColor: '!bg-success-70', textColor: '!text-success-700' },
                { text: interests || 'No Sugggestion', bgColor: '!bg-navy-50', textColor: '!text-navy-500' },
                { text: country, bgColor: '!bg-gray-80', textColor: '!text-gray-800' }
        
     ]
          // console.log(text)

     const visitTimeandWeatherInfo = [
       {title: 'Best Time to Visit', value: bestTimeToVisit || 'No Sugggestion'},
       {title: 'Weather Info', value: weatherInfo || 'No Sugggestion' }
     ]

     if (!ChipListComponent || !ChipsDirective || !ChipDirective) {
  return <div>Loading trip details...</div>;
}

  return (
    <main className="travel-detail wrapper">
        <Header title='Trip Details' description='View and edit AI generated plans' />
        <section className="container wrapper-md">
            <header>
                <h1 className="p-40-semibold text-dark-100">{name}</h1>
            <div className="flex items-center gap-5">           
              <InfoPill text={`${duration ?? ''} days plan`} image='/assets/icons/calendar.svg'/>
              <InfoPill text={(itinerary?.slice(0,2).map((item)=>item.location).join(', ')) || ''} image='/assets/icons/calendar.svg'/>
            </div>
            </header>
            <section className="gallery">{imageUrls.map((url : string,i : number) =>(
                 <img src={url} key={i} className={cn('w-full rounded-xl object-cover' ,i ===0 ?
                    'md-col-span-2 md:row-span-2 h-[320px] ' : 'md:h-[150px]  md:row-span-1'  
                 )} />
            ) )}</section>
            <section className="flex gap-3 md:gap-5 items-center flex-wrap">
                
                <ChipListComponent>
                    <ChipsDirective> 
                        {pillItems.map((pill,i)=>(
                        <ChipDirective key={i} text={getFirstWord(pill.text)}  cssClass={`${pill.bgColor}  ${pill.textColor} !text-base !font-medium !px-4`}/>
                    ))} 
                    </ChipsDirective> 
                </ChipListComponent> 
                <ul className="flex gap-1 items-center">
                  {Array(5).fill(null).map((_, index) => (
                  <li key={index}><img src="/assets/icons/star.svg"
                   alt="star" className='size-[18x]' /></li>
                  ))}
                  <li className="ml-1">
                    <ChipListComponent>
                      <ChipsDirective>
                        <ChipDirective text="4.9/5" cssClass="!bg-yellow-50" />
                      </ChipsDirective>
                    </ChipListComponent>
                  </li>
                </ul>
            </section>
            <section className='title'>
              <article>
                <h3>{duration}-day {country} {travelStyle} </h3>
              </article>
              <h2>{estimatedPrice} </h2>
            </section>
            <p className='text-sm md:text-lg font-normal text-dark-400'>{description}</p>
            <ul className="itinerary ">
              {itinerary?.map((dayPlan:DayPlan, index:number) => (
                    <li key={index}>
                      <h3>
                        Day {dayPlan.day}: {dayPlan.location}
                      </h3>
                      <ul>
                        {dayPlan.activities.map((activity, index) => (
                          <li key={index} >
                            <span className='flex-shiring-0 p-18-semibold'>{activity.time}</span>
                            <p className="flex-grow">{activity.description}</p>
                            </li>
                        ))}
                      </ul>
                    </li>
              ))}
            </ul>
            {visitTimeandWeatherInfo.map((section)=>(
              <section key={section.title} className="visit">
                <div>            
                      <h3 className="">{section.title}</h3>
                      <ul>
                        {Array.isArray(section.value)
                          ? section.value.map((item) => (
                              <li key={item}>
                                <p className='flex-grow'>{item}</p>
                              </li>
                            ))
                          : (
                              <li>
                                <p className='flex-grow'>{section.value}</p>
                              </li>
                            )
                        }
                      </ul>
               </div>

              </section>
            ))}
           
        </section>
         <section className="flex flex-col gap-6">
              <h2 className="p-24-semibold text-dark-100">
                Popular Trips
              </h2>
              <div className="trip-grid">
                {allTrips.map(({id,name,imageUrls,itinerary,interests,travelStyle,estimatedPrice}) => ( 
                         < TripCard 
                          id={id}
                          key={id}
                          name={name}
                          imageUrl={imageUrls[0]}
                          tags={[travelStyle,interests]}
                          location={itinerary?.[0]?.location ?? 'Unknown Location'}
                          // interests={interests}
                          // travelStyle={travelStyle}
                          price={estimatedPrice}

                         />
                ))}
              </div>
            </section>
    </main>
    
  )
}

export default TripDetail
