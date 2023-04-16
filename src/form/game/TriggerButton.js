import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {
  return (
    <button style={{ height: "38.13px",}}
      className="btn btn-danger"
      ref={buttonRef}
      onClick={showModal}
    >
      {triggerText}
    </button>
  );
};
export default Trigger;
