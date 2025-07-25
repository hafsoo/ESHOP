import axios from "axios";
import { server } from "../../server";

// ✅ Create event
export const createevent = (data) => async (dispatch) => {
  try {
    dispatch({ type: "eventCreateRequest" });

    const res = await axios.post(`${server}/event/create-event`, data, {
  withCredentials: true,
});
    dispatch({
      type: "eventCreateSuccess",
      payload: res.data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

// ✅ Get all events of a shop
export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsShopRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events/${id}`);
    dispatch({
      type: "getAllEventsShopSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsShopFailed",
      payload: error.response.data.message,
    });
  }
};

// ✅ Delete event of a shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteEventRequest" });

    const { data } = await axios.delete(
      `${server}/event/delete-shop-event/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};

// ✅ Get all events (admin or homepage)
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({ type: "getAllEventsRequest" });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsFailed",
      payload: error.response.data.message,
    });
  }
};
