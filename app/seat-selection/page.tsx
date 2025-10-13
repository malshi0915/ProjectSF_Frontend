"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeftIcon, StarIcon } from "lucide-react"
import { SeatMap } from "@/components/seat-map"
import { BookingDetails } from "@/components/booking-details"
import { PassengerForm } from "@/components/passenger-form"

// Mock bus data
const mockBus = {
  id: "1",
  operator: "Express Lines",
  busType: "AC Sleeper",
  departureTime: "22:30",
  arrivalTime: "06:00",
  duration: "7h 30m",
  price: 1200,
  facilities: ["AC", "WiFi", "Charging Port", "Blanket"],
  rating: 4.2,
  route: "Mumbai → Pune",
  date: "2025-01-15",
}

export default function SeatSelectionPage() {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [currentStep, setCurrentStep] = useState(1) // 1: Seat Selection, 2: Passenger Details, 3: Payment

  const handleSeatSelect = (seatId: string) => {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) {
        return prev.filter((id) => id !== seatId)
      } else {
        return [...prev, seatId]
      }
    })
  }

  const handleContinue = () => {
    if (selectedSeats.length > 0) {
      setCurrentStep(2)
    }
  }

  const handlePassengerSubmit = (passengerData: any) => {
    console.log("Passenger data:", passengerData)
    window.location.href = "/payment"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Results
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center space-x-2">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">B</span>
                </div>
                <span className="font-bold text-foreground">BusBooker</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                1
              </div>
              <span className={`text-sm font-medium ${currentStep >= 1 ? "text-foreground" : "text-muted-foreground"}`}>
                Select Seats
              </span>
            </div>
            <div className="h-px w-12 bg-border" />
            <div className="flex items-center space-x-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 2 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                2
              </div>
              <span className={`text-sm font-medium ${currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}`}>
                Passenger Details
              </span>
            </div>
            <div className="h-px w-12 bg-border" />
            <div className="flex items-center space-x-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  currentStep >= 3 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className={`text-sm font-medium ${currentStep >= 3 ? "text-foreground" : "text-muted-foreground"}`}>
                Payment
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Bus Info */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{mockBus.operator}</CardTitle>
                        <p className="text-muted-foreground">{mockBus.busType}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <StarIcon className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{mockBus.rating}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-semibold">{mockBus.route}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Date</p>
                        <p className="font-semibold">{mockBus.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-semibold">{mockBus.duration}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {mockBus.facilities.map((facility, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {facility}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Seat Selection */}
                <Card>
                  <CardHeader>
                    <CardTitle>Select Your Seats</CardTitle>
                    <div className="flex items-center space-x-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded bg-muted border border-border"></div>
                        <span className="text-muted-foreground">Available</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded bg-primary"></div>
                        <span className="text-muted-foreground">Selected</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="h-4 w-4 rounded bg-destructive"></div>
                        <span className="text-muted-foreground">Occupied</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <SeatMap onSeatSelect={handleSeatSelect} selectedSeats={selectedSeats} />
                  </CardContent>
                </Card>
              </div>
            )}

            {currentStep === 2 && (
              <PassengerForm
                selectedSeats={selectedSeats}
                onSubmit={handlePassengerSubmit}
                onBack={() => setCurrentStep(1)}
              />
            )}
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <BookingDetails
              bus={mockBus}
              selectedSeats={selectedSeats}
              onContinue={currentStep === 1 ? handleContinue : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
