"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  BarChart3,
  Package,
  Users,
  CreditCard,
  Star,
  Menu,
  X,
  Play,
  Shield,
  Zap,
  Globe,
  ShoppingCart,
  Clock,
  Sparkles,
  TrendingUp,
  Eye,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [ecommerceProgress, setEcommerceProgress] = useState(0)
  const [subscriberCount, setSubscriberCount] = useState(2847)
  const [emailInput, setEmailInput] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  // Smooth animations on mount
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)

    // Smooth progress animation using requestAnimationFrame
    let animationId: number
    let startTime: number | null = null
    const targetProgress = 85
    const duration = 3000 // 3 seconds

    const animateProgress = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentProgress = easeOutCubic * targetProgress

      setEcommerceProgress(currentProgress)

      if (progress < 1) {
        animationId = requestAnimationFrame(animateProgress)
      }
    }

    animationId = requestAnimationFrame(animateProgress)

    // Realistic subscriber updates
    const subscriberTimer = setInterval(() => {
      setSubscriberCount((prev) => prev + Math.floor(Math.random() * 2))
    }, 8000)

    return () => {
      clearTimeout(timer)
      cancelAnimationFrame(animationId)
      clearInterval(subscriberTimer)
    }
  }, [])

  // Auto-rotate features
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleEmailSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailInput || isLoading) return

    setIsLoading(true)

    // Smooth loading simulation
    await new Promise((resolve) => setTimeout(resolve, 1200))

    setIsSubscribed(true)
    setSubscriberCount((prev) => prev + 1)
    toast({
      title: "Successfully Subscribed! 🎉",
      description: "You'll be the first to know when e-commerce features launch!",
    })
    setEmailInput("")
    setIsLoading(false)
  }

  const features = [
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Get deep insights into your business performance with comprehensive reports and real-time analytics.",
      image: "/images/feature-analytics.png",
      stats: "95% faster reporting",
    },
    {
      icon: Package,
      title: "Inventory Management",
      description: "Track stock levels, manage products, and get low-stock alerts to never run out of inventory.",
      image: "/images/feature-inventory.png",
      stats: "90% reduction in stockouts",
    },
    {
      icon: Users,
      title: "Team Management",
      description: "Manage your staff, track salaries, and streamline your HR processes all in one place.",
      image: "/images/feature-team.png",
      stats: "Save 15 hours per week",
    },
    {
      icon: CreditCard,
      title: "Financial Tracking",
      description: "Monitor expenses, track sales, and get a complete overview of your financial health.",
      stats: "100% accurate tracking",
    },
  ]

  const testimonials = [
    {
      name: "David Chen",
      role: "CEO, TechStart Solutions",
      image: "/images/testimonial-1.png",
      content:
        "VeltoHQ transformed how we manage our business. The analytics dashboard gives us insights we never had before, and the inventory management has reduced our stockouts by 90%.",
      rating: 5,
      company: "TechStart Solutions",
      growth: "+150% revenue growth",
    },
    {
      name: "Sarah Johnson",
      role: "Operations Manager, RetailPro",
      image: "/images/testimonial-2.png",
      content:
        "The staff management features are incredible. We can now track payroll, manage schedules, and monitor performance all from one platform. It's saved us hours every week.",
      rating: 5,
      company: "RetailPro",
      growth: "+200% efficiency",
    },
    {
      name: "Michael Rodriguez",
      role: "Founder, GrowthCorp",
      image: "/images/testimonial-3.png",
      content:
        "As a growing business, we needed something scalable and reliable. VeltoHQ has grown with us and the support team is always there when we need them.",
      rating: 5,
      company: "GrowthCorp",
      growth: "+300% team productivity",
    },
  ]

  const pricingPlans = [
    {
      name: "Starter",
      price: "₦2,500",
      period: "/month",
      description: "Perfect for small businesses just getting started",
      features: [
        "Up to 5 staff members",
        "Basic inventory management",
        "Sales & expense tracking",
        "Monthly reports",
        "Email support",
      ],
      popular: false,
      savings: null,
    },
    {
      name: "Professional",
      price: "₦5,000",
      period: "/month",
      description: "Ideal for growing businesses with advanced needs",
      features: [
        "Up to 25 staff members",
        "Advanced analytics",
        "Real-time reporting",
        "Multi-location support",
        "Priority support",
        "API access",
      ],
      popular: true,
      savings: "Save 20%",
    },
    {
      name: "Enterprise",
      price: "₦10,000",
      period: "/month",
      description: "For large businesses with complex requirements",
      features: [
        "Unlimited staff members",
        "Custom integrations",
        "Advanced security",
        "Dedicated account manager",
        "24/7 phone support",
        "Custom training",
      ],
      popular: false,
      savings: "Save 30%",
    },
  ]

  const stats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Revenue Tracked", value: "₦2.5B+", icon: TrendingUp },
    { label: "Time Saved", value: "50,000+ hrs", icon: Clock },
    { label: "Uptime", value: "99.9%", icon: Shield },
  ]

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Smooth CSS for buttery animations */}
      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        
        .smooth-transition {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .smooth-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .smooth-scale:hover {
          transform: scale(1.05);
        }
        
        .smooth-lift:hover {
          transform: translateY(-8px);
        }
        
        .floating {
          animation: float 6s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .fade-in-up {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .stagger-1 { transition-delay: 0.1s; }
        .stagger-2 { transition-delay: 0.2s; }
        .stagger-3 { transition-delay: 0.3s; }
        .stagger-4 { transition-delay: 0.4s; }

        .blob-shape {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          animation: blob 7s ease-in-out infinite;
        }

        @keyframes blob {
          0% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%;
          }
          100% {
            border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          }
        }

        .blob-shape-2 {
          border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          animation: blob2 8s ease-in-out infinite;
        }

        @keyframes blob2 {
          0% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
          50% {
            border-radius: 70% 30% 30% 70% / 70% 70% 30% 30%;
          }
          100% {
            border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
          }
        }

        .blob-shape-3 {
          border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          animation: blob3 9s ease-in-out infinite;
        }

        @keyframes blob3 {
          0% {
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
          50% {
            border-radius: 60% 40% 30% 70% / 40% 60% 30% 70%;
          }
          100% {
            border-radius: 40% 60% 60% 40% / 60% 30% 70% 40%;
          }
        }
      `}</style>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-200 z-50 smooth-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center smooth-hover smooth-scale">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <span className="text-xl font-bold text-gray-900">VeltoHQ</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {["Features", "Pricing", "Testimonials", "Login"].map((item, index) => (
                <a
                  key={item}
                  href={item === "Login" ? "/" : `#${item.toLowerCase()}`}
                  className="text-gray-600 hover:text-blue-600 smooth-transition relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 smooth-transition group-hover:w-full"></span>
                </a>
              ))}
              <Button className="bg-blue-600 hover:bg-blue-700 smooth-hover smooth-scale">Start Free Trial</Button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="smooth-hover smooth-scale"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4 smooth-transition">
              <div className="flex flex-col space-y-4">
                {["Features", "Pricing", "Testimonials", "Login"].map((item) => (
                  <a
                    key={item}
                    href={item === "Login" ? "/" : `#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-blue-600 smooth-transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <Button className="bg-blue-600 hover:bg-blue-700 w-full smooth-hover smooth-scale">
                  Start Free Trial
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 lg:pt-32 lg:pb-20 bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl floating"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl floating"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl floating"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`fade-in-up ${isVisible ? "visible" : ""}`}>
              <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100 smooth-hover">
                🚀 Now with Advanced Analytics
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Manage Your Business Like a{" "}
                <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Pro
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                VeltoHQ is the complete business management platform that helps you track inventory, manage staff,
                monitor finances, and grow your business with powerful analytics.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-3 smooth-hover smooth-scale shadow-lg hover:shadow-xl"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                {/* <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 bg-transparent smooth-hover hover:bg-blue-50"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Watch Demo
                </Button> */}
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-gray-600">
                {["30-day free trial", "No credit card required", "Cancel anytime"].map((text, index) => (
                  <div
                    key={text}
                    className={`flex items-center fade-in-up stagger-${index + 1} ${isVisible ? "visible" : ""}`}
                  >
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            <div className={`relative fade-in-up stagger-2 ${isVisible ? "visible" : ""}`}>
              <div className="relative z-10 group">
                <img
                  src="/images/hero-dashboard.png"
                  alt="VeltoHQ Dashboard"
                  className="shadow-2xl w-full h-auto smooth-hover group-hover:scale-105 blob-shape overflow-hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className={`text-center fade-in-up stagger-${index + 1} ${isVisible ? "visible" : ""}`}>
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className="h-6 w-6 text-blue-600 mr-2" />
                  <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                </div>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-commerce Coming Soon Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <ShoppingCart className="h-8 w-8 text-purple-600 mr-3" />
            <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2 smooth-hover">
              <Sparkles className="h-4 w-4 mr-2" />
              Coming Soon
            </Badge>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            E-commerce Integration is Almost Here! 🛒
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're building powerful e-commerce features to help you sell online, manage orders, and sync inventory
            across all channels. Be the first to know when it launches!
          </p>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-purple-600">Development Progress</span>
              <span className="text-sm font-medium text-purple-600">{Math.round(ecommerceProgress)}%</span>
            </div>
            <Progress value={ecommerceProgress} className="h-3 bg-purple-100" />
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md mx-auto smooth-hover smooth-lift">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Early Access</h3>
            <p className="text-gray-600 mb-6">
              Join <span className="font-bold text-purple-600">{subscriberCount.toLocaleString()}</span> others waiting
              for e-commerce features
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleEmailSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent smooth-transition"
                    required
                    disabled={isLoading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 smooth-hover smooth-scale"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Subscribing...
                    </div>
                  ) : (
                    <>
                      <Bell className="mr-2 h-4 w-4" />
                      Notify Me When Ready
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="text-center fade-in-up visible">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">You're All Set! 🎉</h4>
                <p className="text-gray-600">We'll email you as soon as e-commerce features are ready.</p>
              </div>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                icon: ShoppingCart,
                title: "Online Store",
                desc: "Beautiful, mobile-responsive storefront with customizable themes",
              },
              {
                icon: Package,
                title: "Inventory Sync",
                desc: "Real-time inventory synchronization across all sales channels",
              },
              {
                icon: CreditCard,
                title: "Payment Processing",
                desc: "Secure payment processing with multiple payment options",
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm smooth-hover smooth-lift">
                <item.icon className="h-8 w-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Business
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From inventory management to financial tracking, VeltoHQ provides all the tools you need to streamline
              operations and drive growth.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full smooth-transition ${
                    activeFeature === index
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 smooth-hover"
                  }`}
                >
                  <feature.icon className="h-5 w-5" />
                  <span className="font-medium">{feature.title}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="smooth-transition">
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">{features[activeFeature].title}</h3>
                  <p className="text-xl text-gray-600 mb-6">{features[activeFeature].description}</p>
                  <div className="flex items-center space-x-4">
                    <Badge className="bg-green-100 text-green-800">{features[activeFeature].stats}</Badge>
                    <Button variant="outline" className="hover:bg-blue-50 bg-transparent smooth-hover">
                      <Eye className="mr-2 h-4 w-4" />
                      View Demo
                    </Button>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                {features[activeFeature].image && (
                  <div className="relative group">
                    <img
                      src={features[activeFeature].image || "/placeholder.svg"}
                      alt={features[activeFeature].title}
                      className={`shadow-xl w-full h-auto smooth-hover group-hover:scale-105 overflow-hidden ${
                        activeFeature % 3 === 0
                          ? "blob-shape"
                          : activeFeature % 3 === 1
                            ? "blob-shape-2"
                            : "blob-shape-3"
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Additional Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Secure & Reliable",
                desc: "Bank-level security with 99.9% uptime guarantee",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized for speed with instant data synchronization",
              },
              {
                icon: Globe,
                title: "Global Access",
                desc: "Access your business data from anywhere, anytime",
              },
            ].map((item, index) => (
              <Card key={index} className="p-6 text-center shadow-lg border-0 smooth-hover smooth-lift">
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 smooth-hover smooth-scale">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl floating"></div>
          <div
            className="absolute bottom-10 right-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl floating"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-100">⭐ Trusted by 10,000+ Businesses</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">What Our Customers Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what real business owners say about VeltoHQ.
            </p>
          </div>

          {/* Modern Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Featured Large Testimonial */}
            <div className="lg:col-span-2">
              <Card className="p-8 shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50 smooth-hover smooth-lift h-full">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-600">5.0 out of 5</span>
                  </div>

                  <blockquote className="text-2xl font-medium text-gray-900 mb-8 leading-relaxed">
                    "VeltoHQ completely transformed our business operations. We went from manual spreadsheets to a fully
                    automated system that saves us 20+ hours per week. The ROI was immediate."
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src="/images/testimonial-1.png"
                          alt="David Chen"
                          className="w-16 h-16 object-cover blob-shape smooth-hover smooth-scale"
                        />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900">David Chen</h4>
                        <p className="text-gray-600">CEO, TechStart Solutions</p>
                        <p className="text-sm text-blue-600 font-medium">Lagos, Nigeria</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-100 text-green-800 text-sm px-3 py-1 mb-2">+150% Revenue Growth</Badge>
                      <p className="text-xs text-gray-500">Since using VeltoHQ</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stacked Smaller Testimonials */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Operations Manager",
                  company: "RetailPro",
                  image: "/images/testimonial-2.png",
                  content: "The staff management features are incredible. We can track everything from one dashboard.",
                  metric: "+200% Efficiency",
                  location: "Abuja, Nigeria",
                },
                {
                  name: "Michael Rodriguez",
                  role: "Founder",
                  company: "GrowthCorp",
                  image: "/images/testimonial-3.png",
                  content: "VeltoHQ scaled with us perfectly. The support team is always there when we need them.",
                  metric: "+300% Productivity",
                  location: "Port Harcourt, Nigeria",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="p-6 shadow-xl border-0 bg-white smooth-hover smooth-lift">
                  <CardContent className="p-0">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>

                    <p className="text-gray-700 mb-4 font-medium leading-relaxed">"{testimonial.content}"</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <img
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          className="w-10 h-10 object-cover blob-shape smooth-hover smooth-scale"
                        />
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm">{testimonial.name}</h5>
                          <p className="text-xs text-gray-600">{testimonial.role}</p>
                          <p className="text-xs text-blue-600">{testimonial.location}</p>
                        </div>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800 text-xs">{testimonial.metric}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { metric: "10,000+", label: "Active Users", icon: Users },
                { metric: "99.9%", label: "Uptime", icon: Shield },
                { metric: "4.9/5", label: "Average Rating", icon: Star },
                { metric: "24/7", label: "Support", icon: Clock },
              ].map((stat, index) => (
                <div key={index} className="smooth-hover">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{stat.metric}</span>
                  </div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Social Proof Logos */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-6">Trusted by leading companies across Nigeria</p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-gray-200 rounded-lg flex items-center justify-center smooth-hover smooth-scale"
                >
                  <span className="text-gray-400 font-bold text-xs">LOGO {i}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-600">Choose the plan that's right for your business</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                className={`p-8 shadow-lg border-0 relative smooth-hover smooth-lift ${
                  plan.popular ? "ring-2 ring-blue-600 scale-105" : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white">
                    Most Popular
                  </Badge>
                )}
                {plan.savings && (
                  <Badge className="absolute -top-3 right-4 bg-green-100 text-green-800">{plan.savings}</Badge>
                )}
                <CardContent className="p-0">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/">
                    <Button
                      className={`w-full smooth-hover smooth-scale ${
                        plan.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                      }`}
                    >
                      Start Free Trial
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center smooth-hover blob-shape-2">
            <img src="/images/cta-background.png" alt="CTA Background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-blue-900/90"></div>
          </div>
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses already using VeltoHQ to streamline operations, boost productivity, and drive
            growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-3 smooth-hover smooth-scale shadow-lg hover:shadow-xl"
              >
                Start Your Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 text-lg px-8 py-3 bg-transparent smooth-hover smooth-scale"
            >
              Schedule a Demo
            </Button> */}
          </div>
          <p className="text-blue-200 mt-6">30-day free trial • No credit card required • Cancel anytime</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center smooth-hover smooth-scale">
                  <span className="text-white font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-bold">VeltoHQ</span>
              </div>
              <p className="text-gray-400 mb-4">The complete business management platform for growing companies.</p>
              <div className="flex space-x-4">
                {["f", "t", "in"].map((social) => (
                  <div
                    key={social}
                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer smooth-hover smooth-scale"
                  >
                    <span className="text-sm">{social}</span>
                  </div>
                ))}
              </div>
            </div>
            {[
              { title: "Product", items: ["Features", "Pricing", "Security", "Integrations"] },
              { title: "Company", items: ["About", "Blog", "Careers", "Contact"] },
              { title: "Support", items: ["Help Center", "Documentation", "API Reference", "Status"] },
            ].map((section) => (
              <div key={section.title}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2 text-gray-400">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white smooth-transition">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">© 2024 VeltoHQ. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link) => (
                <a key={link} href="#" className="text-gray-400 hover:text-white smooth-transition">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
