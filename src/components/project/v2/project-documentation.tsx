import Image from "next/image";
import type { ProjectGalleryItem } from "@/types/project";
import { Void } from "@/components/ui/void";

type ProjectDocumentationProps = {
  gallery: ProjectGalleryItem[];
  slug: string;
};

const ASPECT_RATIOS = ["21/9", "16/9", "4/3"] as const;

export function ProjectDocumentation({ gallery, slug }: ProjectDocumentationProps) {
  return (
    <section className="bg-background">
      {gallery.map((item, i) => {
        const aspect = ASPECT_RATIOS[i % ASPECT_RATIOS.length];
        return (
          <div key={`${slug}-gallery-${i}`}>
            <div
              className="reveal-curtain relative w-full overflow-hidden"
              style={{ aspectRatio: aspect }}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>
            {i < gallery.length - 1 && <Void height="4vh" />}
          </div>
        );
      })}
    </section>
  );
}
