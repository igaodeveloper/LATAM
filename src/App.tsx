import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import AppRoutes from "./routes";
import { HRProcessProvider } from "./contexts/HRProcessContext";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HRProcessProvider>
        <AppRoutes />
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </HRProcessProvider>
    </Suspense>
  );
}

export default App;
