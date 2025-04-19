/**
 * Utility function to export data to CSV
 * @param data Array of objects to export
 * @param filename Name of the file to download
 */
export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) {
    console.error('No data to export');
    return;
  }

  // Get headers from the first object
  const headers = Object.keys(data[0]);
  
  // Create CSV content
  const csvContent = [
    // Headers row
    headers.join(','),
    // Data rows
    ...data.map(item => 
      headers.map(header => {
        // Handle special characters and commas in values
        const value = item[header] === null || item[header] === undefined 
          ? '' 
          : String(item[header]).replace(/"/g, '""');
        
        // Wrap in quotes if contains comma, newline, or double quote
        return /[,"\n\r]/.test(value) ? `"${value}"` : value;
      }).join(',')
    )
  ].join('\n');

  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
} 