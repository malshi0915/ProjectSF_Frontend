"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClockIcon, MapPinIcon, UsersIcon } from "lucide-react"
import { BusSearchForm } from "@/components/bus-search-form"
import { BusResults } from "@/components/bus-results"

// Mock data for demonstration
const mockBuses = [
  {
    id: "1",
    operator: "Express Lines",
    busType: "AC Sleeper",
    departureTime: "22:30",
    arrivalTime: "06:00",
    duration: "7h 30m",
    price: 1200,
    availableSeats: 12,
    totalSeats: 40,
    facilities: ["AC", "WiFi", "Charging Port", "Blanket"],
    rating: 4.2,
  },
  {
    id: "2",
    operator: "Comfort Travels",
    busType: "AC Semi-Sleeper",
    departureTime: "23:45",
    arrivalTime: "07:15",
    duration: "7h 30m",
    price: 950,
    availableSeats: 8,
    totalSeats: 35,
    facilities: ["AC", "Charging Port", "Water Bottle"],
    rating: 4.0,
  },
  {
    id: "3",
    operator: "Royal Coaches",
    busType: "Volvo Multi-Axle",
    departureTime: "21:00",
    arrivalTime: "05:30",
    duration: "8h 30m",
    price: 1500,
    availableSeats: 15,
    totalSeats: 45,
    facilities: ["AC", "WiFi", "Entertainment", "Meals", "Blanket"],
    rating: 4.5,
  },
]

export default function HomePage() {
  const [searchResults, setSearchResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleSearch = async (searchData) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSearchResults(mockBuses)
    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">B</span>
              </div>
              <h1 className="text-xl font-bold text-foreground">BusBooker</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="/track-bus" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Track Bus
              </a>
              {user ? (
                <>
                  <a href="/profile" className="text-muted-foreground hover:text-foreground transition-colors">
                    My Bookings
                  </a>
                  <a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help
                  </a>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
                    <Button variant="outline" size="sm" onClick={handleLogout}>
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <a href="/help" className="text-muted-foreground hover:text-foreground transition-colors">
                    Help
                  </a>
                  <Button variant="outline" size="sm" onClick={() => (window.location.href = "/auth/login")}>
                    Sign In
                  </Button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">Book Your Bus Journey</h2>
            <p className="text-lg text-muted-foreground text-balance max-w-2xl mx-auto">
              Find and book comfortable bus tickets across the country. Safe, reliable, and affordable travel.
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-8">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPinIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Track Your Bus</h3>
                      <p className="text-sm text-muted-foreground">Get real-time location updates</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => (window.location.href = "/track-bus")}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Track Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search Form */}
          <div className="max-w-4xl mx-auto">
            <BusSearchForm onSearch={handleSearch} isLoading={isLoading} />
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <BusResults buses={searchResults} />
          </div>
        </section>
      )}

      {/* Features Section */}
      {!searchResults && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-2xl font-bold text-foreground mb-4">Why Choose BusBooker?</h3>
              <p className="text-muted-foreground">Experience hassle-free bus booking with our premium features</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <MapPinIcon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Wide Network</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Connect to over 1000+ destinations across the country with our extensive bus network.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                  <ClockIcon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle className="text-primary">Real-time Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Track your bus in real-time and get live updates on departure and arrival times.
                  </p>
                  <Button variant="outline" size="sm" onClick={() => (window.location.href = "/track-bus")}>
                    Try Tracking
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <UsersIcon className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Seat Selection</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Choose your preferred seat from our interactive seat map and travel comfortably.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-xs">B</span>
                </div>
                <span className="font-bold text-foreground">BusBooker</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted partner for comfortable and safe bus travel across the country.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Book Tickets
                  </a>
                </li>
                <li>
                  <a href="/track-bus" className="hover:text-foreground transition-colors">
                    Track Bus
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Cancel Booking
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Print Ticket
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="/help" className="hover:text-foreground transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📞 1800-123-4567</li>
                <li>✉️ support@busbooker.com</li>
                <li>🕒 24/7 Customer Support</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-6 text-center">
            <p className="text-sm text-muted-foreground">© 2025 BusBooker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
