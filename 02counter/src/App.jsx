import { useState } from "react";
import "./App.css";

function App() {
  let [counter, setCounter] = useState(0);

  const addValue = () => {
    setCounter(counter + 1);
    console.log(counter);
  };

  const decreaseValue = () => {
    if(counter>0){
      setCounter(counter - 1);
    }
   
  };
  return (
    <>
      <h1>Assalamualikum World</h1>
      <h2>Counter Value: {counter}</h2>
      <button onClick={addValue}>Add Value</button>
      <br />
      <br />
      <button onClick={decreaseValue}>Decrease Value</button>
    </>
  );
}

export default App;
