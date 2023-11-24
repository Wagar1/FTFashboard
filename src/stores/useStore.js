import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createAuth from "./createAuth";

const handleGetRequests = async (set, get) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const currentRole = get().currentRole;
    let requestUrl =
      window.mainUrl +
      `/api/v1/nodes/${window.wrURLs.getAssignedRequests}/output?format=json`;
    if (currentRole === "USER") {
      requestUrl += `&userId=${window.currentUserId}&isUser=true`;
    } else if (currentRole === "MANAGER") {
      requestUrl += `&userId=${window.currentUserId}&isManager=true`;
    } else if (currentRole === "KIM") {
      const kimID = get().kimID;
      requestUrl += `&userId=${kimID}&isKIM=true`;
    }
    const response = await fetch(requestUrl, requestOptions);

    const json = await response.json();
    const data = JSON.parse(json.data);
    data.pop();

    console.log(data);
    set({
      requests: data,
      isLoading: false,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleGetKIM = async (set, get) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const requestUrl =
      window.mainUrl +
      `/api/v1/nodes/${window.wrURLs.getKIM}/output?format=json`;

    const response = await fetch(requestUrl, requestOptions);

    const json = await response.json();
    const data = JSON.parse(json.data);
    set({
      kimID: data.OPENTEXTID,
    });
    return data.OPENTEXTID;
  } catch (error) {
    console.log(error);
  }
};

const handleGetCompanyList = async (set, get) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const requestUrl =
      window.mainUrl +
      `/api/v1/nodes/${window.wrURLs.getCompanyList}/output?format=json&userId=${window.currentUserId}`;

    const response = await fetch(requestUrl, requestOptions);

    const json = await response.json();
    const data = JSON.parse(json.data);
    data.pop();
    set({
      companyList: data,
    });
  } catch (error) {
    console.log(error);
  }
};

const handleShowKIM = async (set, get, id) => {
  try {
    const ticket = get().ticket;
    const myHeaders = new Headers();
    myHeaders.append("OTCSTicket", ticket);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    const requestUrl =
      window.mainUrl +
      `/api/v1/nodes/${window.wrURLs.showKIM}/output?format=json&groupid=${id}`;

    const response = await fetch(requestUrl, requestOptions);

    const json = await response.json();
    const data = JSON.parse(json.data);
    set({
      isKIM: data.InGroup,
    });
  } catch (error) {
    console.log(error);
  }
};

const store = (set, get) => ({
  ...createAuth(set, get),
  currentRole: "",
  setCurrentRole: (currentRole) => {
    set({ currentRole });
  },
  kimID: "",
  requests: [],
  getRequests: () => handleGetRequests(set, get),
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
  getKIM: async () => await handleGetKIM(set, get),
  isLanding: true,
  showLanding: (value) => set({ isLanding: value }),
  companyList: [],
  getCompanyList: async () => await handleGetCompanyList(set, get),
  isKIM: false,
  showKIM: async (id) => await handleShowKIM(set, get, id),
});

const useStore = create(devtools(store));

export default useStore;
