import { useState } from "react";
import RegisterUser from "./RegisterUser";
import ContactSalesTeam from "./ContactSalesTeam";

export default function AutomationFlow({
  discounts,
  plan,
  onShowDiscountModal,
  months,
  id
}) {
  const [stage, setStage] = useState("");

  const registrationType = (function () {
    switch (plan?.id) {
      case 1:
        return () => setStage("register");
      case 2:
        return () => setStage("register");
      case 3:
        return () => setStage("register");
      case 4:
        return () => setStage("contact")
      default:
        return () => { };
    }
  })();

  const buttonText = (function () {
    switch (plan.id) {
      case 4:
        return "Contact Now"
      case 3:
        return "Buy Now"
      case 2:
        return "Buy Now"
      case 1:
        return "Register Now"
      default:
        return "Register Now";
    }
  })();

  return <>
    {!id && <button
      className="!bg-[var(--accent-1)] text-white font-bold leading-[1.4] px-4 py-3 mt-4 md:mt-8 rounded-xl mx-auto block"
      onClick={registrationType}
    >
      Register Now
    </button>}
    {stage === "register" && <RegisterUser
      plan={plan}
      onShowDiscountModal={onShowDiscountModal}
      discounts={discounts}
      onClose={() => {
        setStage("");
        onShowDiscountModal();
      }}
      months={months}
      id={id}
    />}
    {stage === "contact" && <ContactSalesTeam
      onClose={() => {
        setStage("");
        onShowDiscountModal();
      }}
    />}
  </>
}