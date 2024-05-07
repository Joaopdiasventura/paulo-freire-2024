import { FormEvent, useRef, useState } from "react";
import {
  chineseZodiac,
  ChineseZodiacSign,
  directions,
  directionsColors,
  elementColors,
} from "./Signs";

function parseDate(input: string): Date {
  const [day, month, year] = input.split("/").map(Number);
  if (day > 31 || month > 12) {
    return;
  }
  return new Date(year, month - 1, day);
}

function findZodiacSign(dateInput: string): ChineseZodiacSign | undefined {
  const date = parseDate(dateInput);
  if (date == undefined || isNaN(date.getTime())) {
    alert("DIGITE UMA DATA VÁLIDA");
    return;
  }

  for (const sign of chineseZodiac) {
    for (const range of sign.dateRange) {
      const [start, end] = range.split("-").map(parseDate);
      if (date >= start && date <= end) {
        return sign;
      }
    }
  }

  return undefined;
}

function App() {
  const dateInput = useRef<HTMLInputElement>(null);
  const [Sign, setSign] = useState<ChineseZodiacSign>();

  const getSign = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = dateInput.current != null ? dateInput.current.value : "";
    const sign = findZodiacSign(data);
    if (sign) {
      setSign(sign);
    } else {
      alert("DIGITE UMA DATA VÁLIDA");
    }
  };

  return (
    <div className="w-screen h-screen text-white flex justify-center items-center flex-col gap-5">
      <h2 className="text-2xl text-center">Digite a data de seu nascimento</h2>
      <form onSubmit={getSign} className="flex flex-col gap-1.5 justify-center">
        <input
          type="text"
          ref={dateInput}
          placeholder="Ex: 07/12/2006"
          className="bg-transparent focus:ring-0 flex-1 rounded-lg outline-none border p-1 text-sm select-text"
          required
        />
        <input
          type="submit"
          className="border rounded-lg cursor-pointer"
          value="BUSCAR"
        />
      </form>
      {Sign && (
        <div className="flex flex-col gap-2 border rounded-lg p-3">
          <div>
            <div className="w-full flex flex-row justify-center">
              <img
                src={`https://joaopdiasventura.github.io/paulo-freire-2024/src/assets/${
                  Sign.name.split(":")[0]
                }.png`}
                className="w-80"
              />
            </div>
            <div className="flex justify-around flex-wrap break-words items-center">
              <p
                className={`${
                  elementColors[Sign.element.split(":")[0]]
                } w-1/2 text-center`}
              >
                {Sign.element}
              </p>
              <p
                className={`${
                  directionsColors[Sign.season.split(":")[0]]
                } w-1/2 text-center`}
              >
                {Sign.season}
              </p>
              <p
                className={`${
                  directionsColors[Sign.season.split(":")[0]]
                } w-1/2 text-center`}
              >
                {directions[Sign.season.split(":")[0]]}
              </p>
              <div className="flex justify-center items-center w-1/2 text-center">
                <p className={`text-zinc-${Sign.yin_yang ? "100" : "700"}`}>
                  {Sign.yin_yang ? "Yang" : "Yin"}:{" "}
                </p>
                <img
                  src={`https://joaopdiasventura.github.io/paulo-freire-2024/src/assets/${
                    Sign.yin_yang ? "Yang" : "Yin"
                  }.png`}
                  className="w-7"
                />
              </div>
            </div>
            <p className="w-full text-center">
              {`Características: ${Sign.characteristics}`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
