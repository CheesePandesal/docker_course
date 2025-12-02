import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Create() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    link: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_API_URL}/api/anime`, form)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setForm({
      title: "",
      link: "",
      description: "",
    });

    navigate("/");
  };

  return (
    <main className="container">
      <div className="form_area">
        <h1 className="title">Drop Info</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form_group">
            <label htmlFor="title" className="sub_title">
              Anime Title
            </label>
            <input
              type="text"
              className="form_style"
              id="title"
              placeholder="e.g. Chainsaw Man"
              value={form.title}
              onChange={handleChange}
            />
          </div>
          <div className="form_group">
            <label htmlFor="link" className="sub_title">
              Stream Link
            </label>
            <input
              type="url"
              className="form_style"
              id="link"
              placeholder="https://..."
              value={form.link}
              onChange={handleChange}
            />
          </div>
          <div className="form_group">
            <label htmlFor="description" className="sub_title">
              Quick Pitch
            </label>
            <input
              type="text"
              className="form_style"
              id="description"
              placeholder="Why should we watch it?"
              value={form.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <button className="btn">Post It</button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Create;