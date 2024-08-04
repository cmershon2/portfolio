import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { getProjectPosts } from "@/data/projects";
import { formatDateShort } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "My thoughts on software development, life, and more.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function ProjectPage() {
  const posts = await getProjectPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <h1 className="font-medium text-2xl tracking-tighter">Projects</h1>
        <p className="font-medium tracking-tighter mb-8">I&apos;ve worked on a variety of projects, from simple websites to complex web applications.</p>
      </BlurFade>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
        {posts
          .sort((a, b) => {
            if (
              new Date(a.metadata.startDate) > new Date(b.metadata.startDate)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post, id) => (
            <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
              <Link
                className="flex flex-col space-y-1 mb-4"
                href={`/projects/${post.slug}`}
              >
                <ProjectCard 
                  title={post.metadata.title} 
                  image={post.metadata.headerImage}
                  description={post.metadata.summary} 
                  dates={`${formatDateShort(post.metadata.startDate)} - ${formatDateShort(post.metadata.endDate)}`} 
                  tags={post.metadata.technologies}
                  
                />
              </Link>
            </BlurFade>
          ))
        }
      </div>
    </section>
  );
}
