// Attributes

export function mapDataAttributes<T>(data: T): { [k: string]: any } {
  return Object.fromEntries(
    Object.entries(data).map((entry) => [`data-${entry[0]}`, entry[1]])
  );
}

// Link

export function refineLink(link: string) {
  if (!link) return "/";

  if (link.includes("://")) return link;

  return /^\//.test(link) ? link : `/${link}`;
}

export function aliasLink({
  destination,
  link,
  origin,
}: {
  destination: string;
  link: string;
  origin: string;
}) {
  if (!link) return "/";

  if (origin && link.includes(origin)) return link.replace(origin, destination);

  return refineLink(link);
}

export * from "./shared";
export * from "./types";
