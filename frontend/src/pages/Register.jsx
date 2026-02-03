import { useState } from "react";
import toast from "react-hot-toast";
import { FiLock, FiMail, FiUser, FiUserPlus } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const { data } = await API.post("/auth/register", {
        name,
        email,
        password,
      });

      login(data.user, data.token);
      toast.success("Account created");
      navigate("/notes");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-gray-50 shadow-sm">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">NoteApp</h1>
            <p className="text-sm text-gray-600">Create your account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-gray-900/10">
                <FiUser className="text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-gray-900/10">
                <FiMail className="text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-gray-900/10">
                <FiLock className="text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2 focus-within:ring-2 focus-within:ring-gray-900/10">
                <FiLock className="text-gray-400" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition disabled:opacity-60"
            >
              {loading ? (
                "Creating..."
              ) : (
                <>
                  <FiUserPlus />
                  Create account
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-gray-900 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
