'use client'; 
interface Props {
    title?: string;
    description?: string;
}
import * as React from 'react';
import { useState, useEffect } from 'react'; // Explicit hook imports

// import clsx from 'clsx';
import { cn } from '~/lib/utils';
import { Link, useLocation } from 'react-router';

interface Props{
    title?: string;
    description?: string;
    ctaText?: string;
    ctaUrl?: string;
}




const Header = ({ title, description,ctaText,ctaUrl }: Props) => {
    const location = useLocation(); 
        console.log(location.pathname);

          const [SyncfusionComponents, setSyncfusionComponents] = React.useState<{
    ButtonComponent?: any;
  }>({});
  React.useEffect(() => {
    async function loadSyncfusion() {
      try {
        // Dynamic import for CommonJS modules
        const basePkg = await import('@syncfusion/ej2-base');
        const buttonsPkg = await import('@syncfusion/ej2-react-buttons');

        basePkg.registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjXHxecH1VQWJVWUNyWklfag==');

        setSyncfusionComponents({
          ButtonComponent: buttonsPkg.ButtonComponent,
        });
      } catch (error) {
        console.error('Error loading Syncfusion components:', error);
      }
    }
    loadSyncfusion();
  }, []);
    return (
        <header className="header">
            <article>
                <h1 className={cn('text-dark-100 ', location.pathname == '/' ? 
                    'text-2xl md:text-4xl font-bold' : 'text-xl md:text-2xl font-semibold')}>
                        {title}</h1>
             <p className={cn('text-gray-100 font-normal', location.pathname == '/' ? 
                    'text-base md:text-lg ' : 'text-sm md:text-lg')}>
                        {description}</p>
            </article>
                 {ctaText && ctaUrl && (
                 <Link to={ctaUrl}> 
                 {SyncfusionComponents.ButtonComponent && (
                   <SyncfusionComponents.ButtonComponent type="button" className="button-class !h-11 !w-full md:w-[240px]">
                      <img src="/assets/icons/plus.svg" alt="plus" className='size-5' />
                      <span className="p-16-semibold text-white">{ctaText}</span>
                   </SyncfusionComponents.ButtonComponent>
                 )}
                 </Link>  
                )
                }
        </header>
    )
}

export default Header
