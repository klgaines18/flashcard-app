import React from "react";

function Nextbtn({handleNext, cardFront}) {
  if(!cardFront) {
    return (
      <button className="btn btn-primary mx-2" onClick={handleNext}>
        Next
      </button>
    )
  }
}

export default Nextbtn