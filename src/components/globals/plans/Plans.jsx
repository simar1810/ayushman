import { useState } from "react";
import RegisterUser from "./RegisterUser";
import { plans } from "@/config/plan";
import { date_DDMMYYYY_string, getSubscriptionPlanType } from "@/lib/formatter";

export default function Plans({
  id,
  promo,
  onShowDiscountModal,
  plans
}) {
  const [months, setMonths] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(plans[0])

  return <div className="max-w-[1200px] mx-auto mt-10 mb-10 px-4">
    <h2 className="text-[24px] md:text-[40px] lg:text-[64px] text-center font-bold leading-[1.1]">
      {
        promo.discountSelected && id
          ? <>Renew your Plan with more discount!</>
          : <>Pick Your Plan</>
      }
    </h2>
    <p className="text-center font-semibold text-[20px] text-[#333333]">Plans To Grow Your Business</p>
    {promo?.coachDoc && <p className="text-center text-[12px] text-[#808080] font-bold">
      <span>Current Plan: {getSubscriptionPlanType(promo?.coachDoc?.planCode)}</span>&nbsp;&nbsp;|&nbsp;&nbsp;
      <span>Expires on: {date_DDMMYYYY_string(promo?.coachDoc?.endDate)}</span>
    </p>}
    <div className="mb-8 mt-4 md:mt-8 relative">
      <div className="w-fit bg-white font-bold mx-auto py-2 flex items-center justify-center rounded-full relative">
        <div className={`absolute w-24 h-full bg-[#67BC2A] rounded-full transition-all ease-linear duration-350 ${months === 1 ? "left-0" : "left-full translate-x-[-100%]"}`} />
        <button
          onClick={() => setMonths(1)}
          className={`w-24 text-[16px] text-center z-10 ${months === 1 && "text-white"}`}
        >
          Monthly
        </button>
        <button
          onClick={() => setMonths(12)}
          className={`w-24 text-[16px] text-center z-10 ${months === 12 && "text-white"}`}
        >
          Yearly
        </button>
      </div>
      <div className="text-[#03632C] text-[10px] md:text-[16px] font-bold absolute bottom-0 md:left-1/2 flex items-center gap-0 whitespace-nowrap translate-x-[150px] md:translate-x-[100px] translate-y-[80%] md:translate-y-0 left-[20%]">
        <img
          src="/arrow-curved.svg"
          alt=""
          className="w-[40px] h-[40px] md:translate-y-4"
        />
        Save Upto {promo.discountSelected ? "50%" : "35%"}
      </div>
    </div>
    <div className="mx-auto flex flex-wrap gap-10 md:gap-10 lg:gap-4 justify-center relative">
      {plans.map((plan, index) => (
        <plan.Component
          key={index}
          plan={plan}
          discounts={promo.discountSelected}
          months={months}
          selectPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
          promo={promo}
          onShowDiscountModal={onShowDiscountModal}
          id={id}
        />
      ))}
    </div>
    {!id && <SalesContact
      onShowDiscountModal={onShowDiscountModal}
      discounts={promo.discountSelected}
      months={months}
    />}
    {/* {!id && <Link
      to="/app"
      target="_blank"
      className="w-fit !bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 mx-auto rounded-xl"
    >
      Register Now
    </Link>} */}
    <p className="text-center font-semibold mt-2 md:mt-4">Note: No Credit Card Required to purchase these subscriptions</p>
  </div>
}

function SalesContact({
  onShowDiscountModal,
  discounts,
  months
}) {
  const [modalOpened, setModalOpened] = useState(false);
  return <>
    <button
      className="w-fit !bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 mx-auto rounded-xl"
      onClick={() => setModalOpened(true)}
    >
      Register Now
    </button>
    {modalOpened && <RegisterUser
      promo={promo}
      plan={plans[0]}
      onShowDiscountModal={onShowDiscountModal}
      discounts={discounts}
      onClose={() => {
        onShowDiscountModal()
        setModalOpened(false)
      }}
      months={months}
    />}
  </>
}