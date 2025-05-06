import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white p-4">
      <div className="mb-8">
        <h2 className="text-xl font-bold">Dashboard</h2>
      </div>

      <nav className="space-y-2">
        <Link
          to="/dashboard"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Overview
        </Link>

        <Link
          to="/dashboard/profile"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Profile
        </Link>
        <Link
          to="/dashboard/settings"
          className="block px-4 py-2 rounded hover:bg-gray-700"
        >
          Settings
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
