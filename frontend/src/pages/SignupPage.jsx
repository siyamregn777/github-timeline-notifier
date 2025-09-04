// SignupPage.jsx
import { useState } from "react";
import axios from "axios";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(""); // success or error message
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    if (!email) return setStatus("Please enter a valid email.");
    setLoading(true);
    try {
      // Replace with your backend endpoint
      await axios.post("http://localhost:5000/api/signup", { email });
      setStatus("✅ Thank you! You are now subscribed.");
      setEmail("");
    } catch (error) {
      console.error(error);
      setStatus("❌ Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Sign up for GitHub Updates
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Get the latest GitHub events delivered straight to your inbox.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-indigo-500 text-white font-semibold rounded-lg hover:bg-indigo-600 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Subscribe"}
          </button>
        </form>
        {status && (
          <p
            className={`mt-4 text-center ${
              status.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
        <p className="mt-6 text-center text-gray-400 text-sm">
          We respect your privacy. No spam.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
