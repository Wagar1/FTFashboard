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
      requestUrl += `&userId=${kimID}`;
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
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
  getKIM: async () => await handleGetKIM(set, get),
});

const useStore = create(devtools(store));

export default useStore;
