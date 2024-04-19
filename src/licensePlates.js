import { OntarioStepIndicator } from "@ontario-digital-service/ontario-design-system-component-library-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Tab from "./tab";

const LicensePlate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.responseData) {
      navigate("/");
    }
  }, [location, navigate]);

  return <>
    <OntarioStepIndicator
      show-back-button="true"
      back-button-url="../"
      currentStep="1"
      number-of-steps="1"
    ></OntarioStepIndicator>
    <h1>Displaying the Result</h1>
    <p>Following page differenciate accepted and not accepted License plates.</p>
    <hr className="thick-border"></hr>
    <Tab responseData={location.state.responseData}/>
    </>
};

export default LicensePlate;
