import  { type ActionFunctionArgs ,data} from 'react-router';
import { appwriteConfig, database } from '~/appwrite/client';
import { ID } from 'appwrite';
// import { parseMarkdownToJson } from '~/lib/utils';
import { GoogleGenerativeAI} from "@google/generative-ai";
import Stripe from 'stripe';
// import {createProduct} from "~/lib/stripe";

import {parseMarkdownToJson, parseTripData} from "~/lib/utils";
import dotenv from 'dotenv';                
dotenv.config(); 

// export const action = async ({ request }: ActionFunctionArgs) => {
//     const {
//         country,
//         numberOfDays,
//         travelStyle,
//         interests,
//         budget,
//         groupType,
//         userId,
//     } = await request.json();

//     const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
//     const unsplashApiKey = process.env.UNSPLASH_ACCESS_KEY!;

//     try {
//         const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
//         Budget: '${budget}'
//         Interests: '${interests}'
//         TravelStyle: '${travelStyle}'
//         GroupType: '${groupType}'
//         Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
//         {
//         "name": "A descriptive title for the trip",
//         "description": "A brief description of the trip and its highlights not exceeding 100 words",
//         "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
//         "duration": ${numberOfDays},
//         "budget": "${budget}",
//         "travelStyle": "${travelStyle}",
//         "country": "${country}",
//         "interests": ${interests},
//         "groupType": "${groupType}",
//         "bestTimeToVisit": [
//           '🌸 Season (from month to month): reason to visit',
//           '☀️ Season (from month to month): reason to visit',
//           '🍁 Season (from month to month): reason to visit',
//           '❄️ Season (from month to month): reason to visit'
//         ],
//         "weatherInfo": [
//           '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
//           '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
//           '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
//           '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
//         ],
//         "location": {
//           "city": "name of the city or region",
//           "coordinates": [latitude, longitude],
//           "openStreetMap": "link to open street map"
//         },
//         "itinerary": [
//         {
//           "day": 1,
//           "location": "City/Region Name",
//           "activities": [
//             {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
//             {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
//             {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
//           ]
//         },
//         ...
//         ]
//     }`;

//         const textResult = await genAI
//             .getGenerativeModel({ model: 'gemini-2.0-flash' })
//             .generateContent([prompt])

//         const trip = parseMarkdownToJson(textResult.response.text());

//         const imageResponse = await fetch(
//             `https://api.unsplash.com/search/photos?query=${country} ${interests} ${travelStyle}&client_id=${unsplashApiKey}`
//         );

//         const imageUrls = (await imageResponse.json()).results.slice(0, 3)
//             .map((result: any) => result.urls?.regular || null);

//         const result = await database.createDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.tripCollectionId,
//             ID.unique(),
//             {
//                 tripDetails: JSON.stringify(trip),
//                 createdAt: new Date().toISOString(),
//                 imageUrls,
//                 userId,
//             }
//         )

//         const tripDetail = parseTripData(result.tripDetails) as Trip;
//         const tripPrice = parseInt(tripDetail.estimatedPrice.replace('$', ''), 10)
//         // const paymentLink = await createProduct(
//         //     tripDetail.name,
//         //     tripDetail.description,
//         //     imageUrls,
//         //     tripPrice,
//         //     result.$id
//         // )

//         await database.updateDocument(
//             appwriteConfig.databaseId,
//             appwriteConfig.tripCollectionId,
//             result.$id,
//             // {
//             //     payment_link: paymentLink.url
//             // }
//         )

//         return data({ id: result.$id })
//     } catch (e) {
//         console.error('Error generating travel plan: ', e);
//     }
// }
// export const action = async ({ request }: ActionFunctionArgs) => {
//     console.log("Component is loading");
//   try {
//     const {
//       country,
//       numberOfDays,
//       travelStyle,
//       budget,
//       userId,
//       groupType,
//       interest,
//     } = await request.json();

//     const genAi = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
//     console.log("Running createTrip function"); // <- confirm code is hit
//     console.log(genAi); // T
//     const UnsplashApi = process.env.UNSPLASH_ACCESS_KEY!;
    
//     const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
//     Budget: '${budget}'
//     Interests: '${interest}'
//     TravelStyle: '${travelStyle}'
//     GroupType: '${groupType}'
//     Return the itinerary and lowest estimated price in a clean, non-markdown JSON format...`;

//     const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });
//     const result = await model.generateContent([prompt]);

//     const trip = parseMarkdownToJson(result.response.text());

