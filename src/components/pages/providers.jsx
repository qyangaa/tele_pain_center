import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import getProviders from "../../services/providerService";
import exampleImg from "../../services/data/pictures/exampleImg.jpeg";
class Providers extends Component {
  state = {
    providers: getProviders(),
  };

  renderProvider = (provider) => {
    return (
      <div className="card" style={{ width: 18 + "em" }}>
        <img
          className="card-img-fluid"
          src={exampleImg}
          style={{ width: 18 + "em" }}
          alt="doctor photo"
        />
        <div className="card-body">
          <h5 className="card-title">{provider.name}</h5>
          <h6 class="card-subtitle mb-2 text-muted">{provider.specialty}</h6>
          <p className="card-text">{provider.description}</p>
          <p>
            Address: <br />
            {`${provider.address}`}
            <br /> {`${provider.city}, ${provider.state}, ${provider.zip}`}
          </p>
          <p>Phone number: {provider.phone}</p>
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
  render() {
    const provider = this.state.providers[0];
    return this.renderProvider(provider);
  }
}

export default Providers;
