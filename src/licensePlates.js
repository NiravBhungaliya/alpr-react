import { OntarioStepIndicator } from "@ontario-digital-service/ontario-design-system-component-library-react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const LicensePlate = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.responseData) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <OntarioStepIndicator
      show-back-button="true"
      back-button-url="../"
      currentStep="1"
      number-of-steps="1"
    ></OntarioStepIndicator>
  );
};

export default LicensePlate;
