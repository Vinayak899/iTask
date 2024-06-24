export default function Edit(props) {
    console.log(props.title)
    function handleChange(){
        
    }
  return (
    <>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={props.title}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="desc">Description</label>
        <input
          type="text"
          className="form-control"
          id="desc"
          name="description"
        //   value={.description}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="tag">Tag</label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
        //   value={.tag}
          onChange={handleChange}
        />
      </div>
    </>
  );
}
