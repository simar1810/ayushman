"use client";
import { Check } from "lucide-react";
import { useState } from "react";
import AutomationFlow from "@/components/globals/plans/AutomationFlow";
import { FaCheck } from "react-icons/fa6";
import { TbTrendingUp } from "react-icons/tb";
import RegisterUser from "./RegisterUser";
import ContactSalesTeam from "./ContactSalesTeam";
import { date_DDMMYYYY_string } from "@/lib/formatter";
import UpgradePlan from "@/components/globals/plans/UpgradePlan";
import Link from "next/link";

export default function Plan({
  plan,
  discounts,
  months,
  selectPlan,
  onShowDiscountModal,
  promo
}) {
  const [planSelected, setPlanSelected] = useState(false);

  return (
    <div
      className={`max-w-[400px] w-full mx-auto p-[4px] relative rounded-[24px] cursor-pointer ${planSelected && "mb-20 md:mb-0"}`}
      onClick={() => {
        setPlanSelected(true)
        selectPlan(plan)
      }}
    >
      <div className={`bg-white h-full rounded-[24px] flex flex-col ${plan.popular && "bg-[#67BC2A] border-[4px] border-[#67BC2A] md:scale-[1.05]"}`}>
        {plan.popular && (
          <div className="text-lg text-center text-[32px] bg-white text-[#67BC2A] font-bold px-4 py-3 rounded-t-[24px]">
            Most Popular
          </div>
        )}
        <div className={`grow flex flex-col p-6 ${plan.popular && "bg-[#67BC2A] text-white rounded-b-[20px]"}`}>
          <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
          <p className="text-sm mb-4">{plan.period}</p>
          <hr className="h-[2px] bg-black mb-4" />
          <ul className="space-y-2 mb-6">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start"
              >
                <Check className={`w-[20px] h-[20px] text-[14px] !leading-[1.3] text-[#67BC2A] mt-1 mr-2 ${plan.popular && "!text-white"}`} />
                {feature}
              </li>
            ))}
          </ul>
          {!plan.salesTeam
            ? <p className="text-2xl font-bold relative mt-auto">
              {`₹ ${plan.getPricing(discounts, months) * months}`}
            </p>
            : <button className="bg-[#67BC2A] text-white font-bold mt-auto py-3 rounded-md">
              Contact Sales Team
            </button>}
        </div>
      </div>
      <div className="md:hidden">
        {planSelected && <AutomationFlow
          discounts={promo.discountSelected}
          plan={plan}
          onShowDiscountModal={onShowDiscountModal}
          months={months}
        />}
      </div>
    </div>
  );
};

export function BasicCard({
  plan,
  discounts,
  months,
  selectedPlan,
  promo,
  selectPlan,
  onShowDiscountModal,
  id
}) {
  const [buttonOpened, setButtonOpened] = useState(false);

  return <div className="max-w-[400px] w-full md:w-[calc(50%-8px)] lg:w-[calc((100%-48px)/4)] flex flex-col ">
    <div
      onClick={() => selectPlan(plan.id)}
      className={`bg-[#FBFBFB] leading-[1.2] grow flex flex-col rounded-[20px] cursor-pointer select-none overflow-clip relative
         ${(selectedPlan === plan.id || plan.id === promo?.coachDoc?.planCode + 1) && "border-[1px] border-[var(--accent-1)] shadow-xl scale-[1.02]"}`}
    >
      {plan.id === promo?.coachDoc?.planCode + 1 && <div className="w-full bg-[#67BC2A33] text-center text-[var(--accent-1)] py-2 font-bold absolute top-0">
        Current Plan
      </div>}
      <div className="p-8 pt-10">
        <h3 className="text-center font-bold text-[32px] mb-1">{plan.title}</h3>
        <p className="text-[64px] font-semibold text-center mb-2">
          <span className="text-[20px]">₹</span>&nbsp;
          <span className="text-[64px]">{plan.getPricing(discounts, months, promo.code)}</span>
        </p>
        <p className="text-center mb-4">{plan.billing_type_text(months)}</p>
        <button
          onClick={() => setButtonOpened(true)}
          className="w-fit !bg-[var(--accent-1)] text-white font-semibold px-6 py-3 mx-auto mb-8 block rounded-md"
        >
          {plan.buttonText(Boolean(id))}
        </button>
        <p className="font-semibold mb-4">This Plan will Include:</p>
        <div className="text-[10px]">
          {plan.features.map((feature, index) => <div
            className="mb-0 flex items-center gap-2"
            key={index}
          >
            <FaCheck className="min-w-[20px] min-h-[20px] text-[var(--accent-1)]" />
            <p className="!text-[14px] !leading-[1.3] font-semibold">{feature}</p>
          </div>)}
        </div>
      </div>
      {plan.id === promo?.coachDoc?.planCode + 1 && <div className="text-[12px] text-[var(--accent-1)] text-center font-bold mx-4 mt-auto py-2 mb-2 border-t-2 border-[#67BC2A33]">
        Plan expires on {date_DDMMYYYY_string(promo?.coachDoc?.endDate)}
      </div>}
    </div>
    {buttonOpened && <RegisterUser
      promo={promo}
      plan={plan}
      onShowDiscountModal={onShowDiscountModal}
      discounts={discounts}
      onClose={() => {
        onShowDiscountModal()
        setButtonOpened(false)
      }}
      months={months}
      id={id}
    />}
    {id && <UpgradePlan
      promo={promo}
      plan={plan}
    />}
  </div>
}

