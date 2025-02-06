import { LoaderCircle } from "lucide-react";
import React from "react";

type Props = {};

export function Loader({}: Props) {
  return <LoaderCircle className="animate-spin duration-500" size={40} />;
}
