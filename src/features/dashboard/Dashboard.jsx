import DashboardComponent from "./DashboardComponent";
import useStore from "../../stores/useStore";
import shallow from "zustand/shallow";
import { useEffect, useState } from "react";

const getState = (state) => [
  state.requests,
  state.getRequests,
  state.auth,
  state.ticket,
  state.isLoading,
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
  const [requests, getRequests, auth, ticket, isLoading] = useStore(
    getState,
    shallow
  );
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
      });
    }

    setData(temp);
  }, [requests]);

  const getFromDB = async () => {
    await auth();
    await getRequests();
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
  };

  return (
    <div className="container">
      <div className="row">
        <DashboardComponent {...args} />
      </div>
    </div>
  );
};

export default Dashboard;
