import shallow from "zustand/shallow";
import useStore from "../stores/useStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "./Button";

const getState = (state) => [
  state.setCurrentRole,
  state.isKIM,
  state.getKIM,
  state.showKIM,
];

const LandingPage = () => {
  const [setCurrentRole, isKIM, getKIM, showKIM] = useStore(getState, shallow);
  const navigate = useNavigate();
  const goTo = (menu) => {
    if (menu === 0) {
      setCurrentRole("KIM");
    } else if (menu === 1) {
      setCurrentRole("USER");
    } else if (menu === 2) {
      setCurrentRole("MANAGER");
    }
    navigate(
      window.baseUrl +
        "app/dashboard" +
        "?func=ll&objId=" +
        window.currentWebreportId +
        "&objAction=RunReport"
    );
  };
  const getFromDB = async () => {
    const kimID = await getKIM();
    await showKIM(kimID);
  };

  useEffect(() => {
    getFromDB();
  }, []);

  const handleNavigateReturn = function () {
    navigate(
      window.baseUrl +
        "app/clist" +
        "?func=ll&objId=" +
        window.currentWebreportId +
        "&objAction=RunReport"
    );
  };
  return (
    <main>
      <h1>
        <Button label="⬅ Return" onClick={() => handleNavigateReturn()} />
      </h1>
      <div className="landing-container">
        {/* <h1 className="container-header">Daxil Olun</h1> */}
        <div className="button-container">
          {isKIM ? (
            <div className="div div-1">
              <button
                className="div-button"
                onClick={() => {
                  goTo(0);
                }}
              >
                In KIM
              </button>
            </div>
          ) : (
            <></>
          )}
          <div className="div div-2">
            <button
              className="div-button"
              onClick={() => {
                goTo(1);
              }}
            >
              In Applicant
            </button>
          </div>
          <div className="div div-2">
            <button
              className="div-button"
              onClick={() => {
                goTo(2);
              }}
            >
              in Approver
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
