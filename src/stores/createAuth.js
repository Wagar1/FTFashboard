import Cookies from "js-cookie";

const handleAuth = async (set, get) => {
  if (window.location.hostname === "localhost") {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("username", "test1"); //"Vugar.i.eyvazov");
    urlencoded.append("password", "Cic12345678"); //"init123Q1");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        window.mainUrl + "/api/v1/auth",
        requestOptions
      );
      const json = await response.json();
      Cookies.set("LLCookie", json.ticket);
      set({
        ticket: json.ticket,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    set({
      ticket: window.OTCSTicket,
    });
  }
};

const createAuth = (set, get) => ({
  ticket: "",
  auth: async () => await handleAuth(set, get),
});

export default createAuth;
