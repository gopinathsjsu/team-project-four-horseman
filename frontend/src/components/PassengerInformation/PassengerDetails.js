import React, { useState,useEffect} from "react";
import {Link} from 'react-router-dom';
import SeatSelection from "./SeatSelection";

const PassengerDetails = ({details}) => {
  
   
  // The parent component
  const [count, setCount] = useState(1); // Name it however you wish
  const [inputList, setInputList] = useState([{ firstName: "", lastName: "" }]);
    useEffect(() => {
     if(count>=3){
         document.getElementById('passenger-adder').disabled=true
         document.getElementById('passenger-adder').style.cursor='not-allowed'
     }
 }, [count])
  // handle input change
  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };
 
  // handle click event of the Remove button
  const handleRemoveClick = index => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
    setCount(count-1)
  };
 
  // handle click event of the Add button
  const handleAddClick = () => {
    setCount(count+1)
    setInputList([...inputList, { firstName: "", lastName: "" }]);
  };

  function seatSelection(){
    document.getElementById('seat-selection-button').style.display='block'
  }


  return (
    <div className="App">
        <h1>Enter your travel information</h1>
      <h3 style={{color:'red'}}>You can select upto 3 passengers in a single booking!</h3>
      {inputList.map((x, i) => {
        return (
          <div className="book-flights-form">
              Passenger Info: <br/><br/>
            <input
              name="firstName"
   placeholder="Enter Full Name"
              value={x.firstName}
              onChange={e => handleInputChange(e, i)}
              required
            /><br/>
            
            <div className="btn-box">
              {inputList.length !== 1 && <button
                className="mr10"
                onClick={() => handleRemoveClick(i)}>Remove</button>}
              {inputList.length - 1 === i && <button id='passenger-adder' onClick={handleAddClick}>Add</button>}
            </div>
          </div>
        );
      })}
      <div style={{ marginTop:'20%' }}>{JSON.stringify(inputList)}{count}</div>

      <Link to='/displayflights'>
        <button style={{ marginLeft: "20%" }}>Cancel search</button>
        </Link>
      <button style={{ marginLeft: "5%" }} onClick={seatSelection}>
          Proceed to Select Seats for {count} passengers
        </button>
        
      <div id='seat-selection-button' style={{marginTop:'10%',display:'none'}}>
      {details && <SeatSelection details={details} passengers={inputList[0].firstName} />}
      </div>
    </div>
  );
}

export default PassengerDetails;




