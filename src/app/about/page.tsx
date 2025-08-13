"use client";
import { assets } from "@/pub/assets/assets_frontend";
import Image from "next/image";
import textContent from "@/AppContent.json";
import TextAnimator from "@/components/TextAnimator";
import { FaHeartbeat, FaHospitalUser, FaLaptopMedical } from "react-icons/fa";

const content = textContent.about;

export default function Page() {
  return (
    <div className="flex-center lg:!items-start flex-col lg:flex-row gap-5">
      {/* About Image */}
      <Image
        className="bg-[var(--surface)] rounded-lg w-[80%] lg:w-[30%]"
        src={assets.about_image}
        alt={"image"}
      />

      {/* Info Cards */}
      <div className="flex-center items-start flex-row flex-wrap gap-5 lg:w-[65%] w-full ">
        
        {/* Card 1 */}
        <div className="bg-white overflow-hidden pb-5 rounded-lg shadow-lg shadow-black w-full lg:w-[97%] flex flex-col items-start gap-3">
          <div className="w-full flex-center py-5 bg-indigo-100 border-b-2 border-indigo-200">
            <FaHospitalUser className="text-indigo-600 text-[35px]" />
          </div>
          <TextAnimator
            text={content.mainText1}
            animation={"chuncks"}
            className={"text-[20px] font-bold text-indigo-800 px-5"}
          />
        </div>

        {/* Card 2 */}
        <div className="bg-white overflow-hidden pb-5 rounded-lg shadow-lg shadow-black w-full lg:w-[47%] flex flex-col items-start gap-3">
          <div className="w-full flex-center py-5 bg-green-100 border-b-2 border-green-200">
            <FaLaptopMedical className="text-green-600 text-[35px]" />
          </div>
          <TextAnimator
            text={content.mainText2}
            animation={"chuncks"}
            className={"text-[20px] font-bold text-green-800 px-5"}
          />
        </div>

        {/* Card 3 */}
        <div className="bg-white overflow-hidden pb-5 rounded-lg shadow-lg shadow-black w-full lg:w-[47%] mb-10 flex flex-col items-start gap-3">
          <div className="w-full flex-center py-5 bg-pink-100 border-b-2 border-pink-200">
            <FaHeartbeat className="text-pink-600 text-[35px]" />
          </div>
          <TextAnimator
            text={content.mainText3}
            animation={"chuncks"}
            className={"text-[20px] font-bold text-pink-800 px-5"}
          />
        </div>

      </div>
    </div>
  );
}
