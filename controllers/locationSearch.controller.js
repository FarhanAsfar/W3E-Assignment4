import {prisma} from "../lib/prisma.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";

const locationSearch = asyncHandler (async (req, res) => {
    const {locationname} = req.params;

    if(!locationname) {
        throw new ApiError(400, "Location name is required");
    }
    
    const location = await prisma.location.findFirst({
        where: {
            OR: [
                { cityName: { contains: locationname, mode: 'insensitive' } },
                { countryName: { contains: locationname, mode: 'insensitive' } }
            ]
        },
        select: {
            city: true,
            cityName: true,
            country: true,
            countryName: true,

            airports: {
                select: {
                    airportId: true,
                    departureFlights: {
                        select: {
                            id: true,
                            flightName: true,
                            airlineName: true,
                        },   
                    },
                    arrivalFlights: {
                        select: {
                            id: true,
                            flightName: true,
                            airlineName: true,
                        },
                    },
                },
            },

            attractions:{
                select: {
                    address: true,
                    city: true,
                    country: true,
                    description: true,
                },
            },
        },
    });

    if(!location) {
        throw new ApiError(404, "Location not found");
    }

    // storing geo info
    const geoInfo = {
        city: location.city,
        cityName: location.cityName,
        country: location.country,
        countryName: location.countryName,
    }

    // storing flights info
    const flightsInfo = new Map();

location.airports.forEach(({ airportId, departureFlights, arrivalFlights }) => {
  [...departureFlights, ...arrivalFlights].forEach(flight => {
    flightsInfo.set(flight.id, {
      flightName: flight.flightName,
      airlineName: flight.airlineName,
      airportId,
      city: location.cityName,
      country: location.countryName,
    });
  });
});

const flights = Array.from(flightsInfo.values());


    // storing attractions info
    const attractionsInfo = location.attractions;

    res.status(200).json(
        new ApiResponse(200, "Location fetched successfully", {
            geoInfo,
            flights,
            attractions: attractionsInfo,
        })
    );
})

const detailsController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { searchtype } = req.query;

  if (!id || !searchtype) {
    throw new ApiError(400, "id and searchtype are required");
  }


  if (searchtype === "flight") {
    const flight = await prisma.flight.findUnique({
      where: { id: Number(id) },
      include: {
        departureAirport: {
          include: {
            location: true,
          },
        },
        arrivalAirport: {
          include: {
            location: true,
          },
        },
      },
    });

    if (!flight) {
      throw new ApiError(404, "Flight not found");
    }

    const geoInfo = {
      departureCity: flight.departureAirport.location.cityName,
      departureCountry: flight.departureAirport.location.countryName,
      arrivalCity: flight.arrivalAirport.location.cityName,
      arrivalCountry: flight.arrivalAirport.location.countryName,
    };

    const flightInfo = {
      id: flight.id,
      flightName: flight.flightName,
      flightNumber: flight.flightNumber,
      airlineName: flight.airlineName,
      departureAirport: flight.departureAirport.airportName,
      arrivalAirport: flight.arrivalAirport.airportName,
    };

    return res.status(200).json(
      new ApiResponse(200, "Flight details fetched", {
        geoInfo,
        flight: flightInfo,
      })
    );
  }

  if (searchtype === "attraction") {
    const attraction = await prisma.attraction.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
      },
    });

    if (!attraction) {
      throw new ApiError(404, "Attraction not found");
    }

    const geoInfo = {
      city: attraction.location.cityName,
      country: attraction.location.countryName,
    };

    const attractionInfo = {
      id: attraction.id,
      name: attraction.name,
      description: attraction.description,
      address: attraction.address,
    };

    return res.status(200).json(
      new ApiResponse(200, "Attraction details fetched", {
        geoInfo,
        attraction: attractionInfo,
      })
    );
  }

  throw new ApiError(400, "Invalid searchtype. Use 'flight' or 'attraction'");
});



export {locationSearch, detailsController}