import DataTable from "react-data-table-component";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const navigateEdit = (workId, cid) => {
  window.location.href = `${window.mainUrl}/editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=${cid}&workId=${workId}`;
};

const columns = [
  {
    name: "Applicant",
    selector: (row) => row.performer,
  },
  {
    name: "Company name",
    selector: (row) => row.companyName,
  },
  {
    name: "Apply date",
    selector: (row) => row.createdat,
  },
  {
    name: "View application",
    button: true,
    cell: (row) => (
      <Button label="Show" onClick={() => navigateEdit(row.workId, row.cid)} />
    ),
  },
];

const DashboardComponent = ({ data, navigateEdit, isLoading, isKIM }) => {
  const navigate = useNavigate();
  const handleNavigateReturn = function () {
    if (isKIM) {
      navigate(
        window.baseUrl +
          "app/landing" +
          "?func=ll&objId=" +
          window.currentWebreportId +
          "&objAction=RunReport"
      );
    } else {
      navigate(
        window.baseUrl +
          "app/clist" +
          "?func=ll&objId=" +
          window.currentWebreportId +
          "&objAction=RunReport"
      );
    }
  };
  return (
    <main>
      <div className="mb-4">
        <Button label="⬅ Return" onClick={() => handleNavigateReturn()} />
      </div>
      <h1>Requests</h1>
      <DataTable
        progressComponent={<Loader />}
        progressPending={isLoading}
        columns={columns}
        data={data}
        onRowClicked={navigateEdit}
        dense
      />
    </main>
  );
};

export default DashboardComponent;
