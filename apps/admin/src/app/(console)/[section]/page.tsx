import { notFound } from "next/navigation";
import { Customers } from "@/components/customers";
import { Resources } from "@/components/resources";
import { Activity, Settings } from "@/components/settings";
export default async function Page({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  switch (section) {
    case "customers":
      return <Customers />;
    case "resources":
      return <Resources />;
    case "activity":
      return <Activity />;
    case "settings":
      return <Settings />;
    default:
      notFound();
  }
}
