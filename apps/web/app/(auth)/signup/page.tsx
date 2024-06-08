import SignUpForm from "./form"

export default function SignUpPage() {
  return (
    <div className="w-full flex-col">
      <div className="w-full flex flex-col items-center text-center space-y-2 py-8">
        <h4 className="font-heading text-5xl font-bold">
          Get started with Kenia
        </h4>
        <p className="text-sm">Fill out this form to register your school</p>
      </div>
      <SignUpForm />
    </div>
  )
}
