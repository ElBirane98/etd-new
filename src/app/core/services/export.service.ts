import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExportService {
  
  exportToCsv(filename: string, rows: any[], headers: string[]) {
    if (!rows || !rows.length) return;

    const separator = ';';
    const csvContent = [
      headers.join(separator),
      ...rows.map(row => {
        return Object.values(row).map(value => {
          const str = String(value).replace(/"/g, '""');
          return `"${str}"`;
        }).join(separator);
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
