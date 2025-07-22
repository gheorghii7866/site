"use client"

import type React from "react"
import type { ChartConfig } from "@/components/ui/chart"
import Image from 'next/image'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Brain,
  Shield,
  Scale,
  Eye,
  Network,
  CheckCircle,
  ArrowRight,
  Menu,
  X,
  Linkedin,
  Send,
  TrendingUp,
  DollarSign,
  PiggyBank,
  Calendar,
  CreditCard,
  Home,
  Briefcase,
} from "lucide-react"
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell,
} from "recharts"

// Mock data for charts
const netWorthData = [
  { year: 2019, value: 450000 },
  { year: 2020, value: 520000 },
  { year: 2021, value: 680000 },
  { year: 2022, value: 620000 },
  { year: 2023, value: 750000 },
  { year: 2024, value: 890000 },
]

const incomeExpensesData = [
  { month: "Jan", income: 12000, expenses: 8500 },
  { month: "Feb", income: 11500, expenses: 8200 },
  { month: "Mar", income: 13200, expenses: 9100 },
  { month: "Apr", income: 12800, expenses: 8800 },
  { month: "May", income: 12500, expenses: 8600 },
  { month: "Jun", income: 14000, expenses: 9200 },
]

const portfolioData = [
  { name: "Stocks", value: 450000, color: "hsl(var(--chart-1))" },
  { name: "Bonds", value: 180000, color: "hsl(var(--chart-2))" },
  { name: "Real Estate", value: 320000, color: "hsl(var(--chart-3))" },
  { name: "Cash", value: 80000, color: "hsl(var(--chart-4))" },
  { name: "Crypto", value: 45000, color: "hsl(var(--chart-5))" },
]

const retirementTimelineData = [
  { age: 50, conservative: 850000, moderate: 890000, aggressive: 920000 },
  { age: 55, conservative: 1200000, moderate: 1350000, aggressive: 1480000 },
  { age: 60, conservative: 1650000, moderate: 1950000, aggressive: 2280000 },
  { age: 65, conservative: 2100000, moderate: 2650000, aggressive: 3200000 },
  { age: 70, conservative: 2450000, moderate: 3200000, aggressive: 4100000 },
]

// NEW: Team Data for About Us Section
const teamData = [
  {
    name: "Manuel Imanse",
    title: "Co-Founder & CEO",
    linkedin: "https://www.linkedin.com/in/manuel-imanse/",
    image: "/assets/manuel.png",
    bio: "Business strategist with a background in consulting."
  },
  {
    name: "Nichita Railean",
    title: "Co-Founder & CTO",
    linkedin: "https://www.linkedin.com/in/nichita-railean-a78b4a206/",
    image: "/assets/nick.png",
    bio: "Full-stack engineer leading tech development."
  },
  {
    name: "David Nabeiro",
    title: "Founder & COO",
    linkedin: "https://www.linkedin.com/in/david-nabeiro/",
    image: "/assets/david.png",
    bio: "AI and Process Improvement specialist."
  },
  {
    name: "Martijn van Eck",
    title: "Partner & Head of FinTech",
    linkedin: "https://www.linkedin.com/in/martijnvaneck/",
    image: "/assets/Martijn.jpeg",
    bio: "Venture Building, Innovation, A.I., Financial Services, Digital Assets."
  },
]

