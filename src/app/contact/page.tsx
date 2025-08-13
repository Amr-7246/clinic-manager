import { assets } from "@/pub/assets/assets_frontend";
import Image from "next/image";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import textContent from "@/AppContent.json";

const content = {
  header: "Get in Touch with Us",
  mainText: `We’re here to answer your questions, assist with appointments, and provide the best support possible. 
  Whether you’re a patient, a healthcare professional, or a partner, we’re just a call or message away.`,
  phone: "+1 (555) 987-6543",
  email: "support@clinicmanagerapp.com",
  address: "123 Health Avenue, Medical City, USA",
  workingHours: "Mon – Sat: 9:00 AM – 7:00 PM",
};

export default function Page() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg shadow-black">
      <h2 className="text-2xl font-bold text-indigo-800 mb-5 flex items-center gap-2">
        <FaEnvelope className="text-indigo-600" />
        {content.header}
      </h2>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        <Image
          className="lg:w-[30%] w-full bg-[var(--surface)] rounded-lg object-cover"
          src={assets.contact_image}
          alt="Contact us illustration"
        />

        <div className="flex flex-col gap-4 w-full">
          <p className="text-gray-700">{content.mainText}</p>

          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-indigo-600" />
            <span className="text-gray-800">{content.phone}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-indigo-600" />
            <span className="text-gray-800">{content.email}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-indigo-600" />
            <span className="text-gray-800">{content.address}</span>
          </div>

          <div className="flex items-center gap-3">
            <FaClock className="text-indigo-600" />
            <span className="text-gray-800">{content.workingHours}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
