import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AppRoutes from "./routes";
import { HRProcessProvider } from "./contexts/HRProcessContext";

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HRProcessProvider>
        <AppRoutes />
      </HRProcessProvider>
    </Suspense>
  );
}

export default App;
