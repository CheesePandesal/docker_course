import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();

  // State to track if the anime was found or if an error occurred
  const [error, setError] = useState(false);
  
  // State for loading status (optional but good UX)
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    link: "",
    description: "",
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/anime/${id}`)
      .then((res) => {
        // If data exists, populate the form
        if (res.data) {
            setForm(res.data);
            setError(false);
        } else {
            // Handle case where API returns success but null data
            setError(true);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${import.meta.env.VITE_API_URL}/api/anime/${id}`, form)
      .then((res) => {
        console.log("Updated:", res.data);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  // 1. Loading State
  if (loading) {
    return (
        <main className="container">
            <h2 className="heading" style={{ fontSize: '2rem', textAlign: 'center', color: '#000' }}>
                Loading...
            </h2>
        </main>
    );
  }

  // 2. Error State (Anime Not Found)
  if (error) {
    return (
      <main className="container">
        <div className="form_area" style={{ background: "#ff6b6b", textAlign: "center" }}>
          <h1 className="title" style={{ transform: "rotate(-2deg)" }}>Error 404</h1>
          <p style={{ margin: "20px 0", fontSize: "1.2rem", fontWeight: "bold" }}>
            We couldn't find that anime. It might have been deleted.
          </p>
          <Link to="/" className="btn" style={{ display: "inline-block", width: "auto", textDecoration: "none" }}>
            Return Home
          </Link>
        </div>
      </main>
    );
  }

  // 3. Success State (Render the Form)
  return (
    <main className="container">
      <div className="form_area" style={{ background: "var(--second-accent)" }}>
        <h1 className="title">Edit Anime</h1>
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
            <button className="btn" style={{ background: "#fff" }}>
              Update Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

export default Edit;