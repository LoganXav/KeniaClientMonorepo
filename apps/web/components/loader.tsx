import { LoaderCircle } from "lucide-react";
import React from "react";

type Props = {};

export function Loader({}: Props) {
  return <LoaderCircle className="animate-spin" size={40} />;
}
