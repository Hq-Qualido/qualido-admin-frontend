import React, { useEffect, useState } from "react";

const Dropdown = ({ setOption, array }) => {
  const [options, setOptionsState] = useState(array);

  useEffect(() => {
    setOptionsState(array);
  }, [array]);

  const handleChange = (event) => {
    setOption(event.target.value);
  };

  return (
    <select
      className="bg-[#104757] h-fit rounded px-2 py-1 outline-none shadow-lg"
      onChange={handleChange}
    >
      {options.map((option, index) => (
        <option key={index} value={option} className="bg-cyan-800">
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
