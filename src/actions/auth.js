import fetch from "isomorphic-fetch";
import cookie from "js-cookie";
import { API } from "../../config";

export const adminsignup = async (user, token) => {
  try {
    const response = await fetch(`${API}/adminSignup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const adminSignin = async (user) => {
  try {
    const response = await fetch(`${API}/adminSignin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const clubregister = async (user, token) => {
  try {
    const response = await fetch(`${API}/cochRegister`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const clublogin = async (user) => {
  try {
    const response = await fetch(`${API}/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

/*
export const singleClubUser = async (id, token) => {
    try {
        const response = await fetch(`${API}/clubuser/${id}`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};
*/

export const updateClubUser = async (user, token, id) => {
  try {
    const response = await fetch(`${API}/clubuser/update/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

/*
export const singleAdmin = async (id, token) => {
    try {
        const response = await fetch(`${API}/admin/${id}`, {
            method: 'GET', headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};
*/

export const updateAdmin = async (user, token, id) => {
  try {
    const response = await fetch(`${API}/admin/update/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    console.log(data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const signout = async (next) => {
  removeCookie("token");
  removeLocalStorage("user");
  try {
    const response = await fetch(`${API}/admin-signout`, {
      method: "GET",
    });
    console.log("signout success");
    next();
  } catch (err) {
    return console.log(err);
  }
};

export const setCookie = (key, value) => {
  if (typeof window !== "undefined") {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key) => {
  if (typeof window !== "undefined") {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key) => {
  if (typeof window !== "undefined") {
    return cookie.get(key);
  }
};

export const setLocalStorage = (key, value) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const removeLocalStorage = (key) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    setLocalStorage("user", data.user.role);
    setCookie("token", data.data.refreshToken);
  }
  next();
};

export const isAuth = () => {
  if (typeof window !== "undefined") {
    const cookieChecked = getCookie("token");
    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    }
  }
};
export const sendOtp = async (email) => {
  console.log(email);
  try {
    const response = await fetch(`${API}/forgotPassword`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    return await response.json();
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const resetPassword = async (otp) => {
  try {
    console.log(otp);
    const response = await fetch(`${API}/resetPasswordController`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(otp),
    });
    const data = await response.json();
    //console.log(data)
    //if(data.status==false) throw error
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getallClubUsres = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/allclubusers?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeClubUser = async (id, token) => {
  try {
    const response = await fetch(`${API}/clubuser/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete image" };
  }
};

export const getallAdmins = async (page, token) => {
  try {
    const response = await fetch(`${API}/alladmins?page=${page}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeAdmin = async (id, token) => {
  try {
    const response = await fetch(`${API}/admin/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete image" };
  }
};

export const getallInterested = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/allinterestedcoaches?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getallInterestedAppClients = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/app/getAllInterestedClients?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log("getallInterestedAppClients error => ", err);
    return null;
  }
};

export const removeInterested = async (id, token) => {
  try {
    const response = await fetch(`${API}/interestedcoach/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete image" };
  }
};

export const getAllAppCoaches = async (page, search, token, coachType, coachLevel) => {
  try {
    const response = await fetch(
      `${API}/get-appcoach?page=${page}&search=${search}&coachType=${coachType}&coachLevel=${coachLevel}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const addAppCoachController = async (newUser, token) => {
  try {
    const response = await fetch(`${API}/app/adminCreateCoach`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    console.log(newUser);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
export const updateAppCoach = async (user, token, id) => {
  try {
    const response = await fetch(`${API}/update-appcoach/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const removeAppCoach = async (id, token) => {
  try {
    const response = await fetch(`${API}/delete-appcoach/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete AppCoach" };
  }
};

export const getAllClubUSerClients = async (token, id) => {
  try {
    const response = await fetch(`${API}/get-clubuserclient/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response)
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAppCoachClients = async (page, search, token, id) => {
  try {
    const response = await fetch(
      `${API}/get-coachclient/${id}?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeAppCoachClient = async (id, token) => {
  try {
    const response = await fetch(`${API}/delete-appcoachclient/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete AppCoach Client" };
  }
};

export const updateAppCoachClient = async (user, token, id) => {
  try {
    const response = await fetch(`${API}/update-appcoachclient/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getIntrestedCoaches = async (page, search, token) => {
  try {
    const response = await fetch(
      // `${API}/app/get-requested-person?person=coach`,
      `${API}/allinterestedcoaches?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};
export const getIntrestedClients = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/app/get-requested-person?person=client`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllFeeds = async (page, search, token) => {
  try {
    const response = await fetch(`${API}/app/feeds-web?page=${page}`, {
      method: "GET",
      // headers: {
      //     Accept: 'application/json',
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`
      // }
    });
    // const response = await fetch(`${API}/app/feeds?page=${page}&search=${search}`, {
    //     method: 'GET', headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${token}`
    //     }
    // });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const AddFeeds = async (formData, token) => {
  try {
    const formData = new FormData();
    formData.append("file", feed?.file);
    formData.append("title", feed?.title);
    formData.append("description", feed?.description);
    const response = await fetch(`${API}/admin/add-feed`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getallCoachPlans = async (token) => {
  try {
    const response = await fetch(`${API}/app/plans`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getallCoachRetail = async (token) => {
  try {
    const response = await fetch(`${API}/app/order-history`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getallCoachOrganization = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/app/getOrganisation?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const deleteAppCoachOrganization = async (id, token) => {
  try {
    const response = await fetch(`${API}/app/delete-organization/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateAppCoachOrganization = async (org, token, id) => {
  try {
    const response = await fetch(`${API}/app/update-organization/:${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(org),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const AddOrganisationController = async (org, token) => {
  try {
    const response = await fetch(`${API}/app/add-organisation`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(org),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const AddRetailController = async (retail, token) => {
  try {
    const response = await fetch(`${API}/app/addProduct`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(retail),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getallRetailController = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/app/getProduct?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateRetailController = async (formdata, token, id) => {
  try {
    const response = await fetch(`${API}/app/updateProduct/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formdata,
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return console.log(err);
  }
};

export const DeleteRetail = async (id, token) => {
  try {
    const response = await fetch(`${API}/app/deleteProduct/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete Product" };
  }
};

export const AddProgramController = async (program, token) => {
  try {
    const response = await fetch(`${API}/app/add-program`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(program),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllProgramController = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/app/getall-programs?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateProgramController = async (formdata, token, id) => {
  try {
    const response = await fetch(`${API}/app/update-program/${id}`, {
      method: "PUT",

      headers: {
        //  Accept: 'application/json',
        //  'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: formdata,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const DeleteProgram = async (id, token) => {
  try {
    const response = await fetch(`${API}/app/delete-program/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const updateFeed = async (formdata, token, id) => {
  try {
    const response = await fetch(`${API}/app/update-feed/${id}`, {
      method: "PUT",

      headers: {
        //  Accept: 'application/json',
        //  'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: formdata,
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const DeleteFeed = async (id, token) => {
  try {
    const response = await fetch(`${API}/app/delete-feed/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

export const Total = async (token) => {
  try {
    const response = await fetch(`${API}/total`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getBrand = async (token) => {
  try {
    const response = await fetch(`${API}/app/getBrand`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const AppNotificationsApi = async (page, search, token) => {
  try {
    // const response = await fetch(`${API}/app/notification?person=admin`, {
    const response = await fetch(
      `${API}/app/notification?page=${page}&search=${search}&person=admin`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const GetPlanByID = async (token, id) => {
  try {
    const response = await fetch(
      `${API}/app/get-plan-by-id?id=${id}&clientId=${""}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const AllContacts = async (page, search, token, type) => {
  try {
    // const response = await fetch(`${API}/contacts?type=${type}`,{
    const response = await fetch(
      `${API}/contacts?page=${page}&search=${search}&type=${type}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllSubscriptionsForAdmin = async (page, search, token) => {
  try {
    // console.log("token => ", token)
    console.log("token => ", cookie.get("token"));
    const currToken = cookie.get("token");
    const response = await fetch(
      `${API}/getAllSubscriptionsForAdmin?page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${currToken}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    console.log("error in getAllSubscriptionsForAdmin => ", err);
    return null;
  }
};

export const AllFeedBacks = async (page, search, token) => {
  try {
    const response = await fetch(
      `${API}/app/feedback?page=${page}&search=${search}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const AddNotification = async (notification, token) => {
  try {
    const response = await fetch(`${API}/app/add-notification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notification),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const updateContact = async (isResolved, token, id) => {
  try {
    const response = await fetch(`${API}/update-contact-us/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(isResolved),
    });

    if (!response.ok) {
      // Throw an error if the response is not OK (status code outside 2xx range)
      throw new Error("Failed to update contact");
    }

    return await response.json();
  } catch (error) {
    // Handle the error more appropriately, e.g., by returning an error object
    return { error: error.message };
  }
};

export const removeAppNotification = async (id, token) => {
  try {
    const response = await fetch(`${API}/app/delete-app-notification/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete APP Notification" };
  }
};

export const ClubNotificationsApi = async (page, search, token) => {
  try {
    // const response = await fetch(`${API}/notification?person=admin`, {
    const response = await fetch(
      `${API}/notification?page=${page}&search=${search}&person=admin`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const removeClubNotification = async (id, token) => {
  try {
    const response = await fetch(`${API}/delete-club-notification/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error(error);
    return { error: "Failed to delete Club Notification" };
  }
};

export const AddClubNotification = async (notification, token) => {
  try {
    const response = await fetch(`${API}/add-club-notification`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(notification),
    });
    return await response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const UpdateAppNotification = async (appnotification, token, id) => {
  try {
    const response = await fetch(`${API}/app/update-app-notification/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appnotification),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const UpdateClubNotification = async (clubnotification, token, id) => {
  try {
    const response = await fetch(`${API}/update-club-notification/${id}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(clubnotification),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const addSubscription = async (payload, token) => {
  try {
    const response = await fetch(`${API}/app/addSubscription?person=admin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    console.log("response of addSubscription api call => ", data);
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const getAllCoachSubscriptions = async (coachId, token) => {
  try {
    const response = await fetch(
      `${API}/app/viewSubscription?person=admin&coachId=${coachId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("getAllCoachSubscriptions err => ", err);
    return err;
  }
};

export const getAllClubUserMeetings = async (clubUserId, token) => {
  try {
    const response = await fetch(
      `${API}/allMeeting?coach=${clubUserId}&person=admin`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("getAllCoachSubscriptions err => ", err);
    return err;
  }
};

export const getAllClubUserClients = async (clubUserId, token) => {
  try {
    const response = await fetch(
      `${API}/allClient?coach=${clubUserId}&person=admin`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("getAllCoachSubscriptions err => ", err);
    return err;
  }
};

export const addClubSubscription = async (payload, token) => {
  try {
    const response = await fetch(`${API}/addSubscription-admin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

// retrieve all contact from the backend
export const getContacts = async (token) => {
  try {
    const response = await fetch(`${API}/get-contact`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    return res;

  } catch (err) {
    return err.error || err.message;
  }
}

// retrieve all contact from the backend
export const getClubUserSubscriptions = async (clubUserId, token) => {
  try {
    const response = await fetch(`${API}/getAllClubSubscriptions?coachId=${clubUserId}&person=admin`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const res = await response.json();
    return res;

  } catch (err) {
    return err.error || err.message;
  }
}

export const sendNotificationAppCoaches = async (payload, token) => {
  try {
    const response = await fetch(`${API}/send-notification/coaches`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const sendNotificationAppClients = async (payload, token) => {
  try {
    const response = await fetch(`${API}/send-notification/clients`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const createSession = async (payload, token) => {
  try {
    const response = await fetch(`${API}/sessions`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const updateSession = async (payload, token) => {
  try {
    const response = await fetch(`${API}/sessions`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};

export const deleteSession = async (payload, token) => {
  try {
    const response = await fetch(`${API}/sessions`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return err;
  }
};