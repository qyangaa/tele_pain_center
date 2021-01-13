import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CardItem = (item, smallWindow, button2) => {
  return (
    <Card key={item._id}>
      <Row className="align-items-center">
        {!smallWindow && (
          <Col
            xs={0}
            md={3}
            lg={3}
            className="align-items-center"
            style={{ margin: 20 }}
          >
            <div>
              <Image
                src={item.photo}
                roundedCircle
                fluid="true"
                className="m-auto"
                style={{ alignSelf: "center" }}
              />
            </div>
          </Col>
        )}
        <Col>
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {item.specialty}
            </Card.Subtitle>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>{`${item.address.address}, ${item.address.city}, ${item.address.state}, ${item.address.zip}`}</Card.Text>
            <Button variant="primary">Appointment</Button>{" "}
            <Button variant="primary" onClick={button2.onClick(item._id)}>
              {button2.text}
            </Button>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CardItem;
