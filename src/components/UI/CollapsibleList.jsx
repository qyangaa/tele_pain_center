import React from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";

const CollapsibleList = (groups, itemKey) => {
  return (
    <Accordion defaultActiveKey="0">
      {groups.map((group) => (
        <Card key={group._id}>
          <Accordion.Toggle
            as={Card.Header}
            eventKey={group._id}
            key={group._id}
          >
            {group.title}
          </Accordion.Toggle>
          {group[itemKey].map((item) => (
            <Accordion.Collapse eventKey={group._id} key={item._id}>
              <Card.Body key={item._id}>{item.name}</Card.Body>
            </Accordion.Collapse>
          ))}
        </Card>
      ))}
    </Accordion>
  );
};

export default CollapsibleList;
