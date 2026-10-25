import { redirect } from "next/navigation";

/** Legacy URL — gan catalog now lives under יום הולדת */
export default function GanLegacyRedirect() {
  redirect("/collections/yom_huledet");
}
