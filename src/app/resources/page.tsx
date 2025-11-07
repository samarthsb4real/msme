'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LoanCalculator, GSTCalculator, WorkingCapitalCalculator, BreakEvenCalculator } from "@/components/Calculators";
import { 
  ExternalLink, 
  Download, 
  BookOpen, 
  FileText, 
  Video, 
  Users,
  Calculator,
  Globe
} from "lucide-react";

export default function Resources() {
  const [activeLoanCalculator, setActiveLoanCalculator] = useState(false);
  const [activeGSTCalculator, setActiveGSTCalculator] = useState(false);
  const [activeWorkingCapitalCalculator, setActiveWorkingCapitalCalculator] = useState(false);
  const [activeBreakEvenCalculator, setActiveBreakEvenCalculator] = useState(false);
  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const openYouTubeVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };
  const documentResources = [
    {
      title: "MSME Registration Guide",
      description: "Step-by-step guide for Udyam Registration",
      type: "TXT",
      size: "15 KB",
      downloadUrl: "/downloads/msme-registration-guide.txt"
    },
    {
      title: "GST Compliance Checklist",
      description: "Complete checklist for GST compliance",
      type: "TXT",
      size: "12 KB",
      downloadUrl: "/downloads/gst-compliance-checklist.txt"
    },
    {
      title: "Loan Application Template",
      description: "Ready-to-use loan application forms",
      type: "TXT",
      size: "18 KB",
      downloadUrl: "/downloads/loan-application-template.txt"
    },
    {
      title: "Business Plan Template",
      description: "Professional business plan template",
      type: "TXT",
      size: "25 KB",
      downloadUrl: "/downloads/business-plan-template.txt"
    }
  ];

  const webResources = [
    {
      title: "Udyam Registration Portal",
      description: "Official portal for MSME registration",
      url: "https://udyamregistration.gov.in/",
      category: "Government Portal"
    },
    {
      title: "SIDBI - Small Industries Development Bank",
      description: "Financial support and schemes for MSMEs",
      url: "https://www.sidbi.in/",
      category: "Financial Institution"
    },
    {
      title: "MSME Ministry",
      description: "Official website of Ministry of MSME",
      url: "https://msme.gov.in/",
      category: "Government"
    },
    {
      title: "GST Portal",
      description: "Goods and Services Tax portal",
      url: "https://www.gst.gov.in/",
      category: "Tax Portal"
    },
    {
      title: "National Sample Survey Office",
      description: "MSME statistics and data",
      url: "http://www.mospi.gov.in/",
      category: "Statistics"
    },
    {
      title: "Export-Import Bank of India",
      description: "Export financing and assistance",
      url: "https://www.eximbankindia.in/",
      category: "Export Support"
    },
    {
      title: "National Sample Survey Office (NSSO)",
      description: "MSME statistics and survey data",
      url: "http://www.mospi.gov.in/",
      category: "Statistics"
    },
    {
      title: "Khadi and Village Industries Commission",
      description: "KVIC schemes and rural industries support",
      url: "https://www.kvic.gov.in/",
      category: "Rural Industries"
    },
    {
      title: "Credit Guarantee Fund Trust for MSMEs",
      description: "Collateral-free credit guarantee schemes",
      url: "https://www.cgtmse.in/",
      category: "Credit Guarantee"
    },
    {
      title: "Make in India",
      description: "Manufacturing and investment opportunities",
      url: "https://www.makeinindia.com/",
      category: "Manufacturing"
    },
    {
      title: "Startup India",
      description: "Startup registration and support schemes",
      url: "https://www.startupindia.gov.in/",
      category: "Startups"
    }
  ];

  const calculators = [
    {
      title: "Loan EMI Calculator",
      description: "Calculate your monthly loan installments",
      icon: Calculator,
      action: () => setActiveLoanCalculator(true)
    },
    {
      title: "GST Calculator",
      description: "Calculate GST for your products/services",
      icon: Calculator,
      action: () => setActiveGSTCalculator(true)
    },
    {
      title: "Working Capital Calculator",
      description: "Estimate your working capital needs",
      icon: Calculator,
      action: () => setActiveWorkingCapitalCalculator(true)
    },
    {
      title: "Break-even Calculator",
      description: "Find your business break-even point",
      icon: Calculator,
      action: () => setActiveBreakEvenCalculator(true)
    }
  ];

  const videoResources = [
    {
      title: "MSME Registration & Business Setup",
      description: "Complete guide to MSME registration and business setup process",
      duration: "Video Tutorial",
      videoId: "Y5ItdxBzMoA",
      thumbnail: "https://img.youtube.com/vi/Y5ItdxBzMoA/maxresdefault.jpg",
      channel: "Business Guide"
    },
    {
      title: "GST Registration for Small Business",
      description: "Step-by-step GST registration process for MSMEs",
      duration: "Educational",
      videoId: "PEczM_H90rQ",
      thumbnail: "https://img.youtube.com/vi/PEczM_H90rQ/maxresdefault.jpg",
      channel: "Tax Tutorial"
    },
    {
      title: "MUDRA Loan Application Process",
      description: "How to apply for MUDRA loans - complete procedure",
      duration: "Finance Guide",
      videoId: "kMtfLKOwozs",
      thumbnail: "https://img.youtube.com/vi/kMtfLKOwozs/maxresdefault.jpg",
      channel: "Finance Expert"
    },
    {
      title: "Business License & Compliance",
      description: "Understanding business licenses and compliance requirements",
      duration: "Legal Guide",
      videoId: "6tHFXAfjNqs",
      thumbnail: "https://img.youtube.com/vi/6tHFXAfjNqs/maxresdefault.jpg",
      channel: "Legal Advisor"
    },
    {
      title: "Digital Marketing for Small Business",
      description: "Digital marketing strategies for MSME growth",
      duration: "Marketing",
      videoId: "NfPN4b24M8E",
      thumbnail: "https://img.youtube.com/vi/NfPN4b24M8E/maxresdefault.jpg",
      channel: "Marketing Pro"
    },
    {
      title: "Export-Import Business Setup",
      description: "Starting export-import business - documentation and process",
      duration: "Trade Guide",
      videoId: "DwPsvvWUxaQ",
      thumbnail: "https://img.youtube.com/vi/DwPsvvWUxaQ/maxresdefault.jpg",
      channel: "Trade Expert"
    },
    {
      title: "Working Capital Management",
      description: "Managing working capital effectively for small businesses",
      duration: "Finance",
      videoId: "h-h8-YcqPX0",
      thumbnail: "https://img.youtube.com/vi/h-h8-YcqPX0/maxresdefault.jpg",
      channel: "Finance Guide"
    },
    {
      title: "Government Schemes for MSMEs",
      description: "Overview of government schemes and subsidies for MSMEs",
      duration: "Policy Guide",
      videoId: "I_GkdObIzoQ",
      thumbnail: "https://img.youtube.com/vi/I_GkdObIzoQ/maxresdefault.jpg",
      channel: "Policy Expert"
    },
    {
      title: "Business Plan & Financial Projections",
      description: "Creating effective business plans and financial projections",
      duration: "Planning",
      videoId: "RhTh81w3qwg",
      thumbnail: "https://img.youtube.com/vi/RhTh81w3qwg/maxresdefault.jpg",
      channel: "Business Mentor"
    },
    {
      title: "Quality Certification & Standards",
      description: "ISO certification and quality standards for MSMEs",
      duration: "Quality",
      videoId: "IDmH30xYwNY",
      thumbnail: "https://img.youtube.com/vi/IDmH30xYwNY/maxresdefault.jpg",
      channel: "Quality Expert"
    },
    {
      title: "Technology Adoption in Small Business",
      description: "Implementing technology solutions for business growth",
      duration: "Tech Guide",
      videoId: "b0IRCilBJds",
      thumbnail: "https://img.youtube.com/vi/b0IRCilBJds/maxresdefault.jpg",
      channel: "Tech Advisor"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            MSME Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Access comprehensive resources, tools, and guides to help your MSME business 
            grow and stay compliant with regulations.
          </p>
        </div>

        {/* Quick Tools */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calculator className="h-6 w-6" />
              <span>Quick Calculators</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {calculators.map((calc, index) => {
                const IconComponent = calc.icon;
                return (
                  <div 
                    key={index} 
                    className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={calc.action}
                  >
                    <IconComponent className="h-8 w-8 text-blue-600 mb-2" />
                    <h3 className="font-semibold mb-1">{calc.title}</h3>
                    <p className="text-sm text-gray-600">{calc.description}</p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Featured Video Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-6 w-6" />
              <span>Featured Tutorial - MSME Registration & Business Setup</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/Y5ItdxBzMoA"
                title="MSME Registration & Business Setup"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">MSME Registration & Business Setup</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guide covering MSME registration process and complete business setup. Learn about 
                documentation, procedures, benefits, and step-by-step approach to start your MSME business.
              </p>
              <div className="flex items-center space-x-4 flex-wrap gap-2">
                <Badge variant="secondary">Video Tutorial</Badge>
                <Badge variant="outline">Comprehensive Guide</Badge>
                <Badge variant="outline">Business Setup</Badge>
                <Badge variant="outline">Registration Process</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-6 w-6" />
              <span>Downloadable Resources</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {documentResources.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="font-semibold">{doc.title}</h3>
                    <p className="text-sm text-gray-600">{doc.description}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="outline">{doc.type}</Badge>
                      <span className="text-xs text-gray-500">{doc.size}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleDownload(doc.downloadUrl, doc.title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Video Tutorials Section */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Video className="h-6 w-6" />
              <span>Video Learning Library</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {videoResources.map((video, index) => (
                <div key={index} className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-48 object-cover cursor-pointer hover:opacity-80 transition-opacity"
                      onClick={() => openYouTubeVideo(video.videoId)}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black bg-opacity-60 rounded-full p-3 cursor-pointer hover:bg-opacity-80 transition-all"
                           onClick={() => openYouTubeVideo(video.videoId)}>
                        <Video className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary" className="text-xs">{video.duration}</Badge>
                        {video.channel && (
                          <Badge variant="outline" className="text-xs">
                            {video.channel}
                          </Badge>
                        )}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => openYouTubeVideo(video.videoId)}
                      >
                        Watch
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Web Resources */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-6 w-6" />
              <span>Important Websites & Portals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {webResources.map((resource, index) => (
                <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold">{resource.title}</h3>
                    <ExternalLink className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{resource.category}</Badge>
                    <Button 
                      size="sm" 
                      variant="link" 
                      className="p-0 h-auto"
                      onClick={() => window.open(resource.url, '_blank')}
                    >
                      Visit Site
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Knowledge Base */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-6 w-6" />
              <span>Knowledge Base Categories</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-blue-600">Getting Started</h3>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-blue-600 cursor-pointer">• What is MSME Classification?</li>
                  <li className="hover:text-blue-600 cursor-pointer">• Benefits of MSME Registration</li>
                  <li className="hover:text-blue-600 cursor-pointer">• Required Documents</li>
                  <li className="hover:text-blue-600 cursor-pointer">• Step-by-step Process</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-green-600">Financial Support</h3>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-green-600 cursor-pointer">• Types of MSME Loans</li>
                  <li className="hover:text-green-600 cursor-pointer">• Government Schemes</li>
                  <li className="hover:text-green-600 cursor-pointer">• Eligibility Criteria</li>
                  <li className="hover:text-green-600 cursor-pointer">• Application Process</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-purple-600">Compliance</h3>
                <ul className="space-y-2 text-sm">
                  <li className="hover:text-purple-600 cursor-pointer">• GST Registration</li>
                  <li className="hover:text-purple-600 cursor-pointer">• Labour Law Compliance</li>
                  <li className="hover:text-purple-600 cursor-pointer">• Environmental Clearances</li>
                  <li className="hover:text-purple-600 cursor-pointer">• Annual Requirements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calculator Modals */}
        <LoanCalculator 
          isOpen={activeLoanCalculator} 
          onClose={() => setActiveLoanCalculator(false)} 
        />
        <GSTCalculator 
          isOpen={activeGSTCalculator} 
          onClose={() => setActiveGSTCalculator(false)} 
        />
        <WorkingCapitalCalculator 
          isOpen={activeWorkingCapitalCalculator} 
          onClose={() => setActiveWorkingCapitalCalculator(false)} 
        />
        <BreakEvenCalculator 
          isOpen={activeBreakEvenCalculator} 
          onClose={() => setActiveBreakEvenCalculator(false)} 
        />
      </div>
    </div>
  );
}