# Deployment Guide

## Vercel Deployment (Recommended)

### Step-by-Step Instructions

1. **Push to GitHub:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/convert_md.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"
   - Your app will be live within seconds!

### Alternative: Using Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts and your app will be deployed.

## Other Deployment Options

### Netlify

1. Build locally:
   ```bash
   npm run build
   ```

2. Connect GitHub to Netlify or drag-and-drop the `.next` folder

### Railway

1. Connect GitHub repository to Railway
2. Railway auto-detects Next.js and deploys automatically

### DigitalOcean

1. Create an App Platform project
2. Connect GitHub repository
3. Set Node.js version to 18+
4. Deploy

### AWS/Google Cloud/Azure

1. Build production image
2. Deploy to container service
3. Set Node.js runtime environment

## Environment Variables

No environment variables required for current demo. If you add a real PDF parsing service:

1. Create `.env.local` in root:
   ```
   NEXT_PUBLIC_API_KEY=your_key
   ```

2. Update `.vercelignore` to not ignore `.env.local`

3. Add variables to Vercel project settings

## Post-Deployment Testing

1. Visit your Vercel URL
2. Upload a test PDF or DOCX file
3. Verify markdown preview loads
4. Test download functionality

## Troubleshooting

- **Build fails:** Check `npm run build` locally first
- **Import errors:** Ensure all dependencies in `package.json`
- **Timeout errors:** Increase timeout in Vercel project settings