export function ProPlan({
  plan,
  discounts,
  months,
  selectedPlan,
  promo,
  selectPlan,
  onShowDiscountModal,
  id
}) {
  const [buttonOpened, setButtonOpened] = useState(false);

  return <div className="max-w-[400px] w-full md:w-[calc(50%-8px)] lg:w-[calc((100%-48px)/4)] flex flex-col">
    <div
      onClick={() => selectPlan(plan.id)}
      className={`h-full !bg-[var(--accent-1)] text-white leading-[1.2] rounded-[20px] flex flex-col relative cursor-pointer select-none overflow-clip
        ${(selectedPlan === plan.id || plan.id === promo?.coachDoc?.planCode + 1) && "outline [1px] outline-offset-[-4px] outline-white border-white shadow-2xl scale-[1.02]"}`}
    >
      {plan.id === promo?.coachDoc?.planCode + 1 && <div className="w-full bg-[#B6F08A] text-black py-2 px-4 font-bold absolute top-0 z-[-1]">
        Current Plan
      </div>}
      <div className="bg-white text-[#03632C] text-[12px] font-bold px-2 py-1 flex items-center gap-2 rounded-md border-[2px] border-[#03632C] rounded-[10px] absolute top-3 right-3">
        <TbTrendingUp />
        Popular
      </div>
      <div className="w-full p-8 pt-10">
        <h3 className="text-center font-bold text-[32px] mb-1">{plan.title}</h3>
        <p className="text-[64px] font-semibold text-center mb-2">
          <span className="text-[20px]">₹</span>&nbsp;
          <span className="text-[64px]">{plan.getPricing(discounts, months, promo.code)}</span>
        </p>
        <p className="text-center mb-4">{plan.billing_type_text(months)}</p>
        <button
          onClick={() => setButtonOpened(true)}
          className="w-fit !text-[#67BC2A] bg-white font-semibold px-6 py-3 mx-auto mb-8 block rounded-md"
        >
          {plan.buttonText(Boolean(id))}
        </button>
        <p className="font-semibold mb-4">This Plan will Include:</p>
        <div>
          {plan.features.map((feature, index) => <div
            className="mb-0 flex items-center gap-2"
            key={index}
          >
            <FaCheck className="min-w-[20px] min-h-[20px] text-white" />
            <p className="!text-[14px] !leading-[1.3] font-semibold">{feature}</p>
          </div>)}
        </div>
      </div>
      {plan.id === promo?.coachDoc?.planCode + 1 && <div className="text-[12px] text-white text-center font-bold mx-4 mt-auto py-2 mb-2 border-t-2 border-white">
        Plan expires on {date_DDMMYYYY_string(promo?.coachDoc?.endDate)}
      </div>}
    </div>
    {buttonOpened && <RegisterUser
      promo={promo}
      plan={plan}
      onShowDiscountModal={onShowDiscountModal}
      discounts={discounts}
      onClose={() => {
        onShowDiscountModal()
        setButtonOpened(false)
      }}
      months={months}
      id={id}
    />}
    {id && <UpgradePlan
      promo={promo}
      plan={plan}
    />}
  </div>
}

export function Enterprise({
  plan,
  selectedPlan,
  selectPlan,
  id
}) {
  const [buttonOpened, setButtonOpened] = useState(false);
  return <div className="max-w-[400px] w-full md:w-[calc(50%-8px)] lg:w-[calc((100%-48px)/4)] flex flex-col">
    <div
      onClick={() => selectPlan(plan.id)}
      className={`bg-[#FBFBFB] text-black leading-[1.2] p-8 rounded-[20px] relative cursor-pointer select-none grow ${selectedPlan === plan.id && "border-[1px] border-[var(--accent-1)] shadow-xl scale-[1.02]"}`}
    >
      <h3 className="text-center font-bold text-[42px] mt-16 mb-6">{plan.title}</h3>
      <Link
        onClick={() => setButtonOpened(true)}
        href="https://wa.link/3jbqrn"
        target="_blank"
        className="w-fit !bg-[var(--accent-1)] text-white font-semibold px-6 py-3 mx-auto block rounded-md"
      >
        {plan.buttonText}
      </Link>
      <p className="font-semibold mt-4 md:mt-12 mb-4">This Plan will Include:</p>
      <div>
        {plan.features.map((feature, index) => <div
          className="mb-0 flex items-center gap-2"
          key={index}
        >
          <FaCheck className="min-w-[20px] min-h-[20px] text-[var(--accent-1)]" />
          <p className="!text-[14px] !leading-[1.3] font-semibold">{feature}</p>
        </div>)}
      </div>
    </div>
    {
      buttonOpened && <ContactSalesTeam
        onClose={() => setButtonOpened(false)}
      />
    }
    {id && <button className="mx-auto px-4 py-2 mt-4 text-transparent select-none">.</button>}
  </div>
}

