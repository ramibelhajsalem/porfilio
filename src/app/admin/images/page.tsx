import { createClient } from "@/lib/supabase/server";
import ImagesClient from "./images-client";
import { PageHeader } from "@/components/admin/form-field";
import type { PortfolioImage } from "@/lib/supabase/types";

export default async function ImagesPage() {
  const supabase = await createClient();
  const { data: images } = await supabase
    .from("images")
    .select("*")
    .order("created_at", { ascending: false });
  const imageList = (images ?? []) as PortfolioImage[];

  return (
    <div className="p-8">
      <PageHeader
        title="Assets"
        description="Upload and manage all files used across your portfolio."
      />
      <ImagesClient images={imageList} />
    </div>
  );
}
