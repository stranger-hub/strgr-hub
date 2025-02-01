"use client";
import React, { useEffect, useState } from "react";
import { BsCalendar } from "react-icons/bs";
import Interests from "./Interests";
import ProfileInput from "./ProfileInput";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import toast, { Toaster } from "react-hot-toast";
import { post } from "@/lib/api";

interface Profile {
  id?: string,
  name?: string;
  dob?: Date;
  gender?: string;
  interests?: string[];
}

export default function ProfileDetails({ user }: { user: Profile }) {
  const [profile, setProfile] = useState<Profile>({});
  const itemsClass = "flex justify-center gap-4 items-center";

  useEffect(() => {
    setProfile(user);
  }, [user]);

  function setValue(value: string) {
    if (value.length <= 25) {
      setProfile((prev: Profile) => ({ ...prev, name: value }));
    }
  }
  function saveName() {
    if(profile.name) {
      updateUserProfile(profile.name, undefined, undefined, undefined);
    }
  }
  function dateChange(value: Date) {
    setProfile((prev: Profile) => ({ ...prev, dob: value }));
    updateUserProfile(undefined, value, undefined, undefined);
  }
  function genderChange(value: string) {
    setProfile((prev: Profile) => ({ ...prev, gender: value }));
    updateUserProfile(undefined, undefined, value, undefined);
  }

  async function updateUserProfile(
    name?: string,
    dob?: Date,
    gender?: string,
    interests?: string[]
  ) {
    const response = await post(
      "/api/user?userId=" + user.id, 
      { name, dob, gender, interests }
    );
    if(!response.success) {
      toast.error("Profile updation failed, please try again later !!", {
        style: {
          background: '#333',
          color: '#fff',
        },
        id: 'profile'
      });
    }
  }

  return (
    <div className="px-10 pb-5 text-center">
      <Toaster />
      <div className={itemsClass}>
        <div className="text-2xl font-bold w-auto">
          <ProfileInput value={profile?.name} setValue={setValue} save={saveName} />
        </div>
      </div>
      <div className="flex justify-center gap-10 items-center mt-5">
        <div className={itemsClass}>
          <div className="flex items-center w-auto">
            <p className="font-medium mr-3">DOB: </p>
            <DatePicker
              clearIcon={null}
              onChange={(value) => dateChange(value as Date)}
              value={profile?.dob}
              maxDate={new Date()}
              calendarIcon={
                <BsCalendar className="text-primary hover:text-white" />
              }
            />
          </div>
        </div>
        <div className={itemsClass}>
          <div className="w-auto flex items-center">
            <p className="font-medium mr-3">Gender: </p>
            <select
              className="select select-sm w-full max-w-xs"
              value={profile?.gender || ""}
              onChange={(event) => genderChange(event.target.value)}
            >
              <option disabled value={""}>
                Select
              </option>
              <option value={"Male"}>Male</option>
              <option value={"Female"}>Female</option>
              <option value={"Others"}>Others</option>
            </select>
          </div>
        </div>
      </div>
      <div className="mt-14">
        <p className="font-bold">
          Update your top <span className="text-primary">3 interests</span>
        </p>
        <div className="mt-5 flex justify-center">
          <Interests interests={profile?.interests || []} updateProfile={updateUserProfile}  />
        </div>
      </div>
    </div>
  );
}
