import {
  OntarioButton,
  OntarioLoadingIndicator,
  OntarioPageAlert,
} from "@ontario-digital-service/ontario-design-system-component-library-react";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UploadCSV = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = "https://aplr-backend.azurewebsites.net/predict";
  const history = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const fileInput = document.getElementById("csvFile");
      const file = fileInput.files[0];
      if (!file) {
        setErrorMessage("Please select a csv file.");
        setIsLoading(false);
      }

      const expectedCSVHeader = ["Plate"];

      //Read file using FileReader function
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        const readFile = e.target.result;
        const csvRows = readFile.split("\n");
        const csvHeader = csvRows[0].trim().split(",");
        const isValidColumn = csvHeader.every((eachHeader) =>
          expectedCSVHeader.includes(eachHeader)
        );

        if (!isValidColumn) {
          setErrorMessage(
            "Invalid CSV file format. Expected columns are missing."
          );
          setIsLoading(false);
        } else if (isValidColumn) {
          //Send File to Predict License PLate
          const formData = new FormData();
          formData.append("file", file);

          axios
            .post(API_URL, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            })
            .then((response) => {
              const responseData = response.data;
              history("/licensePlates", { state: { responseData}})
              setIsLoading(false);
            });
        }
      };
      fileReader.readAsText(file);
    } catch (error) {
      setErrorMessage(error.message);
      setIsLoading(false);
    }
  };
  return (
    <div className="inside-main">
      <h1>Checking for a Valid License Plate</h1>
      <p>You can check you custom License Plate</p>
      <h2>What you need to know:</h2>
      <ul>
        <li>
          you can upload a csv file containing all the License plates you want
          to check.
        </li>
        <li>
          You will get a an output showing all the non-approved plates once you
          submit a file.
        </li>
        <li>The submitted file should have the required columns.</li>
      </ul>
      <hr className="thick-border"></hr>
      <form>
        {errorMessage && (
          <OntarioPageAlert
            type="error"
            heading="There is a Problem"
            content={errorMessage}
          ></OntarioPageAlert>
        )}
        <h3>CSV File</h3>
        <p>Upload a file</p>
        <input
          id="csvFile"
          type="file"
          accept=".csv"
          max-size="20000"
          required
        />
        <p className="inputHint">
          File must be a csv, with a max file size of 20MB
        </p>
        <hr className="lightThick-border"></hr>
        <OntarioButton
          label="Upload Document"
          type="primary"
          html-type="submit"
          onClick={handleFormSubmit}
        ></OntarioButton>
      </form>
      <OntarioLoadingIndicator is-loading={isLoading}></OntarioLoadingIndicator>
    </div>
  );
};

export default UploadCSV;
