import React,{useState,useEffect} from 'react'
import FlightInformation from './FlightInformation'

const DisplayFlights = () => {


const [flights,setFlights] = useState();
const queryParams = new URLSearchParams(window.location.search);
const date = queryParams.get('trip-start');
const depAirport = queryParams.get('departure-airport');
const arrAirport = queryParams.get('arrival-airport');
console.log(date, depAirport, arrAirport); // 55 test null


useEffect(() => {
    let params = {
        "from":depAirport,
        "to": arrAirport,
        "deptTime":date,
      };
      
      let query = Object.keys(params)
                    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
                   .join('&');
      let url = "http://krishnagupta.live:3000/flights?"+ query;
    
     fetch(url)
    .then(res=>{
     return (res.json())
})
    .then(data=>{
    console.log(data)
    setFlights(data)    
})
.catch((err) => {
    console.log(err);
  });

}, []);



    return (
        <div>
            <div style={{marginLeft:'12rem'}}>
                <h1>San Francisco to Istanbul on Thursday,December 2</h1>
            </div>
            <FlightInformation />
            <FlightInformation />
            <FlightInformation />
            <FlightInformation />
            <div style={{marginLeft:'12rem'}}>
                <h1>San Francisco to Istanbul on Thursday,December 2</h1>
            </div>
            <FlightInformation />
            <FlightInformation />
            <FlightInformation />
            <FlightInformation />
            <div className='manage-reservations'>
            <button style={{marginLeft:'35%'}}>Cancel search</button>
            <button style={{marginLeft:'2%'}}>Checkout</button>
        </div>

        </div>
    )
}

export default DisplayFlights
