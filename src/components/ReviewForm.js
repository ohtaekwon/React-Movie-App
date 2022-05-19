import { useState } from "react";
import "../css/ReviewForm.css";

function ReviewForm() {
  // Input State
  // Title State
  const [title, setTitle] = useState("");
  // rating State
  const [rating, setRating] = useState(0);
  // content State
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleRatingChange = (e) => {
    const nextRating = Number(e.target.value) || 0;
    setRating(nextRating);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className="ReviewForm">
      <input value={title} onChange={handleTitleChange} />
      <input type="number" value={rating} onChange={handleRatingChange} />
      <textarea value={content} onChange={handleContentChange} />
    </form>
  );
}

export default ReviewForm;
