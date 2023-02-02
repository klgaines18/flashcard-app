import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { updateDeck, readDeck } from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

function EditDeck() {
  const [formData, setFormData] = useState({})
  const [deckName, setDeckName] = useState({})
  const [updatedDeck, setUpdatedDeck] = useState({})
  const [error, setError] = useState(undefined);
  const history = useHistory();
  const { deckId } = useParams(); 

  useEffect(() => {
    const abortController = new AbortController();

    readDeck( deckId, abortController.signal).then(setFormData).catch(setError);
    

    if (updatedDeck.id) {
      history.push(`/decks/${updatedDeck.id}`)
    }

    return () => abortController.abort();
  }, [updatedDeck,]);

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(formData).then(setUpdatedDeck)
  };


  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="container">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{formData.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
        </ol>
      </nav>
      <h1>Edit Deck</h1>
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
        <Link to={`/decks/${deckId}`} className="btn btn-secondary mx-2">Cancel</Link>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default EditDeck