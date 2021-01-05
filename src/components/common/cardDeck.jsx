import React, { Component } from "react";
import CardItem from "./cardItem";
const CardDeck = (items, smallWindow) => {
  return <div>{items.map((item) => CardItem(item, smallWindow))};</div>;
};

export default CardDeck;
