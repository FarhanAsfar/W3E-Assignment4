/**
 * Simple Flight Data Collection Script
 * Collects flight data and stores in database
 * 
 * Usage: node scripts/collectFlights.js
 */

import 'dotenv/config';
import axios from 'axios';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pkg from 'pg';
const { Pool } = pkg;

// Create PostgreSQL connection pool
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

// Initialize Prisma with adapter
const prisma = new PrismaClient({adapter});


const API_KEY = process.env.RAPIDAPI_KEY;
const API_HOST = 'booking-com15.p.rapidapi.com';

// ============================================================================
// STEP 1: Search for airport by location name
// ============================================================================
async function searchAirport(locationName) {
  console.log(`🔍 Searching airport for: ${locationName}`);
  
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination',
    params: { query: locationName },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  const response = await axios.request(options);
  const airports = response.data.data.filter(item => item.type === 'AIRPORT');
  
  if (airports.length === 0) {
    throw new Error(`No airport found for: ${locationName}`);
  }

  const airport = airports[0];
  console.log(`✅ Found: ${airport.id} - ${airport.name}`);
  
  return {
    airportId: airport.id,
    airportName: airport.name,
    city: airport.city?.name || locationName,
    cityName: airport.city?.name || locationName,
    country: airport.country?.name,
    countryName: airport.country?.name,
  };
}

// ============================================================================
// STEP 2: Search for flights between two airports
// ============================================================================
async function searchFlights(fromId, toId, departDate) {
  console.log(`✈️  Searching flights: ${fromId} → ${toId}`);
  
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights',
    params: { fromId, toId, departDate },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  const response = await axios.request(options);
  const flightOffers = response.data.data?.flightOffers || [];
  
  if (flightOffers.length === 0) {
    console.log(`⚠️  No flights found`);
    return [];
  }

  const tokens = flightOffers.map(flight => flight.token);
  console.log(`✅ Found ${tokens.length} flights`);
  
  return tokens;
}

// ============================================================================
// STEP 3: Get flight details using token
// ============================================================================
async function getFlightDetails(token) {
  console.log(`📋 Getting flight details...`);
  
  const options = {
    method: 'GET',
    url: 'https://booking-com15.p.rapidapi.com/api/v1/flights/getFlightDetails',
    params: { token },
    headers: {
      'x-rapidapi-key': API_KEY,
      'x-rapidapi-host': API_HOST
    }
  };

  const response = await axios.request(options);
  const details = response.data.data;
  
  const segments = details.segments || [];
  const mainSegment = segments[0];
  const legs = mainSegment.legs || [];
  const firstLeg = legs[0];
  
  return {
    flightName: `${firstLeg.carriersData[0]?.name || 'Unknown'} ${firstLeg.flightInfo?.flightNumber || ''}`,
    flightNumber: firstLeg.flightInfo?.flightNumber || 'N/A',
    airlineName: firstLeg.carriersData[0]?.name || 'Unknown',
  };
}

