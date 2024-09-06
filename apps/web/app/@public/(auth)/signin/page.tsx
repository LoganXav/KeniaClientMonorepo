import SignInForm from "./_features/signin-form";

export default function SignInPage() {
  return (
    <>
      <div className="w-full flex-col p-8 space-y-8">
        <div className="w-full space-y-2">
          <h4 className="font-heading text-4xl font-bold">Continue with Kenia</h4>
          <p className="text-sm text-muted-foreground">Login to your school</p>
        </div>
        <SignInForm />
      </div>
    </>
  );
}
