import type { Props as IconProps } from "../components/ui/icon.astro";

// NOTE: Twitter, CodePen, and YouTube were removed per the request to
// trim the social list. Only GitHub and LinkedIn remain below; the
// 404 / Nav / Footer / contact page will pick this up automatically.
export const socials: { label: string; href: string; icon: IconProps["icon"] }[] = [
  {
    label: "GitHub",
    href: "https://github.com/alkiory",
    icon: "github-logo",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/iamsergiocampbell",
    icon: "linkedin-logo",
  },
];
