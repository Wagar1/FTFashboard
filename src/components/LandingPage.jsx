import shallow from "zustand/shallow";
import useStore from "../stores/useStore";

const getState = (state) => [state.setCurrentRole];

const LandingPage = () => {
  const [setCurrentRole] = useStore(getState, shallow);
  const goTo = (menu) => {
    if (menu === 0) {
      setCurrentRole("KIM");
    } else if (menu === 1) {
      setCurrentRole("USER");
    } else if (menu === 2) {
      setCurrentRole("MANAGER");
    }
  };
  return (
    <main>
      <div className="landing-container">
        <h1 className="container-header">Daxil Olun</h1>
        <div className="button-container">
          <div className="div div-1">
            <button
              className="div-button"
              onClick={() => {
                goTo(0);
              }}
            >
              KIM rolunda
            </button>
          </div>
          <div className="div div-2">
            <button
              className="div-button"
              onClick={() => {
                goTo(1);
              }}
            >
              Müraciətçi rolunda
            </button>
          </div>
          <div className="div div-2">
            <button
              className="div-button"
              onClick={() => {
                goTo(2);
              }}
            >
              Təsdiqedici rolunda
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
