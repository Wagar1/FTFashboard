import DataTable from "react-data-table-component";
import Loader from "./Loader";
import useStore from "../stores/useStore";
import { shallow } from "zustand/shallow";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const getState = (state) => [
  state.setIsLoading,
  state.showLanding,
  state.companyList,
  state.isApprover,
  state.getChanges,
];

let columns = (navigateToLanding, isApprover, loading, cId) => {
  if (isApprover && !window.isInUserGroup)
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
        name: "Action",
        button: true,
        cell: (row) => (
          <>
            <Button
              id={"btn-" + row.CID}
              label="Change"
              loading={loading}
              loadingId={cId}
              className={"flex-one"}
              onClick={() => navigateToLanding(row.CID)}
            />
            {/* <Button
              id={"btn-" + row.CID}
              label="Change(For Test Purpose)"
              style={{ marginLeft: "10px" }}
              onClick={() => navigateToLandingTest(row.CID)}
            /> */}
          </>
        ),
      },
    ];
  }
};

const CompanyList = () => {
  const [loading, setLoading] = useState(false);
  const [cId, setCId] = useState(null);
  const [isLoading, showLanding, companyList, isApprover, getChanges] =
    useStore(getState, shallow);
  const navigate = useNavigate();
  const navigateToCompanyEdit = async (cid) => {
    setLoading(true);
    setCId(cid);

    const changes = await getChanges(cid);
    if (changes.length > 0) {
      setLoading(false);
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
  const handleNavigationToSOCARDASHBOARD = () => {
    window.location.href = window.mainUrl;
  };
  const backToMyURL = () => {
    if (window.previousURL) {
      window.location.href = window.previousURL;
    } else {
      window.location.href = window.mainUrl;
    }
  };
  return (
    <main>
      <div className="row">
        <div className="col-6 d-flex align-items-center">
          <span>
            <button
              className="btn btn-outline-secondary m-3"
              onClick={backToMyURL}
            >
              &#129144;
            </button>
          </span>
          <h1>
            List of companies {window.userName ? <>({window.userName})</> : ""}
          </h1>
        </div>
        <div className="col-6">
          <div className="float-end">
            <span
              style={{
                fontSize: "14px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={() => handleNavigationToSOCARDASHBOARD()}
            >
              SOCAR DASHBOARD
            </span>
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
          loading,
          cId
          //navigateToCompanyEditTest
        )}
        data={companyList}
        dense
      />
    </main>
  );
};

export default CompanyList;
