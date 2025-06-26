"use client"
import { Loader, Tag, X } from "lucide-react";
import ShowReel from "@/components/globals/plans/ShowReel";
import {
  afterWellnessZ,
  beforeWellnessZ,
  clientProgressData,
  dietPlansFeatures,
  faqs,
  plans,
  whyChooseUs,
} from "@/config/plan";
import { useEffect, useState } from "react";
import Plans from "@/components/globals/plans/Plans";
import Modal from "@/components/globals/core/Modal";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import { fetchData } from "@/lib/api";
import { useParams, useSearchParams } from "next/navigation";
import WpExpiryButton from "@/components/globals/plans/WpExpiryButton";

export default function Page() {
  const [minutes, setMinutes] = useState(8);
  const [discountModal, setDicountModal] = useState({
    opened: false,
    displayed: false,
  });
  const [promo, setPromo] = useState({
    code: "WZCOACH",
    discountSelected: true,
    susbcriptionType: "start",
    coachDoc: null
  });
  const [fetchingState, setFetchingState] = useState("loding");

  const { id } = useParams();

  const buttonText = promo.susbcriptionType === "renew"
    ? "Renew your plan"
    : "Buy new subcription"

  async function retrieveData() {
    try {
      setFetchingState("loading");
      const response = await fetchData(`app/subscription-status/${id}`);
      if (!response.success) throw new Error("No such coach found!");
      if (response?.data?.hasSubscriptionDoc) {
        setPromo(prev => ({ ...prev, susbcriptionType: "renew", coachDoc: response?.data?.doc }));
      }
      setFetchingState("fetched");
    } catch (error) {
      setFetchingState("error");
      toast.error(error.message);
    }
  }

  useEffect(function () {
    ; (async function () {
      await retrieveData();
      setTimeout(() => {
        const section = document.getElementById("plans-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    })();
  }, []);

  if (fetchingState === "loading") return <div className="w-full h-screen flex items-center justify-center">
    <Loader className="animate-spin" />
  </div>

  return (
    <div className="w-screen bg-[#F5F5F5]">
      <WpExpiryButton />
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
              className="text-[20px] font-semibold border border-black rounded-full pl-4 pr-2 gap-x-2 py-2 flex items-center w-fit"
            >
              {buttonText}
              <span className="ml-2 bg-[var(--accent-1)] text-white aspect-square h-8 text-lg -rotate-45 flex justify-center items-center rounded-full">
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
        <ShowReel />
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
              <a href="#plans-section" className="w-fit bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 rounded-xl">
                {buttonText}
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
              <a href="#plans-section" className="w-fit bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 rounded-xl">
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>

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
                  className="bg-red-2 00 absolute block w-full h-full object-cover"
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
          <div className="flex flex-row w-full gap-x-4 bg-[var(--accent-1)] py-4 rounded-xl">
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
                {/* <Lottie animationData={"/animations/animation.json"} loop={true} /> */}
              </div>
              <div className="flex-1 text-center">
                <img
                  src="/men-2.png"
                  alt="After transformation"
                  className="max-w-[400px] max-h-[350px] w-full h-full mx-auto object-contain"
                />
              </div>
            </div>
            <div className="flex justify-between lg:gap-4 bg-[var(--accent-1)] rounded-2xl shadow-[rgba(129,188,59,0.2)] shadow-lg">
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
              <a href="#plans-section" className="w-fit bg-[var(--accent-1)] text-white font-bold block px-4 py-3 md:mt-8 mt-4 rounded-xl">
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* IMPACT SECTION ENDS */}

      {/* PRICING SECTION STARTS */}
      <div className="pt-12">
        <div className="container mx-auto px-6">
          <h1 className="text-2xl md:text-5xl font-bold text-center mb-12 ">
            {buttonText}
          </h1>
          <PromoTimer minutes={minutes} promo={promo} />
        </div>
      </div>
      {/* PRICING SECTION EDNS */}
      <div id="plans-section">
        <Plans
          onShowDiscountModal={() => setDicountModal(prev => prev.displayed === true
            ? prev
            : ({ ...prev, opened: true }))}
          promo={promo}
          id={id}
          plans={plans.slice(1)}
        />
      </div>

      <FAQ />

      {/* FOOTER SECTION STARTS */}
      {/* <footer className="w-[100%] flex flex-col bg-white text-black px-8 xl:px-20 py-6 md:text-[0.8rem] ">
        <div className="flex gap-20 md:gap-6 lg:gap-0 flex-wrap justify-between py-12 ">
          <div className="flex flex-col gap-3 w-full md:w-[25%]">
            <div className="w-fit bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-md border- 2 border-[]">
              <img src="/logo.svg" alt="logo" className="w-12 md:w-16" />
            </div>
            <p className="max-w-[36ch] text-[18px]">
              © 2025 Mohi Lifestile Solutions Private Limited ® | All Rights
              Reserved
              <br /> Made with Love
            </p>
            <div className="flex gap-4 cursor-pointer text-[1.1rem] text-[#67BC2A] ">
              <Link href="https://www.facebook.com/profile.php?id=61553253021745&mibextid=ZbWKwL/">
                <FaFacebookF />
              </Link>
              <Link href="https://instagram.com/wellnessz_official?igshid=MzMyNGUyNmU2YQ==">
                <FaInstagram />
              </Link>
              <Link href="https://www.linkedin.com/company/wellnessz/">
                <FaLinkedinIn />
              </Link>
              <Link href="https://www.youtube.com/@WellnessZ-oe4xk">
                <FaYoutube />
              </Link>
            </div>
          </div>


          <div className="hidden md:flex flex-col gap-2">
            <h1 className="md:mb-4 opacity-100 font-bold text-white">
              Support
            </h1>
            <Link
              target="_blank"
              href="https://wa.link/3jbqrn"
              className="text-[18px]"
            >
              Help center
            </Link>
            <Link
              target="_blank"
              href="https://forms.gle/nv2VgTgGChLW2gBW6"
              className="text-[18px]"
            >
              Feedback Form
            </Link>
            <Link
              target="_blank"
              href="https://forms.gle/9d5p8VvQUGM9kKuWA"
              className="text-[18px]"
            >
              Report a bug
            </Link>
          </div>
          <div className="text-[16px] flex flex-col gap-3">
            <h1 className="md:mb-4 opacity-100 font-bold text-white">
              Contact us
            </h1>
            <Link
              href="mailto:support@wellnessz.in"
              className=" flex items-center gap-3"
            >
              <FaRegEnvelope /> support@wellnessz.in
            </Link>
            <Link href="tel:+917888624347" className=" flex items-center gap-3">
              <FaPhoneAlt /> +91 7888624347
            </Link>
            <Link
              href="https://www.google.com/maps/search/?api=1&query=B-689-690%2C%20New%20Amritsar%2C%20Amritsar%2C%20Punjab%2C%20143001"
              className=" flex items-center gap-3"
            >
              <FaLocationDot /> Amritsar, Punjab, India
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 items-center justify-between border-t-2 pt-6 mt-4 border-gray-500">
          <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
            <span className="px-2 opacity-70">All Rights Reserved</span>
            <div className="text-[0.9rem] md:text-[0.8rem]">
              <Link
                target="_blank"
                href="https://www.wellnessz.in/terms-and-conditions"
                className="text-[#67BC2A] px-2 border-x-2 cursor-pointer border-gray-500"
              >
                Terms and Conditions
              </Link>
              <Link
                target="_blank"
                href="https://www.wellnessz.in/privacy-policy"
                className="text-[#67BC2A] px-2 cursor-pointer "
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer> */}
      {/* FOOTER SECTION ENDS */}
      {discountModal.opened && (
        <DiscountModal
          onClose={() => {
            setDicountModal({
              displayed: true,
              opened: false
            });
            setMinutes(15);
            setPromo(() => ({
              code: "BEST100",
              discountSelected: true,
            }));
            document.documentElement.style.setProperty("--display-style", "none")
          }}
        />
      )}
    </div>
  );
}

function PromoTimer({ minutes, promo }) {
  const [timeLeft, setTimeLeft] = useState(0);

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
    <div className="bg-white rounded-xl p-6 md:mb-8 md:max-w-[60%] max-w-[100%] mx-auto relative px-4 md:px-10">
      <div className="bg-[#F5F5F5] rounded-full aspect-square h-[40px] md:h-[80px] absolute top-[calc(50%-20px)] md:top-[calc(50%-40px)] -left-[20px] md:-left-[50px] z-10"></div>
      <div className="bg-[#F5F5F5] rounded-full aspect-square h-[40px] md:h-[80px] absolute top-[calc(50%-20px)] md:top-[calc(50%-40px)] -right-[20px] md:-right-[50px] z-10"></div>
      {promo && (
        <div className="flex items-center gap-2 mb-4">
          <Tag className="text-[#81bc3b]" size={24} />
          <span className="text-[10px] lg:xl font-bold">
            Limited Time Offer! Apply the code to save big!
          </span>
        </div>
      )}
      <hr className="h-[3px] bg-[var(--accent-1)] mb-4" />
      <div className="px-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20 lg:h-[90px]">
        <div className="w-full min-h-16 h-[calc(100%-16px)] bg-[#F5F5F5] text-[20px] text-black font-bold flex items-center rounded-lg px-4">
          {promo.code}
        </div>
        <div className="bg-[#81bc3b] z-20 rounded-xl px-6 py-3 max-h-full flex flex-col items-center min-w-[120px]">
          <span className="text-3xl text-white font-semibold flex flex-row items-center">
            <span>{String(Math.floor(timeLeft / 60)).padStart(2, "0")}</span>
            <span>:</span>
            <span>{String(Math.floor(timeLeft % 60)).padStart(2, "0")}</span>
          </span>
          <div className="flex text-xs gap-2">
            <span>Minutes</span>
            <span>Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQ() {
  const [openedFaq, setOpenedFaq] = useState(1);

  return (
    <div className="max-w-[1200px] mx-auto bg-white py-12 px-4 my-20">
      <h2 className="text-4xl font-bold text-center mb-12">People often Ask</h2>
      <div className="flex flex-col items-center justify-center md:flex-row">
        <img src="/mockup.png" className="max-h-[80vh] object-contain" />
        <div className="container mx-auto px-6">
          <div className="w-full flex flex-row items-center select-none">
            <div className="w-full max-w-2xl mx-auto space-y-6">
              {faqs.map((item) => (
                <div
                  key={item.id}
                  className={`pb-6 cursor-pointer ${item.id !== 3 && "border-b-2 border-[#6DBF0D31]"}`}
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