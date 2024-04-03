import React, { useState } from 'react';

function DiversityPreference() {
   // const [state, setState] = useState(initialState);
  const [diversity, setDiversity] = useState(5);
  const [imageSrc, setImageSrc] = useState('');

  // uses the slider value from the event to update state with setDiversity
  // "(event)": The function expects to receive information about an event (like a user action) as an input.
  const handleSliderChange = (event) => {
    // if an update to the target value happens, it calls setDiversity with a new value
    setDiversity(event.target.value);
  };

  // "async()": asynchronous operations, and doesn't require event data.
  const handleButtonClick = async () => {
    try {
      // Attempt to fetch data from the server using POST request
      // await: waits for the request to complete and the promise to resolve.
      const response = await fetch('http://127.0.0.1:5000/api/generate_zones_test', { // Ensure the URL is correct
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ethnicDiversity: diversity })
      });

      // Check if the response status indicates a failure
      if (!response.ok) {
        // Throws an error if the response is not successful
        throw new Error(`Error: ${response.status}`);
      }

      // response.blob(): Convert the response to a Blob (binary large object)
      // await: waits for the promise returned by response.blob()
      // [Promise: a JS feature that represents the eventual completion (or failure) of an asynchronous operation and its resulting value.]
      const blob = await response.blob();
      // Creates a URL for the blob object, which can be used as an image source
      const imageObjectURL = URL.createObjectURL(blob);
      // Updates the imageSrc state with the blob's URL, causing the component to re-render and display the new image
      setImageSrc(imageObjectURL);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  // return is: How the React function component DiversityPreference tells React what elements it should render to the DOM.
  return (
    <div>
      {/* Label for the range input, displaying the current diversity value */}
      {/* htmlFor attribute on a <label> element specifies which form element a label is bound to */}
      {/* <label> is associated with an input element whose id is diversityRange*/}
      <label htmlFor="diversityRange">Ethnic Diversity Preference: {diversity}%</label>
      {/* Range input for selecting ethnic diversity percentage */}
      <input
        type="range" // Defines the input as a slider
        id="diversityRange" // Associates the label with this input
        min="5" // Minimum value the slider can take
        max="40" // Maximum value the slider can take
        value={diversity} // Current value of the slider, bound to the diversity state
        onChange={handleSliderChange} // Function to call when the slider value changes
      />
      {/* Button to trigger the generation of zones */}
      <button onClick={handleButtonClick}>Generate Zones</button>
      {/* Conditionally renders an image if imageSrc is not empty */}
      {imageSrc && <img src={imageSrc} alt="Generated Zone" />}
    </div>
  );
}

export default DiversityPreference;
