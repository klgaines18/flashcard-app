import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

function CreateNewDeck({setDecks}) {
  const initFormState = {
    name: "Deck Name",
    description: "Brief description of the deck"
  }

  const [formData, setFormData] = useState({ ...initFormState })
  const [newDeck, setNewDeck] = useState({})
  const [error, setError] = useState(undefined);
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
  };

  useEffect(() => {
    const abortController = new AbortController();

    listDecks(abortController.signal).then(setDecks).catch(setError);
    if (newDeck.id) {
      history.push(`/decks/${newDeck.id}`)
    }

    return () => abortController.abort();
  }, [newDeck]);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <h1>Create Deck</h1>
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
        <Link to={`/`} className="btn btn-secondary mx-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default CreateNewDeck