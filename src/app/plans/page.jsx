"use client";

import FacebookPixelEvents from "@/components/globals/core/FacebookPixelEvents";
import Modal from "@/components/globals/core/Modal";
import Plans from "@/components/globals/plans/Plans";
import ShowReel from "@/components/globals/plans/ShowReel";
import Testimonials from "@/components/globals/plans/Testimonials";
import WpExpiryButton from "@/components/globals/plans/WpExpiryButton";
import { afterWellnessZ, beforeWellnessZ, clientProgressData, dietPlansFeatures, faqs, plans, whyChooseUs } from "@/config/plan";
// import Lottie from "lottie-react";
import { Tag, X } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function Page() {
  const [minutes, setMinutes] = useState(8);
  const [discountModal, setDicountModal] = useState({
    opened: false,
    displayed: false
  });
  const [promo, setPromo] = useState({
    code: "WZCOACH",
    discountSelected: false,
  });

  function onCloseModal() {
    try {
      setDicountModal({
        displayed: true,
        opened: false
      });
      setMinutes(15);
      setPromo(() => ({
        code: "BEST100",
        discountSelected: true,
      }));
      if (typeof globalThis !== 'undefined') {
        globalThis.document.documentElement.style.setProperty("--display-style", "none");
      }
    } catch (error) {
    }
  }

  return <div id="plans-section">
    <Plans
      onShowDiscountModal={() => setDicountModal(prev => prev.displayed === true
        ? prev
        : ({
          ...prev,
          opened: true
        }))}
      promo={promo}
      plans={plans}
    />
  </div>

  return (
    <div className="w-screen">
      <WpExpiryButton />

      <FacebookPixelEvents />
      {/* HERO SECTION STARTS */}
      <div className="display-style">
        <div className="container mx-auto px-2 py-6 lg:p-6 pb-8 flex flex-col-reverse md:grid md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center ">
            <h1 className="md:max-w-[24ch] text-[40px] md:text-[72px] font-bold leading-[1] mb-2">
              Give Your Health Practice a Smarter Platform
            </h1>
            <p className="text-[14px] md:text-[30px] leading-[1] font-bold mb-4">
              Or You will lose clients
            </p>
            <p className="max-w-[56ch] text-[15px] md:text-[20px] mb-6">
              <span className="font-semibold">
                Struggling to keep track of meal plans, client progress, and follow-ups?
                WellnessZ is the all-in-one platform designed for&nbsp;
              </span>
              <span className="font-bold underline">
                dietitians, nutritionists, and health coaches to automate, grow, and streamline their practice with ease.
              </span>
            </p>
            <a
              href="#plans-section"
              // target="_blank"
              className="text-[20px] font-semibold border border-black rounded-full pl-4 pr-2 gap-x-2 py-2 flex items-center w-fit"
            >
              Register Now
              <span className="ml-2 !bg-[var(--accent-1)] text-white aspect-square h-8 text-lg -rotate-45 flex justify-center items-center rounded-full">
                →
              </span>
            </a>
            <div className="flex items-center mt-6">
              <div className="flex -space-x-2">
                {[
                  "/user-1.jpeg",
                  "/user-2.jpeg",
                  "/user-3.jpeg",
                  "/user-4.jpeg",
                ].map((item, index) => (
                  <div
                    key={index}
                    className="w-6 md:w-10 w-6 md:h-10 rounded-full relative rounded-full border-black border-2"
                  >
                    <img
                      src={item ?? "/"}
                      alt="User"
                      className="w-full h-full inset-0 object-cover rounded-full"
                    />
                  </div>
                ))}
              </div>
              <span className="ml-4 text-[10px] lg:text-[14px]">
                Trusted by 6000+ Nutrition & Health Professionals | 4.9★ App Store Rating
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-[#509613] to-[#FFFFFF] flex justify-center items-center relative h-[45vh] md:h-[640px] overflow-hidden rounded-[42px]">
            <img
              src="/banner.jpeg"
              alt="Phone"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* HERO SECTION ENDS */}

      {/* SHOW REEL SECTION STARTS */}
      <div className="display-style">
        <Suspense callback={<>loading</>}>
          <ShowReel />
        </Suspense>
      </div>
      {/* SHOW REEL SECTION ENDS */}

      {/* WHY CHOOSE US STARTS */}
      <div className="display-style max-w-[1200px] px-4 mx-auto my-10 md:my-20">
        <div>
          <h2 className="font-bold text-[24px] lg:text-[72px] text-center leading-[1]">
            Why do 6000+ Health Professionals use WellnessZ App?
          </h2>
          <p className="text-[#808080] text-[14px] md:text-[25px] text-center font-bold mt-2 text-gray-120">
            Because they get...
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <img
              src="/personalized-diet.png"
              className="w-full md:w-[45%] max-h-[300px] md:max-h-[400px] h-full aspect-square rounded-md object-cover"
            />
            <div className="md:max-w-[50%] leading-[1.2]">
              <h2 className="text-[20px] md:text-[32px] font-bold font-bold mb-4">
                Personalized Diet Plans Made Simple
              </h2>
              <p className="text-[16px] text-[#333333] font-semibold mb-4">
                Take control of your clients' nutrition needs with WellnessZ!
              </p>
              {dietPlansFeatures.map((item) => (
                <div className="mb-4 flex items-center gap-4" key={item}>
                  <FaCheckCircle className="min-w-[20px] min-h-[20px] text-[var(--accent-1)]" />
                  <p className="text-[10px] md:text-[16px] text-[#333333] font-semibold">
                    {item}
                  </p>
                </div>
              ))}
              <a href="#plans-section" className="w-fit !!bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 rounded-xl">
                Register Now
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10">
            <img
              src="/client-progress.png"
              className="w-full md:w-[45%] max-h-[300px] md:max-h-[400px] h-full aspect-square rounded-md object-cover"
            />
            <div className="md:max-w-[50%] leading-[1.2]">
              <h2 className="text-[20px] md:text-[32px] font-bold font-bold mb-4">
                Generate client progress reports
              </h2>
              <p className="text-[16px] text-[#333333] font-semibold mb-4">
                Stay on top of your clients' success with WellnessZ's powerful
                progress tracking & reporting tools!
              </p>
              {clientProgressData.map((item) => (
                <div className="mb-4 flex items-center gap-4" key={item}>
                  <FaCheckCircle className="min-w-[20px] min-h-[20px] text-[var(--accent-1)]" />
                  <p className="text-[10px] md:text-[16px] text-[#333333] font-semibold">
                    {item}
                  </p>
                </div>
              ))}
              <a href="#plans-section" className="w-fit !!bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 rounded-xl">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}

      {/* WHY CHOOSE US ENDS */}

      {/* FEATURES SECTION STARTS */}
      <div className="display-style max-w-[1200px] bg-white mx-auto p-4 md:p-8 rounded-md">
        <h2 className="text-[24px] md:text-[40px] lg:text-[64px] text-center font-bold leading-[1.1]">
          And Many More Features
        </h2>
        <div className="mt-4 lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-2 gap-y-0.5">
          {whyChooseUs.map((item) => (
            <div key={item.id} className="w-full text-center">
              <div className="w-full md:w-[124px] md:h-[174px] rounded-full mx-auto lg:mb-4 relative aspect-square">
                <img
                  src={item.thumbnail ?? "/"}
                  className="bg-red-2 00 absolute block w-full h-full left-1/2 translate-x-[-50%] top-1/2 translate-y-[-50%] object-cover"
                  alt=""
                />
              </div>
              <p className="text-[18px] lg:text-[20px] text-center font-bold leading-[1] mb-1 mx-auto translate-y-[-20px]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* FEATURES SECTION ENDS */}

      {/* IMPACT SECTION STARTS */}
      <div className="display-style pt-2 pb-8 mt-6 lg:mt-20 rounded-xl max-w-[1024px] mx-auto">
        <h2 className="text-[24px] lg:text-[50px] text-center font-bold leading-[1] px-4 md:px-8 mb-4 md:mb-8">
          See the Difference WellnessZ Makes!
        </h2>
        <div className="bg-white px-2 md:px-8 py-4 md:py-8">
          <div className="flex flex-row w-full gap-x-4 !bg-[var(--accent-1)] py-4 rounded-xl">
            <h2 className="text-white text-[14px] lg:text-[20px] font-semibold flex-1 text-center">
              Before using WellnessZ
            </h2>
            <h2 className="text-white text-[14px] lg:text-[20px] font-semibold flex-1 text-center">
              After using WellnessZ
            </h2>
          </div>
          <div className="space-y-0">
            <div className="pt-2 flex justify-between">
              <div className="flex-1 text-center">
                <img
                  src="/men-1.png"
                  alt="Before transformation"
                  className="max-w-[400px] max-h-[400px] w-full h-full mx-auto object-cover"
                />
              </div>
              <div className="max-w-[50px] text-[#81bc3b] flex items-center">
                {/* <Lottie src="/animations/animation.json" loop={true} /> */}
              </div>
              <div className="flex-1 text-center">
                <img
                  src="/men-2.png"
                  alt="After transformation"
                  className="max-w-[400px] max-h-[350px] w-full h-full mx-auto object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between lg:gap-4 !bg-[var(--accent-1)] rounded-2xl shadow-[rgba(129,188,59,0.2)] shadow-lg">
              <div className="flex-1 rounded-lg p-2 lg:p-6">
                {beforeWellnessZ.map((item) => (
                  <p
                    key={item.id}
                    className="text-[12px] md:text-[10px] lg:text-[16px] text-white font-bold text-left"
                  >
                    {" "}
                    • &nbsp;{item.text}
                  </p>
                ))}
              </div>
              <div className="w-[1px] bg-[#81bc3b] h-[60px] my-auto" />
              <div className="flex-1 rounded-lg p-2 lg:p-6">
                {afterWellnessZ.map((item) => (
                  <p
                    key={item.id}
                    className="text-[12px] md:text-[10px] lg:text-[16px] text-white font-bold text-left"
                  >
                    {" "}
                    • &nbsp;{item.text}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex justify-center items-centre ">
              <a href="#plans-section" className="w-fit !bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 rounded-xl">
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* IMPACT SECTION ENDS */}

      {/* PRICING SECTION STARTS */}
      <div className="pt-0">
        <div className="container mx-auto px-6">
          <PromoTimer
            minutes={minutes}
            setMinutes={setMinutes}
            promo={promo}
            onChange={value => setPromo(prev => ({ ...prev, code: value }))}
          />
        </div>
      </div>
      {/* PRICING SECTION EDNS */}

      <div id="plans-section">
        <Plans
          onShowDiscountModal={() => setDicountModal(prev => prev.displayed === true
            ? prev
            : ({
              ...prev,
              opened: true
            }))}
          promo={promo}
          plans={plans}
        />
      </div>

      {/* FEATURES SECTION STARTS */}
      <Suspense callback={<>Loading</>}>
        <Testimonials />
      </Suspense>
      {/* FEATURES SECTION ENDS */}

      <a href="#plans-section" className="w-fit !bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 mx-auto rounded-xl">
        Register Now
      </a>

      <FAQ />

      <a href="#plans-section" className="w-fit !bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 my-4 mx-auto rounded-xl">
        Register Now
      </a>

      {/* FOOTER SECTION ENDS */}

      {discountModal.opened && (
        <DiscountModal
          onClose={onCloseModal}
        />
      )}
      {/* <FacebookPixelEvents /> */}
    </div>
  );
}

function PromoTimer({
  minutes,
  promo,
  onChange
}) {
  const [code, setCode] = useState(promo.code)
  const [timeLeft, setTimeLeft] = useState(0);

  function updateThePromoCode() {
    onChange(code);
    if (code !== promo.code) setTimeLeft(0)
  }

  useEffect(() => {
    setTimeLeft(minutes * 60);
  }, [minutes]);

  useEffect(
    function () {
      const interval = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : minutes * 60));
      }, 1000);
      return () => clearInterval(interval);
    },
    [minutes]
  );

  return (
    <div className="bg-[#EFEFEF] rounded-xl p-6 md:mb-8 md:max-w-[60%] max-w-[100%] mx-auto relative px-4 mt-8 md:px-10">
      <div className="bg-white rounded-full aspect-square h-[40px] md:h-[80px] absolute top-[calc(50%-20px)] md:top-[calc(50%-40px)] -left-[20px] md:-left-[50px] z-10"></div>
      <div className="bg-white rounded-full aspect-square h-[40px] md:h-[80px] absolute top-[calc(50%-20px)] md:top-[calc(50%-40px)] -right-[20px] md:-right-[50px] z-10"></div>
      {promo && (
        <div className="flex items-center gap-2 mb-4">
          <Tag className="text-[#81bc3b]" size={24} />
          <span className="text-[16px] lg:xl font-bold">
            Limited Time Offer! Apply the code to save big!
          </span>
        </div>
      )}
      <hr className="h-[3px] !bg-[var(--accent-1)] mb-4" />
      <div className="px-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20 lg:h-[90px]">
        <input
          className="w-full h-[calc(100%-16px)] bg-[#F5F5F5] text-[20px] text-black font-bold py-3 mb-2 flex items-center rounded-lg px-4"
          value={code}
          onChange={e => setCode(e.target.value)}
        />

        <button onClick={updateThePromoCode} className="bg-[#81bc3b] z-20 rounded-xl px-6 py-3 max-h-full flex flex-col items-center min-w-[120px]">
          <span className="text-3xl text-white font-semibold flex flex-row items-center">
            <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(Math.floor(timeLeft % 60)).padStart(2, "0")}</span>
          </span>
          <span className="font-bold text-white text-[20px]">Apply</span>
          {/* <div className="flex text-xs gap-2">
            <span>Minutes</span>
            <span>Seconds</span>
          </div> */}
        </button>
      </div>
    </div>
  );
}

