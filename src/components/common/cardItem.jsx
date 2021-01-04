import React from "react";

const CardItem = (item) => {
  return (
    <div className="card" style={{ width: 18 + "em" }}>
      <img
        className="card-img-fluid"
        src={item.photo}
        style={{ width: 18 + "em" }}
        alt="doctor photo"
      />
      <div className="card-body">
        <h5 className="card-title">{item.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">{item.specialty}</h6>
        <p className="card-text">{item.description}</p>
        <p>
          Address: <br />
          {`${item.address}`}
          <br /> {`${item.city}, ${item.state}, ${item.zip}`}
        </p>
        <p>Phone number: {item.phone}</p>
        <a href="#" className="btn btn-primary">
          Chat
        </a>
        <a
          href="#"
          className="btn btn-primary pull-right"
          style={{ marginLeft: 16 }}
        >
          Appointment
        </a>
      </div>
    </div>
  );
};

export default CardItem;
