import { postData } from "@/lib/api";
import toast from "react-hot-toast";

export default function UpgradePlan({
  promo,
  plan
}) {

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

  async function handleVerifyPayment(orderResponse, amount, coachId) {
    const toastId = toast.loading("Verifying Payment. Please wait do not close the window");
    try {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = orderResponse;
      const data = {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount,
        coachId,
        planCode: plan.id - 1
      }
      const response = await postData("app/subscription-upgrade", data);
      if (response.success) {
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

  async function displayRazorpay() {
    const toastId = toast.loading("Please Wait....");
    try {
      const response = await postData("app/create-order/subscription-upgrade", {
        notes: { AppId: "WellnessZ" },
        coachId: promo?.coachDoc?.coachId,
        planCode: plan.id - 1
      });
      if (response.success) {
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
            handleVerifyPayment(orderResponse, amount, promo?.coachDoc?.coachId);
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
              // onShowDiscountModal();
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
  if (promo?.coachDoc?.planCode < plan.id - 1) return <button
    onClick={displayRazorpay}
    className="w-fit !bg-[var(--accent-1)] text-white text-center font-semibold mx-auto px-4 py-2 mt-4 block rounded-md"
  >
    Upgrade
  </button>

  return <button className="mx-auto px-4 py-2 mt-4 text-transparent select-none">.</button>
}