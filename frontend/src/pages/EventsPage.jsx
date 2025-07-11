import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.event);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className="p-4">
            {allEvents && allEvents.length > 0 ? (
              allEvents.map((event, index) => (
                <EventCard key={event._id || index} active={index} data={event} />
              ))
            ) : (
              <p className="text-center text-gray-500">No events found.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
