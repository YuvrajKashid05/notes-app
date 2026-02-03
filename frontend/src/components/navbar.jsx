import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="w-full h-18 px-4 md:px-8 bg-white border-b border-gray-100 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-gray-900">NoteApp</div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {user && (
          <span className="block text-sm font-semibold text-gray-700">
            {user.name || user.email}
          </span>
        )}

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 md:px-8 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
        >
          <FiLogOut size={18} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </nav>
  );
}
