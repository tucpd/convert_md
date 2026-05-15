const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

// Create PDF
const doc = new PDFDocument();

// Pipe to file
const outputPath = path.join(__dirname, 'test-document.pdf');
doc.pipe(fs.createWriteStream(outputPath));

// Add content
doc.fontSize(24).text('Test PDF Document', 100, 100);
doc.fontSize(12).text('', 100, 150);

doc.text('This is a test document for PDF to Markdown conversion.', 100, 180);
doc.text('', 100, 200);

doc.text('First Paragraph:', 100, 230);
doc.text('Here is the first paragraph with some content. This is a simple test to verify that the conversion is working properly. The PDF contains multiple paragraphs separated by proper formatting.', { width: 400 });
doc.text('', 100, 280);

doc.text('Second Paragraph:', 100, 310);
doc.text('Second paragraph starts here. The PDF contains multiple sections that will be converted to markdown format. This should help us test the markdown formatting and text extraction capabilities.', { width: 400 });
doc.text('', 100, 360);

doc.text('Third Paragraph:', 100, 390);
doc.text('Third paragraph with more content. Testing the conversion functionality with different text formats and structures. The output should be clean and readable markdown.', { width: 400 });

// Finalize
doc.end();

console.log(`PDF created: ${outputPath}`);
