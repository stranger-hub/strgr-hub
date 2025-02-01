"use client";
import LoginForm from "@/Components/Common/Auth/LoginForm";
import AuthWrapper from "@/Components/Common/Auth/AuthWrapper";
import { useState } from "react";

export default function Page() {
  const [isPending, setIsPending] = useState<boolean>(false);

  return (
    <div>
      <AuthWrapper register={false} isPending={isPending}>
        <LoginForm isPending={isPending} startTransition={setIsPending} />
      </AuthWrapper>
    </div>
  )
}
