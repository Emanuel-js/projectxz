import { Link } from "react-router-dom";

const Header = () => {
  // const { user, logout, isAuthenticated } = useAuth();

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          Your App Name
        </Link>
      </div>
    </header>
  );
};

export default Header;
