import React, { Component } from "react";
import CardItem from "./cardItem";
const CardDeck = (items, smallWindow, button2) => {
  return <div>{items.map((item) => CardItem(item, smallWindow, button2))}</div>;
};

export default CardDeck;
