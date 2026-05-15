'use client';

import { useState, useRef, ChangeEvent, DragEvent } from 'react';

export default function Converter() {
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [fileName, setFileName] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    // Validate file type
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please upload a PDF or DOCX file');
      return;
    }

    setError('');
    setLoading(true);
    setFileName(file.name);

    try {
      const formData = new FormData();
      formData.append('file', file);

      let endpoint = '';
      if (file.type === 'application/pdf') {
        endpoint = '/api/convert-pdf';
      } else {
        endpoint = '/api/convert-docx';
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Conversion failed');
      }

      const data = await response.json();
      setMarkdown(data.markdown);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred during conversion'
      );
      setMarkdown('');
    } finally {
      setLoading(false);
    }
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const downloadMarkdown = () => {
    const element = document.createElement('a');
    const file = new Blob([markdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${fileName.split('.')[0]}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            PDF to Markdown Converter
          </h1>
          <p className="text-lg text-slate-600">
            Convert your PDF & DOCX documents to Markdown format with text extraction and basic formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="border-2 border-dashed border-slate-300 rounded-lg p-12 text-center cursor-pointer hover:border-orange-500 hover:bg-orange-50 transition-all"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="mb-4">
                <svg
                  className="w-16 h-16 mx-auto text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                Upload PDF or DOCX File
              </h3>
              <p className="text-slate-600 mb-4">
                Drag and drop your file here, or click to browse
              </p>

              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg w-full transition-colors disabled:opacity-50"
              >
                {loading ? 'Converting...' : 'Choose File'}
              </button>

              {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
            </div>

            {fileName && (
              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <p className="text-sm text-slate-600">
                  <span className="font-semibold">File:</span> {fileName}
                </p>
              </div>
            )}
          </div>

          {/* Preview Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Markdown Preview
            </h2>

            {markdown ? (
              <>
                <div className="flex-1 overflow-y-auto max-h-[600px] mb-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                  <pre className="text-sm text-slate-700 whitespace-pre-wrap break-words font-mono">
                    {markdown}
                  </pre>
                </div>

                <button
                  onClick={downloadMarkdown}
                  className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  ⬇ Download Markdown
                </button>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-400">
                <p>Upload a file to see markdown preview here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
