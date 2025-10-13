"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Navigation, Phone, AlertCircle, ArrowLeft } from "lucide-react"

// Mock tracking data
const mockTrackingData = {
  BK001234: {
    busNumber: "KA-01-AB-1234",
    route: "Bangalore → Mumbai",
    currentLocation: "Pune Junction",
    nextStop: "Mumbai Central",
    estimatedArrival: "2024-01-15 14:30",
    delay: 0,
    status: "On Time",
    coordinates: { lat: 18.5204, lng: 73.8567 },
    completedStops: ["Bangalore", "Hubli", "Belgaum", "Kolhapur"],
    upcomingStops: ["Mumbai Central", "Mumbai"],
    driverContact: "+91 98765 43210",
  },
  BK001235: {
    busNumber: "KA-02-CD-5678",
    route: "Delhi → Jaipur",
    currentLocation: "Gurgaon Toll Plaza",
    nextStop: "Jaipur Bus Stand",
    estimatedArrival: "2024-01-15 16:45",
    delay: 15,
    status: "Delayed",
    coordinates: { lat: 28.4595, lng: 77.0266 },
    completedStops: ["Delhi"],
    upcomingStops: ["Jaipur Bus Stand", "Jaipur"],
    driverContact: "+91 98765 43211",
  },
}

export default function TrackBusPage() {
  const [bookingId, setBookingId] = useState("")
  const [trackingData, setTrackingData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const bookingParam = urlParams.get("booking")
    if (bookingParam) {
      setBookingId(bookingParam)
      // Auto-track if booking ID is provided in URL
      handleTrackBus(bookingParam)
    }
  }, [])

  const handleTrackBus = async (id?: string) => {
    const searchId = id || bookingId
    if (!searchId.trim()) {
      setError("Please enter a booking ID")
      return
    }

    setLoading(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      const data = mockTrackingData[searchId as keyof typeof mockTrackingData]
      if (data) {
        setTrackingData(data)
      } else {
        setError("Booking ID not found. Please check and try again.")
      }
      setLoading(false)
    }, 1000)
  }

  // Simulate real-time updates
  useEffect(() => {
    if (trackingData) {
      const interval = setInterval(() => {
        // Update location slightly for demo
        setTrackingData((prev: any) => ({
          ...prev,
          lastUpdated: new Date().toLocaleTimeString(),
        }))
      }, 30000)

      return () => clearInterval(interval)
    }
  }, [trackingData])

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">B</span>
                </div>
                <h1 className="text-xl font-bold text-foreground">BusBooker</h1>
              </div>
            </div>
            <nav className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/")}>
                Home
              </Button>
              <Button variant="ghost" size="sm" onClick={() => (window.location.href = "/profile")}>
                My Bookings
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Bus</h1>
            <p className="text-muted-foreground">Enter your booking ID to see real-time bus location</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Enter Booking ID (e.g., BK001234)"
                    value={bookingId}
                    onChange={(e) => setBookingId(e.target.value)}
                    className="h-12"
                  />
                </div>
                <Button onClick={() => handleTrackBus()} disabled={loading} className="h-12 px-8">
                  {loading ? "Tracking..." : "Track Bus"}
                </Button>
              </div>
              {error && (
                <div className="flex items-center gap-2 mt-4 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tracking Results */}
          {trackingData && (
            <div className="space-y-6">
              {/* Status Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Navigation className="h-5 w-5" />
                      Bus Status
                    </CardTitle>
                    <Badge variant={trackingData.status === "On Time" ? "default" : "destructive"}>
                      {trackingData.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Bus Number</p>
                        <p className="font-semibold">{trackingData.busNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Route</p>
                        <p className="font-semibold">{trackingData.route}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Location</p>
                        <p className="font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          {trackingData.currentLocation}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Next Stop</p>
                        <p className="font-semibold">{trackingData.nextStop}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Estimated Arrival</p>
                        <p className="font-semibold flex items-center gap-2">
                          <Clock className="h-4 w-4 text-primary" />
                          {trackingData.estimatedArrival}
                        </p>
                      </div>
                      {trackingData.delay > 0 && (
                        <div>
                          <p className="text-sm text-muted-foreground">Delay</p>
                          <p className="font-semibold text-destructive">{trackingData.delay} minutes</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Map Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Live Location</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted rounded-lg h-64 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
                    <div className="text-center z-10">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="font-semibold">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        Lat: {trackingData.coordinates.lat}, Lng: {trackingData.coordinates.lng}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Last updated: {trackingData.lastUpdated || "Just now"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Route Progress */}
              <Card>
                <CardHeader>
                  <CardTitle>Route Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">Completed Stops</p>
                      <div className="flex flex-wrap gap-2">
                        {trackingData.completedStops.map((stop: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                            ✓ {stop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-3">Upcoming Stops</p>
                      <div className="flex flex-wrap gap-2">
                        {trackingData.upcomingStops.map((stop: string, index: number) => (
                          <Badge key={index} variant="outline">
                            {stop}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">Driver Contact:</span>
                      <span className="font-semibold">{trackingData.driverContact}</span>
                    </div>
                    <Button variant="outline" size="sm">
                      Call Driver
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Demo Instructions */}
          {!trackingData && !loading && (
            <Card className="border-dashed">
              <CardContent className="p-6 text-center">
                <p className="text-muted-foreground mb-4">Try these demo booking IDs:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setBookingId("BK001234")}>
                    BK001234
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setBookingId("BK001235")}>
                    BK001235
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
