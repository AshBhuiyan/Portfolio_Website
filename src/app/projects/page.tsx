import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkGallery } from "@/components/WorkGallery";
import { withCanonical } from "@/data/site";

export const metadata: Metadata = withCanonical("/projects", {
  title: "Projects",
  description:
    "Selected concept and portfolio projects by Ash Bhuiyan, spanning UX/product design, data systems, and interface craft.",
});

export default function WorkPage() {
  return (
    <div className="pb-8 pt-24 sm:pt-28">
      <Container>
        <SectionHeader
          as="h1"
          eyebrow="Selected Projects"
          title="Projects, studies, and systems"
          description="A mix of concept work and portfolio projects. Each one is described honestly — what it is, what stage it's at, and the thinking behind it."
        />

        <div className="mt-8 sm:mt-10">
          <WorkGallery />
        </div>
      </Container>
    </div>
  );
}
