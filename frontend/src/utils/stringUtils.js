export function getInitials(name = "Guest User") {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 1) {
    return words[0][0].toUpperCase() || "G";
  }

  const initials = words
    .slice(0, 2)
    .map((word) => word[0].toUpperCase())
    .join("");
  return initials;
}
