import React,{useState} from "react";
import { render } from "react-dom";
import {Link} from 'react-router-dom';

const DisplayFlights = () => {
  
  const [flightsData,setFlightsData] = useState({"flights": [
    {
      "id": "b85c9710-4d9e-11ec-b4e0-cf29e1479ba5",
      "flightCode": "AA045",
      "deptTime": "2021-12-04T02:44:57.000Z",
      "arrTime": "2021-12-04T10:13:37.000Z",
        "price": 229.5,
        "fromAirportCode": "JFK",
        "fromAirportName": "John F Kennedy International Airport",
        "fromAirportCity": "New York",
        "toAirportCode": "LAX",
        "toAirportName": "Los Angeles International Airport",
        "toAirportCity": "Los Angeles"
    }
]
})
 



  return (
    <div className="flight-display-holder" style={{marginTop:"5%"}}>
      <Link to={`/displayflights/${flightsData.flights[0].id}`}>
      <div className="flight-details-single">
        <div className="flight-details-departing-airport">
          <span>06.15</span>
          <br />
          {console.log(flightsData)}
          {console.log(flightsData.flights[0].id)}

          <span>SJC</span>
          <br />
          <span>San Jose</span>
          <br />
        </div>
        <div className="flight-details-connecting-line" style={{marginTop:'1rem'}}>
          <small>────────────────────────────────</small>
        </div>
        <div className="flight-details-arrival-airport">
          <span>07.15</span>
          <br />

          <span>SJC</span>
          <br />
          <span>San Jose</span>
          <br />
        </div>
        
    </div> 
    </Link>
    </div>
  );
};

export default DisplayFlights;
