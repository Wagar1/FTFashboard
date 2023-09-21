import DataTable from "react-data-table-component";

const columns = [
  {
    name: "User",
    selector: (row) => row.user,
  },
  {
    name: "Date",
    selector: (row) => row.date,
  },
  {
    name: "Changes",
  },
  {
    name: "Action",
    button: true,
    cell: () => <button className="btn btn-secondary">View</button>,
  },
];

const DashboardComponent = ({ data }) => {
  return (
    <div className="col-12 mt-2">
      <h4>Müraciətlər</h4>
      <div className="row">
        <div className="col-6">
          <DataTable columns={columns} data={data} dense />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
