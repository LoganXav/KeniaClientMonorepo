import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="h-screen container flex justify-center items-center flex-col space-y-4">
      <h5 className="text-5xl font-bold font-heading">Dashboard Page.</h5>
      <div className="flex flex-col text-center items-center">
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
