// app/setup/[id]/page.tsx

import SetupDetail from "@/components/setups/setup-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Id } from "../../../../convex/_generated/dataModel";

interface Params {
  params: {
    id: Id<"setups">;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `Setup ${params.id}`,
  };
}
const SetupDetailPage = ({ params }: Params) => {
  if (!params.id) {
    return notFound();
  }
  return <SetupDetail id={params.id} />;
};

export default SetupDetailPage;
