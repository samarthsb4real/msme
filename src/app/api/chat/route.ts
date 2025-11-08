import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const MSME_CONTEXT = `You are an MSME (Micro, Small, and Medium Enterprise) information expert for India. Answer user questions directly with factual data.

Your responses must be:
- Direct and to-the-point: Answer the exact question asked
- Factual: Provide specific numbers, names, amounts, percentages, and deadlines
- Contextual: Stick to what the user asked—no tangents or excessive tutorials
- Concise: Avoid lengthy explanations unless specifically requested
- Cite sources: Reference official portals (msme.gov.in, udyamregistration.gov.in, data.gov.in, etc.) when relevant

What to include:
- Specific program names, amounts, eligibility criteria
- Official website URLs and contact information
- Current policies and regulations (with dates/versions if known)
- Clear yes/no answers or direct data points

What to avoid:
- Long step-by-step tutorials unless the user explicitly asks "how to" or "steps"
- Generic motivational language or filler text
- Repeating the question back to the user
- Explaining basic concepts the user didn't ask about

CRITICAL: Never mention your AI nature, training data, or that you are a language model. Never say phrases like "I don't have access to real-time data" or "as an AI" or "my knowledge cutoff." Present information authoritatively as an expert would. Only cite official government sources (msme.gov.in, data.gov.in, dashboard.msme.gov.in, etc.) when referencing data—never mention where your knowledge comes from otherwise.

If a question is ambiguous, provide the most likely answer based on context, then briefly note alternatives (1-2 sentences max).

Your expertise covers: Udyam registration, MUDRA/Stand-Up India/CGTMSE loans, GST compliance, government schemes/subsidies, export/import procedures, technology upgradation, and state-specific MSME programs.`;

const MAHARASHTRA_RESOURCES = `When answering Maharashtra-specific queries, prioritize factual data from these authoritative sources. Cite the source name and provide specific data points (numbers, names, locations) from these links:

1. Data.gov.in — List of MSME Registered Units under UDYAM: https://www.data.gov.in/resource/list-msme-registered-units-under-udyam
2. dashboard.msme.gov.in — Statewise Udyam Registration dashboard: https://dashboard.msme.gov.in/Udyam_Statewise.aspx
3. S3WaaS (Economic Survey PDF) — Economic Survey of Maharashtra 2024-25: https://cdnbbsr.s3waas.gov.in/s349d4b2faeb4b7b9e745775793141e2/uploads/2025/01/2025030788773769.pdf
4. Data.gov.in (MSME Catalogs) — Ministry datasets: https://www.data.gov.in/catalogs/?ministry=Ministry+of+Micro%2C+Small+and+Medium+Enterprises
5. DCMSME — Data & Statistics: https://dcmsme.gov.in/Data_Statistics.aspx
6. PCMC (Pimpri-Chinchwad Municipal Corporation) — department data/downloads: https://www.pcmcindia.gov.in/department-data.php?Id=13
7. Aaple Sarkar (Maharashtra government portal): https://www.aaplesarkar.mahaonline.gov.in/en
8. MSME DataBank — https://www.msmedatabank.in/

Instructions for Maharashtra queries:
- Answer with specific data: registration counts, district-wise statistics, MIDC locations, cluster names
- Reference the source explicitly (e.g., "According to dashboard.msme.gov.in, Maharashtra has X registrations as of...")
- If the user asks for municipal/district-level data, provide what's available and note if direct CSV/JSON links exist
- Keep answers factual and data-driven; avoid generic advice unless the user explicitly asks for recommendations`;

