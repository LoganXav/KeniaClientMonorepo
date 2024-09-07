import SignUpForm from "./_features/signup-form";

export default function SignUpPage() {
  return (
    <div className="w-full flex-col p-4 space-y-8">
      <div className="w-full space-y-2">
        <h4 className="font-heading text-3xl md:text-4xl font-bold">Get started with Kenia</h4>
        <p className="text-sm text-muted-foreground">Fill out this form to register your school</p>
      </div>
      <SignUpForm />
    </div>
  );
}
