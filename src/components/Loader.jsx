import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#34eb37"
      wrapperStyle={{ marginBottom: "-400px", zIndex: "100" }}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#34eb37"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;