import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  CreditCard, 
  Shield, 
  Gift, 
  Calculator, 
  Building,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

export default function Services() {
  const services = [
    {
      icon: FileText,
      title: "Business Registration",
      description: "Complete guidance for all types of business registrations and licenses.",
      features: [
        "Udyam Registration (MSME)",
        "GST Registration",
        "Import/Export License",
        "Professional Tax Registration",
        "FSSAI License",
        "Trade License"
      ],
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: CreditCard,
      title: "Loan & Finance",
      description: "Navigate through various loan schemes and financial assistance programs.",
      features: [
        "MUDRA Loan Guidance",
        "Stand-Up India Scheme",
        "SIDBI Assistance",
        "Credit Guarantee Scheme",
        "Working Capital Loans",
        "Equipment Finance"
      ],
      color: "bg-green-100 text-green-600"
    },
    {
      icon: Shield,
      title: "Compliance Support",
      description: "Stay compliant with all regulatory requirements and avoid penalties.",
      features: [
        "Labour Law Compliance",
        "Environmental Clearances",
        "Factory License",
        "Pollution Control Board",
        "Fire Safety Certificate",
        "Annual Filing Requirements"
      ],
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Gift,
      title: "Government Schemes",
      description: "Access various government schemes and subsidies for MSMEs.",
      features: [
        "PM SVANidhi Scheme",
        "PMEGP (Employment Generation)",
        "Technology Upgradation",
        "Export Promotion Schemes",
        "Cluster Development",
        "Skill Development Programs"
      ],
      color: "bg-orange-100 text-orange-600"
    },
    {
      icon: Calculator,
      title: "Tax & GST",
      description: "Understanding tax obligations and GST compliance for MSMEs.",
      features: [
        "GST Registration Process",
        "Composition Scheme",
        "Input Tax Credit",
        "GST Return Filing",
        "Tax Planning",
        "Audit Requirements"
      ],
      color: "bg-red-100 text-red-600"
    },
    {
      icon: Building,
      title: "Business Growth",
      description: "Strategic guidance for scaling and expanding your business.",
      features: [
        "Market Access Support",
        "Technology Adoption",
        "Quality Certification",
        "Branding & Marketing",
        "Digital Transformation",
        "Export Assistance"
      ],
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive MSME support services powered by AI to help your business thrive 
            in today's competitive landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg ${service.color}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </div>
                  <p className="text-gray-600">{service.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href="/">
                    <Button className="w-full group">
                      Get Assistance
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How It Works */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">How Our AI Assistant Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Ask Your Question</h3>
                <p className="text-sm text-gray-600">Type your MSME-related query in natural language</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">AI Analysis</h3>
                <p className="text-sm text-gray-600">Our AI understands your context and requirements</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Expert Response</h3>
                <p className="text-sm text-gray-600">Get detailed, accurate guidance from our knowledge base</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <h3 className="font-semibold mb-2">Take Action</h3>
                <p className="text-sm text-gray-600">Follow step-by-step guidance to achieve your goals</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardContent className="text-center p-8">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of MSMEs who have benefited from our AI-powered guidance
            </p>
            <Link href="/">
              <Button size="lg" variant="secondary" className="group">
                Start Chatting Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}