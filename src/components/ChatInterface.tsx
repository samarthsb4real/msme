'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, Settings } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

// Dynamic AI responses based on selected category

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Welcome to your MSME Service Assistant! 🏢\n\n**Available Categories:**\n• **Auto** - Smart routing for all queries\n• **Registration & Setup** - Udyam registration, business setup\n• **Loans & Finance** - MUDRA, Stand-Up India, funding options\n• **Compliance & Tax** - GST, labor laws, regulations\n• **Schemes & Subsidies** - Government incentives, benefits\n• **Maharashtra Dataset** - State-specific business information\n\n**I can help you with:**\n• Udyam Registration & MSME classification\n• Government schemes & subsidies\n• Loan programs & financing options\n• GST compliance & tax benefits\n• Export/Import procedures\n• State-specific business guidance\n• And much more!\n\n**💡 Tip:** Select a category above for specialized assistance!\n\nWhat would you like to know about your MSME journey?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string>('auto');
  const [autoSelectedCategory, setAutoSelectedCategory] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const detectCategory = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Maharashtra-specific keywords
    if (lowerMessage.includes('maharashtra') || lowerMessage.includes('mumbai') || lowerMessage.includes('pune') || 
        lowerMessage.includes('nashik') || lowerMessage.includes('nagpur') || lowerMessage.includes('akola') || 
        lowerMessage.includes('aurangabad') || lowerMessage.includes('midc') || lowerMessage.includes('vidarbha') ||
        lowerMessage.includes('borde gruha udyog')) {
      return 'maharashtra';
    }
    
    // Registration keywords
    if (lowerMessage.includes('registration') || lowerMessage.includes('udyam') || lowerMessage.includes('register') || 
        lowerMessage.includes('setup') || lowerMessage.includes('start business') || lowerMessage.includes('incorporation') ||
        lowerMessage.includes('license') || lowerMessage.includes('proprietorship') || lowerMessage.includes('partnership')) {
      return 'registration';
    }
    
    // Loans & Finance keywords
    if (lowerMessage.includes('loan') || lowerMessage.includes('mudra') || lowerMessage.includes('finance') || 
        lowerMessage.includes('funding') || lowerMessage.includes('credit') || lowerMessage.includes('bank') ||
        lowerMessage.includes('stand-up india') || lowerMessage.includes('cgtmse') || lowerMessage.includes('collateral')) {
      return 'loans';
    }
    
    // Compliance & Tax keywords
    if (lowerMessage.includes('gst') || lowerMessage.includes('tax') || lowerMessage.includes('compliance') || 
        lowerMessage.includes('regulation') || lowerMessage.includes('labor law') || lowerMessage.includes('environmental') ||
        lowerMessage.includes('composition scheme') || lowerMessage.includes('return')) {
      return 'compliance';
    }
    
    // Schemes & Subsidies keywords
    if (lowerMessage.includes('subsidy') || lowerMessage.includes('scheme') || lowerMessage.includes('grant') || 
        lowerMessage.includes('incentive') || lowerMessage.includes('benefit') || lowerMessage.includes('pmegp') ||
        lowerMessage.includes('technology upgrade') || lowerMessage.includes('export promotion')) {
      return 'schemes';
    }
    
    return 'auto';
  };

  const generateResponse = async (userMessage: string): Promise<string> => {
    try {
      // Detect category if in auto mode
      let effectiveModel = selectedModel;
      if (selectedModel === 'auto') {
        effectiveModel = detectCategory(userMessage);
        setAutoSelectedCategory(effectiveModel);
      } else {
        setAutoSelectedCategory('');
      }

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          model: effectiveModel 
        }),
      });

      const data = await response.json();
      
      // Check if there's an error in the response
      if (!response.ok || data.error) {
        console.warn('API returned error:', data.error);
        // If there's a fallback response from the API, use it
        if (data.response) {
          return data.response;
        }
        throw new Error(data.error || 'Failed to get response');
      }

      return data.response || 'Sorry, I couldn\'t generate a response. Please try again.';
    } catch (error) {
      console.error('Error calling chat API:', error);
      
      // Enhanced fallback responses based on user message
      const lowerMessage = userMessage.toLowerCase();
      
      const fallbackResponses: Record<string, string> = {
        'registration': '**MSME Registration**: Visit udyamregistration.gov.in with your Aadhaar number and business details. The process is free and typically takes 10-15 minutes. This provides access to collateral-free loans up to ₹2 crores.',
        'loan': '**MSME Financing** options include MUDRA loans (up to ₹10 lakhs without collateral), Stand-Up India (₹10 lakhs to ₹1 crore), and CGTMSE (up to ₹2 crores with government guarantee). Visit your nearest bank with Udyam certificate.',
        'gst': '**GST for MSMEs**: Businesses under ₹40 lakhs are exempt. Between ₹40 lakhs to ₹1.5 crores, you can opt for Composition Scheme at 1-6% rate with quarterly returns.',
        'subsidy': '**Government Subsidies** include technology upgradation subsidy (up to 15%, max ₹15 lakhs), export promotion assistance, cluster development funding, and sector-specific incentives.',
        'compliance': '**MSME Compliance Benefits**: Exemptions from various labor laws, simplified environmental clearances, reduced documentation requirements, and protection under MSMED Act for delayed payments.',
        'help': 'I can help with MSME registration, financing, compliance, subsidies, and business growth strategies. Ask me specific questions for detailed guidance.'
      };
      
      // Find the most relevant fallback response
      for (const [keyword, response] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(keyword)) {
          return response;
        }
      }
      
      return 'I\'m currently experiencing technical difficulties, but I\'m still here to help! For immediate assistance, please visit the official MSME Ministry website at msme.gov.in or contact your nearest District Industries Centre (DIC). You can also explore the Resources section of this site for helpful guides and tools.';
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    const messageToSend = inputText; // Store the message before clearing input
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    try {
      // Clear previous auto-selection when starting new message
      if (selectedModel === 'auto') {
        setAutoSelectedCategory('');
      }
      
      // Get AI response
      const aiResponse = await generateResponse(messageToSend);
      
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I\'m experiencing technical difficulties. Please try again or visit msme.gov.in for immediate assistance.',
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    'How to register MSME?',
    'What loans are available?',
    'GST compliance for MSME',
    'Government subsidies'
  ];

  // Deterministic time formatter to avoid SSR/client hydration mismatches
  const formatTime = (dateLike: Date | string | number) => {
    const d = typeof dateLike === 'string' || typeof dateLike === 'number' ? new Date(dateLike) : dateLike;
    if (!(d instanceof Date) || isNaN(d.getTime())) return '';
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const hr12 = hours % 12 === 0 ? 12 : hours % 12;
    return `${hr12}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <Card className="max-w-4xl mx-auto overflow-hidden">
      {/* Chat Header */}
      <CardHeader className="bg-primary text-primary-foreground p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold">MSME Assistant</h3>
              <div className="flex items-center space-x-2">
                <p className="text-sm opacity-90">Online • Ready to help</p>
                {selectedModel === 'auto' && autoSelectedCategory && autoSelectedCategory !== 'auto' && (
                  <div className="flex items-center space-x-1 bg-primary-foreground/20 px-2 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium">
                      Auto: {autoSelectedCategory === 'maharashtra' ? 'Maharashtra' : 
                             autoSelectedCategory === 'registration' ? 'Registration' :
                             autoSelectedCategory === 'loans' ? 'Loans' :
                             autoSelectedCategory === 'compliance' ? 'Compliance' :
                             autoSelectedCategory === 'schemes' ? 'Schemes' : 'Auto'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            {/* Auto-detection indicator */}
            {selectedModel === 'auto' && autoSelectedCategory && autoSelectedCategory !== 'auto' && (
              <div className="flex items-center space-x-2 bg-green-500/20 border border-green-400/30 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-green-100">
                  🎯 Auto-detected: {
                    autoSelectedCategory === 'maharashtra' ? 'Maharashtra Dataset' : 
                    autoSelectedCategory === 'registration' ? 'Registration & Setup' :
                    autoSelectedCategory === 'loans' ? 'Loans & Finance' :
                    autoSelectedCategory === 'compliance' ? 'Compliance & Tax' :
                    autoSelectedCategory === 'schemes' ? 'Schemes & Subsidies' : 'General'
                  }
                </span>
              </div>
            )}
            
            {/* Category selector */}
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 opacity-70" />
              <Select value={selectedModel} onValueChange={(value: string) => {
                setSelectedModel(value);
                if (value !== 'auto') {
                  setAutoSelectedCategory('');
                }
              }}>
                <SelectTrigger className="w-40 h-8 bg-primary-foreground/20 border-primary-foreground/30 text-primary-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="registration">Registration & Setup</SelectItem>
                  <SelectItem value="loans">Loans & Finance</SelectItem>
                  <SelectItem value="compliance">Compliance & Tax</SelectItem>
                  <SelectItem value="schemes">Schemes & Subsidies</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra Dataset</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        {/* Quick Questions */}
        <div className="p-4 bg-muted/50 border-b">
          <p className="text-sm text-muted-foreground mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80 transition-colors px-3 py-1"
                onClick={() => setInputText(question)}
              >
                {question}
              </Badge>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="h-96 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted text-foreground rounded-bl-none'
                  }`}
                >
                  <div className={`chat-message text-sm max-w-none ${message.isUser ? 'text-primary-foreground' : 'text-foreground'}`}>
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={{
                        h1: ({node, ...props}) => (
                          <h1 className={`text-lg font-bold mb-3 mt-2 ${message.isUser ? 'text-primary-foreground' : 'text-primary'}`} {...props} />
                        ),
                        h2: ({node, ...props}) => (
                          <h2 className={`text-base font-semibold mb-2 mt-4 border-b border-current/20 pb-1 ${message.isUser ? 'text-primary-foreground' : 'text-primary'}`} {...props} />
                        ),
                        h3: ({node, ...props}) => (
                          <h3 className={`text-sm font-semibold mb-2 mt-3 ${message.isUser ? 'text-primary-foreground' : 'text-primary'}`} {...props} />
                        ),
                        p: ({node, ...props}) => (
                          <p className="mb-3 leading-relaxed" {...props} />
                        ),
                        ul: ({node, ...props}) => (
                          <ul className="mb-3 ml-0 space-y-1 list-none" {...props} />
                        ),
                        ol: ({node, ...props}) => (
                          <ol className="mb-3 ml-4 space-y-1 list-decimal" {...props} />
                        ),
                        li: ({node, ...props}) => (
                          <li className="text-sm leading-relaxed" {...props} />
                        ),
                        strong: ({node, ...props}) => (
                          <strong className={`font-semibold ${message.isUser ? 'text-primary-foreground' : 'text-primary'}`} {...props} />
                        ),
                        code: ({node, ...props}) => (
                          <code className={`px-1.5 py-0.5 rounded text-xs font-mono ${
                            message.isUser 
                              ? 'bg-primary-foreground/20 text-primary-foreground' 
                              : 'bg-muted text-muted-foreground'
                          }`} {...props} />
                        ),
                        blockquote: ({node, ...props}) => (
                          <blockquote className={`border-l-4 pl-3 italic my-3 ${
                            message.isUser 
                              ? 'border-primary-foreground/30 text-primary-foreground/80' 
                              : 'border-primary/30 text-muted-foreground'
                          }`} {...props} />
                        )
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                  <p className={`text-xs mt-1 ${
                    message.isUser ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about MSME registration, loans, compliance..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputText.trim() || isTyping}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Press Enter to send • Select category above for specialized assistance • Responses may take a moment
          </p>
        </div>
      </CardContent>
    </Card>
  );
}