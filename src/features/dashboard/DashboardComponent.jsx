import DataTable from "react-data-table-component";

const navigateEdit = (workId, cid) => {
  window.location.href = `${window.mainUrl}/editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=${cid}&workId=${workId}`;
};

const columns = [
  {
    name: "Performer",
    selector: (row) => row.performer,
  },
  {
    name: "Company name",
    selector: (row) => row.companyName,
  },
  {
    name: "Step created at",
    selector: (row) => row.createdat,
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

const DashboardComponent = ({ data, navigateEdit, isLoading }) => {
  return (
    <div className="col-12 mt-2">
      <h4>Müraciətlər</h4>
      <div className="row">
        <div className="col-6">
          {isLoading ? (
            <p>Loading</p>
          ) : (
            <DataTable
              columns={columns}
              data={data}
              onRowClicked={navigateEdit}
              dense
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardComponent;
