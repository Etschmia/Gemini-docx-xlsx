const parseMarkdownTable = (markdown: string): string[][] => {
  if (!markdown) return [];
  const lines = markdown.trim().split('\n').map(line => line.trim());
  
  // Filter for lines that look like table rows (start and end with |)
  const tableLines = lines.filter(line => line.startsWith('|') && line.endsWith('|'));
  
  if (tableLines.length < 2) return []; // Header + separator minimum

  // Find and ignore separator line
  const separatorIndex = tableLines.findIndex(line => /\|-*\s*\|/.test(line));
  if (separatorIndex !== -1) {
    tableLines.splice(separatorIndex, 1);
  }

  return tableLines.map(line =>
    line.slice(1, -1) // Remove leading/trailing |
      .split('|')
      .map(cell => cell.trim())
  );
};

const createDocx = (content: string, fileName: string) => {
  const { Document, Packer, Paragraph, TextRun } = (window as any).docx;

  const paragraphs = content.split('\n').map(line => {
    return new Paragraph({
        children: [new TextRun(line)]
    });
  });

  const doc = new Document({
    sections: [{
      properties: {},
      children: paragraphs,
    }],
  });

  Packer.toBlob(doc).then(blob => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.endsWith('.docx') ? fileName : `${fileName}.docx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
};

const createXlsx = (markdownTable: string, fileName: string) => {
  const data = parseMarkdownTable(markdownTable);
  if (data.length === 0) {
    console.error("Could not parse Markdown table or table is empty.");
    return;
  }
  
  const XLSX = (window as any).XLSX;
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

  const finalFileName = fileName.endsWith('.xlsx') ? fileName : `${fileName}.xlsx`;
  XLSX.writeFile(wb, finalFileName);
};

export const fileService = {
  createDocx,
  createXlsx,
};
