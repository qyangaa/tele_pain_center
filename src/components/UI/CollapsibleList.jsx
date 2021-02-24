import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import { TiTick } from "react-icons/ti";

class CollapsibleList extends Component {
  render() {
    const {
      groups,
      itemKey,
      onSelect,
      selectedItems,
      filterGroups,
    } = this.props;
    return (
      <Accordion defaultActiveKey="0">
        {groups.map((group) => (
          <Card key={group._id}>
            <Accordion.Toggle
              as={Card.Header}
              eventKey={group._id}
              key={group._id}
            >
              {group.name}
            </Accordion.Toggle>
            {group[itemKey].map((item) => (
              <Accordion.Collapse eventKey={group._id} key={item._id}>
                <Card.Body
                  key={item._id}
                  onClick={() => onSelect(group._id, item.name)}
                >
                  {item.name}
                  {/* {selectedItems.includes(console.log({ group, item })) && (
                    <TiTick style={{ float: "right" }} />
                  )} */}
                  {filterGroups[group._id] == item.name && (
                    <TiTick style={{ float: "right" }} />
                  )}
                </Card.Body>
              </Accordion.Collapse>
            ))}
          </Card>
        ))}
      </Accordion>
    );
  }
}

export default CollapsibleList;
