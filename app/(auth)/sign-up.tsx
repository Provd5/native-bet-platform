import React from "react";

import { AuthFormWrapper } from "~/components/Auth/auth-form-wrapper";
import { SignUpForm } from "~/components/Auth/sign-up-form";

export default function SignUpPage() {
  return (
    <AuthFormWrapper>
      <SignUpForm />
    </AuthFormWrapper>
  );
}
