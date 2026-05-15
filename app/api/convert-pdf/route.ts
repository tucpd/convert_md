import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Demo markdown - in production, use proper PDF parsing
    const markdown = `# Document from ${file.name}

## Extracted Content

This is a demonstration of the PDF to Markdown converter. 

In production, this would extract the actual text content from your PDF file and format it as markdown.

### Placeholder Content

- Support for multi-page PDFs
- Automatic formatting and structure detection
- Preserves headings, paragraphs, and lists
- Ready for markdown export

### How to Use

1. Upload a PDF or DOCX file
2. The converter extracts text and formats it as markdown
3. Preview and download the markdown file

---

*Note: This is a demonstration version. For production use, configure proper PDF parsing with pdfjs-dist or similar libraries.*`;

    return NextResponse.json({ markdown });
  } catch (error) {
    console.error('PDF conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert PDF' },
      { status: 500 }
    );
  }
}
