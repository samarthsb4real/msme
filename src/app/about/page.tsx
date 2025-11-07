import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  const features = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To empower MSMEs with AI-driven guidance and support for business growth and compliance."
    },
    {
      icon: Users,
      title: "Expert Knowledge",
      description: "Built with insights from MSME experts and government policy specialists."
    },
    {
      icon: Award,
      title: "Trusted Solutions",
      description: "Providing accurate, up-to-date information on regulations, loans, and schemes."
    },
    {
      icon: TrendingUp,
      title: "Growth Focused",
      description: "Helping small businesses scale with proper guidance and resources."
    }
  ];

  const stats = [
    { number: "63.4M", label: "MSMEs in India" },
    { number: "30%", label: "GDP Contribution" },
    { number: "111M", label: "Jobs Created" },
    { number: "49%", label: "Total Exports" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About MSME Service Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're dedicated to supporting India's vibrant MSME ecosystem with AI-powered guidance, 
            making business compliance and growth accessible to everyone.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* What We Cover */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="text-2xl text-center">What We Cover</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3">Business Registration</h3>
                <div className="space-y-2">
                  <Badge variant="secondary">Udyam Registration</Badge>
                  <Badge variant="secondary">GST Registration</Badge>
                  <Badge variant="secondary">FSSAI License</Badge>
                  <Badge variant="secondary">Trade License</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Financial Support</h3>
                <div className="space-y-2">
                  <Badge variant="secondary">MUDRA Loans</Badge>
                  <Badge variant="secondary">Stand-Up India</Badge>
                  <Badge variant="secondary">SIDBI Assistance</Badge>
                  <Badge variant="secondary">Credit Guarantee</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Government Schemes</h3>
                <div className="space-y-2">
                  <Badge variant="secondary">PM SVANidhi</Badge>
                  <Badge variant="secondary">PMEGP</Badge>
                  <Badge variant="secondary">Technology Upgradation</Badge>
                  <Badge variant="secondary">Export Promotion</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why Choose Us */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">Why Choose Our Assistant?</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-semibold mb-2">AI-Powered</h3>
                <p className="text-gray-600">Advanced AI provides accurate, contextual responses to your MSME queries.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="font-semibold mb-2">Instant Support</h3>
                <p className="text-gray-600">Get immediate answers 24/7 without waiting in queues or appointments.</p>
              </div>
              <div>
                <div className="text-4xl mb-4">📱</div>
                <h3 className="font-semibold mb-2">Mobile Friendly</h3>
                <p className="text-gray-600">Access guidance anywhere, anytime from your mobile device.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}