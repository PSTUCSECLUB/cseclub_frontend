import React, { useState } from "react";

const options = [
  "It Carnival",
  "Gaming",
  "cherry",
  "date",
  "elderberry",
  "fig",
  "grape",
];

function getSuggestions(userInput) {
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().startsWith(userInput.toLowerCase())
  );
  return filteredOptions;
}

export default function Autosuggestion() {
  const [userInput, setUserInput] = useState("");
  const [suggestedOptions, setSuggestedOptions] = useState([]);

  const handleInputChange = (event) => {
    const input = event.currentTarget.value;
    if (input !== "") {
      const suggestedOptions = getSuggestions(userInput); // Implement this function to get the suggested options based on the user input.
      setUserInput(input);
      setSuggestedOptions(suggestedOptions);
    } else {
      setUserInput(input);
      setSuggestedOptions([]);
    }
  };
  const handleOptionClick = (event) => {
    const selectedOption = event.currentTarget.innerText;
    setUserInput(selectedOption);
    setSuggestedOptions([]);
  };
  return (
    <div>
      <input
        className="form__autosuggestion"
        type="text"
        value={userInput}
        onChange={handleInputChange}
      />
      <ul>
        {suggestedOptions.map((option) => (
          <li key={option} onClick={handleOptionClick}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
