import React from 'react'

const ReservationHeader = ({reservations}) => {


        function lookUpReservations(lastName, pnr){
            for ( var i = 0; i < reservations.length; i++) {
               if (pnr == reservations[i].pnr && lastName == reservations[i].lastName) {
                  return (reservations[i]); 
               }      
            }
                 return "No such contact";
             
        }
        return (

        <div className='reservation-header'>

            
            <p style={{fontSize:'2rem'}}>San Francisco - Istanbul</p>
            <p style={{fontSize:'1.2rem',color:'purple'}}>Departure Tuesday, December 14 - Return Thursday, January 13</p>
            <div className='airline-pnr'><h1>{2}</h1>
            <p>Booking reference</p>
            </div>
            
        </div>
    )
}

export default ReservationHeader
