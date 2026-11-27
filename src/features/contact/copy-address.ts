export async function copyAddress(address: string): Promise<boolean> {
  try {
    if (!navigator.clipboard) return false;
    await navigator.clipboard.writeText(address);
    return true;
  } catch {
    return false;
  }
}
