import Image from "next/image"
import { MapPin, Phone, Globe, Car, Bus, Plane, Utensils, Hotel, Coffee, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export default function VenuePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="bg-navy-500 px-4 py-20 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Venue & Accommodation</h1>
            <p className="text-lg text-slate-200">
              Everything you need to know about the NIBF 2025 venue and nearby accommodations
            </p>
          </div>
        </div>
      </section>

      {/* Venue Information */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <h2 className="mb-6 text-3xl font-bold text-navy-500">Venue</h2>
              <div className="mb-6 h-1 w-20 bg-crimson-500"></div>
              <h3 className="mb-4 text-xl font-bold text-navy-500">Balmoral Convention Centre</h3>
              <p className="mb-6 text-lg text-slate-600">
                The Nigeria International Book Fair 2025 will be held at the prestigious Balmoral Convention Centre,
                located at the Sheraton Hotel in Ikeja, Lagos.
              </p>
              <div className="mb-6 space-y-4">
                <div className="flex items-start">
                  <MapPin className="mr-3 h-6 w-6 flex-shrink-0 text-crimson-500" />
                  <div>
                    <h4 className="font-bold text-navy-500">Address</h4>
                    <p className="text-slate-600">
                      Sheraton Lagos Hotel, 30 Mobolaji Bank Anthony Way, Ikeja, Lagos, Nigeria
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="mr-3 h-6 w-6 flex-shrink-0 text-crimson-500" />
                  <div>
                    <h4 className="font-bold text-navy-500">Phone</h4>
                    <p className="text-slate-600">+234 1 280 0100</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Globe className="mr-3 h-6 w-6 flex-shrink-0 text-crimson-500" />
                  <div>
                    <h4 className="font-bold text-navy-500">Website</h4>
                    <a href="#" className="text-crimson-500 hover:underline">
                      www.balmorallagos.com
                    </a>
                  </div>
                </div>
              </div>
              <p className="text-slate-600">
                The Balmoral Convention Centre is a state-of-the-art facility offering modern amenities, excellent
                acoustics, and flexible space configurations. It is an ideal venue for the Nigeria International Book
                Fair, providing ample space for exhibitions, conferences, workshops, and networking events.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative h-[400px] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="Balmoral Convention Centre"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floor Plan */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Venue Floor Plan</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="mx-auto max-w-4xl">
            <div className="relative h-[500px] overflow-hidden rounded-lg bg-white p-4 shadow-md">
              <Image
                src="/placeholder.svg?height=500&width=800"
                alt="Venue Floor Plan"
                fill
                className="object-contain"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="rounded-lg bg-white/80 p-4 text-center text-navy-500">
                  Interactive floor plan would be displayed here
                </p>
              </div>
            </div>
            <div className="mt-8 text-center">
              <Button className="bg-crimson-500 hover:bg-crimson-600">Download Floor Plan (PDF)</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Getting There */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Getting There</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="mx-auto max-w-4xl">
            <Tabs defaultValue="car" className="w-full">
              <TabsList className="mb-8 grid w-full grid-cols-3">
                <TabsTrigger value="car">By Car</TabsTrigger>
                <TabsTrigger value="public">Public Transport</TabsTrigger>
                <TabsTrigger value="airport">From Airport</TabsTrigger>
              </TabsList>

              <TabsContent value="car">
                <div className="rounded-lg bg-slate-50 p-6 shadow-md">
                  <div className="mb-4 flex items-center">
                    <Car className="mr-2 h-6 w-6 text-crimson-500" />
                    <h3 className="text-xl font-bold text-navy-500">By Car</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      The Balmoral Convention Centre at Sheraton Hotel is located on Mobolaji Bank Anthony Way in Ikeja,
                      Lagos. It is easily accessible by car from various parts of Lagos.
                    </p>
                    <div>
                      <h4 className="font-bold text-navy-500">From Lagos Island:</h4>
                      <p className="text-slate-600">
                        Take the Third Mainland Bridge to Ikorodu Road, then connect to Mobolaji Bank Anthony Way. The
                        journey takes approximately 45-60 minutes depending on traffic.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-500">From Lekki/Victoria Island:</h4>
                      <p className="text-slate-600">
                        Take Ozumba Mbadiwe Avenue to Eko Bridge, then connect to Agege Motor Road and finally to
                        Mobolaji Bank Anthony Way. The journey takes approximately 60-90 minutes depending on traffic.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-500">Parking:</h4>
                      <p className="text-slate-600">
                        Paid parking is available at the Sheraton Hotel. Additional parking facilities are available
                        nearby. We recommend carpooling or using ride-sharing services due to limited parking spaces.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="public">
                <div className="rounded-lg bg-slate-50 p-6 shadow-md">
                  <div className="mb-4 flex items-center">
                    <Bus className="mr-2 h-6 w-6 text-crimson-500" />
                    <h3 className="text-xl font-bold text-navy-500">Public Transport</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      The venue is well-connected by public transportation, making it accessible from various parts of
                      Lagos.
                    </p>
                    <div>
                      <h4 className="font-bold text-navy-500">By Bus:</h4>
                      <p className="text-slate-600">
                        Several BRT and LAGBUS routes serve the Ikeja area. The closest bus stop to the venue is
                        "Sheraton Bus Stop" on Mobolaji Bank Anthony Way.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-500">By Taxi/Ride-Sharing:</h4>
                      <p className="text-slate-600">
                        Taxis and ride-sharing services like Uber and Bolt are readily available throughout Lagos and
                        provide a convenient way to reach the venue.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-500">By Okada/Keke:</h4>
                      <p className="text-slate-600">
                        While motorcycle taxis (Okada) and tricycles (Keke) are available in some areas, we recommend
                        using more secure transportation options for safety reasons.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="airport">
                <div className="rounded-lg bg-slate-50 p-6 shadow-md">
                  <div className="mb-4 flex items-center">
                    <Plane className="mr-2 h-6 w-6 text-crimson-500" />
                    <h3 className="text-xl font-bold text-navy-500">From the Airport</h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      The venue is conveniently located near Murtala Muhammed International Airport, making it easily
                      accessible for international visitors.
                    </p>
                    <div>
                      <h4 className="font-bold text-navy-500">From Murtala Muhammed International Airport:</h4>
                      <p className="text-slate-600">
                        The Sheraton Hotel is approximately 5-10 minutes by car from the international airport. Taxis
                        and ride-sharing services are available at the airport.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-500">From Murtala Muhammed Domestic Airport:</h4>
                      <p className="text-slate-600">
                        The venue is approximately 10-15 minutes by car from the domestic airport. Taxis and
                        ride-sharing services are available at the airport.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-bold text-navy-500">Airport Shuttle:</h4>
                      <p className="text-slate-600">
                        The Sheraton Hotel offers an airport shuttle service for guests. Please contact the hotel
                        directly to arrange this service.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Accommodation */}
      <section className="bg-slate-50 px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Accommodation</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Sheraton Hotel */}
            <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Sheraton Lagos Hotel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-500">Sheraton Lagos Hotel</h3>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">5-Star</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-slate-500">
                  <MapPin className="mr-1 h-4 w-4 text-crimson-500" />
                  <span>On-site (Same building as venue)</span>
                </div>
                <p className="mb-4 text-slate-600">
                  The Sheraton Lagos Hotel offers luxurious accommodation with modern amenities, multiple dining
                  options, a fitness center, and a swimming pool. It is the most convenient option as the venue is
                  located within the hotel.
                </p>
                <div className="mb-4 flex items-center justify-between border-t border-b border-slate-100 py-2">
                  <span className="font-bold text-navy-500">Special Rate:</span>
                  <span className="text-crimson-500">$180 per night</span>
                </div>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Book Now</Button>
              </div>
            </div>

            {/* Radisson Blu */}
            <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Radisson Blu Hotel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-500">Radisson Blu Hotel</h3>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">5-Star</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-slate-500">
                  <MapPin className="mr-1 h-4 w-4 text-crimson-500" />
                  <span>2.5 km from venue (5-10 min drive)</span>
                </div>
                <p className="mb-4 text-slate-600">
                  The Radisson Blu Hotel offers elegant rooms, a rooftop pool, spa facilities, and multiple restaurants.
                  It is located in Ikeja GRA, a short drive from the venue.
                </p>
                <div className="mb-4 flex items-center justify-between border-t border-b border-slate-100 py-2">
                  <span className="font-bold text-navy-500">Special Rate:</span>
                  <span className="text-crimson-500">$160 per night</span>
                </div>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Book Now</Button>
              </div>
            </div>

            {/* Lagos Continental Hotel */}
            <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Lagos Continental Hotel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-500">Lagos Continental Hotel</h3>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">5-Star</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-slate-500">
                  <MapPin className="mr-1 h-4 w-4 text-crimson-500" />
                  <span>15 km from venue (30-45 min drive)</span>
                </div>
                <p className="mb-4 text-slate-600">
                  The Lagos Continental Hotel (formerly InterContinental) offers luxury accommodation with panoramic
                  views of the city, multiple restaurants, and a spa. It is located on Victoria Island.
                </p>
                <div className="mb-4 flex items-center justify-between border-t border-b border-slate-100 py-2">
                  <span className="font-bold text-navy-500">Special Rate:</span>
                  <span className="text-crimson-500">$200 per night</span>
                </div>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Book Now</Button>
              </div>
            </div>

            {/* Protea Hotel */}
            <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Protea Hotel Select Ikeja"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-500">Protea Hotel Select Ikeja</h3>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">4-Star</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-slate-500">
                  <MapPin className="mr-1 h-4 w-4 text-crimson-500" />
                  <span>1.5 km from venue (5 min drive)</span>
                </div>
                <p className="mb-4 text-slate-600">
                  Protea Hotel Select Ikeja offers comfortable rooms, a restaurant, and a swimming pool. It is located
                  in Ikeja, a short drive from the venue.
                </p>
                <div className="mb-4 flex items-center justify-between border-t border-b border-slate-100 py-2">
                  <span className="font-bold text-navy-500">Special Rate:</span>
                  <span className="text-crimson-500">$120 per night</span>
                </div>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Book Now</Button>
              </div>
            </div>

            {/* Lagos Oriental Hotel */}
            <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Lagos Oriental Hotel"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-500">Lagos Oriental Hotel</h3>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">4-Star</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-slate-500">
                  <MapPin className="mr-1 h-4 w-4 text-crimson-500" />
                  <span>20 km from venue (40-60 min drive)</span>
                </div>
                <p className="mb-4 text-slate-600">
                  Lagos Oriental Hotel offers elegant rooms with views of Lagos Lagoon, multiple restaurants, and a spa.
                  It is located on Victoria Island.
                </p>
                <div className="mb-4 flex items-center justify-between border-t border-b border-slate-100 py-2">
                  <span className="font-bold text-navy-500">Special Rate:</span>
                  <span className="text-crimson-500">$150 per night</span>
                </div>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Book Now</Button>
              </div>
            </div>

            {/* Ibis Lagos Airport */}
            <div className="rounded-lg bg-white shadow-md transition-transform duration-300 hover:-translate-y-2">
              <div className="relative h-[200px] w-full overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=400"
                  alt="Ibis Lagos Airport"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-navy-500">Ibis Lagos Airport</h3>
                  <span className="rounded-full bg-navy-100 px-3 py-1 text-xs font-medium text-navy-500">3-Star</span>
                </div>
                <div className="mb-4 flex items-center text-sm text-slate-500">
                  <MapPin className="mr-1 h-4 w-4 text-crimson-500" />
                  <span>3 km from venue (10-15 min drive)</span>
                </div>
                <p className="mb-4 text-slate-600">
                  Ibis Lagos Airport offers comfortable rooms at an affordable price. It is located near the airport and
                  a short drive from the venue.
                </p>
                <div className="mb-4 flex items-center justify-between border-t border-b border-slate-100 py-2">
                  <span className="font-bold text-navy-500">Special Rate:</span>
                  <span className="text-crimson-500">$90 per night</span>
                </div>
                <Button className="w-full bg-crimson-500 hover:bg-crimson-600">Book Now</Button>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="mb-4 text-slate-600">
              To book accommodation at the special NIBF rates, please use the booking code "NIBF2025" when making your
              reservation. For assistance with accommodation, please contact our accommodation coordinator at
              accommodation@nibfng.org.
            </p>
          </div>
        </div>
      </section>

      {/* Nearby Amenities */}
      <section className="bg-white px-4 py-16">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-navy-500">Nearby Amenities</h2>
            <div className="elegant-divider mx-auto"></div>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Utensils className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Restaurants</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>Sheraton Hotel Restaurants (on-site)</li>
                <li>Yellow Chilli Restaurant (1.5 km)</li>
                <li>Spice Route Restaurant (2 km)</li>
                <li>Rhapsody's Restaurant (3 km)</li>
                <li>Hard Rock Cafe (5 km)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Coffee className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Cafes</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>Cafe One by Sterling (on-site)</li>
                <li>The Jazzhole (2 km)</li>
                <li>Cafe Neo (2.5 km)</li>
                <li>Starbucks (3 km)</li>
                <li>Krispy Kreme (3.5 km)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <ShoppingBag className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Shopping</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>Ikeja City Mall (2 km)</li>
                <li>The Palms Shopping Mall (7 km)</li>
                <li>Novare Mall (5 km)</li>
                <li>Maryland Mall (4 km)</li>
                <li>Computer Village (3 km)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Hotel className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Attractions</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>National Museum (10 km)</li>
                <li>Freedom Park (12 km)</li>
                <li>Lekki Conservation Centre (20 km)</li>
                <li>Nike Art Gallery (15 km)</li>
                <li>Terra Kulture (18 km)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <MapPin className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Banks & ATMs</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>ATMs available at the Sheraton Hotel (on-site)</li>
                <li>First Bank (1 km)</li>
                <li>Zenith Bank (1.5 km)</li>
                <li>GTBank (2 km)</li>
                <li>Access Bank (2.5 km)</li>
              </ul>
            </div>
            <div className="rounded-lg bg-slate-50 p-6 shadow-md">
              <div className="mb-4 flex items-center">
                <Phone className="mr-2 h-6 w-6 text-crimson-500" />
                <h3 className="text-xl font-bold text-navy-500">Emergency Contacts</h3>
              </div>
              <ul className="space-y-3 text-slate-600">
                <li>Emergency Services: 112</li>
                <li>Police: 112 or +234 1 492 3333</li>
                <li>Ambulance: 112 or +234 1 467 0000</li>
                <li>Lagos State Emergency Management Agency: +234 767 700 0002</li>
                <li>NIBF Emergency Contact: +234 123 456 7899</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-navy-500 px-4 py-16 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to Join Us at NIBF 2025?</h2>
          <p className="mb-8 text-lg text-slate-200">
            Secure your spot at Africa's premier book event and book your accommodation today!
          </p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/register-to-attend">
              <Button size="lg" className="bg-crimson-500 hover:bg-crimson-600">
                Register to Attend
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-navy-400">
              Book Accommodation
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

