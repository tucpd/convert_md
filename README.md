# PDF to Markdown Converter

Convert your PDF and DOCX documents to Markdown format with text extraction and basic formatting.

## Features

- 🎯 Simple, clean web interface
- 📄 Support for PDF and DOCX files
- ✨ Markdown preview
- ⬇️ One-click download
- 🚀 Deployed on Vercel (free)
- 💻 Works on desktop and mobile

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd convert_md
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Click "Choose File" or drag and drop a PDF/DOCX file
2. Wait for the conversion to complete
3. Preview the markdown content
4. Click "Download Markdown" to save the `.md` file

## Deployment

### Deploy to Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the project to Vercel
3. Click "Deploy"
4. Your app will be live in seconds!

**Or use Vercel CLI:**

```bash
npm i -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Deploy the 'out' or '.next' folder to Netlify
```

### Deploy to Other Platforms

This is a Next.js app that works with any Node.js hosting:
- AWS Lambda/Amplify
- Google Cloud Run
- Azure App Service
- DigitalOcean
- Railway
- Render

## Building for Production

```bash
npm run build
npm run start
```

## Project Structure

```
convert_md/
├── app/
│   ├── api/
│   │   ├── convert-pdf/
│   │   │   └── route.ts
│   │   └── convert-docx/
│   │       └── route.ts
│   ├── page.tsx
│   └── layout.tsx
├── components/
│   └── Converter.tsx
├── package.json
└── README.md
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React** - UI components

## Building for Production

```bash
npm run build
npm run start
```

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

MIT
