"use client"

import { useState } from "react"
import { X, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function TrialBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 shadow-sm">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <Crown className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-amber-800">Your 30-day trial is ending soon.</p>
            <p className="text-xs text-amber-700">Upgrade now to continue using all VeltoHQ features.</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
            Upgrade for ₦5,000/month
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsVisible(false)}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
