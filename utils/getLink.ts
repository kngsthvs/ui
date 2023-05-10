export function getLink(link: string) {
  if (!link) return "/";

  if (link.includes("://")) return link;

  return /^\//.test(link) ? link : `/${link}`;
}
