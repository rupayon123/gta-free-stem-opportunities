/** A grade range is not an explicit minimum or maximum age. */
export function hasEstimatedAgeRange(text: string): boolean {
  return /\bgrades?\s*\d{1,2}\s*(?:-|to|–|—)\s*\d{1,2}/i.test(text)
    && !/\bages?\s*\d{1,2}\s*(?:-|to|–|—)\s*\d{1,2}/i.test(text);
}
