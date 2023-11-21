import { useEffect, useState } from "react";
import LoadingOverlay from "react-loading-overlay";
import { Outlet } from "react-router-dom";
import useStore from "../stores/useStore";
import shallow from "zustand/shallow";

const getState = (state) => [state.isLoading, state.getCompanyList, state.auth];

const PublicApp = () => {
  const [isLoading, getCompanyList, auth] = useStore(getState, shallow);
  const getFromDB = async () => {
    await auth();
    await getCompanyList();
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
