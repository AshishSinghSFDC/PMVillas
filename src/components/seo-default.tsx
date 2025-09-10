"use client";
import { DefaultSeo } from "next-seo";
import { defaultSEO } from "@/seo.config";

export default function SEO() {
  return <DefaultSeo {...defaultSEO} />;
}
