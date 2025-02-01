"use client";
import React from "react";
import { EditText } from "react-edit-text";
import { BsPencilSquare } from "react-icons/bs";
import "react-edit-text/dist/index.css";

export default function ProfileInput({
  value,
  setValue,
  save,
}: {
  value?: string;
  setValue: (value: string) => void;
  save: () => void;
}) {
  const styles = {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    backgroundColor: "#111111",
  };

  const editButtonClass = "text-primary text-sm cursor-pointer hover:text-white bg-[#111111] h-full w-full";

  return (
    <EditText
      name="name"
      value={value}
      showEditButton
      editButtonContent={<BsPencilSquare className={editButtonClass} />}
      onChange={(event) => setValue(event.target.value)}
      onSave={save}
      style={styles}
    />
  );
}
