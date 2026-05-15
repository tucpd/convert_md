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

    // Demo markdown - in production, use mammoth or similar
    const markdown = `# Document from ${file.name}

## Extracted Content

This is a demonstration of the DOCX to Markdown converter.

In production, this would extract the actual text and formatting from your Word document and convert it to markdown.

### Features

- Text extraction from DOCX files
- Support for headings and formatting
- List and table conversion
- Preserves document structure

### Usage Instructions

1. Upload a DOCX file using the file chooser
2. The converter processes the document
3. View the markdown preview
4. Download the markdown file

---

*This is a demonstration version with placeholder content.*`;

    return NextResponse.json({ markdown });
  } catch (error) {
    console.error('DOCX conversion error:', error);
    return NextResponse.json(
      { error: 'Failed to convert DOCX' },
      { status: 500 }
    );
  }
}
