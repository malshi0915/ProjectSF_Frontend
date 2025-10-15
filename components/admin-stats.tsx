"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BusIcon, UsersIcon, TicketIcon, TrendingUpIcon } from "lucide-react"

// Mock data for demonstration
const statsData = {
  totalBuses: 45,
  totalBookings: 1247,
  totalUsers: 3892,
  revenue: 2847500,
  recentBookings: [
    { id: "BK001", user: "John Doe", route: "Mumbai → Pune", amount: 1200, status: "confirmed" },
    { id: "BK002", user: "Jane Smith", route: "Delhi → Jaipur", amount: 1500, status: "confirmed" },
    { id: "BK003", user: "Mike Johnson", route: "Bangalore → Chennai", amount: 950, status: "pending" },
    { id: "BK004", user: "Sarah Wilson", route: "Kolkata → Bhubaneswar", amount: 800, status: "confirmed" },
    { id: "BK005", user: "David Brown", route: "Hyderabad → Vijayawada", amount: 650, status: "confirmed" },
  ],
  topRoutes: [
    { route: "Mumbai → Pune", bookings: 234, revenue: 280800 },
    { route: "Delhi → Jaipur", bookings: 189, revenue: 283500 },
    { route: "Bangalore → Chennai", bookings: 156, revenue: 148200 },
    { route: "Kolkata → Bhubaneswar", bookings: 134, revenue: 107200 },
  ],
}

export function AdminStats() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Buses</CardTitle>
            <BusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalBuses}</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <TicketIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalBookings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <TrendingUpIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{(statsData.revenue / 100000).toFixed(1)}L</div>
            <p className="text-xs text-muted-foreground">+15% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData.recentBookings.map((booking) => (
                <div key={booking.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{booking.user}</p>
                    <p className="text-xs text-muted-foreground">{booking.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">₹{booking.amount}</p>
                    <p className={text-xs ${booking.status === "confirmed" ? "text-green-600" : "text-yellow-600"}}>
                      {booking.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Routes */}
        <Card>
          <CardHeader>
            <CardTitle>Top Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statsData.topRoutes.map((route, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{route.route}</p>
                    <p className="text-xs text-muted-foreground">{route.bookings} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">₹{(route.revenue / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
