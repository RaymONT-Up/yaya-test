function parseAgeStr(ageStr: string): number | null {
  const yearMatch = ageStr.match(/(\d+)(г|л)/)
  if (!yearMatch) return null
  return Number(yearMatch[1])
}

export function formatAgeRange(minAgeStr: string, maxAgeStr: string): string {
  const minAge = parseAgeStr(minAgeStr)
  const maxAge = parseAgeStr(maxAgeStr)

  if (minAge !== null && maxAge !== null) {
    if (minAge === maxAge) {
      return `${minAge} лет`
    }
    return `${minAge}-${maxAge} лет`
  }

  return ""
}
