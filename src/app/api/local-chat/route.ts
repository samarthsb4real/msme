import { NextRequest, NextResponse } from 'next/server';

// Maharashtra-specific dataset responses for local processing
// This simulates the specialized Maharashtra business dataset
const MSME_CONTEXT = `You are a specialized Maharashtra Business Intelligence Expert with comprehensive knowledge of the state's MSME ecosystem. You provide authoritative guidance on:

- Maharashtra's industrial landscape and business opportunities
- State-specific MSME policies and incentives  
- MIDC industrial areas and infrastructure
- Local business clusters and manufacturing hubs
- Regional market dynamics and supply chains
- State government schemes and financial assistance
- District-wise industrial development programs
- Export opportunities from Maharashtra ports
- Technology parks and IT corridors
- Traditional industries and modernization initiatives

You speak with confidence about Maharashtra's business environment, providing specific data, locations, and actionable insights for entrepreneurs and MSMEs operating in or considering Maharashtra as their business destination.`;

// Maharashtra-specific dataset responses
const localModelResponses: Record<string, string> = {
  'registration': `# MSME Registration Guide 🏢

**Udyam Registration** is mandatory for all MSMEs in India:

## Steps to Register:
1. Visit **udyamregistration.gov.in**
2. Use your **Aadhaar number** for authentication
3. Fill basic business details:
   - Business name & address
   - Bank account details
   - Activities (NIC codes)
   - Investment in plant & machinery

## Required Documents:
- Aadhaar card of proprietor/partners
- Bank statement/cancelled cheque
- Business address proof

## Benefits:
✅ Access to government schemes
✅ Collateral-free loans up to ₹2 crores
✅ Protection against delayed payments
✅ Tax benefits and subsidies

**Registration is FREE** - beware of paid services!`,

  'loan': `# MSME Loan Options 💰

## Popular Loan Schemes:

### 1. MUDRA Loans
- **Shishu**: Up to ₹50,000
- **Kishore**: ₹50,000 to ₹5 lakhs  
- **Tarun**: ₹5 to ₹10 lakhs
- No collateral required

### 2. Stand-Up India
- ₹10 lakhs to ₹1 crore
- For SC/ST/Women entrepreneurs
- 75% loan guarantee by government

### 3. CGTMSE Scheme
- Collateral-free loans up to ₹2 crores
- Credit guarantee from government
- Available through all banks

## Application Process:
1. Choose your bank/NBFC
2. Submit Udyam certificate
3. Provide business plan & financials
4. Bank processing & approval

**Tip**: Compare interest rates across banks!`,

  'gst': `# GST for MSMEs 📊

## Registration Thresholds:
- **₹20 lakhs**: For goods (₹10 lakhs for special states)
- **₹20 lakhs**: For services
- **Voluntary**: Can register below threshold

## MSME Benefits:

### Composition Scheme:
- Turnover up to ₹1.5 crores
- Pay 1-6% tax on turnover
- No input tax credit
- Quarterly returns

### Regular Scheme:
- Input tax credit available
- Monthly returns (GSTR-1, GSTR-3B)
- Better for B2B businesses

## Key Forms:
- **GSTR-1**: Outward supplies
- **GSTR-3B**: Monthly summary
- **GSTR-9**: Annual return

**Late Fee Waiver**: Often available for small taxpayers`,

  'subsidy': `# Government Subsidies for MSMEs 🎯

## Technology Upgradation Schemes:

### 1. Credit Linked Capital Subsidy (CLCS)
- 15% subsidy on machinery cost
- Up to ₹15 lakhs maximum
- For technology upgradation

### 2. Scheme of Fund for Regeneration of Traditional Industries (SFURTI)
- Cluster development approach
- Up to ₹8 crores per cluster
- Focus on traditional crafts

## Export Promotion:
### MSME Export Promotion Scheme
- Market development assistance
- Participation in trade fairs
- Product certification support

## State-Specific Schemes:
Each state offers additional subsidies:
- Land purchase assistance
- Power subsidy
- Tax holidays
- Employment generation incentives

**Apply Early**: Most schemes have limited budgets!`,

  'compliance': `# MSME Compliance Benefits 📋

## Labor Law Exemptions:

### Factories Act:
- MSMEs with <40 workers (with power) exempt from licensing
- <20 workers (without power) exempt

### Contract Labor Act:
- Establishments with <20 contract workers exempt

### Shops & Establishment Act:
- Simplified compliance for small enterprises

## Environmental Clearances:
- **White Category**: Industries with minimal pollution
- Simplified procedures for MSMEs
- Self-certification for many activities

## Other Benefits:
✅ **Delayed Payment Protection**: MSMED Act 2006
✅ **Priority Sector Lending**: Banks must lend 40% to MSMEs  
✅ **Government Procurement**: 25% reservation in tenders
✅ **Udyam Assist Platform**: For informal enterprises

## Annual Compliance:
- Income Tax Return
- GST Returns (if registered)
- Labor law compliance (if applicable)
- Environmental compliance certificates`
};

