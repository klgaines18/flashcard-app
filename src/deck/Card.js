import React, { useEffect, useState } from "react";
import { useParams, Link, useHistory, useRouteMatch, Switch, Route } from "react-router-dom";
import { deleteCard, readDeck} from "../utils/api";
import ErrorMessage from "../Layout/ErrorMessage";

export const Card = ({ card }) => {
  
  const { url } = useRouteMatch();

  const handleDelete = async (id) => {
    const result = window.confirm("Delete this card? You will not be able to recover it.");
    if (result) {
      await deleteCard(card.id);
      window.location.reload()
    }
  };

  return (
    <div className="card mb-3" >
      <div className="row no-gutters">
        <div className="col-md-6">
          <div className="card-body">
            <p className="card-text">{card.front}</p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card-body">
            <p className="card-text">{card.back}</p>
          </div>
        </div>
      </div>
      <div className="row no-gutters mb-3 mx-2">
        <Link to={`${url}/cards/${card.id}/edit`} className="btn btn-primary mx-2">Edit</Link>
        <button className="btn btn-danger mx-2" onClick={handleDelete}>
            Delete
        </button>
      </div>
    </div>
  )
}

export default Card