//     const imageRes = await fetch(
//       `https://api.unsplash.com/search/photos?query=${country}+${interest}&client_id=${UnsplashApi}`
//     );
//     const imageJson = await imageRes.json();
//     const imageUrls = imageJson.results
//       .slice(0, 3)
//       .map((img: any) => img.urls?.regular || null);

//     const createdTrip = await database.createDocument(
//       appwriteConfig.databaseId,
//       appwriteConfig.tripCollectionId,
//       ID.unique(),
//       {
//         tripDetails: JSON.stringify(trip),
//         createdAt: new Date().toISOString(),
//         imageUrls,
//         userId,
//       }
//     );

//     return new Response(
//       JSON.stringify({ id: createdTrip.$id }),
//       { headers: { 'Content-Type': 'application/json' } }
//     );
//   } catch (error) {
//     console.error('Error generating trip:', error);
//     return new Response(
//       JSON.stringify({ error: 'Failed to generate trip' }),
//       { status: 500 }
//     );
//   }
// };
export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const data = await request.json();
    console.log("📥 Incoming data:", data);

    const {
      country,
      numberOfDays,
      travelStyle,
      budget,
      userId,
      groupType,
      interests,
    } = data;

    const apiKey = process.env.GEMINI_API_KEY;
    console.log("🔑 API Key:", apiKey);

    const genAi = new GoogleGenerativeAI(apiKey!);
    console.log("⚙️ genAI initialized");

    const model = genAi.getGenerativeModel({ model: 'gemini-2.0-flash' });
    console.log("📡 Model selected");

    const prompt = `Generate a ${numberOfDays}-day travel itinerary for ${country} based on the following user information:
         Budget: '${budget}'
         Interests: '${interests}'
         TravelStyle: '${travelStyle}'
         GroupType: '${groupType}'
         Return the itinerary and lowest estimated price in a clean, non-markdown JSON format with the following structure:
         {
         "name": "A descriptive title for the trip",
         "description": "A brief description of the trip and its highlights not exceeding 100 words",
         "estimatedPrice": "Lowest average price for the trip in USD, e.g.$price",
         "duration": ${numberOfDays},
         "budget": "${budget}",
         "travelStyle": "${travelStyle}",
         "country": "${country}",
         "interests": ${interests},
         "groupType": "${groupType}",
         "bestTimeToVisit": [
           '🌸 Season (from month to month): reason to visit',
           '☀️ Season (from month to month): reason to visit',
           '🍁 Season (from month to month): reason to visit',
           '❄️ Season (from month to month): reason to visit'
         ],
         "weatherInfo": [
           '☀️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
           '🌦️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
           '🌧️ Season: temperature range in Celsius (temperature range in Fahrenheit)',
           '❄️ Season: temperature range in Celsius (temperature range in Fahrenheit)'
         ],
         "location": {
           "city": "name of the city or region",
           "coordinates": [latitude, longitude],
           "openStreetMap": "link to open street map"
         },
         "itinerary": [
         {
           "day": 1,
           "location": "City/Region Name",
           "activities": [
             {"time": "Morning", "description": "🏰 Visit the local historic castle and enjoy a scenic walk"},
             {"time": "Afternoon", "description": "🖼️ Explore a famous art museum with a guided tour"},
             {"time": "Evening", "description": "🍷 Dine at a rooftop restaurant with local wine"}
           ]
         },
         ...
         ]
     }`; // your full prompt

    const result = await model.generateContent([prompt]);
    // console.log("📄 AI result received",result);

    const parsed = parseMarkdownToJson(result.response.text());
    console.log("🧠 Parsed AI response:", parsed);

    const UnsplashApi = process.env.UNSPLASH_ACCESS_KEY!;
    console.log("Unsplash API Key:", UnsplashApi);
    const imageRes = await fetch(
      `https://api.unsplash.com/search/photos?query=${country}+${interests}&client_id=${UnsplashApi}`
    );
    const imageJson = await imageRes.json();
    // console.log("🖼️ Unsplash image results:", imageJson.results);

    const imageUrls = imageJson.results.slice(0, 3).map((img: any) => img.urls?.regular || null);
    console.log("🧾 Image URLs:", imageUrls);
     console.log(" userId", appwriteConfig.tripCollectionId);
    const createdTrip = await database.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.tripCollectionId,
      ID.unique(),
      {
        tripDetails: JSON.stringify(parsed),
        createdAt: new Date().toISOString(),
        imageUrls,
        userId,
      }
    );
    console.log("🎉 Trip saved to DB:", createdTrip);

    return new Response(JSON.stringify({ id: createdTrip.$id }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error("🔥 Error in create-trip:", error);
    return new Response(JSON.stringify({ error: 'Failed to generate trip' }), {
      status: 500,
    });
  }
};

