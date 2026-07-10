import type { Props as IconProps } from "../components/ui/icon.astro";

export const socials: { label: string; href: string; icon: IconProps["icon"] }[] = [
  {
    label: "Twitter",
    href: "https://twitter.com/alkiory",
    icon: "twitter-logo",
  },
  {
    label: "GitHub",
    href: "https://github.com/alkiory",
    icon: "github-logo",
  },
  {
    label: "CodePen",
    href: "https://codepen.io/sergiocampbell",
    icon: "codepen-logo",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@iamsergiocampbell",
    icon: "youtube-logo",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/iamsergiocampbell",
    icon: "linkedin-logo",
  },
];
