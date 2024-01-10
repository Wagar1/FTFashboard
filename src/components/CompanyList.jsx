import DataTable from "react-data-table-component";
import Loader from "./Loader";
import useStore from "../stores/useStore";
import { shallow } from "zustand/shallow";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const getState = (state) => [
  state.setIsLoading,
  state.showLanding,
  state.companyList,
  state.isApprover,
  state.getChanges,
];

let columns = (navigateToLanding, isApprover, navigateToLandingTest) => {
  if (isApprover)
    return [
      {
        name: "Company name",
        selector: (row) => row.COMPANYNAME,
      },
    ];
  else {
    return [
      {
        name: "Company name",
        selector: (row) => row.COMPANYNAME,
      },
      {
        name: "View",
        button: true,
        cell: (row) => (
          <>
            <Button
              id={"btn-" + row.CID}
              label="Change"
              onClick={() => navigateToLanding(row.CID)}
            />
            <Button
              id={"btn-" + row.CID}
              label="Change(For Test Purpose)"
              style={{ marginLeft: "10px" }}
              onClick={() => navigateToLandingTest(row.CID)}
            />
          </>
        ),
      },
    ];
  }
};

const CompanyList = () => {
  const [isLoading, showLanding, companyList, isApprover, getChanges] =
    useStore(getState, shallow);
  const navigate = useNavigate();
  const navigateToCompanyEdit = async (cid) => {
    const changes = await getChanges(cid);
    if (changes.length > 0) {
      Swal.fire({
        icon: "warning",
        text: "You cannot change the company twice",
      });
      return;
    }
    window.location.href =
      window.baseUrl +
      "editapp/cd?func=ll&objId=224774940&objAction=RunReport&key=" +
      cid;
  };
  const navigateToCompanyEditTest = async (cid) => {
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
          <h1>List of companies</h1>
        </div>
        <div className="col-6">
          <div className="float-end">
            <Button label="Go to requests" onClick={navigateToLanding}></Button>
          </div>
        </div>
      </div>
      <DataTable
        //progressComponent={<Loader />}
        //progressPending={isLoading}
        columns={columns(
          navigateToCompanyEdit,
          isApprover,
          navigateToCompanyEditTest
        )}
        data={companyList}
        dense
      />
    </main>
  );
};

export default CompanyList;
