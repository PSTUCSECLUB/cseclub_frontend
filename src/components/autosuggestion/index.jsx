import Image from "next/image";
import React, { useState } from "react";

export default function Autosuggestion({ value, setValue, options }) {
  const [suggestedOptions, setSuggestedOptions] = useState([]);
  function getSuggestions(userInput) {
    const filteredOptions = options.filter((option) =>
      option.title.toLowerCase().startsWith(userInput.toLowerCase())
    );

    return filteredOptions;
  }
  function onInputChange(e) {
    const input = e.currentTarget.value;
    if (input !== "") {
      const suggestedOptions = getSuggestions(input); // Implement this function to get the suggested options based on the user input.
      setValue(input);
      setSuggestedOptions(suggestedOptions);
    } else {
      setValue(input);
      setSuggestedOptions([]);
    }
  }
  function onOptionsClick(e) {
    const selectedOption = e.currentTarget.innerText;
    setValue(selectedOption);
    setSuggestedOptions([]);
  }
  return (
    <div className="autosuggestion">
      <input
        className="autosuggestion__input"
        type="text"
        value={value}
        onChange={onInputChange}
      />
      {value && suggestedOptions.length > 0 && (
        <ul className="autosuggestion__list">
          {suggestedOptions.map((option) => (
            <li
              className="autosuggestion__list__item"
              key={option._id}
              onClick={onOptionsClick}
            >
              <Image
                className="autosuggestion__list__item__img"
                src={option.image}
                alt={option.title}
                height={20}
                width={30}
              />
              <p className="autosuggestion__list__item__label">
                {option.title}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
