import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const MSME_CONTEXT = `You are a highly knowledgeable MSME (Micro, Small, and Medium Enterprise) Service Expert for India. You have comprehensive expertise in:

1. MSME Registration & Udyam Registration processes
2. Government Schemes & Subsidies (current and applicable)
3. Loan Programs (MUDRA, Stand-Up India, SIDBI, etc.)
4. Compliance Requirements and regulatory frameworks
5. GST for MSMEs and tax optimization
6. Export/Import procedures and documentation
7. Technology upgradation schemes and benefits
8. Market development assistance programs
9. Skill development and capacity building programs
10. Financial assistance and credit guarantee schemes

Communication Style:
- Provide clear, knowledgeable guidance based on current MSME policies
- Give practical answers with specific numbers, percentages, and limits where applicable
- Reference official government portals and authoritative sources
- Be helpful and actionable in your recommendations
- Structure information clearly with bullet points and sections
- When discussing processes, provide step-by-step guidance
- For current rates, fees, or deadlines that may change, advise users to verify with official sources
- Focus on the Indian MSME ecosystem and current regulations
- Be professional and supportive while maintaining accuracy

Deliver well-structured, practical responses that help users take concrete next steps.`;

export async function POST(request: NextRequest) {
  let message = '';
  let selectedCategory = 'auto';
  
  try {
    const body = await request.json();
    message = body.message;
    selectedCategory = body.model || 'auto';

    // If Maharashtra dataset is requested, redirect to local-chat API
    if (selectedCategory === 'maharashtra') {
      console.log('🏙️ Routing to Maharashtra dataset (local model):', message);
      
      const localResponse = await fetch(`${request.nextUrl.origin}/api/local-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, category: selectedCategory }),
      });
      
      const localData = await localResponse.json();
      console.log('📍 Maharashtra dataset response received');
      return NextResponse.json(localData);
    }

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
        categoryContext += '\n\nFocus specifically on business registration, Udyam registration, company incorporation, licenses, and setup procedures.';
        break;
      case 'loans':
        categoryContext += '\n\nFocus specifically on loans, financing, MUDRA schemes, bank processes, credit facilities, and funding options.';
        break;
      case 'compliance':
        categoryContext += '\n\nFocus specifically on compliance requirements, GST, tax obligations, labor laws, and regulatory matters.';
        break;
      case 'schemes':
        categoryContext += '\n\nFocus specifically on government schemes, subsidies, incentives, grants, and benefit programs.';
        break;
      default:
        // Auto mode - general context
        break;
    }

    const prompt = `${categoryContext}

User Question: ${message}

Please provide a helpful response:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Category-specific guidance
    const fallbackResponses: Record<string, string> = {
      registration: '**Registration & Setup Help** 🏢\n\n• **Udyam Registration**: Visit udyamregistration.gov.in with your Aadhaar number and basic business details. The registration is free and typically takes 10-15 minutes online.\n\n• **Key Benefits**: Access to collateral-free loans up to ₹2 crores, government tenders, and various subsidy schemes.',
      loans: '**Loans & Finance Help** 💰\n\n• **MUDRA Loans**: Financing up to ₹10 lakhs without collateral\n• **Stand-Up India**: ₹10 lakhs to ₹1 crore for SC/ST/Women entrepreneurs\n• **CGTMSE**: Credit guarantee up to ₹2 crores\n\n**Next Step**: Visit your nearest bank with Udyam certificate to explore options.',
      compliance: '**Compliance & Tax Help** 📋\n\n• **GST Exemption**: Businesses under ₹40 lakhs turnover are exempt\n• **Composition Scheme**: 1-6% tax rate for turnover up to ₹1.5 crores\n• **MSME Benefits**: Reduced compliance requirements under various labor and environmental laws.',
      schemes: '**Schemes & Subsidies Help** 🎯\n\n• **Technology Upgradation**: Up to 15% subsidy (max ₹15 lakhs) on machinery\n• **Export Promotion**: Market development assistance and trade fair support\n• **Cluster Development**: SFURTI scheme funding available\n\n**Next Step**: Check respective ministry portals for current application procedures.',
      auto: '**MSME Service Assistant** 🤖\n\nI can help with MSME registration, financing, compliance, and government schemes. Select a specific category above for focused assistance, or ask me about any MSME-related topic.'
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