export function aliasLink({
  destination,
  link,
  origin,
}: {
  destination: string;
  link: string;
  origin: string;
}) {
  if (origin && link.includes(origin)) return link.replace(origin, destination);

  return link;
}

export function refineLink(link: string) {
  if (!link) return "/";

  if (link.includes("://")) return link;

  return /^\//.test(link) ? link : `/${link}`;
}
