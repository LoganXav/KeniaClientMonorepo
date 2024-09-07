import VerifyForm from "./_features/verify-form";

export default function VerifyPage() {
  return (
    <div className="w-full flex-col p-8 space-y-8">
      <div className="w-full space-y-2">
        <h4 className="font-heading text-4xl font-bold">Two Step Verification</h4>
        <p className="text-sm text-muted-foreground max-w-sm">We sent a verification code to your email. Enter the code from your mail in the field below.</p>
        <p className="text-sm text-muted-foreground">******@gmail.com</p>
      </div>
      <VerifyForm />
    </div>
  );
}
