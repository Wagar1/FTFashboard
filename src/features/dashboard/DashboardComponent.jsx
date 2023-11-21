import DataTable from "react-data-table-component";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";

const navigateEdit = (workId, cid) => {
  window.location.href = `${window.mainUrl}/editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=${cid}&workId=${workId}`;
};

const columns = [
  {
    name: "Müraciətçi",
    selector: (row) => row.performer,
  },
  {
    name: "Şirkətin adı",
    selector: (row) => row.companyName,
  },
  {
    name: "Müraciət tarixi",
    selector: (row) => row.createdat,
  },
  {
    name: "Müraciətə baxış",
    button: true,
    cell: (row) => (
      <Button
        label="Göstər"
        onClick={() => navigateEdit(row.workId, row.cid)}
      />
    ),
  },
];

const DashboardComponent = ({ data, navigateEdit, isLoading }) => {
  const navigate = useNavigate();
  const handleNavigateReturn = function () {
    navigate(
      window.baseUrl +
        "app/landing" +
        "?func=ll&objId=" +
        window.currentWebreportId +
        "&objAction=RunReport"
    );
  };
  return (
    <main>
      <div className="mb-4">
        <Button label="⬅ Geri" onClick={() => handleNavigateReturn()} />
      </div>
      <h1>Müraciətlər</h1>
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
