import { SitePage } from "@/components/site-page";
import { content } from "@/data/content";

export default function Home() {
  return <SitePage c={content.en} />;
}