const netWorthChartConfig = {
  value: {
    label: "Net Worth",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const incomeExpensesChartConfig = {
  income: {
    label: "Income",
    color: "hsl(var(--chart-2))",
  },
  expenses: {
    label: "Expenses",
    color: "hsl(var(--chart-4))",
  },
} satisfies ChartConfig

const retirementChartConfig = {
  conservative: {
    label: "Conservative",
    color: "hsl(var(--chart-4))",
  },
  moderate: {
    label: "Moderate",
    color: "hsl(var(--chart-2))",
  },
  aggressive: {
    label: "Aggressive",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const pieChartConfig = {
  value: {
    label: "Value",
  },
  stocks: {
    label: "Stocks",
    color: "hsl(var(--chart-1))",
  },
  bonds: {
    label: "Bonds",
    color: "hsl(var(--chart-2))",
  },
  "real estate": {
    label: "Real Estate",
    color: "hsl(var(--chart-3))",
  },
  cash: {
    label: "Cash",
    color: "hsl(var(--chart-4))",
  },
  crypto: {
    label: "Crypto",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

// --- NEW Helper Component for Legal Modals ---
const LegalModal = ({ title, children, onClose }: { title: string, children: React.ReactNode, onClose: () => void }) => (
  <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
      <div className="p-6 border-b border-gray-200 dark:border-zinc-800 flex justify-between items-center sticky top-0 bg-white dark:bg-zinc-900">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{title}</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="p-6 text-gray-600 dark:text-gray-400 leading-relaxed space-y-4">
        {children}
      </div>
    </div>
  </div>
);

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      message: "Hi! I'm your Financial Twin AI. I can help you understand your financial projections and scenarios.",
    },
    { type: "user", message: "What's my projected net worth in 10 years?" },
    {
      type: "ai",
      message:
        "Based on your current savings rate and investment performance, you're projected to reach $2.65M by age 65 with moderate risk tolerance. Would you like to explore different scenarios?",
    },
  ])
  const [activeSection, setActiveSection] = useState("hero")

  // NEW state for legal modals
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()

    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // middle of viewport
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section))

    return () => {
      window.removeEventListener("scroll", handleScroll)
      sections.forEach((section) => observer.unobserve(section))
    }
  }, [])

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) return;
    console.log("Email submitted:", email)
    setIsEmailSubmitted(true)
    setEmail("")
    // Reset form after a few seconds
    setTimeout(() => {
      setIsEmailSubmitted(false)
    }, 4000)
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (chatMessage.trim()) {
      setChatMessages([...chatMessages, { type: "user", message: chatMessage }])
      setChatMessage("")
      // Simulate AI response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            type: "ai",
            message:
              "I can help you analyze that scenario. Based on your current financial profile, here are some insights...",
          },
        ])
      }, 1000)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Rounded Glassmorphism Navigation */}
      // FINAL CORRECTED CODE
      // This version uses the semantic theme classes (like bg-background, text-primary)
      // that directly correspond to the variables in your globals.css file.

      <nav id="main-nav" className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto">
        {/* The main pill-shaped container */}
        <div
          className={`transition-all duration-300 rounded-full px-4 py-2 ${isScrolled
              ? "bg-background/80 backdrop-blur-md border shadow-lg"
              : "bg-background/60 backdrop-blur-sm border border-border/50"
            }`}
        >
          <div className="flex items-center justify-between space-x-4">
            {/* Logo */}
            <a href="#hero" onClick={(e) => handleSmoothScroll(e, "hero")} className="flex-shrink-0">
              <Image
                src="/assets/fintwin.png"
                alt="AFT Logo"
                width={52}
                height={52}
                className="rounded-full"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1 flex-nowrap">
              <a
                href="#analytics"
                onClick={(e) => handleSmoothScroll(e, "analytics")}
                className={`transition-colors duration-200 text-sm px-4 py-1.5 rounded-full ${activeSection === "analytics"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                Analytics
              </a>
              <a
                href="#features"
                onClick={(e) => handleSmoothScroll(e, "features")}
                className={`transition-colors duration-200 text-sm px-4 py-1.5 rounded-full ${activeSection === "features"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                Features
              </a>
              <a
                href="#security"
                onClick={(e) => handleSmoothScroll(e, "security")}
                className={`transition-colors duration-200 text-sm px-4 py-1.5 rounded-full ${activeSection === "security"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                Security
              </a>
              <a
                href="#about-us"
                onClick={(e) => handleSmoothScroll(e, "about-us")}
                className={`transition-colors duration-200 text-sm px-4 py-1.5 rounded-full whitespace-nowrap ${activeSection === "about-us"
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
              >
                About Us
              </a>
              <Button size="sm" className="rounded-full px-4 ml-2 flex-shrink-0">
                Request Invite
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 bg-card/90 backdrop-blur-md border rounded-2xl shadow-lg p-4">
            <div className="flex flex-col space-y-1">
              <a href="#analytics" onClick={(e) => handleSmoothScroll(e, "analytics")} className={`block p-2 rounded-md font-medium text-sm ${activeSection === 'analytics' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>
                Analytics
              </a>
              <a href="#features" onClick={(e) => handleSmoothScroll(e, "features")} className={`block p-2 rounded-md font-medium text-sm ${activeSection === 'features' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>
                Features
              </a>
              <a href="#security" onClick={(e) => handleSmoothScroll(e, "security")} className={`block p-2 rounded-md font-medium text-sm ${activeSection === 'security' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>
                Security
              </a>
              <a href="#about-us" onClick={(e) => handleSmoothScroll(e, "about-us")} className={`block p-2 rounded-md font-medium text-sm ${activeSection === 'about-us' ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}`}>
                About Us
              </a>
              <div className="pt-2">
                <Button size="sm" className="w-full rounded-full">
                  Request Invite
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-zinc-900 dark:to-black"
      >
        <div className="absolute inset-0 opacity-10 dark:opacity-5">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-gray-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-gray-600 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-gray-400 rounded-full animate-pulse delay-1500"></div>
          <svg className="absolute inset-0 w-full h-full">
            <line x1="25%" y1="25%" x2="33%" y2="33%" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            <line x1="33%" y1="33%" x2="66%" y2="66%" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
            <line x1="66%" y1="66%" x2="75%" y2="50%" stroke="rgba(0,0,0,0.05)" strokeWidth="1" />
          </svg>
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-gray-900 dark:text-gray-100">
            Your Financial Future.
            <br />
            <span className="text-gray-500 dark:text-gray-400">Mirrored. Mastered.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            The first truly independent AI that unifies your entire financial life. Get a complete picture, receive
            unbiased intelligence, and make institutions compete for you.
          </p>

          <div className="max-w-md mx-auto h-12">
            {isEmailSubmitted ? (
              <div className="flex items-center justify-center h-full bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 rounded-full text-center px-4 animate-pulse">
                <CheckCircle className="h-5 w-5 mr-2" />
                Thank you! You're on the list.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-700 focus:border-gray-500 dark:focus:border-gray-400 rounded-full h-12 px-5"
                  required
                />
                <Button type="submit" className="bg-gray-900 hover:bg-gray-800 text-white dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900 border-0 px-8 rounded-full h-12">
                  Join the Private Beta
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Analytics Dashboard Section */}
      <section id="analytics" className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">Your Complete Financial Picture</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              See all your financial data unified in one intelligent dashboard with AI-powered insights and projections.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Net Worth Chart */}
            <Card className="border-gray-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <TrendingUp className="h-5 w-5" />
                  Net Worth Growth
                </CardTitle>
                <CardDescription>Your total net worth over the past 5 years</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={netWorthChartConfig} className="h-[300px] w-full">
                  <AreaChart
                    accessibilityLayer
                    data={netWorthData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="year"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => value.toString()}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                      formatter={(value) => `$${(value as number).toLocaleString()}`}
                    />
                    <Area
                      dataKey="value"
                      type="natural"
                      fill="var(--color-value)"
                      fillOpacity={0.4}
                      stroke="var(--color-value)"
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Income vs Expenses */}
            <Card className="border-gray-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <DollarSign className="h-5 w-5" />
                  Income vs Expenses
                </CardTitle>
                <CardDescription>Monthly cash flow analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={incomeExpensesChartConfig} className="h-[300px] w-full">
                  <BarChart accessibilityLayer data={incomeExpensesData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}K`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent indicator="dot" />}
                    />
                    <Bar dataKey="income" fill="var(--color-income)" radius={4} />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Portfolio Allocation */}
            <Card className="border-gray-200 dark:border-zinc-800 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <PiggyBank className="h-5 w-5" />
                  Portfolio Allocation
                </CardTitle>
                <CardDescription>Investment distribution</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pt-0 pb-6 flex flex-col">
                <ChartContainer
                  config={pieChartConfig}
                  className="mx-auto aspect-square h-full max-h-[250px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie data={portfolioData} dataKey="value" nameKey="name" innerRadius={60}>
                      {portfolioData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ChartContainer>
                <div className="mt-auto space-y-2 pt-4">
                  {portfolioData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="dark:text-gray-300">{item.name}</span>
                      </div>
                      <span className="font-medium dark:text-gray-100">${(item.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Retirement Timeline */}
            <Card className="border-gray-200 dark:border-zinc-800 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Calendar className="h-5 w-5" />
                  Retirement Scenarios
                </CardTitle>
                <CardDescription>Projected wealth by risk tolerance</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pt-0">
                <ChartContainer config={retirementChartConfig} className="h-full w-full min-h-[250px]">
                  <LineChart
                    accessibilityLayer
                    data={retirementTimelineData}
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="age"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${value}`}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `$${(Number(value) / 1000000).toFixed(1)}M`}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent />}
                      formatter={(value) => `$${((value as number) / 1000000).toFixed(2)}M`}
                    />
                    <Line type="monotone" dataKey="conservative" stroke="var(--color-conservative)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="moderate" stroke="var(--color-moderate)" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="aggressive" stroke="var(--color-aggressive)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* AI Assistant Chat */}
            <Card className="border-gray-200 dark:border-zinc-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-gray-100">
                  <Brain className="h-5 w-5" />
                  AI Financial Assistant
                </CardTitle>
                <CardDescription>Chat with your Financial Twin</CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex flex-col h-[calc(100%-76px)]">
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] p-2 rounded-lg text-sm ${msg.type === "user" ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" : "bg-gray-100 dark:bg-zinc-800 text-gray-900 dark:text-gray-100"
                          }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 pt-4 pb-8 border-t border-gray-200 dark:border-zinc-800">
                  <form onSubmit={handleChatSubmit} className="flex gap-2">
                    <Input
                      value={chatMessage}
                      onChange={(e) => setChatMessage(e.target.value)}
                      placeholder="Ask about your finances..."
                      className="flex-1 text-sm bg-white dark:bg-zinc-800"
                    />
                    <Button type="submit" size="icon" className="bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 dark:text-gray-900">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                Your finances are scattered.
                <br />
                <span className="text-gray-500 dark:text-gray-400">Your advice is conflicted.</span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                You have accounts with different banks, scattered pension pots, investments, and insurance policies.
                Getting a clear overview is impossible. Traditional advisors work for institutions, not for you. It's
                time to shift the power back.
              </p>
            </div>
            <div className="relative">
              <div className="flex items-center justify-center space-x-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 bg-gray-300 dark:bg-zinc-800 rounded-lg opacity-60 flex items-center justify-center">
                    <CreditCard className="text-gray-600 dark:text-gray-400" size={24} />
                  </div>
                  <div className="w-16 h-16 bg-gray-300 dark:bg-zinc-800 rounded-lg opacity-60 flex items-center justify-center">
                    <Home className="text-gray-600 dark:text-gray-400" size={24} />
                  </div>
                  <div className="w-16 h-16 bg-gray-300 dark:bg-zinc-800 rounded-lg opacity-60 flex items-center justify-center">
                    <Briefcase className="text-gray-600 dark:text-gray-400" size={24} />
                  </div>
                </div>
                <ArrowRight className="text-gray-400 dark:text-zinc-600" size={32} />
                <div className="w-24 h-24 bg-gray-800 dark:bg-gray-200 rounded-xl flex items-center justify-center">
                  <Network className="text-white dark:text-black" size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section id="features" className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              A Paradigm Shift in
              <br />
              <span className="text-gray-500 dark:text-gray-400">Personal Finance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Eye className="text-gray-700 dark:text-gray-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">See Everything. Instantly.</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Securely connect all your accounts—banking, pensions, investments, property—into one intelligent
                dashboard. No more spreadsheets, no more blind spots.
              </p>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="text-gray-700 dark:text-gray-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Personal AI Strategist.</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Your Twin doesn't just track data; it understands your goals. Model your retirement, plan major
                purchases, and chat with your AI to explore strategies. Unbiased, 24/7.
              </p>
            </Card>

            <Card className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 p-8 text-center shadow-sm">
              <div className="w-16 h-16 bg-gray-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scale className="text-gray-700 dark:text-gray-300" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Make Banks Compete for You.</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Need a mortgage or a new investment product? Anonymously submit your needs to our marketplace and let
                top-tier institutions bid for your business. The best offer wins. You win.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust & Security Section - Dark */}
      <section id="security" className="py-24 bg-gray-900 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
                Radical Transparency,
                <br />
                <span className="text-gray-400">Unyielding Security.</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                We believe trust isn't given; it's proven. We are building with Web3 principles to ensure our logic is
                verifiable and your data is yours alone.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-white mb-2">On-Chain Logic</h4>
                    <p className="text-gray-300">
                      Our core advisory algorithms will be publicly verifiable on-chain. No hidden agendas.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-white mb-2">End-to-End Encryption</h4>
                    <p className="text-gray-300">Your data is encrypted and only you hold the key.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <CheckCircle className="text-gray-500 mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold text-white mb-2">Decentralized Identity</h4>
                    <p className="text-gray-300">You control who sees your data, and what they see.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="w-64 h-64 mx-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                <Shield className="text-white" size={80} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">How It Works</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-white dark:text-gray-900 font-bold text-xl">
                1
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Connect Securely</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Link your financial accounts in minutes using bank-level security and established open-banking partners.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-white dark:text-gray-900 font-bold text-xl">
                2
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Define Your Future</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Tell your Twin your goals—from early retirement to leaving a legacy.
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-gray-900 dark:bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-white dark:text-gray-900 font-bold text-xl">
                3
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Act with Confidence</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Receive clear, actionable insights and leverage the marketplace to execute your plan with the best
                products available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- NEW ABOUT US SECTION --- */}
      <section id="about-us" className="py-24 bg-gray-50 dark:bg-zinc-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-gray-100">Meet the Team</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We are a team of builders, strategists, and technologists passionate about empowering financial independence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamData.map((member) => (
              <Card key={member.name} className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 text-center shadow-sm hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <Image
                    src={member.image}
                    alt={`Photo of ${member.name}`}
                    width={120}
                    height={120}
                    className="rounded-full mx-auto mb-4 border-2 border-gray-200 dark:border-zinc-700 object-cover"
                  />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{member.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 min-h-[40px]">{member.bio}</p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-block text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    <Linkedin size={20} />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section - Dark */}
      <section className="py-24 bg-gray-900 dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            The Future of Wealth
            <br />
            <span className="text-gray-400">is Clarity.</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Stop navigating a system designed against you. Start building your future with an agent that works only for
            you.
          </p>

          <div className="max-w-lg mx-auto h-12 mb-4">
            {isEmailSubmitted ? (
              <div className="flex items-center justify-center h-full bg-white/10 text-white rounded-full text-center px-4 animate-pulse">
                <CheckCircle className="h-5 w-5 mr-2" />
                You're on the list! We'll be in touch.
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white h-12 rounded-full px-5"
                  required
                />
                <Button type="submit" className="bg-white hover:bg-gray-200 text-gray-900 border-0 px-8 h-12 rounded-full">
                  Request My Invite
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-black border-t border-gray-200 dark:border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-start">
              <Image
                src="/assets/fintwin.png"
                alt="AFT Logo"
                width={52}
                height={52}
                className="mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                Empowering financial independence through technology.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#about-us" onClick={(e) => handleSmoothScroll(e, "about-us")} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <button onClick={() => setShowPrivacyModal(true)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-left">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setShowTermsModal(true)} className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors text-left">
                    Terms of Service
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-zinc-800 mt-12 pt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 text-sm">© 2025 FinTwin. All Rights Reserved.</p>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      {showPrivacyModal && (
        <LegalModal title="Privacy Policy" onClose={() => setShowPrivacyModal(false)}>
          <p><strong>Last Updated: 22.07.2025</strong></p>
          <p>Your privacy is important to us. It is Agentic Financial Twin's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.</p>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-4">1. Information We Collect</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-4">2. How We Use Information</h3>
          <p>Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales.</p>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-4">3. Security of Your Information</h3>
          <p>We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.</p>
        </LegalModal>
      )}

      {showTermsModal && (
        <LegalModal title="Terms of Service" onClose={() => setShowTermsModal(false)}>
          <p><strong>Last Updated: 22.07.2025</strong></p>
          <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use Agentic Financial Twin if you do not agree to take all of the terms and conditions stated on this page.</p>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-4">1. Use of the Site</h3>
          <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris.</p>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-4">2. Disclaimer</h3>
          <p>The materials on Agentic Financial Twin's website are provided on an 'as is' basis. Agentic Financial Twin makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
          <h3 className="font-bold text-gray-800 dark:text-gray-200 mt-4">3. Limitations</h3>
          <p>In no event shall Agentic Financial Twin or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Agentic Financial Twin's website, even if Agentic Financial Twin or a Agentic Financial Twin authorized representative has been notified orally or in writing of the possibility of such damage.</p>
        </LegalModal>
      )}

    </div>
  )
}