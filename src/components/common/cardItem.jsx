import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./cardItem.css";

const CardItem = (item, smallWindow, button2) => {
  // TODO: Image not equal height
  return (
    <Card key={item._id} className="horizontal_card">
      <Row className="align-items-center">
        <Col xs={0} md={4} lg={3} style={{ margin: 20 }}>
          <div className={`${smallWindow ? "center_content" : ""}`}>
            <Image
              src={item.image}
              className="profile_img"
              style={{ alignSelf: "center" }}
            />
          </div>
        </Col>
        <Col>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2 custom-subtitle">
              {item.specialty}
            </Card.Subtitle>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text className="mb-1">{`${item.address1}, ${item.address2},${item.city}, ${item.state}, ${item.zip}`}</Card.Text>
            <Button variant="primary">Appointment</Button>{" "}
            <Button variant="primary" onClick={button2.onClick(item.uid)}>
              {button2.text}
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CardItem;
