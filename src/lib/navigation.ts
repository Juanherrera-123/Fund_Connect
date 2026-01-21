export const toHomeHash = (pathname: string | null, hash: string): string => {
  if (!hash.startsWith("#")) return hash;
  if (pathname === "/") return hash;
  return `/${hash}`;
};
