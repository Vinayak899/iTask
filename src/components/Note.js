export default function Note(props) {
  return (
    <div className="note">
      <div className="heading-CRUD">
        <h3 className="note-heading">{props.title}</h3>
        <div className="CRUD">
          <i
            className="fa-solid fa-pen-to-square"
            data-toggle="modal"
            data-target="#exampleModal"
            id="edit"
            onClick={()=>props.handleEdit(props.id)}
          ></i>
          <i
            className="fa-solid fa-trash"
            id="delete"
            onClick={props.deleteNote}
          ></i>
        </div>
      </div>
      <p className="note-desc">{props.description}</p>
      <br></br>
      <p className="note-tag">
        {props.tag !== "" && (
          <>
            <i className="fa-solid fa-tag" id="tag"></i>
            <b>{props.tag}</b>
          </>
        )}
      </p>
    </div>
  );
}
