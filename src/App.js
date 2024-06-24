import "./App.css";
import Navbar from "./components/Navbar";
import AddNote from "./components/AddNote";
import DisplayNote from "./components/DisplayNote";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";

function App() {
  const host = "http://localhost:5000";
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });
  const [run, setRun] = useState(false);
  useEffect(() => {
    async function fetchData() {
      if(localStorage.getItem("token"))
      {
        try {
            const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem("token"),
              },
            });
            const allNotes = await response.json();
            setNotes(allNotes);
          }
        catch (error) {
          console.log(error);
        }
      }
      else{
        setNotes([]);
      }
    }
    fetchData();
  },[run]);
  function handleChange(event) {
    setNote((prevNote) => {
      return { ...prevNote, [event.target.name]: event.target.value };
    });
  }
  const { title, description, tag } = note;
  async function addNote(event) {
    try {
      event.preventDefault();
      if (!title.trim() || !description.trim()) {
        alert("Please fill in all fields");
        return;
      }
      await fetch(`${host}/api/notes/addnote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });
      setNote({
        title: "",
        description: "",
        tag: "",
      });
      setRun((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteNote(id) {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      setRun((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  async function saveChanges(editedNote) {
    const id = editedNote.eid;
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({
          title: editedNote.etitle,
          description: editedNote.edescription,
          tag: editedNote.etag,
        }),
      });
      setRun((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }
  function reload(){
    setRun(prev=>!prev)
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <AddNote
                addNote={addNote}
                handleChange={handleChange}
                note={note}
              />
              <DisplayNote
                notes={notes}
                deleteNote={deleteNote}
                saveChanges={saveChanges}
              />
            </>
          }
        />
        <Route exact path="/login" element={<Login run={reload} />} />
        <Route exact path="/signUp" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