export async function POST(request: NextRequest) {
  let message = '';
  let category = '';
  
  try {
    const body = await request.json();
    message = body.message;
    category = body.category || 'maharashtra';

    console.log('🤖 Local model processing:', { message, category });

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Simulate local model processing with a slight delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    // Enhanced keyword matching and contextual responses
    const lowerMessage = message.toLowerCase();
    let response = '';

    // Location-based queries
    if (lowerMessage.includes('akola')) {
      response = `# Akola Business Ecosystem 🏙️

**Akola** is a prominent business hub in Maharashtra's Vidarbha region:

## Major Industries:
- **Cotton & Textiles**: Major cotton trading center
- **Agriculture**: Pulses, oilseeds, cotton production
- **Food Processing**: Dal mills, oil mills
- **Automotive Parts**: Growing manufacturing sector
- **Handicrafts**: Traditional crafts and handloom

## Business Opportunities:
✅ **Agro-processing**: Cotton ginning, oil extraction
✅ **Export Business**: Cotton, pulses to international markets  
✅ **Logistics Hub**: Strategic location for transportation
✅ **Food Products**: Spices, dal processing units
✅ **Textile Manufacturing**: Spinning, weaving units

## Government Support:
- **District Industries Centre (DIC)** - Akola
- **MSME Development Institute** - Nagpur (covers Akola)
- **Maharashtra Industrial Development Corporation (MIDC)**

## Key Infrastructure:
- Well-connected by road and rail
- Proximity to Nagpur (major commercial center)
- Agricultural market yards (APMCs)

**Contact**: DIC Akola - 0724-2422588`;

    } else if (lowerMessage.includes('borde gruha udyog')) {
      response = `# BORDE GRUHA UDYOG - MSME Enterprise Analysis 🏭

**BORDE GRUHA UDYOG** is a home-based enterprise (Gruha Udyog = Home Industry):

## Typical Gruha Udyog Characteristics:
- **Scale**: Micro/Small enterprise
- **Location**: Home-based or small premises
- **Employment**: Family members + few workers
- **Investment**: Limited capital requirement

## Common Gruha Udyog Activities:
✅ **Food Processing**: Pickles, snacks, sweets
✅ **Textiles**: Handloom, embroidery, tailoring
✅ **Handicrafts**: Traditional crafts, decorative items
✅ **Agro-products**: Spice grinding, flour mills
✅ **Services**: Catering, beauty services

## MSME Benefits Available:
- **Udyam Registration**: Free online registration
- **MUDRA Loans**: Up to ₹10 lakhs without collateral
- **Skill Development**: Training programs available
- **Market Linkage**: Government procurement opportunities

## Growth Strategies:
1. **Digital Presence**: Online marketing, e-commerce
2. **Quality Certification**: ISI, AGMARK marks
3. **Cluster Development**: Join local business groups
4. **Technology Upgrade**: Modern equipment with subsidy

*Ask me specific questions about Maharashtra's business landscape, and I'll provide detailed, actionable guidance.*

---
*🤖 Response from Maharashtra Dataset (Local Model)*`;

    // Regular keyword matching
    } else if (lowerMessage.includes('registration') || lowerMessage.includes('udyam')) {
      response = localModelResponses.registration;
    } else if (lowerMessage.includes('loan') || lowerMessage.includes('mudra') || lowerMessage.includes('finance')) {
      response = localModelResponses.loan;
    } else if (lowerMessage.includes('gst') || lowerMessage.includes('tax')) {
      response = localModelResponses.gst;
    } else if (lowerMessage.includes('subsidy') || lowerMessage.includes('scheme') || lowerMessage.includes('grant')) {
      response = localModelResponses.subsidy;
    } else if (lowerMessage.includes('compliance') || lowerMessage.includes('regulation') || lowerMessage.includes('law')) {
      response = localModelResponses.compliance;
    
    // Business location queries
    } else if (lowerMessage.includes('business') && (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('area'))) {
      response = `# Best Business Locations for MSMEs in India 📍

## Factors to Consider:
1. **Raw Material Availability**
2. **Market Access & Connectivity**
3. **Skilled Labor Availability**
4. **Infrastructure Support**
5. **Government Incentives**

## Top MSME-Friendly States:

### Maharashtra:
- **Pune**: IT, automotive, engineering
- **Nashik**: Food processing, engineering
- **Aurangabad**: Automotive, pharmaceuticals

### Gujarat:
- **Ahmedabad**: Textiles, chemicals, engineering
- **Surat**: Diamond cutting, textiles
- **Vadodara**: Chemicals, engineering

### Tamil Nadu:
- **Chennai**: Automotive, IT, leather
- **Coimbatore**: Textiles, engineering
- **Tirupur**: Garments, textiles

### Karnataka:
- **Bangalore**: IT, biotechnology
- **Mysore**: IT, traditional industries
- **Hubli**: Engineering, textiles

## Industrial Corridors:
- **Delhi-Mumbai**: Manufacturing hub
- **Chennai-Bangalore**: IT corridor
- **Pune-Mumbai**: Automotive belt

**Looking for specific industry location?** Tell me your business type!`;

    } else {
      // Intelligent general response based on context
      if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('help')) {
        response = `# Welcome to Maharashtra Dataset Assistant 👋

I am your Maharashtra Business Intelligence Expert with comprehensive insights into the state's industrial ecosystem.

## 🎯 I specialize in:
- **Business Registration** (Udyam, Company incorporation)
- **Financial Assistance** (Loans, schemes, subsidies)  
- **Tax & Compliance** (GST, labor laws, licenses)
- **Location Intelligence** (Industrial areas, clusters)
- **Growth Strategies** (Technology, markets, skills)

## 🔥 Try asking me:
- "How to register MSME in Maharashtra?"
- "MUDRA loan eligibility criteria"
- "GST benefits for small businesses"
- "Best locations for textile business"
- "Government subsidies for technology upgrade"

**Your question**: "${message}"

*Ready to help with your MSME journey!*`;

      } else if (lowerMessage.includes('thank')) {
        response = `# You're Welcome! 🙏

Happy to help with your MSME queries! 

## Need more assistance?
- **Switch to other categories** for general queries
- **Explore Resources** section for downloads & videos
- **Use Calculators** for financial planning

**Remember**: Always verify latest information from official sources like:
- msme.gov.in
- udyamregistration.gov.in
- Your local District Industries Centre

*Keep growing your business!* 🚀`;

      } else {
        // Enhanced contextual response
        response = `# MSME Assistant (Local Model) 🤖

I'm analyzing your query: **"${message}"**

## 🧠 Based on your question, you might be interested in:

${lowerMessage.includes('business') ? '- **Business Setup**: Registration, licenses, location selection' : ''}
${lowerMessage.includes('money') || lowerMessage.includes('finance') ? '- **Financing**: MUDRA loans, venture capital, government schemes' : ''}
${lowerMessage.includes('tax') ? '- **Taxation**: GST registration, composition scheme, tax benefits' : ''}
${lowerMessage.includes('export') || lowerMessage.includes('international') ? '- **Export Business**: Documentation, incentives, market access' : ''}
${lowerMessage.includes('technology') || lowerMessage.includes('digital') ? '- **Technology**: Digitization, Industry 4.0, automation subsidies' : ''}

## 💡 **Quick Actions:**
1. **Ask specifically** about registration, loans, GST, subsidies, or compliance
2. **Mention your location** for targeted advice (e.g., "Mumbai textile business")
3. **Try other categories** (dropdown above) for general assistance

## 🎯 **Popular Queries:**
- "How to start MSME in [your city]?"
- "MUDRA loan process step by step"
- "GST registration for small business"
- "Technology upgrade subsidies 2025"

*I'm here to help make your MSME journey smoother!*`;
      }
    }

    console.log('✅ Local model response generated, length:', response.length);
    return NextResponse.json({ response });

  } catch (error) {
    console.error('Local model error:', error);
    
    // Fallback response for Maharashtra dataset
    const fallbackResponse = `# Maharashtra Dataset Service 🔧

I'm the **Maharashtra Dataset Assistant**, but I'm experiencing some technical difficulties right now.

## Quick MSME Help:
- **Registration**: Visit udyamregistration.gov.in
- **Loans**: Check MUDRA, Stand-Up India schemes
- **GST**: Composition scheme for small businesses
- **Subsidies**: CLCS for technology upgradation

**Your question was**: "${message}"

For immediate assistance, please:
1. Try other **categories** (switch in dropdown)
2. Visit official MSME Ministry website
3. Contact your nearest District Industries Centre

*Maharashtra dataset service will be back online soon!*`;

    return NextResponse.json({ 
      response: fallbackResponse,
      error: 'Local model temporarily unavailable'
    });
  }
}