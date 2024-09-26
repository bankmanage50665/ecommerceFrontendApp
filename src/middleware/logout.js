import { redirect } from "react-router-dom";

export  function action() {
  localStorage.removeItem("token");
  localStorage.removeItem("userid");
  localStorage.removeItem("userPhoneNumber");
  localStorage.removeItem("creatorid");
  return redirect("/");
}
