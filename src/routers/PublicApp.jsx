import { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Outlet } from "react-router-dom";
import useStore from "../stores/useStore";
import shallow from "zustand/shallow";

const getState = (state) => [
  state.isLoading,
  state.getCompanyList,
  state.auth,
  state.showApprover,
];

const PublicApp = () => {
  const [isLoading, getCompanyList, auth, showApprover] = useStore(
    getState,
    shallow
  );
  const getFromDB = async () => {
    await auth();
    await getCompanyList();
    await showApprover(233351817);
  };
  useEffect(() => {
    getFromDB();
  }, []);
  return (
    <LoadingOverlay active={isLoading} spinner>
      <Outlet></Outlet>
    </LoadingOverlay>
  );
};

export default PublicApp;
