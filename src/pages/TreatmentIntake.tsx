import GetStarted from "./GetStarted";

// All treatment-specific intake URLs now route to the unified intake flow.
// The slug is read inside GetStarted to preselect the matching problem.
const TreatmentIntake = () => <GetStarted />;

export default TreatmentIntake;
