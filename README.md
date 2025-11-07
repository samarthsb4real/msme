# MSME Service Assistant

A comprehensive, AI-powered web application built with Next.js and Google's Gemini AI to assist with Micro, Small, and Medium Enterprise (MSME) related queries and guidance.

## 🚀 Features

- 🤖 **AI-Powered Chatbot**: Real-time assistance using Google's Gemini AI
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- 📄 **Multi-Page Application**: Complete website with navigation
- ⚡ **Fast Performance**: Powered by Next.js 16 with Turbopack
- 🔒 **Secure**: Environment-based API key management

## 🎯 MSME Expertise

Our AI assistant specializes in:
- **Registration**: Udyam Registration, GST setup, business licenses
- **Financial Support**: MUDRA loans, Stand-Up India, SIDBI schemes
- **Compliance**: Labor laws, environmental clearances, tax filing
- **Growth Programs**: Technology upgradation, export assistance
- **Government Schemes**: Subsidies, incentives, and support programs

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **Gemini API Key** from [Google AI Studio](https://makersuite.google.com/app/apikey)

## 🛠️ Quick Start

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
   - Copy `.env.local` and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_actual_api_key_here
   ```

3. **Start the development server**:

```bash
npm run dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
