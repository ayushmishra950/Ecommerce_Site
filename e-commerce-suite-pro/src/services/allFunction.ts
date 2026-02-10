/**
 * formatDate
 * Converts a backend ISO date string to readable format or input-compatible format
 * @param date - ISO string or Date object
 * @param forInput - boolean, true if for <input type="date">, false for display
 * @returns string
 */
export function formatDate(date?: string | Date, forInput = false): string {
  if (!date) return "";

  const d = new Date(date);
  const pad = (n: number) => n.toString().padStart(2, "0");

  if (forInput) {
    // For input type="date": YYYY-MM-DD
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  } else {
    // For display: DD/MM/YYYY
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
  }
}




export const getStatusVariant = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'active':
      return 'default';
    case 'inactive':
      return 'outline';
    default:
      return 'secondary';
  }
};
