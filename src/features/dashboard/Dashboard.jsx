import DashboardComponent from "./DashboardComponent";

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
  const args = {
    data,
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
