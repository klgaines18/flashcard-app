import React from "react";

function CardForm({formData, setFormData}) {
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <form>
      <div className="form-group">
        <label for="front">Front</label>
        <textarea 
          type="text" 
          className="form-control" 
          id="front"
          name="front"
          onChange={handleChange}
          value={formData.front}
          rows="5"
        />
      </div>
      <div className="form-group">
        <label for="back">Back</label>
        <textarea 
          type="text" 
          className="form-control" 
          id="back" 
          name="back"
          onChange={handleChange}
          value={formData.back}
          rows="5"
        />
      </div>
    </form>
  )
}

export default CardForm