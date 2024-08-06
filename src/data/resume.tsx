import { Icons } from "@/components/icons";
import { CodeIcon, HomeIcon, NotebookIcon, PencilLine } from "lucide-react";

export const DATA = {
  name: "Casey Mershon",
  initials: "CM",
  url: "https://caseymershon.co",
  location: "Indianapolis, IN",
  locationLink: "https://www.google.com/maps/place/indianapolis",
  description:
    "Support Engineer and aspiring Software Engineer. I love building things and helping people.",
  summary:
    "I'm a Senior Technical Support Engineer at Salesforce transitioning to software engineering. With expertise in API integrations & development, TypeScript, Java, and web development, I solve complex problems for global clients. My journey spans from 3D mobile apps to fullstack web development. Explore my projects to see how I'm applying these skills to create innovative software solutions!",
  avatarUrl: "/profile.png",
  skills: [
    "React",
    "Next.js",
    "Typescript",
    "Nest.js",
    "Node.js",
    "Python",
    "Postgres",
    "MySQL",
    "Firebase",
    "Redis",
    "Docker",
    "Kubernetes",
    "Java",
    "Spring Boot",
    "PHP",
    "C",
    "C#",
    "C++",
    "Bash"
  ],
  navbar: [
    { href: "/", icon: HomeIcon, label: "Home" },
    { href: "/blog", icon: NotebookIcon, label: "Blog" },
    { href: "/projects", icon: CodeIcon, label: "Projects" },
  ],
  contact: {
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://dub.sh/casey-github",
        icon: Icons.github,

        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://dub.sh/casey-linkedin",
        icon: Icons.linkedin,

        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Salesforce, Marketing Cloud Intelligence",
      href: "https://www.salesforce.com/marketing/intelligence/",
      badges: [],
      location: "Hybrid",
      title: "Senior Technical Support Engineer",
      logoUrl: "/salesforce.png",
      start: "Oct 2021",
      end: "Current",
      description:
        "As a Senior Technical Support Engineer, I have extensive experience in providing technical support to clients across the globe. I am responsible for responding to customer inquiries and troubleshooting technical issues in a timely and efficient manner. With this, I utilize Python and Postman to interact with APIs for bulk processes. I also worked closely with the development team to identify and resolve technical problems including critical incidents."
    },
    {
      company: "Salesforce, Marketing Cloud Intelligence",
      href: "https://www.salesforce.com/marketing/intelligence/",
      badges: [],
      location: "Hybrid",
      title: "Technical Support Engineer",
      logoUrl: "/salesforce.png",
      start: "January 2020",
      end: "Oct 2021",
      description:
        "Working at Salesforce for Marketing Cloud Intelligence has allowed me to work in a fast-paced customer support environment where I troubleshoot and solve technical questions of a multitude of clients. This position has taught me a range of skills from working hands-on with clients achieving their desired results to troubleshooting technical API discrepancies and programming custom solutions."
    },
    {
      company: "Indiana State University",
      href: "https://indianastate.edu/",
      badges: [],
      location: "Terre Haute, IN",
      title: "VR Research & Development Engineer",
      logoUrl: "/indiana-state-university.png",
      start: "August 2017",
      end: "December 2019",
      description:
        "Indiana State University was able to allow me to research virtual reality and how it could be implemented in the classroom. I spearheaded the developed of a 3D mobile application called IT3D. This application was implemented into the following semester's curriculum for the information technology degree path."
    },
    {
      company: "Indiana State University",
      href: "https://indianastate.edu/",
      badges: [],
      location: "Terre Haute, IN",
      title: "Frontend Engineer",
      logoUrl: "/indiana-state-university.png",
      start: "August 2019",
      end: "December 2019",
      description:
        "During my time working in the College of Technology’s Office of the Dean, I have developed my skills in HTML and CSS. Through the creating, updating, and maintaining of the College of Technology's website, I gained knowledge, not only in these skills but also in how to communicate technical language to the average user."
    },
  ],
  education: [
    {
      school: "Indiana State University",
      href: "https://indianastate.edu/",
      degree: "Bachelor's Degree of Information Technology & Minor in Computer Science",
      logoUrl: "/indiana-state-university.png",
      start: "2016",
      end: "2019",
    },
  ],
} as const;
