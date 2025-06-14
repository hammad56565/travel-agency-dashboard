'use client';
import * as React from 'react';
import { Header } from "../../../components";
import { useState, useEffect } from 'react';
import type { Route } from './+types/admin-layout';
import { data } from 'react-router';
import { comboBoxItems, selectItems } from '~/constants';
import { formatKey } from '~/lib/utils';
import {world_map} from "~/constants/world_map";

import {useNavigate} from "react-router";

import {account} from "~/appwrite/client";
export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flag,maps,latlng');
  // const data = await response.json();
  const data = await response.json();
   console.log(data[0]); // ✅ Check if country.latlng exists in raw data 
   if (!Array.isArray(data)) {
  console.error("Appwrite returned unexpected data:", data);                   
  return [];
}
  return data.map((country: any) => ({
    name: country.flag + '' + country.name.common,
    coordinate: country.latlng,
    value: country.name.common,
    openStreetMap : country.maps?.openStreetMap
  }));
}

const createTrips = ({loaderData} : Route.ComponentProps) => {

  const navigate = useNavigate();
     
  const countries  = loaderData as Country[] ;
  const [formData,setFormData] = useState<TripFormData>({
     country: countries[0]?.name || '',
      duration: 0,
      travelStyle: '',
      budget: '',
      groupType: '',
      interest : '',
  })

   const [error,setError] = useState <string | null>(null)
   const [loading,setLoading] = useState(false)

  // const handleSubmit = async () => {
  //   // Handle form submission logic here
  //   console.log("Form submitted");
  // }

  const handleChange = (key : keyof TripFormData , value : string | number)=>{
    setFormData({...formData, [key]: value})
  }
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
       e.preventDefault()
        setLoading(true);

       if(
           !formData.country ||
           !formData.travelStyle ||
           !formData.interest ||
           !formData.budget ||
           !formData.groupType
       ) {
           setError('Please provide values for all fields');
           setLoading(false)
           return;
       }

       if(formData.duration < 1 || formData.duration > 10) {
           setError('Duration must be between 1 and 10 days');
           setLoading(false)
           return;
       }
       
 const user = await account.get();
       if(!user.$id) {
           console.error('User not authenticated');
           setLoading(false)
           return;
       }
       try {
           const response = await fetch('/api/create-trip', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json'},
               body: JSON.stringify({
                   country: formData.country,
                   numberOfDays: formData.duration,
                   travelStyle: formData.travelStyle,
                   interests: formData.interest,
                   budget: formData.budget,
                   groupType: formData.groupType,
                   userId: user.$id
               })
           })

  // const text = await response.text(); // read as plain text first

  // if (!response.ok) {
  //   console.error("❌ Server error response:", text);
  //   throw new Error("Trip generation failed");
  // }
           const result: CreateTripResponse = await response.json();
          //  console.log("This is response:", response);
               console.log("Trip created:", result);
           if(result?.id) navigate(`/trips/${result.id}`)
           else console.error('Failed to generate a trip ok')
       } catch (e) {
           console.error('Error generating trip', e);
       } finally {
           setLoading(false)
       }
    } // <-- Add this closing brace for handleSubmit

  const mapData  = [
    {
      country : formData.country,
      color : '#EA382E',
      coordinates : countries.find((c:Country) => c.value === formData.country)?.coordinates || [],
    }
  ]
  console.log(mapData[0].coordinates);
  // console.log(countries.slice(0, 3));


  const countryData = countries.map((country)=>({
    text: country.name,
    value : country.value,
  })) 

  const [SyncfusionComponents, setSyncfusionComponents] = React.useState<{
    ButtonComponent?: any;
    ComboBoxComponent?: any;
    MapsComponent?: any
    LayersDirective?: any
    LayerDirective?: any

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
          ButtonComponent: buttonsPkg.ButtonComponent,
          ComboBoxComponent: dropdownPkg.ComboBoxComponent,
           MapsComponent: mapsPkg.MapsComponent,
        LayersDirective: mapsPkg.LayersDirective,
        LayerDirective: mapsPkg.LayerDirective,
        });
      } catch (error) {
        console.error('Error loading Syncfusion components:', error);
      }
    }
    loadSyncfusion();
  }, []);

