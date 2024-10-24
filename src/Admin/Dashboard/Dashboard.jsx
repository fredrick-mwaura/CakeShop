import React from 'react';
import Images from '../../components/image';
import Icon from '../..//components/icon';

import {faBox, faUser} from '@fortawesome/free-solid-svg-icons';

const Dashboard = () => {
   return (
      <div>
         <div className='container'>
            <div className='child1'>
               <Images src={faUser} 
                  alt= 'DP' 
                  width= {30} 
                  height={30} 
                  className= 'dp'            
               
               />
               <div>
                  <h2>Dashboard</h2>
                  {/* <p>{Name}</p> */}
               </div>
            </div>
            <div className='child1'>
               <Icon
                  icon={faBox} 
                  size={lg}
               />
               <div>
                  <h2>New Orders</h2>
                  <p>orders {10}</p> {/* Replace with actual data from fetch */}
               </div>
            </div>

            <div className='child1'>
               <Images src={src} 
                  alt= 'DP' 
                  width= {30} 
                  height={30} 
                  className= 'dp'            
               
               />
               <div>
                  <h2>Reports</h2>
                  <p>{first}</p>
               </div>
            </div>

            <div>            
               <h2>Users</h2>
               <h3>frequent {getName}</h3>                

            </div>

            <div>
               <h2>Inventory</h2>
               <div>
                  {/* implement inventory data */}
               </div>
            </div>
         </div>

      </div>
   );
}

export default Dashboard;
