"use client";
import React from 'react'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';

export default function ProfileInput({ value }: { value: string }) {
  return (
    <EditText showEditButton defaultValue={value} />
  )
}
