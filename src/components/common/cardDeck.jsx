import React, { Component } from "react";
import CardItem from "./cardItem";
const CardDeck = (items) => {
  return <div class="card-columns">{items.map((item) => CardItem(item))};</div>;
};

export default CardDeck;
