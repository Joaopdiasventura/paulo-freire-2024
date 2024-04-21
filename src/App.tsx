import { FormEvent, useRef, useState } from "react";
import { chineseZodiac, ChineseZodiacSign } from "./Signs";

function parseDate(input: string): Date {
  const [day, month, year] = input.split("/").map(Number);
  return new Date(year, month - 1, day);
}

function findZodiacSign(dateInput: string): ChineseZodiacSign | undefined {
  const date = parseDate(dateInput);

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
  const [Sign, setSign] = useState<ChineseZodiacSign | object>({});

  const getSign = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = dateInput.current != null ? dateInput.current.value : "";
    const sign = findZodiacSign(data);

    setSign(sign != undefined ? sign : {});
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
      <form onSubmit={getSign} className="flex flex-col gap-1">
        <input
          type="text"
          ref={dateInput}
          className="bg-transparent focus:ring-0 flex-1 rounded-lg outline-none border p-1 text-sm select-text"
          required
        />
        <input type="submit" className="border rounded-lg cursor-pointer" value="BUSCAR" />
      </form>
      <div className="flex flex-col gap-1">
        <h3>{"name" in Sign ? Sign.name : "Nenhum"}</h3>
        <p>
          {"characteristics" in Sign ? `Características: ${Sign.characteristics}` : ""}
        </p>
      </div>
    </div>
  );
}

export default App;
