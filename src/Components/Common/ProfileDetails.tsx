import React from "react";
import { BsPencilSquare } from "react-icons/bs";
import Interests from "./Interests";
import ProfileInput from "./ProfileInput";

export default function ProfileDetails({ user }: {
  user: {
    name: string;
    dob: Date;
    gender: string;
    interests: string[];
  }
}) {

  const editButtonClass = "text-primary cursor-pointer hover:text-white";
  const itemsClass = "flex justify-center gap-4 items-center";
  return (
    <div className="px-10 pb-5 text-center">
      <div className={itemsClass}>
        <div className="text-2xl font-bold w-auto">
          <ProfileInput value={user?.name} />
        </div>
      </div>
      <div className={`${itemsClass} gap-20 mt-5`}>
        <div className={itemsClass}>
          <div className="font-medium bg-base-200 w-auto">
            DOB:{" "}
            {user?.dob?.getDate() +
              "-" +
              user?.dob?.getMonth() +
              "-" +
              user?.dob?.getFullYear()}
          </div>
          <BsPencilSquare className={editButtonClass} />
        </div>
        <div className={itemsClass}>
          <div className="font-medium bg-base-200 w-auto">
            Gender: {user?.gender}
          </div>
          <BsPencilSquare className={editButtonClass} />
        </div>
      </div>
      <div className="mt-14">
        <p className="font-bold">
          Update your top <span className="text-primary">3 interests</span>
        </p>
        <div className="mt-5 flex justify-center">
          <Interests />
        </div>
      </div>
    </div>
  );
}
