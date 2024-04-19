import { useState } from "react";

const Tab = ({ responseData }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const acceptedPlates = responseData.filter((item) => item.Accepted === 1);
  const notAcceptedPlates = responseData.filter((item) => item.Accepted === 0);

  return (
    <>
      <div>
        <div className="tab">
          <div
            className={activeTab === 0 ? "tabOption active" : "tabOption"}
            onClick={() => handleTabClick(0)}
          >
            <label>Not Accepted Plates</label>
          </div>
          <div
            className={activeTab === 1 ? "tabOption active" : "tabOption"}
            onClick={() => handleTabClick(1)}
          >
            <label>Accepted Plates</label>
          </div>
        </div>
        <div className="tabContent">
          {activeTab === 0 && (
            <div>
              {notAcceptedPlates.map((value, index) => (
                <li key={index}>{value.Plate}</li>
              ))}
            </div>
          )}
          {activeTab === 1 && (
            <div>
              {acceptedPlates.map((value, index) => (
                <li key={index}>{value.Plate}</li>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tab;