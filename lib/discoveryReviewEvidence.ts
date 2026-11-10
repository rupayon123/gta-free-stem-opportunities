/** Conservative evidence for private leads; ambiguous prices remain unknown. */
export function reviewCost(text: string): "Free to join" | "Unknown" {
  return /\b(?:free\s+(?:event|events|program(?:me)?|programming|registration|admission|workshop|activity|activities|session)|(?:registration|admission|event|program(?:me)?|workshop|session)\s*(?:is|:|-)\s*free|no\s+(?:registration\s+)?(?:cost|fee))\b/i.test(text) ? "Free to join" : "Unknown";
}

/** An absent numeric age is unknown, including when grades or family are listed. */
export function reviewAges(text: string): { ageMin?: number; ageMax?: number } {
  const range = text.match(/\bages?\s*(\d{1,3})\s*(?:-|–|—|to)\s*(\d{1,3})\b/i);
  if (!range) return {};
  const ageMin = Number(range[1]); const ageMax = Number(range[2]);
  return ageMin <= ageMax && ageMax <= 130 ? { ageMin, ageMax } : {};
}
