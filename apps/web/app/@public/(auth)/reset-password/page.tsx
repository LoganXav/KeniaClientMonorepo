import ResetPasswordRequestForm from "./_features/reset-password-form";

export default function ResetPasswordPage() {
  return (
    <>
      <div className="w-full flex-col p-4 space-y-8">
        <div className="w-full space-y-2">
          <h4 className="font-heading text-3xl md:text-4xl font-bold">Forgot your password?</h4>
          <p className="text-sm text-muted-foreground max-w-sm">Please enter the email address associated with your account and we will email you a confirmation code to reset your password.</p>
        </div>
        <ResetPasswordRequestForm />
      </div>
    </>
  );
}
