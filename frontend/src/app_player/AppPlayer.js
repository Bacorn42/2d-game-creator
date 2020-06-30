import React, { useState } from "react";
import Interpreter from "../2dgs/Interpreter";

export function AppPlayer() {
  const [code, setCode] = useState("");

  const handleChange = (e) => {
    setCode(e.target.value);
  };

  const handleClick = () => {
    const interpreter = new Interpreter(code);
    interpreter.interpret();
  };

  return (
    <div>
      <textarea value={code} onChange={handleChange} />
      <br />
      <button onClick={handleClick}>Run</button>
    </div>
  );
}

export default AppPlayer;
