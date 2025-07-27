"use client";
import { useEffect, useRef, useState } from 'react';

export default function GoogleMapConnections() {
    const mapRef = useRef(null);
    const [map, setMap] = useState(null);
    const [mapError, setMapError] = useState(null);
    const connectionsRef = useRef([]);

    // Configuration - set these according to your needs
    const USE_MAP_ID = false; // Set to true if you want to use Map ID, false for styles
    const YOUR_API_KEY = "AIzaSyCnak35Uu5YsgsDhzvfZm4qFgGQy7rS25E";
    const YOUR_MAP_ID = "85e0c2f4546b9ae642332971";

    // Global flag to prevent multiple API loads
    if (typeof window !== 'undefined' && !window.googleMapsLoading) {
        window.googleMapsLoading = false;
        window.googleMapsCallbacks = [];
    }

    // Your location coordinates
    const locations = [
        { name: "India (Mumbai)",  lat: 19.083,lng: 72.879, isHub: true },
        { name: "Europe", lat: 50.846, lng: 4.356 },
        { name: "Canada", lat: 45.422, lng: -75.691 },
        { name: "United States", lat: 38.89, lng: -77.032 },
        { name: "South Africa", lat: -25.746, lng: 28.188 },
        { name: "Russia", lat: 55.757, lng: 37.615 },
        { name: "United Kingdom", lat: 51.506, lng: -0.127 },
        {name: "South East Asia", lat: 8.058,lng: 115.816},
        { name: "South America", lat:-25.641, lng:-61.998}
    ];

    const companyOffices = [
        {
            name: "Head Office - Mumbai",
            address: "714 – Samartha Aishwarya, Off. New Link Road, Opp. Highland Park, Andheri-W, Mumbai – 400053",
            lat: 19.1355,
            lng: 72.8295,
            type: "head_office",
            contact: "+91-9987998036, +91-9987998037, +91-2235112519, +91-2235112520",
            email: "info@lqgroup.in"
        },
        {
            name: "Hong Kong Office",
            address: "1611B ,16/F,HO KING COMMERCIAL CENTRE, 2-16 FA YUEN STREET, MONGKOK, KOWLOON, HONGKONG",
            lat: 22.3193,
            lng: 114.1694,
            type: "international_office"
        },
        {
            name: "China Office",
            address: "296,Beida Street, Xinghualing District 030009, Taiyuan, China",
            lat: 37.8706,
            lng: 112.5489,
            type: "international_office"
        },
        {
            name: "Visakhapatnam Office",
            address: "5th Floor, Door No. 9-14-1, Suite No. 504, Kotu Empire, VIP Road, Siripuram, Visakhapatnam, Andhra Pradesh – 530006",
            lat: 17.7231,
            lng: 83.3012,
            type: "branch_office"
        },
        {
            name: "Chennai Office", 
            address: "NO1/1A, UR NAGAR, ANNA NAGAR WEST EXTN, Chennai, Tamil Nadu, 600050",
            lat: 13.0827,
            lng: 80.2707,
            type: "branch_office"
        },
        {
            name: "Kolkata Office",
            address: "2nd floor, 89- Bonfield Lane, Kolkata – 700001",
            lat: 22.5726,
            lng: 88.3639,
            type: "branch_office"
        }
    ];


    const getOfficeIcon = (officeType) => {
        const icons = {
            head_office: `
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="14" cy="14" r="12" fill="#FFD700" stroke="#ffffff" stroke-width="2"/>
                    <rect x="9" y="8" width="10" height="12" fill="#000000" rx="1"/>
                    <rect x="10" y="9" width="2" height="2" fill="#FFD700"/>
                    <rect x="12" y="9" width="2" height="2" fill="#FFD700"/>
                    <rect x="14" y="9" width="2" height="2" fill="#FFD700"/>
                    <rect x="10" y="12" width="2" height="2" fill="#FFD700"/>
                    <rect x="12" y="12" width="2" height="2" fill="#FFD700"/>
                    <rect x="14" y="12" width="2" height="2" fill="#FFD700"/>
                    <rect x="12" y="16" width="2" height="3" fill="#FFD700"/>
                </svg>
            `,
            international_office: `
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="13" cy="13" r="11" fill="#00FF7F" stroke="#ffffff" stroke-width="2"/>
                    <rect x="8" y="7" width="10" height="12" fill="#000000" rx="1"/>
                    <rect x="9" y="8" width="2" height="2" fill="#00FF7F"/>
                    <rect x="11.5" y="8" width="2" height="2" fill="#00FF7F"/>
                    <rect x="14" y="8" width="2" height="2" fill="#00FF7F"/>
                    <rect x="9" y="11" width="2" height="2" fill="#00FF7F"/>
                    <rect x="11.5" y="11" width="2" height="2" fill="#00FF7F"/>
                    <rect x="14" y="11" width="2" height="2" fill="#00FF7F"/>
                    <rect x="11.5" y="15" width="2" height="3" fill="#00FF7F"/>
                </svg>
            `,
            branch_office: `
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" fill="#FF6347" stroke="#ffffff" stroke-width="2"/>
                    <rect x="7" y="6" width="10" height="12" fill="#000000" rx="1"/>
                    <rect x="8" y="7" width="2" height="2" fill="#FF6347"/>
                    <rect x="10.5" y="7" width="2" height="2" fill="#FF6347"/>
                    <rect x="13" y="7" width="2" height="2" fill="#FF6347"/>
                    <rect x="8" y="10" width="2" height="2" fill="#FF6347"/>
                    <rect x="10.5" y="10" width="2" height="2" fill="#FF6347"/>
                    <rect x="13" y="10" width="2" height="2" fill="#FF6347"/>
                    <rect x="10.5" y="14" width="2" height="3" fill="#FF6347"/>
                </svg>
            `
        };
        return icons[officeType] || icons.branch_office;
    };

    // Fallback custom dark map style
    const mapStyle = [
        // Hide all text labels (cities, provinces, countries)
        {
            "elementType": "labels.text",
            "stylers": [{"visibility": "off"}]
        },
        {
            "elementType": "labels.icon",
            "stylers": [{"visibility": "off"}]
        },
        // Set landscape color to #1e3056
        {
            "elementType": "geometry",
            "stylers": [{"color": "#1e3056"}]
        },
        // Set water bodies to black
        {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#000000"}]
        },
        // Set all land features to #1e3056
        {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [{"color": "#1e3056"}]
        },
       
        {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
                {"color": "#ffffff"}, // White borders
                {"weight": 0.2},        // Border thickness
                {"visibility": "on"}
            ]
        },
        
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [{"color": "#2a4068"}]
        },
        // Hide road labels
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        // Set transit features to #1e3056
        {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{"color": "#1e3056"}]
        },
        // // Hide transit labels
        {
            "featureType": "transit",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
        // Set POI (points of interest) to #1e3056
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{"color": "#1e3056"}]
        },
        // Hide POI labels
        {
            "featureType": "poi",
            "elementType": "labels",
            "stylers": [{"visibility": "off"}]
        },
       
        {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry",
            "stylers": [{"color": "#1e3056"}]
        }
    ];

    useEffect(() => {
        // Prevent multiple API loads
        let isLoading = false;
        
        // Load Google Maps script with global loading prevention
        const loadGoogleMaps = () => {
            // Check if API is already loaded
            if (window.google && window.google.maps) {
                initializeMap();
                return;
            }

            // Add callback to queue
            window.googleMapsCallbacks.push(initializeMap);

            // If already loading, just wait
            if (window.googleMapsLoading) {
                return;
            }

            // Check if script already exists
            const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
            if (existingScript) {
                window.googleMapsLoading = true;
                existingScript.addEventListener('load', () => {
                    window.googleMapsLoading = false;
                    window.googleMapsCallbacks.forEach(callback => callback());
                    window.googleMapsCallbacks = [];
                });
                return;
            }

            // Create new script
            window.googleMapsLoading = true;
            const script = document.createElement('script');
            
            if (USE_MAP_ID) {
                script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&map_ids=${YOUR_MAP_ID}&libraries=geometry`;
            } else {
                script.src = `https://maps.googleapis.com/maps/api/js?key=${YOUR_API_KEY}&libraries=geometry`;
            }
            
            script.async = true;
            script.onload = () => {
                window.googleMapsLoading = false;
                window.googleMapsCallbacks.forEach(callback => callback());
                window.googleMapsCallbacks = [];
            };
            script.onerror = () => {
                window.googleMapsLoading = false;
                setMapError("Failed to load Google Maps API");
            };
            document.head.appendChild(script);
        };

        const initializeMap = () => {
            try {
                // Ensure the map container exists
                if (!mapRef.current) {
                    console.error("Map container not found");
                    return;
                }

                let mapOptions = {
                    center: { lat: 20, lng: 0 },
                    zoom: 2,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: true,
                    rotateControl:false,
                    scaleControl:false,
                    clickableIcons:false,
                    directionControl:false,
                    mapTypeControl:false,
                    panControl:false,
                    // zoomControl:false,
                    // zoomAnimation:false,
                    // zoomAnimationDuration:0,
                    // zoomAnimationEasing:'linear',
                    // zoomAnimationCurve:'linear',
                    // zoomAnimationEasing:'linear',
                    scrollwheel: false,        // ← ADD THIS
                    draggable: false,          // ← ADD THIS
                    keyboardShortcuts: false,  // ← ADD THIS
                    disableDoubleClickZoom: true, // ← ADD THIS
                    disableScrollWheelZoom: true,
                    gestureHandling: 'none',   
                    disableDragging: true,

                    minZoom: 2,               // ← ADD THIS
                    maxZoom: 2,               // ← ADD THIS
                    restriction: {            // ← ADD THIS ENTIRE BLOCK
                        latLngBounds: {
                            north: 85,
                            south: -85,
                            west: -180,
                            east: 180
                        },
                        strictBounds: true
                    }
                };

                // Use Map ID or styles based on configuration
                if (USE_MAP_ID) {
                    mapOptions.mapId = YOUR_MAP_ID;
                } else {
                    mapOptions.styles = mapStyle;
                }

                const mapInstance = new window.google.maps.Map(mapRef.current, mapOptions);

                // Wait for map to be fully initialized before adding markers
                window.google.maps.event.addListenerOnce(mapInstance, 'idle', () => {
                    setMap(mapInstance);
                    addMarkersAndConnections(mapInstance);
                    addCompanyOffices(mapInstance);
                });

            } catch (error) {
                console.error("Error initializing map:", error);
                setMapError("Failed to initialize map");
            }
        };
        
        loadGoogleMaps();

        // Cleanup function to prevent memory leaks
        return () => {
            // Clear connections
            connectionsRef.current.forEach(connection => {
                if (connection && connection.setMap) {
                    connection.setMap(null);
                }
            });
            connectionsRef.current = [];
            
            // Clear map reference
            if (map) {
                setMap(null);
            }
        };
    }, []); // Empty dependency array to run only once

    const addMarkersAndConnections = (mapInstance) => {
        try {
            // Validate that mapInstance is a proper Google Maps instance
            if (!mapInstance || typeof mapInstance.getCenter !== 'function') {
                console.error("Invalid map instance provided");
                return;
            }

            const indiaLocation = locations.find(loc => loc.isHub);
            const destinations = locations.filter(loc => !loc.isHub);

            // Add markers
            locations.forEach((location, index) => {
                try {
                    const marker = new window.google.maps.Marker({
                        position: { lat: location.lat, lng: location.lng },
                        map: mapInstance,
                        title: location.name,
                        icon: {
                            url: location.isHub 
                                ? 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="12" cy="12" r="8" fill="#ff6b6b" stroke="#ffffff" stroke-width="2"/>
                                        <circle cx="12" cy="12" r="4" fill="#ffffff"/>
                                    </svg>
                                `)
                                : 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="10" cy="10" r="6" fill="#00d4ff" stroke="#ffffff" stroke-width="2"/>
                                    </svg>
                                `),
                            scaledSize: new window.google.maps.Size(location.isHub ? 24 : 20, location.isHub ? 24 : 20),
                            anchor: new window.google.maps.Point(location.isHub ? 12 : 10, location.isHub ? 12 : 10)
                        }
                    });

                    // Add info window
                    const infoWindow = new window.google.maps.InfoWindow({
                        content: `<div style="color: #333; font-weight: bold;">${location.name}</div>`
                    });

                    marker.addListener('click', () => {
                        infoWindow.open(mapInstance, marker);
                    });
                } catch (error) {
                    console.error(`Error creating marker for ${location.name}:`, error);
                }
            });

            // Add connection lines with proper validation
            destinations.forEach((destination, index) => {
                setTimeout(() => {
                    try {
                        // Double-check map instance is still valid
                        if (!mapInstance || typeof mapInstance.getCenter !== 'function') {
                            console.error("Map instance became invalid");
                            return;
                        }

                        const flightPath = new window.google.maps.Polyline({
                            path: [
                                { lat: indiaLocation.lat, lng: indiaLocation.lng },
                                { lat: destination.lat, lng: destination.lng }
                            ],
                            geodesic: true,
                            strokeColor: '#00d4ff',
                            strokeOpacity: 0.8,
                            strokeWeight: 3,
                            map: mapInstance,
                            icons: [{
                                icon: {
                                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                    scale: 4,
                                    fillColor: '#00d4ff',
                                    fillOpacity: 1,
                                    strokeColor: '#ffffff',
                                    strokeWeight: 1
                                },
                                offset: '50%'
                            }]
                        });

                        connectionsRef.current.push(flightPath);
                    } catch (error) {
                        console.error(`Error creating connection line to ${destination.name}:`, error);
                    }
                }, index * 200);
            });
        } catch (error) {
            console.error("Error in addMarkersAndConnections:", error);
        }
    };

    const addCompanyOffices = (mapInstance) => {
        try {
            companyOffices.forEach((office, index) => {
                try {
                    const marker = new window.google.maps.Marker({
                        position: { lat: office.lat, lng: office.lng },
                        map: mapInstance,
                        title: office.name,
                        icon: {
                            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(getOfficeIcon(office.type)),
                            scaledSize: new window.google.maps.Size(
                                office.type === 'head_office' ? 28 : office.type === 'international_office' ? 26 : 24,
                                office.type === 'head_office' ? 28 : office.type === 'international_office' ? 26 : 24
                            ),
                            anchor: new window.google.maps.Point(
                                office.type === 'head_office' ? 14 : office.type === 'international_office' ? 13 : 12,
                                office.type === 'head_office' ? 14 : office.type === 'international_office' ? 13 : 12
                            )
                        }
                    });
    
                    // Create detailed info window for offices
                    const officeInfo = `
                        <div style="max-width: 300px; color: #333; font-family: Arial, sans-serif;">
                            <h3 style="margin: 0 0 8px 0; color: #1e3056; font-size: 16px; font-weight: bold;">
                                ${office.name}
                            </h3>
                            <p style="margin: 0 0 8px 0; font-size: 12px; line-height: 1.4;">
                                <strong>Address:</strong><br>
                                ${office.address}
                            </p>
                            ${office.contact ? `
                                <p style="margin: 0 0 4px 0; font-size: 12px;">
                                    <strong>Contact:</strong> ${office.contact}
                                </p>
                            ` : ''}
                            ${office.email ? `
                                <p style="margin: 0; font-size: 12px;">
                                    <strong>Email:</strong> ${office.email}
                                </p>
                            ` : ''}
                        </div>
                    `;
    
                    const infoWindow = new window.google.maps.InfoWindow({
                        content: officeInfo
                    });
    
                    marker.addListener('click', () => {
                        infoWindow.open(mapInstance, marker);
                    });
    
                } catch (error) {
                    console.error(`Error creating marker for ${office.name}:`, error);
                }
            });
        } catch (error) {
            console.error("Error in addCompanyOffices:", error);
        }
    };

    

    if (mapError) {
        return (
            <div className="w-full h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                    <p className="text-red-600 mb-2">Error loading map: {mapError}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            {/* Map Container */}
            <div 
                ref={mapRef} 
                className="w-full h-[600px] rounded-lg shadow-lg"
                style={{ minHeight: '600px' }}
            />
            
          

            {/* Info Panel */}
            <div className="absolute bottom-1 left-2 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-sm">
                <h3 className="text-lg font-bold mb-2">Global Connections from India</h3>
                <p className="text-sm text-gray-300">
                    Interactive map showing business connections from IQ Groups, India to major global markets.
                </p>
                
            </div>
        </div>
    );
}