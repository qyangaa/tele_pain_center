import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const CardItem = (item) => {
  return (
    <Card>
      <div className="row">
        <div className="col-2">
          <Card.Img variant="top" src={item.photo} />
        </div>
        <div className="col">
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
