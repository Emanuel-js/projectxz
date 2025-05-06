import { useAuthStore } from "../store/authStore";
import { Link } from "react-router-dom";
import { Mail, Settings, BarChart, ArrowRight, Users } from "lucide-react";

const DashboardPage = () => {
  const user = useAuthStore((state) => state.user);

  // Mock statistics for the dashboard
  const stats = [
    {
      name: "Total Campaigns",
      value: "12",
      change: "+2",
      changeType: "increase",
    },
    {
      name: "Sent Emails",
      value: "1,234",
      change: "+5%",
      changeType: "increase",
    },
    { name: "Click Rate", value: "24%", change: "-3%", changeType: "decrease" },
    {
      name: "Unique Targets",
      value: "567",
      change: "+12",
      changeType: "increase",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back, {user?.name ?? "User"}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/phishing"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            New Phishing Campaign
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
          >
            <p className="text-sm font-medium text-gray-500">{stat.name}</p>
            <p className="mt-2 flex items-baseline">
              <span className="text-3xl font-semibold text-gray-900">
                {stat.value}
              </span>
              <span
                className={`ml-2 text-sm font-medium ${
                  stat.changeType === "increase"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
            </p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Phishing Simulations
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Create and manage phishing campaigns
                  </p>
                  <Link
                    to="/phishing"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Go to Phishing <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
                  <BarChart className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Analytics
                  </h3>
                  <p className="mt-1 text-gray-600">
                    View detailed reports and statistics
                  </p>
                  <Link
                    to="/analytics"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Analytics <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Users</h3>
                  <p className="mt-1 text-gray-600">
                    Manage users and permissions
                  </p>
                  <Link
                    to="/users"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Manage Users <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-lg">
                  <Settings className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Settings
                  </h3>
                  <p className="mt-1 text-gray-600">
                    Configure your account settings
                  </p>
                  <Link
                    to="/settings"
                    className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Go to Settings <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex items-start pb-4 border-b border-gray-100 last:border-0"
              >
                <div
                  className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${
                    i % 2 === 0 ? "bg-green-500" : "bg-blue-500"
                  }`}
                ></div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {i % 2 === 0
                      ? "New phishing campaign created"
                      : "Email clicked by target"}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(Date.now() - i * 3600000).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/activity"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View all activity
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
