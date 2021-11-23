import React,{useState,useEffect} from 'react'
import ManageReservations from './ManageReservations'
import FlightDetails from './FlightDetails'
import ReservationHeader from './ReservationHeader'

const MyReservations = () => {
    const [reservations,setReservations] = useState([])
    useEffect(()=>{
        fetch('http://localhost:8000/reservations')
        .then(res=>{
           return res.json()
        })
        .then(data=>{
            setReservations(data)
        })
    },[])
    
    
    
    return (
        <div>
            <div className='booking'>
                <p style={{fontSize:'3rem'}}>Manage your booking</p>
                <ReservationHeader/>
                <p style={{fontSize:'2rem'}}>Travel Information</p>
                <p style={{fontSize:'1.5rem',color:'purple'}}>Flights to be checked</p>
                {reservations && <FlightDetails data={reservations}/>}
                <FlightDetails/>
                <ManageReservations/>
        </div>
        </div>
    )
}

export default MyReservations
