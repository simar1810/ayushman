import { fetchData } from "./api";

export async function getSessions() {
  return fetchData("sessions")
}