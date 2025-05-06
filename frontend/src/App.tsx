import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <HomePage />
      </div>

      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </>
  );
}

export default App;
