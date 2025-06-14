
import { Link, useLocation } from "react-router"
import * as React from 'react';
import { Chip ,Stack } from "@mui/material";
import { getFirstWord } from "~/lib/utils";

const TripCard = ({id , name , imageUrl ,location ,price,tags}: TripCardProps) => {
    const path = useLocation()
  return (
   <Link to={path.pathname === '/' || path.pathname.startsWith
    ('/travel') ? `/travel/${id}` : `/trips/${id}` } className="trip-card">
     <img src={imageUrl} alt={name}/>

     <article>
        <h2>{name}</h2>
        <figure>
        <img src="/assets/icons/location-mark.svg" alt="location" className="size-4" />
         <figcaption >{location}</figcaption>
        </figure>
     </article>

     <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <Stack direction="row" spacing={1}>
            {tags.map((tag, index) => (
                
          <Chip key={index} label={getFirstWord(tag)}
          className={index === 1 ? '!bg-pink-50 !text-pink-500' : '!bg-success-50 !text-success-500'}/>  
            ))}
          </Stack>
 
    </div>
     
     <article className="tripCard-pill">{price}</article>
    </Link>
//     <Link
//   to={path.pathname === '/' || path.pathname.startsWith('/travel') 
//     ? `/travel/${id}` 
//     : `/trips/${id}`
//   }
//   className="trip-card"
// ></Link>
  )
}

export default TripCard
