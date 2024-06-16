"use client";
import AuthWrapper from '@/Components/Common/Auth/AuthWrapper'
import RegisterForm from '@/Components/Common/Auth/RegisterForm'
import React, { useTransition } from 'react'

export default function Page() {
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      <AuthWrapper register={true} isPending={isPending}>
        <RegisterForm isPending={isPending} startTransition={startTransition} />
      </AuthWrapper>
    </div>
  )
}
