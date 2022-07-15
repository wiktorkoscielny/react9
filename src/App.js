import React, { useState, useEffect } from "react";

//styles
import "./App.css";

//components
import SumOfHours from "./components/hoursCounter/HoursCounter";
import Modal from "./components/modal/Modal";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";

// datepicker imports
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";

// react-big-callendar
import { Calendar, dateFnsLocalizer, onSelectEvent } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// firebase
// import { initializeApp } from "firebase/app";
// import {
//   query,
//   onSnapshot,
//   getFirestore,
//   addDoc,
//   collection,
//   doc,
//   deleteDoc,
// } from "firebase/firestore";
// import { firebaseConfig } from "./Config";

// firebase config
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function App() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
  const [allEvents, setAllEvents] = useState("");
  const [selected, setSelected] = useState();
  const [modalOpen, setModalOpen] = useState(false);

  const handleAddEvent = () => {
    setAllEvents([...allEvents, newEvent]);
    // disabled for now to save data writes
    // addDoc(collection(db,'test_fn'), newEvent);
  };
  // get data from firebase
  // useEffect(() => {
  //   // component mounts
  //   const q = query(collection(db, "test_fn"));
  //   const unsub = onSnapshot(q, (snap) => {
  //     const array = snap.docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         title: doc.get("title"),
  //         start: doc.get("start").toDate(),
  //         end: doc.get("end").toDate(),
  //         allDay: doc.get("allDay"), //?
  //       };
  //     });
  //     // setAllEvents([...array]);
  //   });
  //   //component unmounts
  //   return () => {
  //     unsub();
  //   };
  // });
  // select event and delete it from state and firebase
  const handleSelected = (event) => {
    setSelected(event);
    setModalOpen(true);
  };
  const handleDeleteSlot = async () => {
    const id = selected.id;
    const todos = allEvents.filter((item) => item.id !== id);
    // delete from state
    setAllEvents([...todos]);
    setModalOpen(false);
    // delete from firebase
    // await deleteDoc(doc(db, 'test_fn', id));
  };
  return (
    <div className="container">
      {/* FORM */}
      <section className="container__form" id="#">
        <input
          type="number"
          placeholder="Add Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <DatePicker
          placeholderText="Start Date"
          selected={newEvent.start}
          onChange={(start) => setNewEvent({ ...newEvent, start })}
        />
        <DatePicker
          placeholderText="End Date"
          selected={newEvent.end}
          onChange={(end) => setNewEvent({ ...newEvent, end })}
        />
        <button onClick={handleAddEvent} className="btn btn-primary">
          Add Event
        </button>
        {modalOpen && (
          <Modal
            setOpenModal={setModalOpen}
            handleDeleteSlot={handleDeleteSlot}
          />
        )}

        {/* HOURS CONTAINER */}
        <div className="container__form__hours">
          <SumOfHours allEvents={allEvents} title={allEvents.title} />
        </div>
      </section>

      {/* CALENDAR */}
      <section className="container__calendar" id="calendar">
        <Calendar
          localizer={localizer}
          events={allEvents}
          onSelectEvent={handleSelected}
          onSelectSlot={handleDeleteSlot}
          startAccessor="start"
          endAccessor="end"
          style={{
            maxWidth: "100vw",
            height: "80vh",
            color: "rgba(77, 181, 255, 1)",
          }}
        />
      </section>

      {/* FOOTER */}
      <Footer allEvents={allEvents} />

      {/* NAV BAR */}
      <Navbar />
    </div>
  );
}

export default App;
