import SignInForm from "./form"

export default function SignInPage() {
  return (
    <>
      <div className="w-full flex-col">
        <div className="w-full flex flex-col items-center text-center space-y-2 py-8">
          <h4 className="font-heading text-5xl font-bold">
            Continue with Kenia
          </h4>
          <p className="text-sm">Login to your school</p>
        </div>
        <SignInForm />
      </div>
    </>
  )
}
