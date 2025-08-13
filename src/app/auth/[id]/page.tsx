'use client'
import { useDeleteEntity, usePatchEntity } from "@/APIs";
import { useLogOut } from "@/APIs/Auth/logOut";
import { useSignOut } from "@/APIs/Auth/signOut";
import { useUserInfoContext } from "@/context/userInfoContext";
import { assets } from "@/pub/assets/assets_frontend";
import Image from "next/image";
import { useState } from "react";
import { uploadAsset, deleteAsset } from "@/utils/assetsUpload";
import { FaUserEdit, FaEnvelope, FaPhone, FaTimes } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IPatient } from "@/types/patientTypes";

export default function Page() {
  const { mutate: logOut } = useLogOut("clicnic-manager/auth/logout");
  const { mutate: editInfo } = usePatchEntity("clicnic-manager/auth/logout"); //editInfo(UserInfo?._id)
  const { mutate: signOut } = useSignOut('clicnic-manager/patient');
  const { UserInfo } = useUserInfoContext();
  const [EditedUserData, setEditedUserData] = useState<IPatient | null>(null);
  const [showEditCard, setShowEditCard] = useState(false);

  return (
    <div className="relative p-6">
      {/* Profile section */}
      <div className="bg-white px-5 py-20 mb-10 rounded-lg shadow-lg shadow-black/50 flex-col flex lg:flex-row gap-6 items-center border-b border-gray-300">
        <Image
          className="w-32 h-32 rounded-full border-4 border-indigo-300 object-cover"
          src={UserInfo?.pictuer.imageURL || assets.profile_pic}
          alt="profile image"
          width={128}
          height={128}
        />
        <div className="flex flex-col gap-3 text-lg">
          <p className="flex items-center gap-2"><FaUserEdit className="text-purple-600" /> <strong>Name:</strong> {UserInfo?.name}</p>
          <p className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> <strong>Email:</strong> {UserInfo?.email}</p>
          <p className="flex items-center gap-2"><FaPhone className="text-green-500" /> <strong>Phone:</strong> {UserInfo?.phoneNumber}</p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="pt-6 flex-col flex gap-4 lg:flex-row-reverse">
        <button onClick={() => logOut()} className="btn_I">Log out</button>
        <button onClick={() => signOut(UserInfo?._id)} className="btn_I">Sign out</button>
        <button onClick={() => setShowEditCard(true)} className="btn_II flex items-center gap-2">
          <MdEdit /> Edit Your Portfolio
        </button>
      </div>

      {/* Edit Info Card */}
      {showEditCard && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div
            className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 transform animate-slideUp relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowEditCard(false)}
              className="absolute top-3 cursor-pointer right-3 text-gray-500 hover:text-red-500 transition"
            >
              <FaTimes size={20} />
            </button>

            <h2 className="text-2xl font-semibold mb-6 text-center text-purple-700">Edit Your Information</h2>

            <div className="flex flex-col gap-4">
              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-300 outline-none"
                type="text"
                placeholder="Full Name"
                value={EditedUserData?.name || UserInfo?.name || ""}
                onChange={(e) => setEditedUserData({ ...UserInfo!, name: e.target.value })}
              />
              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-300 outline-none"
                type="email"
                placeholder="Email"
                value={EditedUserData?.email || UserInfo?.email || ""}
                onChange={(e) => setEditedUserData({ ...UserInfo!, email: e.target.value })}
              />
              <input
                className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-300 outline-none"
                type="tel"
                placeholder="Phone Number"
                value={EditedUserData?.phoneNumber || UserInfo?.phoneNumber || ""}
                onChange={(e) => setEditedUserData({ ...UserInfo!, phoneNumber: Number(e.target.value) })}
              />

              <button
                onClick={() => {
                  if (EditedUserData) editInfo(EditedUserData);
                  setShowEditCard(false);
                }}
                className="cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg py-2 mt-2 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Animation */}
      <style jsx>{`
        @keyframes slideUp {
          0% { transform: translateY(100px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
