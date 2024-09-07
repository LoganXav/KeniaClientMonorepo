import ChangePasswordForm from "./_features/change-password-form";

export default function ChangePasswordPage() {
  return (
    <>
      <div className="w-full flex-col p-4 space-y-8">
        <div className="w-full space-y-2">
          <h4 className="font-heading text-3xl md:text-4xl font-bold">Create a new password</h4>
          <p className="text-sm text-muted-foreground max-w-sm">Please enter the confirmation code sent to your mail and your new password.</p>
        </div>
        <ChangePasswordForm />
      </div>
    </>
  );
}
