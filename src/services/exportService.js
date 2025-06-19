import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportToPDF = (products) => {
  try {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm'
    });
    
    // Title
    doc.setFontSize(18);
    doc.text('Product List Report', 14, 15);
    
    // Subtitle with date
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 22);
    
    // Table
    autoTable(doc, {
      startY: 30,
      head: [
        ['Name', 'Description', 'Price', 'Category', 'Taxable', 'Active']
      ],
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold'
      },
      body: products.map(p => [
        p.name,
        p.description || '-',
        `$${Number(p.price).toFixed(2)}`,
        p.category,
        p.isTaxable ? 'Yes' : 'No',
        p.isActive ? 'Yes' : 'No'
      ]),
      alternateRowStyles: {
        fillColor: [240, 240, 240]
      },
      margin: { top: 30 }
    });
    
    doc.save(`products_${new Date().toISOString().slice(0, 10)}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Failed to generate PDF. Please try again.');
  }
};

export const exportToExcel = (products) => {
  try {
    // Format data for Excel
    const excelData = products.map(p => ({
      'Product Name': p.name,
      Description: p.description || '',
      Price: Number(p.price).toFixed(2),
      Category: p.category,
      Taxable: p.isTaxable ? 'Yes' : 'No',
      Active: p.isActive ? 'Yes' : 'No',
      'Created Date': p.createdAt ? new Date(p.createdAt).toLocaleDateString() : ''
    }));
    
    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    
    // Set column widths
    const wscols = [
      { wch: 30 }, // Product Name
      { wch: 40 }, // Description
      { wch: 15 }, // Price
      { wch: 20 }, // Category
      { wch: 15 }, // Taxable
      { wch: 15 }, // Active
      { wch: 20 }  // Created Date
    ];
    worksheet['!cols'] = wscols;
    
    // Create workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Products');
    
    // Generate file name with date
    const fileName = `products_export_${new Date().toISOString().slice(0, 10)}.xlsx`;
    
    // Save file
    XLSX.writeFile(workbook, fileName);
  } catch (error) {
    console.error('Error generating Excel:', error);
    alert('Failed to generate Excel file. Please try again.');
  }
};