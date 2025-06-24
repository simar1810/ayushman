"use client";

import { Button } from "@/components/ui/button";
import { postData } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Suspense, use, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  return <Suspense>
    <PageContainer />
  </Suspense>
}

function PageContainer() {
  const searchParams = useSearchParams();
  const coachId = searchParams.get("id");
  const [selectedDiet, setSelectedDiet] = useState("25")

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

  async function displayRazorpay() {
    const toastId = toast.loading("Please Wait....");
    try {
      const response = await postData("app/create-diet-order", {
        coachId: coachId,
        plan: selectedDiet,
        note: {
          AppId: "Ayushman",
          service: "coach_register_diet_plan"
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
          name: "Ayushman",
          description: "Payment for Ayushman",
          order_id: order.id,
          handler: async function (orderResponse) {
            toast.success("Payment Successful!");
            window.location.href = "https://www.ayushmanhealth.org/"
          },
          prefill: {
            name: "Ayushman",
            email: "abc@gmail.com",
          },
          theme: {
            color: "#036231",
          },
          retry: false,
          modal: {}
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
  if (!coachId) return <Suspense>
    <div className="max-w-7xl h-[70vh] mx-auto p-4 flex items-center justify-center">
      <h3 className="font-bold">No Coach ID found</h3>
    </div>
  </Suspense>

  return <Suspense>
    <div className="max-w-7xl h-[70vh] mx-auto p-4 flex items-center justify-center">
      <div>
        <label className="block">
          <p className="font-bold mb-2 pl-2">Select A diet plan</p>
          <select value={selectedDiet} onChange={e => setSelectedDiet(e.target.value)} className="w-64 border-1 px-4 py-2 rounded-[10px]">
            <option value="25">25 diet</option>
            <option value="50">50 diet</option>
            <option value="100">100 diet</option>
            <option value="150">150 diet</option>
            <option value="200">200 diet</option>
          </select>
        </label>
        <Button className="mt-2" size="sm" onClick={displayRazorpay}>Pay Now</Button>
      </div>
    </div>
  </Suspense>
}