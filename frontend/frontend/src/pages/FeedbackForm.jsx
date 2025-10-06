import { useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { Star } from "lucide-react";

const FeedbackForm = () => {
  const { courseId } = useParams();
  const [feedback, setFeedback] = useState({ rating: 0, comment: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRating = (value) => setFeedback({ ...feedback, rating: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.rating || !feedback.comment.trim()) {
      alert("Please provide both a rating and comment!");
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post("/feedback", { courseId, ...feedback });
      setSubmitted(true);
      setFeedback({ rating: 0, comment: "" });
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white    text-black   px-4">
        <h2 className="text-4xl font-bold mb-4 text-green-400 animate-bounce">
           Thank You!
        </h2>
        <p className="text-black    text-lg mb-6 text-center">
          Your feedback has been successfully submitted.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Give More Feedback
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
           Submit Your Feedback
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Rating */}
          <div>
            <p className="text-gray-700 mb-2 text-sm font-medium">
              Rate this course:
            </p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  onClick={() => handleRating(star)}
                  className={`cursor-pointer transition-transform duration-200 ${
                    star <= feedback.rating
                      ? "text-yellow-400 scale-110"
                      : "text-gray-400 hover:text-yellow-300"
                  }`}
                  fill={star <= feedback.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <p className="text-gray-700 mb-2 text-sm font-medium">
              Write your feedback:
            </p>
            <textarea
              name="comment"
              rows="4"
              placeholder="Your thoughts about the course..."
              value={feedback.comment}
              onChange={(e) =>
                setFeedback({ ...feedback, comment: e.target.value })
              }
              className="w-full p-3 rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-600 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 py-3 rounded-lg font-semibold text-white hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
