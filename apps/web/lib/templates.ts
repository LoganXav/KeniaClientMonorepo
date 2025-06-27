export function downloadCsvTemplate(headers: string[], rows: Record<string, string>[] = [], filename = "template.csv") {
  const csvHeader = headers.join(",");
  const csvRows = rows.map((row) => headers.map((header) => `"${(row[header] ?? "").replace(/"/g, '""')}"`).join(","));
  const csvContent = [csvHeader, ...csvRows].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
