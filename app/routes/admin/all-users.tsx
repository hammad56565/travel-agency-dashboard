 'use client';
import * as React from 'react';
import { useState, useEffect } from 'react';
import {cn, formatDate} from "~/lib/utils";
import {getAllUsers} from "~/appwrite/auth";
import type {Route} from "./+types/all-users"
import {Header} from "../../../components";
export const loader = async () => {
    const { users, total } = await getAllUsers(10, 0);

    return { users, total };
}

function AllUsers({ loaderData }: Route.ComponentProps) {
    const { users } = loaderData;


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

  React.useEffect(() => {
    async function loadSyncfusion() {
      try {
        // Dynamic import for CommonJS modules
        const basePkg = await import('@syncfusion/ej2-base');
        const buttonsPkg = await import('@syncfusion/ej2-react-buttons');
        const gridsPkg = await import('@syncfusion/ej2-react-grids');

        basePkg.registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF1cWmhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEBjXHxecH1VQWJVWUNyWklfag==');

        setSyncfusionComponents({
          ButtonComponent: buttonsPkg.ButtonComponent,
          GridComponent: gridsPkg.GridComponent,
          ColumnDirective: gridsPkg.ColumnDirective,
          ColumnsDirective: gridsPkg.ColumnsDirective,
          Filter: gridsPkg.Filter,
          Group: gridsPkg.Group,
          Inject: gridsPkg.Inject,
          Page: gridsPkg.Page,
          PageSettingsModel: gridsPkg.PageSettingsModel,
          Sort: gridsPkg.Sort
        });
      } catch (error) {
        console.error('Error loading Syncfusion components:', error);
      }
    }
    loadSyncfusion();
  }, []);

  if (!SyncfusionComponents.GridComponent) return <div>Loading...</div>;

  const { 
    GridComponent,
    ColumnDirective,
    ColumnsDirective,
    Filter,
    Group,
    Inject,
    Page,
    PageSettingsModel,
    Sort
  } = SyncfusionComponents;

 

  return (
     <main className='all-users wrapper'>
      <Header title="Manage users" description="Filter,sort, and access detailed user profile"/>
        <GridComponent dataSource={users} gridLines="none" >
          <ColumnsDirective>
          <ColumnDirective  field="name" headerText="Name" width="200" text-Align="Left"
             template={(props: UserData) => (
                            <div className="flex items-center gap-1.5 px-4">
        <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" referrerPolicy="no-referrer" />
                                <span>{props.name}</span>
                            </div>
                        )}
          />
          <ColumnDirective  field="email" headerText="emailText" width="150" text-Align="Left"  />
          <ColumnDirective  field="dateJoined" headerText="Date Joined" width="150" text-Align="Left" 
                    template={({joinedAt}: { joinedAt: string}) => formatDate(joinedAt)} />
           <ColumnDirective  field="status" headerText="Type" width="100" text-Align="Left"
             template={({status}:UserData) => (
                            <article className={cn('status-column', status == "user" ? 'bg-success-50' : 'bg-light-300')}>
                                <div className={cn('size-1.5 rounded-full' , status == 'user' ? 'bg-success-500' :'bg-gray-500')}/>
                                <h3 className={cn('font-inter text-xs font-medium' , status == 'user' ? 'text-success-500' :'text-gray-500')}>{status}</h3>
                            </article>
                        )}
          />
          {console.log(users)}
          </ColumnsDirective>

        </GridComponent>
     </main>
  );
}

export default AllUsers
