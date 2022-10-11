import { useEffect, useState } from "react";
import CountUp from "react-countup";
import "./App.css";

function App() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(".netlify/functions/getCount").then((res) => {
      res.text().then((c) => {
        setCount(parseInt(c));
      });
    });
  }, []);

  if (count === null) {
    return <div className="App"></div>;
  }

  return (
    <div className="App">
      <CountUp className="count" end={count} duration={1.5} useEasing={true} />
      <p className="subtitle">"oh wait I gotta go eat" moments</p>
      <p className="date">since October 9th, 2022</p>
      <button
        onClick={() => {
          fetch(".netlify/functions/addInstance", { method: "POST" }).then(() =>
            setCount(count + 1)
          );
        }}
      >
        Add moment
      </button>
    </div>
  );
}

export default App;
