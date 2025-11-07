import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send,
  HelpCircle,
  Users,
  Star
} from "lucide-react";

export default function Contact() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "AI Chat Assistant",
      description: "Get instant answers to your MSME queries",
      action: "Start Chat",
      highlight: true
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "support@msmeassistant.com",
      action: "Send Email",
      highlight: false
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "1800-XXX-XXXX (Toll Free)",
      action: "Call Now",
      highlight: false
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
    { day: "Sunday", hours: "Closed" },
    { day: "AI Assistant", hours: "24/7 Available" }
  ];

  const faqs = [
    {
      question: "How accurate is the AI assistant?",
      answer: "Our AI is trained on official government resources and updated regularly to provide accurate, up-to-date information."
    },
    {
      question: "Is the service free to use?",
      answer: "Yes, our basic AI assistance is completely free. Premium features may be introduced in the future."
    },
    {
      question: "Can I get help with loan applications?",
      answer: "Absolutely! We provide guidance on various loan schemes, eligibility criteria, and application processes."
    },
    {
      question: "Do you provide legal advice?",
      answer: "We provide informational guidance based on regulations. For complex legal matters, we recommend consulting a qualified professional."
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      business: "Textile Manufacturing",
      comment: "The AI assistant helped me navigate the MSME registration process in just 2 days!",
      rating: 5
    },
    {
      name: "Rajesh Kumar",
      business: "Food Processing",
      comment: "Excellent guidance on GST compliance. Saved me hours of research.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      business: "IT Services",
      comment: "Got clear information about MUDRA loans. Very helpful for expanding my business.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Contact & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Need help with your MSME journey? We're here to assist you every step of the way. 
            Choose the support option that works best for you.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <Card key={index} className={`text-center hover:shadow-lg transition-all duration-300 ${
                method.highlight ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}>
                <CardHeader>
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${
                    method.highlight ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <CardTitle>{method.title}</CardTitle>
                  <p className="text-gray-600">{method.description}</p>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full ${method.highlight ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                    variant={method.highlight ? 'default' : 'outline'}
                  >
                    {method.action}
                  </Button>
                  {method.highlight && (
                    <Badge className="mt-2 bg-green-100 text-green-800">Recommended</Badge>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Mail className="h-6 w-6" />
                <span>Send us a Message</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input placeholder="Your full name" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input placeholder="How can we help you?" />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <textarea 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  rows={5}
                  placeholder="Describe your query in detail..."
                />
              </div>
              <Button className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </CardContent>
          </Card>

          {/* Office Hours & Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-6 w-6" />
                <span>Support Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {officeHours.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <span className="font-medium">{schedule.day}</span>
                  <span className={`${schedule.day === 'AI Assistant' ? 'text-green-600 font-semibold' : 'text-gray-600'}`}>
                    {schedule.hours}
                  </span>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                  <span className="font-semibold">Our Office</span>
                </div>
                <p className="text-sm text-gray-600">
                  123 Business District<br />
                  New Delhi, India 110001<br />
                  Near MSME Development Institute
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HelpCircle className="h-6 w-6" />
              <span>Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b pb-4 last:border-b-0">
                  <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-6 w-6" />
              <span>What Our Users Say</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-3 italic">"{testimonial.comment}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.business}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}