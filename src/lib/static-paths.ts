export function getLocalePaths() {
  const locales = ["es", "en"];
  return locales.map((lang) => ({
    params: { lang },
  }));
}
