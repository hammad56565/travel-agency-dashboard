// @ts-nocheck

import React, { useRef } from 'react'
import { Link, NavLink } from 'react-router'
import Navitems from './Navitems';
import Sidebar from './Sidebar';

const MobileSidebar = ( ) => {

  //   let sidebar :  SidebarComponent
  //   const toggleSidebar = () => {
  //       sidebar.toggle();
  //       console.log('sidebarRef')
   
  // };
  return ( 
    
    <div className='mobile-sidebar wrapper'>
      {/* <header>
        <Link to="/" >
          <img src="/assets/icons/logo.svg" alt="Logo" className='size-[30px]' />
          <h1>Tourvisto</h1>
        </Link>
        <button onClick={()=>{sidebar.toggle()}}>
            <img src="assets/icons/menu.svg" alt="menu" className='size-7'/>
        </button>
      </header> */}
        {/* <SidebarComponent
                width={270}
                ref={(Sidebar) => sidebar = Sidebar}
                created={() => sidebar.hide()}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="over"
            >
            </SidebarComponent> */}
            {/* <Sidebar/> */}

      

    </div>
  )
}

export default MobileSidebar
