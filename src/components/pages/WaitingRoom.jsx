import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents, selectEvent } from "../../redux/EventsActions";
import { Button } from "react-bootstrap";
import Room from "./Room";

export default function WaitingRoom() {
  const eventsState = useSelector((state) => state.eventsState);
  const curUid = useSelector((state) => state.firebase.auth.uid);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (curUid) fetchEvents(dispatch, curUid);
  }, [curUid]);

  const handleCloseRoom = () => setIsRoomOpen(false);

  const renderEvent = () => {
    const nextEvent = eventsState.events[0];
    return (
      <div>
        {isRoomOpen ? (
          <Room onClose={handleCloseRoom} event={nextEvent} />
        ) : (
          <div className="general">
            <h1>Your next appointment with {nextEvent.title}</h1>
            <Button onClick={() => setIsRoomOpen(true)}> Enter Room </Button>
          </div>
        )}
      </div>
    );
  };

  const renderNoEvent = () => {
    return (
      <div className="general">
        <h1>You have no upcoming appointment!</h1>
      </div>
    );
  };
  const renderLoading = () => {
    return (
      <div className="general">
        <h1>Retrieving appointments</h1>;
      </div>
    );
  };

  return (
    <div>
      {eventsState.isLoading
        ? renderLoading()
        : !eventsState.events || eventsState.events.length === 0
        ? renderNoEvent()
        : renderEvent()}
    </div>
  );
}
