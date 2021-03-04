import React, { Component } from "react";
import CardItem from "./cardItem";
const CardDeck = (items, smallWindow, button1, button2) => {
  return (
    <div>
      {items.map((item) => CardItem(item, smallWindow, button1, button2))}
    </div>
  );
};

export default CardDeck;
