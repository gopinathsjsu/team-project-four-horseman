import React from "react";
const AirportList = ({ value, title }) => {
  const arr = value[Object.keys(value)[0]];
  console.log(arr);
  return (
    <div>
      <select className="selectList" name={title} required>
        <option disabled selected>
          --Select city--
        </option>
        {arr.map((list) => (
          <option value={list.id} key={list.name}>
            {list.city} ({list.airportCode})
          </option>
        ))}
      </select>
    </div>
  );
};

export default AirportList;
