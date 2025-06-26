import { useState } from "react";
import toast from "react-hot-toast";
import { registerFormData } from "@//config/plan";
import { postData } from "@/lib/api";
import FormControl from "@/components/globals/core/FormControl";
import Modal from "@/components/globals/core/Modal";
import { useRouter } from "next/navigation";

export default function RegisterUser({
  promo,
  plan,
  onClose,
  onShowDiscountModal,
  discounts,
  months,
  id
}) {
  const [stage, setStage] = useState("request-otp");
  const [coachData, setCoachData] = useState({});

  const router = useRouter();

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function addFreeTrialSubscription(coachId) {
    const toastId = toast.loading("Verifying Payment. Please wait do not close the window");
    try {
      const data = {
        planType: "free-trial",
        coachId
      }
      const response = await postData(`app/purchase-page/add-subscription`, data);
      if (response.status_code === 200) {
        toast.success(response.message || "Payment Successful!");
        window.location.href = "https://wellnessz.in/app"
      } else {
        toast.error(response.message || "Please Try Again Later!");
      };
    } catch (error) {
      toast.error(error.message);
    } finally {
      toast.dismiss(toastId);
    }
  }

  async function handleVerifyPayment(orderResponse, amount, coachId) {
    const toastId = toast.loading("Verifying Payment. Please wait do not close the window");
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = orderResponse;
      const data = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        planType: plan.plan_type(discounts, months, promo.code),
        number: coachData?.number?.slice(3),
        amount,
        coachId
      }
      const response = await postData(`app/purchase-page/add-subscription`, data);
      if (response.status_code === 200) {
        toast.success(response.message || "Payment Successful!");
        window.location.href = "https://wellnessz.in/app"
      } else {
        toast.error(response.message || "Please Try Again Later!");
      };
    } catch (error) {
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };

  async function displayRazorpay(coachId) {
    const toastId = toast.loading("Please Wait....");
    try {
      const response = await postData(`app/create-order/custom/${plan.plan_type(discounts, months, promo.code)}`, {
        note: {
          AppId: "WellnessZ",
          coachId: coachId,
          planType: plan.plan_type(discounts, months, promo.code),
          service: "app_coach_subscription"
        },
      });
      if (response.status_code === 200) {
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        toast.dismiss(toastId);

        if (!res) throw new Error("RazorPay failed to load");
        const { amount, ...order } = response.data;

        const options = {
          image: "/White.png",
          key: process.env.NEXT_PUBLIC_RAZORPAY_API_KEY,
          amount: amount.toString(),
          note: order.notes,
          currency: order.currency,
          name: "WellnessZ",
          description: "Payment for WellnessZ",
          order_id: order.id,
          handler: async function (orderResponse) {
            toast.success("Payment Successful!");
            window.location.href = "https://wellnessz.in/app"
            // handleVerifyPayment(orderResponse, amount, coachId);
          },
          prefill: {
            name: "WellnessZ",
            email: "abc@gmail.com",
          },
          theme: {
            color: "#036231",
          },
          retry: false,
          modal: {
            ondismiss: function () {
              onShowDiscountModal();
              onClose();
            },
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (paymentResponse) {
          toast.error("OOPS! Payment Failed!");
        });
        paymentObject.on("modal.close", function (paymentResponse) {
          toast.error("OOPS! Payment Failed!");
        });
      } else {
        toast.error(response.message)
      }
    } catch (err) {
      toast.error(err.message || "Payment Failed! Try Again!");
    }
    toast.dismiss(toastId);
  };

  const afterVerification = (function () {
    if (id) return displayRazorpay(id);
    switch (plan.id) {
      case 1:
        return addFreeTrialSubscription;
      default:
        return displayRazorpay;
    }
  })();

  async function registerUser(e) {
    e.preventDefault();
    try {
      const data = {
        name: e.currentTarget.name.value,
        credential: `+91${e.currentTarget.phone.value.replaceAll(" ", "")}`,
      }
      if (!data.name) throw new Error("Please enter Name")
      if (!data.credential || data.credential.length !== 13) throw new Error("Phone Number should be 10 digits in length!");
      const response = await postData(`app/signin?authMode=mob&isFromWeb=true`, data);
      if (response?.data?.isFirstTime === false) {
        router.push(`/plans/${response?.data?.user?._id}`);
        return
      }
      if (response.status_code !== 200) throw new Error(response?.message);
      afterVerification(response?.data?.user?._id);
      toast.success(response.message || "We will contact you soon!");
    } catch (error) {
      toast.error(error.message ?? "Please try again later!");
    }
  }

  async function verifyOTP(e) {
    e.preventDefault();
    try {
      const data = {
        otp: e.currentTarget.otp.value,
        mobileNumber: coachData.number.slice(3)
      }
      const response = await postData(`app/verifyOtp`, data);
      if (response.status_code !== 200) throw new Error(response?.error);
      toast.success(response.message || "We will contact you soon!");
      setStage(_ => "");
      afterVerification(response._id);
    } catch (error) {
      toast.error(error.message ?? "Please try again later!");
    }
  }

  if (stage === "request-otp" && !id) return <Modal
    open={true}
    className="px-4 flex items-center justify-center"
    onClose={onClose}
  >
    <form
      onSubmit={registerUser}
      className="max-w-[550px] w-full bg-white p-8 rounded-[20px]"
    >
      <h2 className="font-bold text-[20px] md:text-[28px] leading-[1.2] mb-12">Let's Get Started With <span className="text-[var(--accent-1)]">WellnessZ</span></h2>
      {registerFormData.map(config => <FormControl
        key={config.id}
        {...config}
      />
      )}
      <button className="!bg-[var(--accent-1)] text-white text-[16px] font-bold leading-[1] py-2 px-4 mt-4 rounded-md">Register</button>
    </form>
  </Modal>

  if (stage === "verify-otp") return <Modal
    open={true}
    className="px-4 flex items-center justify-center"
    onClose={onClose}
  >
    <form
      onSubmit={verifyOTP}
      className="max-w-[550px] w-full bg-white p-8 rounded-[20px]"
    >
      <h2 className="font-bold text-[20px] md:text-[28px] leading-[1.2] mb-12">Let's Get Started With <span className="text-[var(--accent-1)]">WellnessZ</span></h2>
      <FormControl
        title="OTP"
        name="otp"
        placeholder="Enter OTP"
      />
      <button className="!bg-[var(--accent-1)] text-white text-[16px] font-bold leading-[1] py-2 px-4 mt-4 rounded-md">Get OTP</button>
    </form>
  </Modal>
}