"use client";
import Cookies from "js-cookie";
import { API } from "../../config";

export async function fetchData(endpoint) {
  try {
    const TOKEN = Cookies.get("token")
    const response = await fetch(`${API}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      cache: "no-store"
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
}