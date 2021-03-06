<div className="card" style={{ width: 18 + "em" }} key={item._id}>
  <img
    className="card-img-fluid"
    src={item.photo}
    style={{ width: 18 + "em" }}
    alt="doctor photo"
  />
  <div className="card-body">
    <h5 className="card-title"></h5>
    <h6 className="card-subtitle mb-2 text-muted">}</h6>
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
</div>;
