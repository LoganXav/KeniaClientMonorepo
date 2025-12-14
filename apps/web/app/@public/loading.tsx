import { Loader } from "@/components/loader";
export default function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="pt-16">
        <Loader />
      </div>
    </div>
  );
}