// const testGeminiAPI = async () => {
//   const res = await fetch('/api/testtt', {
//     method: 'POST'
//   });
//   const data = await res.json();
//   console.log(data); // ✅ Should show Gemini response
// };


const { ComboBoxComponent,ButtonComponent, MapsComponent, LayersDirective, LayerDirective } = SyncfusionComponents;
  if (!ComboBoxComponent) return <p>Loading form...</p>;
  return (
    <main className="flex flex-col p-20 gap-10 wrapper">
      <Header title="Add a new Trip" description="View and edit  AI-generated travel plans" />
      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>
          <div>
            <input type="country" />
            <label htmlFor="country">
              {ComboBoxComponent && (
                <ComboBoxComponent
                  id="country"
                  dataSource={countryData}
                  fields={{ text: 'text', value: 'value' }}
                  className="combo-box"
                      change={(e: { value: string | undefined }) => {
                                if(e.value) {
                                    handleChange('country', e.value)
                                }
                            }}
                            allowFiltering
                            filtering={(e) => {
                                const query = e.text.toLowerCase();

                                e.updateData(
                                    countries.filter((country) => country.name.toLowerCase().includes(query)).map(((country) => ({
                                        text: country.name,
                                        value: country.value
                                    })))
                                )
                            }}
                />
              )}
                          </label>
          </div>
          <div>
            <label htmlFor="duration">Duration</label>
            <input
              type="number"
              id="duration"
              name='duration' 
              placeholder="Enter trip duration in days"
              onChange={(e) => handleChange('duration', Number(e.target.value))}
                     className='form-input placeholder:text-gray-100'            
            />
          </div>
          {selectItems.map((key) => (
                        <div key={key}>
                            <label htmlFor={key}>{formatKey(key)}</label>

                            <ComboBoxComponent
                                id={key}
                                dataSource={comboBoxItems[key].map((item) => ({
                                    text: item,
                                    value: item,
                                }))}
                                fields={{ text: 'text', value: 'value'}}
                                placeholder={`Select ${formatKey(key)}`}
                                change={(e: { value: string | undefined }) => {
                                    if(e.value) {
                                        handleChange(key, e.value)
                                    }
                                }}
                                allowFiltering
                                filtering={(e: any) => {
                                    const query = e.text.toLowerCase();

                                    e.updateData(
                                        comboBoxItems[key]
                                            .filter((item) => item.toLowerCase().includes(query))
                                            .map(((item) => ({
                                                text: item,
                                                value: item,
                                            }))))}}
                                className="combo-box"
                            />
                        </div>
                    ))}
               
               <div>
                <label htmlFor="location">
                  Location on the world map
                </label>
                           <MapsComponent>
                            <LayersDirective>
                               <LayerDirective shapeData={world_map}
                               dataSource={mapData}
                               shapePropertyPath="name"
                               shapeDataPath="country"
                                shapeSettings={{
                                    border: { colorValuePath: 'color', fill: '#E5E5E5'},
                                }}
                               />
                            </LayersDirective>
                           </MapsComponent>

               </div>


                < div className='h-px bg-gray-200 w-full' />
                {error && (
                <div className="error"> 
                <p>{error} </p>
                 </div>
                
                )
                }

                <footer className='px-6 w-full'>
                  <ButtonComponent type="submit" className="button-class !h-12 !w-full" disabled={loading}>
                    <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} alt="" />
                    <span className="p-16-semibold text-white">
                      {loading ? 'generating' : 'generate'}
                    </span>
                  </ButtonComponent>
                </footer>

        </form>
      </section>
    </main>
  )
}

export default createTrips