// ============================================================================
// SAVE TO DATABASE
// ============================================================================
async function saveToDatabase(departureAirportData, arrivalAirportData, flightData) {
  console.log(`💾 Saving to database...`);
  
  // 1. Get or create departure location
  let departureLocation = await prisma.location.findFirst({
    where: {
      cityName: departureAirportData.cityName,
      countryName: departureAirportData.countryName
    }
  });

  if (!departureLocation) {
    departureLocation = await prisma.location.create({
      data: {
        city: departureAirportData.city,
        cityName: departureAirportData.cityName,
        country: departureAirportData.country,
        countryName: departureAirportData.countryName
      }
    });
  }

  // 2. Get or create arrival location
  let arrivalLocation = await prisma.location.findFirst({
    where: {
      cityName: arrivalAirportData.cityName,
      countryName: arrivalAirportData.countryName
    }
  });

  if (!arrivalLocation) {
    arrivalLocation = await prisma.location.create({
      data: {
        city: arrivalAirportData.city,
        cityName: arrivalAirportData.cityName,
        country: arrivalAirportData.country,
        countryName: arrivalAirportData.countryName
      }
    });
  }

  // 3. Get or create departure airport
  let departureAirport = await prisma.airport.findUnique({
    where: { airportId: departureAirportData.airportId }
  });

  if (!departureAirport) {
    departureAirport = await prisma.airport.create({
      data: {
        airportId: departureAirportData.airportId,
        airportName: departureAirportData.airportName,
        locationId: departureLocation.id
      }
    });
  }

  // 4. Get or create arrival airport
  let arrivalAirport = await prisma.airport.findUnique({
    where: { airportId: arrivalAirportData.airportId }
  });

  if (!arrivalAirport) {
    arrivalAirport = await prisma.airport.create({
      data: {
        airportId: arrivalAirportData.airportId,
        airportName: arrivalAirportData.airportName,
        locationId: arrivalLocation.id
      }
    });
  }

  // 5. Check if flight already exists
  const existingFlight = await prisma.flight.findFirst({
    where: {
      flightNumber: flightData.flightNumber,
      departureAirportId: departureAirport.id,
      arrivalAirportId: arrivalAirport.id
    }
  });

  if (existingFlight) {
    console.log(`⏭️  Flight already exists: ${flightData.flightNumber}`);
    return;
  }

  // 6. Create flight
  await prisma.flight.create({
    data: {
      flightName: flightData.flightName,
      flightNumber: flightData.flightNumber,
      airlineName: flightData.airlineName,
      departureAirportId: departureAirport.id,
      arrivalAirportId: arrivalAirport.id
    }
  });

  console.log(`✅ Saved flight: ${flightData.flightNumber}`);
}

// ============================================================================
// MAIN FUNCTION - Collect flights for one route
// ============================================================================
async function collectFlightsForRoute(fromLocation, toLocation, date) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`🚀 Collecting: ${fromLocation} → ${toLocation} (${date})`);
  console.log(`${'='.repeat(60)}\n`);

  try {
    // STEP 1: Get departure airport
    const departureAirport = await searchAirport(fromLocation);
    
    // STEP 2: Get arrival airport
    const arrivalAirport = await searchAirport(toLocation);
    
    // STEP 3: Search flights (get tokens)
    const tokens = await searchFlights(
      departureAirport.airportId,
      arrivalAirport.airportId,
      date
    );

    if (tokens.length === 0) {
      console.log('No flights to save\n');
      return;
    }

    // STEP 4: Get details for first 3 flights and save
    const flightsToCollect = tokens.slice(0, 3); // Limit to 3 flights
    
    for (let i = 0; i < flightsToCollect.length; i++) {
      console.log(`\n[${i + 1}/${flightsToCollect.length}] Processing flight...`);
      
      const flightDetails = await getFlightDetails(flightsToCollect[i]);
      await saveToDatabase(departureAirport, arrivalAirport, flightDetails);
      
      // Small delay between API calls
      if (i < flightsToCollect.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    console.log(`\n✅ Route completed!\n`);

  } catch (error) {
    console.error(`❌ Error:`, error.message);
  }
}

// ============================================================================
// RUN THE SCRIPT
// ============================================================================
async function main() {
  console.log('\n🌍 FLIGHT DATA COLLECTION');
  console.log(`📅 ${new Date().toISOString()}\n`);

  const routes = [
    { from: 'Mumbai', to: 'Delhi', date: '2026-01-25' },
    { from: 'Dubai', to: 'London', date: '2026-01-26' },
    { from: 'New York', to: 'Paris', date: '2026-01-27' },
  ];

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    await collectFlightsForRoute(route.from, route.to, route.date);
    
    // Delay between routes
    if (i < routes.length - 1) {
      console.log('⏳ Waiting 2 seconds...\n');
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }

  console.log('🎉 ALL DONE!\n');
  await prisma.$disconnect();
}

main();