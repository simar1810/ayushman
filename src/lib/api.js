"use server";
const API_ENDPOINT = process.env.NEXT_PUBLIC_APP_API_ENDPOINT;

export async function fetchData(endpoint) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${endpoint}`, {
      cache: "no-store",
    });
    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error!",
    };
  }
}

export async function postData(endpoint, data) {
  try {
    const response = await fetch(`${API_ENDPOINT}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    return {
      success: false,
      message: error.message || "Internal Server Error!",
    };
  }
}

// create Razorpay instance
export async function createRazorpayOrder(data) {
  try {
    const response = await fetch(`${API_ENDPOINT}/app/razorpay/createOrder`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const res = await response.json();
    return res;
  } catch (err) {
    return err?.error || err.message;
  }
}

export async function addWebSubscription(data) {
  try {
    const response = await fetch(`${API_ENDPOINT}/web/new-subscription`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const res = await response.json();
    return res;
  } catch (err) {
    return err.error || err.message;
  }
}

export async function addWebSubscriptionEnquiry(data) {
  try {
    const response = await fetch(`${API_ENDPOINT}/web/pricing-enquiry`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    const res = await response.json();
    return res;
  } catch (err) {
    return err.error || err.message;
  }
}

export async function SendData(endpoint, data) {
  try {
    if (data instanceof FormData) {
      console.log("FormData entries:");
      for (const [key, value] of data.entries()) {
        if (value instanceof File) {
          console.log(
            `  ${key}: File(${value.name}, ${value.size} bytes, ${value.type})`
          );
        } else {
          console.log(`  ${key}: ${value}`);
        }
      }
    } else {
      console.log("JSON data:", data);
    }

    const requestOptions = {
      method: "POST",
      body: data instanceof FormData ? data : JSON.stringify(data),
    };

    if (!(data instanceof FormData)) {
      requestOptions.headers = {
        "Content-Type": "application/json",
      };
    }

    const response = await fetch(`${API_ENDPOINT}/${endpoint}`, requestOptions);

    const result = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      ...result,
    };
  } catch (error) {
    console.error("API call error:", error);
    return {
      success: false,
      message: error.message || "Internal Server Error!",
      ok: false,
      status: 500,
    };
  }
}
