"use server";

import { API } from "../../../config";

const defaultRes = {
  status: false,
  message: "Some Error Occured, Null value in result",
};

const api = API;

export async function getCoachClientDetails(id) {
  try {
    const response = await fetch(`${api}/app/viewClient?id=${id}`, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        // 'authorization': `Bearer ${authToken}`,
      },
      //   next:{revalidate:10},
      cache: "no-store",
    });
    const res = await response.json();
    //   console.log(res)
    if (res) return res;
    return defaultRes;
  } catch (err) {
    return err.error || err.message;
  }
}

//Get client Plans
export async function getClientPlans(id, authToken) {
  try {
    const response = await fetch(`${api}/app/get-plan-by-id?clientId=${id}`, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      //   next:{revalidate:10},
      cache: "no-store",
    });
    const res = await response.json();
    console.log("Plans", res);
    if (res) return res;
    return defaultRes;
  } catch (err) {
    return err.error || err.message;
  }
}

//Get client Order History
export async function getClientOrderHistory(id, authToken) {
  try {
    const response = await fetch(
      `${api}/app/client-order-history?clientId=${id}`,
      {
        method: "GET",
        headers: {
          // 'Content-Type': 'application/json',
          authorization: `Bearer ${authToken}`,
        },
        //   next:{revalidate:10},
        cache: "no-store",
      }
    );
    const res = await response.json();
    //   console.log(res)
    if (res) return res;
    return defaultRes;
  } catch (err) {
    return err.error || err.message;
  }
}

//Get Statistics Details for client
export async function getClientStatsData(authToken, clientid = '') {
  console.log(authToken);
  try {
    const response = await fetch(`${api}/app/clientStats?clientId=${clientid}`, {
      method: "GET",
      headers: {
        // 'Content-Type': 'application/json',
        authorization: `Bearer ${authToken}`,
      },
      //   next:{revalidate:10},
      cache: "no-store",
    });
    const res = await response.json();
    //   console.log(res)
    if (res) return res;
    return defaultRes;
  } catch (err) {
    return err.error || err.message;
  }
}
