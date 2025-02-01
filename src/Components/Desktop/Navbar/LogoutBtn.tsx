"use client";

import { signOut } from 'next-auth/react';
import React from 'react'

export default function LogoutBtn() {
  return (
    <button type="submit" onClick={() => signOut({ callbackUrl: '/auth/login' })}>
        Logout
    </button>
  )
}
