import { redirect } from "react-router-dom";
import { getUserId } from "../userActions";

export const dashboardLoader = async () => {
  const user = await getUserId();

  if (!user) {
    return redirect("/TodoList/login");
  }

  return null;
}