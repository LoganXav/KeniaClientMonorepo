import { LoaderCircle } from "lucide-react";
import React from "react";

type Props = {};

export function Loader({}: Props) {
  return <LoaderCircle className="text-primary animate-spin duration-300" size={40} />;
}
