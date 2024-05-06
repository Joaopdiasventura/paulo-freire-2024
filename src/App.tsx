import { FormEvent, useRef, useState } from "react";
import { chineseZodiac, ChineseZodiacSign } from "./Signs";

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
    }
  };

  return (
    <div className="w-screen h-screen bg-black text-white flex justify-center items-center flex-col">
      <form onSubmit={getSign} className="flex flex-col gap-1 justify-center">
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
      <div className="flex flex-col gap-1">
        <h3>{Sign ? Sign.name : "Nenhum"}</h3>
        <p>{Sign ? Sign.element : ""}</p>
        <p>{Sign ? `Características: ${Sign.characteristics}` : ""}</p>
      </div>
    </div>
  );
}

export default App;
