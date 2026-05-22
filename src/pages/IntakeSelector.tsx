import { Navigate } from "react-router-dom";

// Legacy route — the intake is now a single unified flow at /get-started.
const IntakeSelector = () => <Navigate to="/get-started" replace />;

export default IntakeSelector;
