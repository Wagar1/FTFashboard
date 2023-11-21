import DashboardComponent from "./DashboardComponent";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect, useState } from "react";
import { Fragment } from "react";

const getState = (state) => [
  state.requests,
  state.getRequests,
  state.isLoading,
  state.getKIM,
  state.setCurrentRole,
  state.setIsLoading,
];

const data = [
  {
    id: 1,
    user: "Vugar",
    date: "9/21/2023",
  },
  {
    id: 2,
    user: "Vusal",
    date: "9/21/2023",
  },
  {
    id: 3,
    user: "Ilqar",
    date: "9/21/2023",
  },
];

const Dashboard = () => {
  const [
    requests,
    getRequests,
    isLoading,
    getKIM,
    setCurrentRole,
    setIsLoading,
  ] = useStore(getState, shallow);
  const [data, setData] = useState([]);

  useEffect(() => {
    const temp = [];

    for (const request of requests) {
      temp.push({
        id: crypto.randomUUID(),
        performer: request.performer,
        createdat: request.createdat,
        initiatedat: request.initiatedat,
        workId: request.workId,
        cid: request.cid,
        title: request.title,
        companyName: request.companyName,
      });
    }

    setData(temp);
  }, [requests]);

  const getFromDB = async () => {
    setIsLoading(true);
    await getRequests();
    await getKIM();
    setIsLoading(false);
  };

  useEffect(() => {
    getFromDB();
  }, []);

  const handleNavigateEdit = (workId) => {
    window.location.href = `${window.mainUrl}/editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=${cid}&workId=${workId}`;
  };

  const args = {
    data,
    navigateEdit: handleNavigateEdit,
    isLoading,
    setCurrentRole,
  };

  return (
    <Fragment>
      <DashboardComponent {...args} />
    </Fragment>
  );
};

export default Dashboard;
