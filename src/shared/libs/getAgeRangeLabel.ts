function parseAgeStr(ageStr: string): { years: number; months: number } | null {
  const yearMatch = ageStr.match(/(\d+)\s*(г|л)/)
  const monthMatch = ageStr.match(/(\d+)\s*м/)

  const years = yearMatch ? Number(yearMatch[1]) : 0
  const months = monthMatch ? Number(monthMatch[1]) : 0

  if (!yearMatch && !monthMatch) return null

  return { years, months }
}

function formatAge({ years, months }: { years: number; months: number }): string {
  const parts = []
  if (years > 0) parts.push(`${years} ${years === 1 ? "год" : years < 5 ? "года" : "лет"}`)
  if (months > 0) parts.push(`${months} мес`)
  return parts.join(" ")
}

export function formatAgeRange(minAgeStr?: string | null, maxAgeStr?: string | null): string {
  if (!minAgeStr || !maxAgeStr) return ""

  const min = parseAgeStr(minAgeStr)
  const max = parseAgeStr(maxAgeStr)

  if (min && max) {
    const isEqual = min.years === max.years && min.months === max.months
    return isEqual ? formatAge(min) : `${formatAge(min)} – ${formatAge(max)}`
  }

  return ""
}
