import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createAuth from "./createAuth";

const handleGetRequests = async (set, get) => {
  try {
    // const auth = get().handleAuth;
    // await auth();

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
      `/api/v1/nodes/${window.wrURLs.getAssignedRequests}/output?format=json&userId=${
        window.currentUserId
      }`;

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

const store = (set, get) => ({
  ...createAuth(set, get),
  requests: [],
  getRequests: () => handleGetRequests(set, get),
  isLoading: true,
  setIsLoading: (value) => set({ isLoading: value }),
});

const useStore = create(devtools(store));

export default useStore;
