import { useEffect, useState } from "react";
import axios from "axios";
import { COLORS, HOVER_COLORS, TEXT_COLORS, SHADOW_COLORS } from "./colors";

function App() {
  const [advice, setAdvice] = useState("");
  const [color, setColor] = useState("bg-red-500");
  const [hoverColor, setHoverColor] = useState("bg-red-700");
  const [textColor, setTextColor] = useState("text-red-700");
  const [shadowColor, setShadowColor] = useState("shadow-red-500/50");

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        const myColor = Math.floor(Math.random() * COLORS.length);

        setAdvice(advice);
        setColor(COLORS[myColor]);
        setHoverColor(HOVER_COLORS[myColor]);
        setTextColor(TEXT_COLORS[myColor]);
        setShadowColor(SHADOW_COLORS[myColor]);

        console.log(advice);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center text-center p-8 transition-all duration-1000 ${color} md:p-52 lg:p-96`}
    >
      <div
        className={`flex justify-center items-center flex-col bg-white rounded-lg transition-all duration-1000  shadow-lg ${shadowColor} p-8 md:py-16 md:px-12`}
      >
        <h1
          className={`transition-all duration-1000 ${textColor} flex items-center font-mono text-lg font-bold lg:text-2xl`}
        >
          {advice}
        </h1>
        <button
          onClick={fetchAdvice}
          className={`transition-all duration-1000 ${color} ${hoverColor} text-white font-bold py-2 px-4 rounded mt-4 md:mt-8 lg:mt-12`}
        >
          New Advice
        </button>
      </div>
      <div className="mt-10 flex justify-center items-center flex-col text-white font-bold text-sm">
        Advices provided by
        <a
          className="underline"
          href="https://api.adviceslip.com/"
          target="_blank"
          rel="noreferrer"
        >
          Advice Slip JSON API
        </a>
      </div>
    </div>
  );
}

export default App;