function FAQ() {
  const [openedFaq, setOpenedFaq] = useState(1);

  return (
    <div className="max-w-[1200px] mx-auto bg-white py-12 px-4 my-4">
      <h2 className="text-4xl font-bold text-center mb-2">
        Questions asked by Coaches:
      </h2>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <img src="/mockup.png" className="max-h-[80vh] object-center" />
        <div className="container mx-auto px-6">
          <div className="w-full flex flex-row items-center select-none">
            <div className="w-full max-w-2xl mx-auto space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.id}
                  className={`pb-6 cursor-pointer ${item.id !== 3 && "border-b-2 border-[#6DBF0D31]"
                    }`}
                  onClick={() => setOpenedFaq(item.id)}
                >
                  <h3 className="text-[rgb(129,189,59)] text-[16px] md:text-[24px] font-bold">
                    {item.question}
                  </h3>
                  {item.id === openedFaq && (
                    <p className="text-gray-400 mt-4">{item.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DiscountModal({ onClose }) {
  return (
    <Modal
      onClose={onClose}
      className="text-black px-4 flex items-center justify-center"
    >
      <div className="max-w-[800px] w-full max-h-[80vh] bg-white p-4 rounded-md relative overflow-y-auto">
        <X
          onClick={onClose}
          strokeWidth={3}
          className="w-[20px] h-[20px] text-black absolute top-4 right-4 cursor-pointer"
        />
        <h1 className="font-bold text-center text-[24px] md:text-[32px]">
          Kya Aap Jaante Hain?
        </h1>
        <div className="md:flex gap-8 mt-4 px-4">
          <div className="space-y-6">
            <div>
              <p className="text-lg">
                <span className="font-bold text-xl">70%</span>&nbsp;
                users jo apna WellnessZ plan shuru karte hain&nbsp;
                <span className="font-bold">apna pehla customer sirf 1 week mein</span>&nbsp;
                convert kar lete hain.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl">
              <p className="text-lg">
                Hamara lakshya hai aapko safalta dilana&nbsp;
                <span className="font-bold">isliye hum aapke Personalized Plan</span>&nbsp;
                par ek additional discount offer kar rahe hain.
              </p>
            </div>

            <p className="text-sm text-gray-500">
              * Based on the data of users who log their progress in the app
            </p>
          </div>

          {/* <img
            src="/"
            alt="image"
            className="w-full md:w-[35%] bg-black my-4 object-contain"
          /> */}
        </div>
        <button
          className="w-fit bg-[#6DBF0D] text-white font-bold px-4 py-2 mt-4 mx-auto block rounded-md"
          onClick={() => {
            onClose();
          }}
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}