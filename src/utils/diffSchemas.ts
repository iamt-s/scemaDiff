export function diffSchemas(oldSchema: string, newSchema: string): string {
  const oldLines = oldSchema.split('\n').map(l => l.trim());
  const newLines = newSchema.split('\n').map(l => l.trim());

  const removed = oldLines.filter(line => !newLines.includes(line));
  const added = newLines.filter(line => !oldLines.includes(line));

  let diffReport = '';
  if (removed.length) {
    diffReport += 'REMOVED:\n' + removed.join('\n') + '\n\n';
  }
  if (added.length) {
    diffReport += 'ADDED:\n' + added.join('\n') + '\n\n';
  }
  return diffReport || 'No differences found.';
}
