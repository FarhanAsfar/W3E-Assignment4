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
        flightsMap.set(flight.id, {
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


export {locationSearch}