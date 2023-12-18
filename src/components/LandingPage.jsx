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
  state.setIsLoading,
  state.isLoading,
  state.showApprover,
  state.getApprover,
  state.isApprover,
];

const LandingPage = () => {
  const [
    setCurrentRole,
    isKIM,
    getKIM,
    showKIM,
    setIsLoading,
    isLoading,
    showApprover,
    getApprover,
    isApprover,
  ] = useStore(getState, shallow);
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
    setIsLoading(true);
    try {
      const approverID = await getApprover();
      const isApprover = await showApprover(approverID);
      const kimID = await getKIM();
      const isKIM = await showKIM(kimID);
      if (isApprover && !isKIM) {
        goTo(2);
      }
      if (!isKIM && !isApprover) {
        goTo(1);
      }
      if (isKIM) {
        goTo(0);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
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
          {isLoading ? (
            <></>
          ) : (
            <>
              {" "}
              {isKIM ? (
                <div className="div div-1">
                  <button
                    className="div-button"
                    onClick={() => {
                      goTo(0);
                    }}
                  >
                    CGD
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
                  Applicant
                </button>
              </div>
              {isApprover || isKIM ? (
                <div className="div div-2">
                  <button
                    className="div-button"
                    onClick={() => {
                      goTo(2);
                    }}
                  >
                    Approver
                  </button>
                </div>
              ) : (
                <></>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