export async function POST(request: NextRequest) {
  let message = '';
  let selectedCategory = 'auto';
  
  try {
    const body = await request.json();
    message = body.message;
    selectedCategory = body.model || 'auto';

    // If Maharashtra dataset is requested, include Maharashtra-specific authoritative links
    // in the context so Gemini can use them as reference sources when answering.
    // (We no longer auto-redirect to the local-chat API here; use 'local-chat' explicitly if
    // you want the local model.)

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'API key not configured',
          fallback: 'I apologize, but the AI service is not properly configured. Please check with the administrator to set up the Gemini API key.'
        },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

    // Category-specific context
    let categoryContext = MSME_CONTEXT;
    switch (selectedCategory) {
      case 'registration':
        categoryContext += '\n\nFocus: Udyam registration, business setup, licenses. Provide specific portal links, fees, timelines, required documents.';
        break;
      case 'loans':
        categoryContext += '\n\nFocus: Loans and financing. Provide exact amounts, eligibility criteria, interest rates, bank names, application portals.';
        break;
      case 'compliance':
        categoryContext += '\n\nFocus: GST, tax, labor laws, regulations. Provide thresholds, exemptions, filing deadlines, penalty amounts.';
        break;
      case 'schemes':
        categoryContext += '\n\nFocus: Government schemes, subsidies, grants. Provide scheme names, subsidy percentages/amounts, eligibility, application deadlines.';
        break;
      case 'maharashtra':
        // Append Maharashtra resources and an instruction to cite them where applicable.
        categoryContext += '\n\nFocus: Maharashtra state MSME data, policy, and local resources. Provide district-level statistics, MIDC locations, cluster names, registration counts.';
        categoryContext += '\n\n' + MAHARASHTRA_RESOURCES;
        break;
      default:
        // Auto mode - general context
        break;
    }

    const prompt = `${categoryContext}

User Question: ${message}

Provide a direct, factual answer. Be concise and cite sources where applicable.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Category-specific guidance (no emojis so responses are plain text)
    const fallbackResponses: Record<string, string> = {
      registration: '**Registration & Setup Help**\n\n• **Udyam Registration**: Visit udyamregistration.gov.in with your Aadhaar number and basic business details. The registration is free and typically takes 10-15 minutes online.\n\n• **Key Benefits**: Access to collateral-free loans up to ₹2 crores, government tenders, and various subsidy schemes.',
      loans: '**Loans & Finance Help**\n\n• **MUDRA Loans**: Financing up to ₹10 lakhs without collateral\n• **Stand-Up India**: ₹10 lakhs to ₹1 crore for SC/ST/Women entrepreneurs\n• **CGTMSE**: Credit guarantee up to ₹2 crores\n\n**Next Step**: Visit your nearest bank with Udyam certificate to explore options.',
      compliance: '**Compliance & Tax Help**\n\n• **GST Exemption**: Businesses under ₹40 lakhs turnover are exempt\n• **Composition Scheme**: 1-6% tax rate for turnover up to ₹1.5 crores\n• **MSME Benefits**: Reduced compliance requirements under various labor and environmental laws.',
      schemes: '**Schemes & Subsidies Help**\n\n• **Technology Upgradation**: Up to 15% subsidy (max ₹15 lakhs) on machinery\n• **Export Promotion**: Market development assistance and trade fair support\n• **Cluster Development**: SFURTI scheme funding available\n\n**Next Step**: Check respective ministry portals for current application procedures.',
      auto: '**MSME Service Assistant**\n\nI can help with MSME registration, financing, compliance, and government schemes. Select a specific category above for focused assistance, or ask me about any MSME-related topic.'
    };

    const userMessage = message?.toLowerCase() || '';
    
    // Use category-specific fallback first, then keyword-based
    let fallbackText = fallbackResponses[selectedCategory] || fallbackResponses.auto;
    
    // If no category match, try keyword-based fallback
    if (fallbackText === fallbackResponses.auto) {
      for (const [key, response] of Object.entries(fallbackResponses)) {
        if (userMessage.includes(key)) {
          fallbackText = response;
          break;
        }
      }
    }

    return NextResponse.json({ 
      response: fallbackText,
      error: 'AI service temporarily unavailable'
    });
  }
}