import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Window from "./Window";
import Editor from "../shared/Editor";
import ListDisplay from "../shared/ListDisplay";
import {
  modifyItem,
  createEvent,
  deleteEvent,
} from "../../actions/folderActions";
import { eventTypes, eventKeys, eventTimers } from "../../utils/eventOptions";
import getAnimationNames from "../../utils/getAnimationNames";
import "./WindowObjects.css";

export function WindowObjects({
  id,
  item,
  events,
  modifyItem,
  createEvent,
  deleteEvent,
}) {
  const [selectedEvent, setSelectedEvent] = useState("");
  const [selectedEventType, setSelectedEventType] = useState(eventTypes[0]);
  const [selectedEventKey, setSelectedEventKey] = useState(eventKeys[0]);
  const [selectedEventTimer, setSelectedEventTimer] = useState(eventTimers[0]);

  const selectEvent = (e) => {
    setSelectedEvent(e.target.value);
  };

  const createEventHandler = () => {
    const eventKey = isKeyEvent() ? selectedEventKey : "";
    const eventTimer = isTimerEvent() ? selectedEventTimer : "";
    createEvent(id, selectedEventType, eventKey, eventTimer);
  };

  const deleteEventHandler = () => {
    deleteEvent(selectedEvent);
    setSelectedEvent("");
  };

  const moveEventUp = () => {
    const index = item.events.indexOf(selectedEvent);
    if (index === -1) {
      return;
    }
    const newEvents = [...item.events];
    if (index > 0) {
      [newEvents[index - 1], newEvents[index]] = [
        newEvents[index],
        newEvents[index - 1],
      ];
    }
    modifyItem({
      ...item,
      events: newEvents,
    });
  };

  const moveEventDown = () => {
    const index = item.events.indexOf(selectedEvent);
    if (index === -1) {
      return;
    }
    const newEvents = [...item.events];
    if (index < item.events.length - 1) {
      [newEvents[index], newEvents[index + 1]] = [
        newEvents[index + 1],
        newEvents[index],
      ];
    }
    modifyItem({
      ...item,
      events: newEvents,
    });
  };

  const setAnimation = (e) => {
    modifyItem({
      ...item,
      animation: e.target.value,
    });
  };

  const setEventType = (e) => {
    setSelectedEventType(e.target.value);
  };

  const setEventKey = (e) => {
    setSelectedEventKey(e.target.value);
  };

  const setEventTimer = (e) => {
    setSelectedEventTimer(e.target.value);
  };

  const isKeyEvent = () => {
    return selectedEventType.substr(0, 3) === "Key";
  };

  const isTimerEvent = () => {
    return selectedEventType === "Timer";
  };

  const keyOptions = () => {
    if (isKeyEvent()) {
      return (
        <select onChange={setEventKey}>
          {eventKeys.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      );
    }
  };

  const timerOptions = () => {
    if (isTimerEvent()) {
      return (
        <select onChange={setEventTimer}>
          {eventTimers.map((event) => (
            <option key={event} value={event}>
              {event}
            </option>
          ))}
        </select>
      );
    }
  };

  return (
    <Window id={id}>
      <div className="object-panel">
        <div className="object-controls">
          Animation:
          <select onChange={setAnimation}></select>
          Events:
          <select onChange={setEventType}>
            {eventTypes.map((event) => (
              <option key={event} value={event}>
                {event}
              </option>
            ))}
          </select>
          {keyOptions()}
          {timerOptions()}
          <ListDisplay
            name={"Events"}
            container={item.events}
            getName={(id) => events[id].name}
            onChange={selectEvent}
            onButtonPlus={createEventHandler}
            onButtonMinus={deleteEventHandler}
            onButtonUp={moveEventUp}
            onButtonDown={moveEventDown}
          />
        </div>
        {selectedEvent && <Editor id={selectedEvent} />}
      </div>
    </Window>
  );
}

const mapStateToProps = (state, ownProps) => {
  const itemType = ownProps.id.split("_")[0];
  getAnimationNames(state.folderReducer);
  return {
    item: state.folderReducer[itemType][ownProps.id],
    events: state.folderReducer.events,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    modifyItem: (item) => {
      dispatch(modifyItem(item));
    },
    createEvent: (id, eventType, eventKey, eventTimer) => {
      dispatch(createEvent(id, eventType, eventKey, eventTimer));
    },
    deleteEvent: (id) => {
      dispatch(deleteEvent(id));
    },
  };
};

WindowObjects.propTypes = {
  id: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WindowObjects);
