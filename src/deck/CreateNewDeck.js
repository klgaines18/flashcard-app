import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api";

function CreateNewDeck({setDecks}) {
  const initFormState = {
    name: "Deck Name",
    description: "Brief description of the deck"
  }

  const [formData, setFormData] = useState({ ...initFormState })
  const [newDeck, setNewDeck] = useState({})
  const history = useHistory();

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await createDeck(formData).then(setNewDeck)
    await listDecks().then(setDecks);
    history.push(`/decks/${newDeck.id}`)
  };

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
      <form onSubmit={handleSubmit} name="createDeck">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            type="text" 
            class="form-control" 
            id="name"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea 
            type="text" 
            class="form-control" 
            id="description" 
            name="description"
            onChange={handleChange}
            value={formData.description}
            rows="5"
          />
        </div>
        <Link to={`/`} class="btn btn-secondary mx-2">Cancel</Link>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateNewDeck