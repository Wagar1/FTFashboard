import DataTable from "react-data-table-component";

const navigateEdit = (workId, cid) => {
  window.location.href = `${window.mainUrl}/editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=${cid}&workId=${workId}`;
};

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
    name: "Workflow",
    selector: (row) => row.workId,
  },
  {
    name: "Action",
    button: true,
    cell: (row) => (
      <button
        className="btn btn-secondary"
        onClick={() => navigateEdit(row.workId, row.cid)}
      >
        View
      </button>
    ),
  },
];

const DashboardComponent = ({ data, navigateEdit }) => {
  return (
    <div className="col-12 mt-2">
      <h4>Müraciətlər</h4>
      <div className="row">
        <div className="col-6">
          <DataTable
            columns={columns}
            data={data}
            onRowClicked={navigateEdit}
            dense
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
