import DataTable from "react-data-table-component";
import Loader from "./Loader";
import useStore from "../stores/useStore";
import { shallow } from "zustand/shallow";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const getState = (state) => [
  state.setIsLoading,
  state.showLanding,
  state.companyList,
];

const columns = (navigateToLanding) => [
  {
    name: "Şirkətin adı",
    selector: (row) => row.COMPANYNAME,
  },
  {
    name: "Baxış",
    button: true,
    cell: (row) => (
      <Button label="Dəyiş" onClick={() => navigateToLanding(row.CID)} />
    ),
  },
];

const CompanyList = () => {
  const [isLoading, showLanding, companyList] = useStore(getState, shallow);
  const navigate = useNavigate();
  const navigateToCompanyEdit = (cid) => {
    window.location.href =
      window.baseUrl +
      "editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=" +
      cid;
  };
  const navigateToLanding = () => {
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
      <div className="row">
        <div className="col-6">
          <h1>Şirkətlərin siyahısı</h1>
        </div>
        <div className="col-6">
          <div className="float-end">
            <Button
              label="Müraciətlərə keçid"
              onClick={navigateToLanding}
            ></Button>
          </div>
        </div>
      </div>
      <DataTable
        //progressComponent={<Loader />}
        //progressPending={isLoading}
        columns={columns(navigateToCompanyEdit)}
        data={companyList}
        dense
      />
    </main>
  );
};

export default CompanyList;
