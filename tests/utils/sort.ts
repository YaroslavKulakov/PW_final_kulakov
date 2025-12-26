export type SortDirection = 'asc' | 'desc';

export function normalizeText(s: string): string {
  return s.replace(/\s+/g, ' ').trim();
}

export function getSortedStrings(items: string[], direction: SortDirection): string[] {
  const normalized = items
    .map(normalizeText)
    .filter(Boolean);

  const sorted = [...normalized].sort((a, b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  );

  return direction === 'desc' ? sorted.reverse() : sorted;
}

export function getSortedNumbers(items: number[], direction: SortDirection): number[] {
  const sorted = [...items].sort((a, b) => a - b);
  return direction === 'desc' ? sorted.reverse() : sorted;
}

