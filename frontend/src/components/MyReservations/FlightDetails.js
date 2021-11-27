import React from 'react'

const FlightDetails = ({reservations}) => {
    return (
        <div className='booking'>
                <p style={{fontSize:'3rem'}}>Manage your booking</p>
                <div className='reservation-header'>

            
                <p style={{fontSize:'2rem'}}>{reservations['pnr']} - {reservations['flight']}</p>
<p style={{fontSize:'1.2rem',color:'purple'}}>Departure Tuesday, December 14 - Return Thursday, January 13</p>
<div className='airline-pnr'><h1>{reservations['pnr']}</h1>
<p>Booking reference</p>
</div>

</div>                <p style={{fontSize:'2rem'}}>Travel Information</p>
                <p style={{fontSize:'1.5rem',color:'purple'}}>Flights to be checked</p>
        <div className='flight-details'>
            <div style={{backgroundColor:'purple',width:'10%',textAlign:'center',color:'white',height:'1.5rem'}}>Flight 1</div>
            <p style={{fontSize:'1.5rem'}}> - Istanbul on Tuesday, December 14</p>
            <table>
                <tr>
                <th style={{width:'40%'}}>FLIGHT</th>
                <th>FROM</th>
                <th>TO</th>
                <th>DURATION</th>
                </tr>
                <tr>
                <td>
                    <b>TK 80</b>
                    <p style={{marginTop:'-1%'}}>Economy class</p>

                    <h4>Turkish Airlines</h4>
                    <small>Boeing 777</small>
                </td>
                <td>
                
                <b>18:15</b>
                    <h4>Istanbul (IST)</h4>
                    <small>Istanbul  Airport</small>
                    
                </td>
                <td>
                <b>18:15</b>
                    <h4>San Francisco (SFO)</h4>
                    <small>San Francisco International Airport</small>
                    
                </td>
                
                <td>
                    <h3>12 hr 55m</h3>
                </td>
                </tr>
                
            </table>
        </div>
        </div>
    )
}

export default FlightDetails
