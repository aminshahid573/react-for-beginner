import "./App.css";
import Card from "./components/Card";

// let myObj = {
//   name: "Shahid Amin",
//   age: 18,
// };

// let newArr = [1, 2, 3, 4];
function App() {
  return (
    <>
      {/* <Card title="How Are You" someObject={myObj} someArr={newArr}/> */}

      <Card title="How are you?" btnText="Visit Site"/>
      <Card title="Need Help?" btnText="Lets Go"/>
      <Card title="Where are you goin today?" />
    </>
  );
}

export default App;
