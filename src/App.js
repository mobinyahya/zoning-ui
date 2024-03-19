import React, { useState } from 'react';

function DiversityPreference() {
  const [diversity, setDiversity] = useState(5); // Start with the minimum value

  const handleSliderChange = (event) => {
    setDiversity(event.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/generate_zones', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ethnicDiversity: diversity })
      });

      if (!response.ok) { // Check if response status code is not OK
        throw new Error(`Error: ${response.status}`); // Throw an error if not OK
      }

      const data = await response.json(); // Assuming the server responds with JSON
      console.log(data); // Handle the response data
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  return (
    <div>
      <label htmlFor="diversityRange">Ethnic Diversity Preference: {diversity}%</label>
      <input
        type="range"
        id="diversityRange"
        min="5"
        max="40"
        value={diversity}
        onChange={handleSliderChange}
      />
      <button onClick={handleButtonClick}>Generate Zones</button>
    </div>
  );
}

export default DiversityPreference;
