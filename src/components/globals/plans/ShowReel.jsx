import { useEffect, useRef, useState } from "react"

export default function ShowReel() {
  const [state, setState] = useState("english");

  const SelectedComponent = (function () {
    switch (state) {
      case "english":
        return EnglishVideo;
      case "hindi":
        return HindiVideo;
      default:
        return SelectLanguage;
    }
  })();

  return <div className="hidden-block">
    <SelectedComponent
      setState={setState}
    />
    <div className="mt-4 flex items-cneter justify-center gap-4">
      <button
        className={`w-28 font-bold leading-[1.2] py-2 rounded-full border-2 border-[#67BC2A] ${state === "english" ? "text-white bg-[#67BC2A]" : "text-[#67BC2A]"}`}
        onClick={() => setState("english")}
      >
        English
      </button>
      <button
        className={`w-28 font-bold leading-[1.2] py-2 rounded-full border-2 border-[#67BC2A] ${state === "hindi" ? "text-white bg-[#67BC2A]" : "text-[#67BC2A]"}`}
        onClick={() => setState("hindi")}
      >
        Hindi
      </button>
    </div>
  </div>
}

function HindiVideo() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const playVideo = () => {
      iframeRef.current?.contentWindow?.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    };

    setTimeout(playVideo, 1000); // Delay to ensure iframe is loaded
  }, []);
  return <div className="max-w-[1200px] max-h-[600px] w-full h-full bg-black mx-auto relative aspect-video">
    <iframe
      ref={iframeRef}
      src="https://drive.google.com/file/d/1FSuELR2_mBMY--9Nnc4pC2L5EIGFE9hs/preview"
      width="640"
      height="480"
      allow="autoplay"
      className="absolute w-full h-full"
      allowFullScreen
    />
  </div>
}

function EnglishVideo() {
  return <div className="max-w-[1200px] max-h-[600px] w-full h-full bg-black mx-auto relative aspect-video">
    <iframe
      src="https://drive.google.com/file/d/1SLhAm_aK_0XgZ6Fn0GEB-uc2jwavNyEQ/preview"
      width="640"
      height="480"
      allow="autoplay"
      allowFullScreen
      className="absolute w-full h-full"
    />
  </div>
}

function SelectLanguage({
  setState
}) {
  const [chooseOptions, setChooseOptions] = useState(false);

  if (chooseOptions) return <div className="max-w-[1200px] max-h-[600px] w-full bg-black mx-auto flex items-center justify-center aspect-video">
    <div className="w-1/2 h-full flex items-center justify-center border-r-[1px] border-[#222222]">
      <button
        className="bg-white text-[12px] md:text-[16px] font-bold px-4 py-2 rounded-md"
        onClick={() => setState("english")}
      >
        English
      </button>
    </div>
    <div className="w-1/2 h-full flex items-center justify-center">
      <button
        className="bg-white text-[12px] md:text-[16px] font-bold px-4 py-2 rounded-md"
        onClick={() => setState("hindi")}
      >
        Hindi
      </button>
    </div>
  </div>

  return <div className="max-w-[1200px] max-h-[600px] w-full bg-black mx-auto flex items-center justify-center aspect-video">
    <button
      onClick={() => setChooseOptions(true)}
      className="bg-white font-bold px-4 py-2 rounded-md"
    >
      Select Language
    </button>
  </div>
}