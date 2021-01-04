import React, { Component } from "react";
import CardItem from "./cardItem";
const CardDeck = (items) => {
  return (
    <div className="card-columns">{items.map((item) => CardItem(item))};</div>
  );
};

export default CardDeck;
