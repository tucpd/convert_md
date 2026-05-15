import { NextRequest, NextResponse } from 'next/server';
import mammoth from 'mammoth';
import TurndownService from 'turndown';

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

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Convert DOCX to HTML using mammoth
    const result = await mammoth.convertToHtml({ buffer });
    const html = result.value; // The generated HTML
    
    // Check if any text/HTML was generated
    if (!html && html.trim() === '') {
      throw new Error('No content could be extracted from this DOCX file.');
    }

    // Convert HTML to Markdown using turndown
    const turndownService = new TurndownService({
      headingStyle: 'atx',
      bulletListMarker: '-',
      codeBlockStyle: 'fenced'
    });
    
    let markdown = turndownService.turndown(html);

    if (!markdown || markdown.trim() === '') {
       markdown = 'No textual content could be extracted from this document.';
    }

    return NextResponse.json({ markdown });
  } catch (error: any) {
    console.error('DOCX conversion error:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to convert DOCX' },
      { status: 500 }
    );
  }
}
