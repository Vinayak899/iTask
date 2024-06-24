import Note from "./Note";
import { useState, useEffect } from "react";

export default function DisplayNote(props) {
  const [editedNote, setEditedNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  let currentNote = {};
  function handleEdit(id) {
    currentNote = props.notes.filter((note) => note._id === id);
    setEditedNote({
      eid: currentNote[0]._id,
      etitle: currentNote[0].title,
      edescription: currentNote[0].description,
      etag: currentNote[0].tag,
    });
  }
  function handleChange(event) {
    setEditedNote((prevNote) => ({ ...prevNote, [event.target.name]: event.target.value })); 
  }
  
  const displayNotes = props.notes.map((note) => {
    return (
      <Note
        key={note._id}
        notes={props.notes}
        id={note._id}
        title={note.title}
        description={note.description}
        tag={note.tag}
        deleteNote={() => props.deleteNote(note._id)}
        handleEdit={handleEdit}
      />
    );
  });
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="etitle"
                  value={editedNote.etitle}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="desc">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="desc"
                  name="edescription"
                  value={editedNote.edescription}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tag">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  id="tag"
                  name="etag"
                  value={editedNote.etag}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-dismiss="modal"
                onClick={() => {
                  props.saveChanges(editedNote);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 className="yourNotes">Your Notes</h2>
      {displayNotes.length===0 ? <div className="noNotesdiv"><h6 className="noNotes">No Notes to Display</h6></div>:<div className="display-notes">{displayNotes}</div>}
    </>
  );
}
