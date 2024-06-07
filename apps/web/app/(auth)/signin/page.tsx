import SignInForm from "./form"

export default function SignInPage() {
  return (
    <>
      <div className="w-full flex-col">
        <div className="w-full flex flex-col items-center text-center space-y-2 py-8">
          <h4 className="font-heading text-5xl font-bold">
            Get started with Kenia
          </h4>
          <p>Register your school</p>
        </div>
        <SignInForm />
      </div>
    </>
  )
}
