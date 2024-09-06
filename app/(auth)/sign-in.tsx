import { AuthFormWrapper } from "~/components/Auth/auth-form-wrapper";
import { SignInForm } from "~/components/Auth/sign-in-form";

export default function SignInPage() {
  return (
    <AuthFormWrapper isLogin>
      <SignInForm />
    </AuthFormWrapper>
  );
}
