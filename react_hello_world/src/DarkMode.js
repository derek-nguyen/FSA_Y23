import { useState } from "react";

const DarkMode = () => {
  const [useDarkMode, setUseDarkMode] = useState(false);
  return (
    <div className={useDarkMode ? "dark-mode dark" : "dark-mode light"}>
      <h1>Dark Mode</h1>
      <label>
        <input
          onChange={() => {
            let nextValue = !useDarkMode;
            setUseDarkMode(nextValue);
          }}
          type="checkbox"
        />
        <span>Use dark mode?</span>
      </label>
    </div>
  );
};

export default DarkMode;

// when I save parenthesis go away
