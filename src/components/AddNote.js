export default function AddNote(props) {
  const {title,description,tag}=props.note;
  return (
    <form>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Title</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputEmail1" 
          placeholder="Enter title"
          name="title"
          value={title}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Description</label>
        <input
          type="text"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Description"
          name="description"
          value={description}
          onChange={props.handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          placeholder="Tag"
          name="tag"
          value={tag}
          onChange={props.handleChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={props.addNote}>
        Add note
      </button>
    </form>
  );
}
