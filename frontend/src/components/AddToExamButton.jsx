import { React, useState } from "react";

const AddToExamButton = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  let content = "style";

  return (
    <div className="center">
      <button
        onClick={handleClick}
        style={{ backgroundColor: active ? "black" : "white" }}
      >
        {content}
      </button>
    </div>
  );
};

export default AddToExamButton;
