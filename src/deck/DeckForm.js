import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, updateDeck } from "../utils/api";

function DeckForm({initFormState, submitType}) {
  const [formData, setFormData] = useState({ ...initFormState })
  const history = useHistory();
  
  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitType === "create") {
      const deck = await createDeck(formData)
      history.push(`/decks/${deck.id}`)
    } else {
      const deck = await updateDeck(formData)
      history.push(`/decks/${deck.id}`)
    }
  };

  const cancelForm = () => {
    if (submitType === "create") {
      history.push("/")
    } else {
      history.goBack()
    }
  }

  return (
    <form onSubmit={handleSubmit} name="createDeck">
        <div className="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div className="form-group">
          <label for="description">Description</label>
          <textarea 
            type="text" 
            className="form-control" 
            id="description" 
            name="description"
            onChange={handleChange}
            value={formData.description}
            rows="5"
          />
        </div>
        <button onClick={cancelForm} className="btn btn-secondary mx-2">Cancel</button>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
  )
}

export default DeckForm