import React from 'react'

const FlightDetails = ({reservations}) => {
    return (
        <div className='flight-details'>
            <div style={{backgroundColor:'purple',width:'10%',textAlign:'center',color:'white',height:'1.5rem'}}>Flight 1</div>
            <p style={{fontSize:'1.5rem'}}>{} - Istanbul on Tuesday, December 14</p>
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
    )
}

export default FlightDetails
