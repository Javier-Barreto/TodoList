import { redirect } from "react-router-dom";
import { getUserId } from "../userActions";

export const loginLoader = async () => {
  const user = await getUserId();

  if (user) {
    return redirect("/TodoList/dashboard");
  }

  return null;
}