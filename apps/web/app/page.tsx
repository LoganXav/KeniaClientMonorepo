import Link from "next/link"

export default function HomePage(): JSX.Element {
  return (
    <div className="h-screen container flex justify-center items-center flex-col space-y-4">
      <h5 className="text-5xl font-bold font-heading">Home Page.</h5>
      <div className="flex flex-col text-center items-center">
        <p>
          To check out the authentication screens, navigate to{" "}
          <Link href={"/signup"} className="underline hover:text-input">
            Signup page
          </Link>{" "}
        </p>
        <p>
          To check out the ui components, navigate to{" "}
          <Link href={"/test"} className="underline hover:text-input">
            Test page
          </Link>{" "}
        </p>
      </div>
    </div>
  )
}
