import AudioPlayer from "@/components/audioplayer";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { getProject } from "@/data/projects";
import { DATA } from "@/data/resume";
import { formatDate, formatDateShort } from "@/lib/utils";
import { ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";


export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata | undefined> {
  let post = await getProject(params.slug);

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image ? `${DATA.url}${image}` : `${DATA.url}/og?title=${title}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${DATA.url}/projects/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Project({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  let project = await getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <section id="project">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CreativeWork",
                name: project.metadata.title,
                dateCreated: project.metadata.startDate,
                datePublished: project.metadata.startDate,
                dateModified: project.metadata.startDate,
                description: project.metadata.summary,
                image: project.metadata.image
                  ? `${DATA.url}${project.metadata.image}`
                  : `${DATA.url}/og?title=${project.metadata.title}`,
                url: `${DATA.url}/projects/${project.slug}`,
                author: {
                  "@type": "Person",
                  name: DATA.name,
                },
                keywords: project.metadata.tags 
                    ? project.metadata.tags.join(", ")
                    : `${project.metadata.title}`,
                programmingLanguage: project.metadata.technologies[0],
                codeRepository: project.metadata.githubUrl
                    ? project.metadata.githubUrl 
                    : DATA.contact.social.GitHub.url,
                softwareVersion: project.metadata.version,
              })
        }}
      />
      {project.metadata.headerImage && 
        <div className="w-full aspect-[16/9] relative mb-8">
          <Image 
            src={project.metadata.headerImage} 
            alt={`${project.metadata.title} header image`}
            className="rounded-md object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 1200px, 1920px"
            quality={90}
            fill={true}
          />
        </div>

      }
      <h1 className="title font-medium text-2xl tracking-tighter max-w-[650px]">
        {project.metadata.title}
      </h1>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm max-w-[650px]">
        <Suspense fallback={<p className="h-5" />}>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Timeline: {formatDateShort(project.metadata.startDate)} to {project.metadata.endDate != "Ongoing"? formatDateShort(project.metadata.endDate) : "Now"}
            </p>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                Status: 
                <span className="inline-flex items-center rounded-md border mx-1 px-1 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                    {project.metadata.status}
                </span>
            </p>
            <div>
              {project.metadata.githubUrl && 
                  <Button asChild size="icon" className="me-1">
                      <Link href={project.metadata.githubUrl} rel="noopener noreferrer" target="_blank"><Github className="h-4 w-4"/></Link>
                  </Button>
              }
              {project.metadata.websiteUrl && 
                  <Button asChild size="icon">
                      <Link href={project.metadata.websiteUrl} rel="noopener noreferrer" target="_blank"><ExternalLink className="h-4 w-4"/></Link>
                  </Button>
              }
            </div>
        </Suspense>
      </div>
      {project.metadata.audio &&
        <AudioPlayer 
          src={project.metadata.audio} 
          metadata={{
            title: project.metadata.title,
            artist: "Casey Mershon"
          }} 
        />
      }
      
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: project.source }}
      ></article>
    </section>
  );
}
