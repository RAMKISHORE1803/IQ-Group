"use client";
import { useEffect, useRef, useState } from 'react';

export default function GoogleMapConnections() {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const [map, setMap] = useState(null);
    const [mapError, setMapError] = useState(null);
    const connectionsRef = useRef([]);
    const markersRef = useRef([]);
    const [isMobile, setIsMobile] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const mapInitializedRef = useRef(false);

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
            head_office: `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="16" r="14" fill="#FFD700" stroke="#ffffff" stroke-width="3"/>
                <rect x="11" y="8" width="10" height="16" fill="#2C3E50"/>
                <rect x="12" y="10" width="2" height="2" fill="#FFD700"/>
                <rect x="15" y="10" width="2" height="2" fill="#FFD700"/>
                <rect x="18" y="10" width="2" height="2" fill="#FFD700"/>
                <rect x="12" y="13" width="2" height="2" fill="#FFD700"/>
                <rect x="15" y="13" width="2" height="2" fill="#FFD700"/>
                <rect x="18" y="13" width="2" height="2" fill="#FFD700"/>
                <rect x="12" y="16" width="2" height="2" fill="#FFD700"/>
                <rect x="15" y="16" width="2" height="2" fill="#FFD700"/>
                <rect x="18" y="16" width="2" height="2" fill="#FFD700"/>
                <rect x="15" y="20" width="2" height="4" fill="#8B4513"/>
            </svg>`,
            international_office: `<svg width="28" height="28" viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg">
                <circle cx="14" cy="14" r="12" fill="#00FF7F" stroke="#ffffff" stroke-width="3"/>
                <rect x="9" y="7" width="10" height="14" fill="#2C3E50"/>
                <rect x="10" y="9" width="2" height="2" fill="#00FF7F"/>
                <rect x="13" y="9" width="2" height="2" fill="#00FF7F"/>
                <rect x="16" y="9" width="2" height="2" fill="#00FF7F"/>
                <rect x="10" y="12" width="2" height="2" fill="#00FF7F"/>
                <rect x="13" y="12" width="2" height="2" fill="#00FF7F"/>
                <rect x="16" y="12" width="2" height="2" fill="#00FF7F"/>
                <rect x="10" y="15" width="2" height="2" fill="#00FF7F"/>
                <rect x="13" y="15" width="2" height="2" fill="#00FF7F"/>
                <rect x="16" y="15" width="2" height="2" fill="#00FF7F"/>
                <rect x="13" y="18" width="2" height="3" fill="#8B4513"/>
            </svg>`,
            branch_office: `<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" fill="#FF6347" stroke="#ffffff" stroke-width="3"/>
                <rect x="7" y="6" width="10" height="12" fill="#2C3E50"/>
                <rect x="8" y="8" width="2" height="2" fill="#FF6347"/>
                <rect x="11" y="8" width="2" height="2" fill="#FF6347"/>
                <rect x="14" y="8" width="2" height="2" fill="#FF6347"/>
                <rect x="8" y="11" width="2" height="2" fill="#FF6347"/>
                <rect x="11" y="11" width="2" height="2" fill="#FF6347"/>
                <rect x="14" y="11" width="2" height="2" fill="#FF6347"/>
                <rect x="8" y="14" width="2" height="2" fill="#FF6347"/>
                <rect x="11" y="14" width="2" height="2" fill="#FF6347"/>
                <rect x="14" y="14" width="2" height="2" fill="#FF6347"/>
                <rect x="11" y="16" width="2" height="2" fill="#8B4513"/>
            </svg>`
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

    // Setup Intersection Observer to detect when map comes into view
    useEffect(() => {
        if (typeof window === 'undefined' || !containerRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // When component becomes visible
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                root: null, // viewport
                rootMargin: '0px',
                threshold: 0.1, // Trigger when 10% of the element is visible
            }
        );

        observer.observe(containerRef.current);

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    // Check if the screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        if (typeof window !== 'undefined') {
            checkMobile();
            window.addEventListener('resize', checkMobile);
        }
        
        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', checkMobile);
            }
        };
    }, []);

    // Load Google Maps API and initialize map when component becomes visible
    useEffect(() => {
        // Only proceed if component is visible and map hasn't been initialized yet
        if (!isVisible || mapInitializedRef.current) return;
        
        mapInitializedRef.current = true;
        
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
                 
                    return;
                }

                let mapOptions = {
                    center: { lat: 20, lng: 0 },
                    zoom: isMobile ? 0 : 2, // Reduce zoom level further on mobile
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false,
                    disableDefaultUi: true,
                    rotateControl: false,
                    scaleControl: false,
                    clickableIcons: true, // Keep this true to allow custom markers
                    scrollwheel: false,
                    draggable: false,
                    keyboardShortcuts: false,
                    disableDoubleClickZoom: true,
                    disableScrollWheelZoom: true,
                    gestureHandling: 'none',
                    disableDragging: true,
                    minZoom: isMobile ? 1 : 2,
                    maxZoom: isMobile ? 1 : 2,
                    restriction: {
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
            
            // Clear markers
            markersRef.current.forEach(marker => {
                if (marker && marker.setMap) {
                    marker.setMap(null);
                }
            });
            markersRef.current = [];
            
            // Clear map reference
            if (map) {
                setMap(null);
            }
        };
    }, [isVisible, isMobile]); // Added isVisible to dependency array

    const addMarkersAndConnections = (mapInstance) => {
        try {
            // Validate that mapInstance is a proper Google Maps instance
            if (!mapInstance || typeof mapInstance.getCenter !== 'function') {
             
                return;
            }

            const indiaLocation = locations.find(loc => loc.isHub);
            const destinations = locations.filter(loc => !loc.isHub);

            // Add markers
            locations.forEach((location, index) => {
                setTimeout(() => {
                    try {
                        // Scale markers based on device size
                        const markerSize = isMobile ? 
                            (location.isHub ? 16 : 12) : // smaller on mobile
                            (location.isHub ? 24 : 20);  // normal size on desktop
                            
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
                                scaledSize: new window.google.maps.Size(markerSize, markerSize),
                                anchor: new window.google.maps.Point(markerSize/2, markerSize/2)
                            },
                            cursor: 'pointer' // Add pointer cursor to indicate interactive element
                        });

                        markersRef.current.push(marker);

                        // Add info window
                        const infoWindow = new window.google.maps.InfoWindow({
                            content: `<div style="color: #333; font-weight: bold;">${location.name}</div>`,
                            disableAutoPan: true, // Prevent map from panning to the info window
                            pixelOffset: new window.google.maps.Size(0, -5) // Slight upward offset
                        });
                        
                        // Remove the close button after the info window is opened
                        infoWindow.addListener('domready', () => {
                            // Find and remove the close button element
                            const closeButtons = document.querySelectorAll('.gm-ui-hover-effect');
                            closeButtons.forEach(button => {
                                button.style.display = 'none';
                            });
                        });

                        // Show info window on hover instead of click
                        marker.addListener('mouseover', () => {
                            infoWindow.open(mapInstance, marker);
                        });
                        
                        // Close info window when mouse leaves
                        marker.addListener('mouseout', () => {
                            infoWindow.close();
                        });
                        
                        // For mobile devices, use click since hover isn't available
                        if (isMobile) {
                            marker.addListener('click', () => {
                                infoWindow.open(mapInstance, marker);
                                
                                // Auto close after 2 seconds on mobile
                                setTimeout(() => {
                                    infoWindow.close();
                                }, 2000);
                            });
                        }
                    } catch (error) {
                        console.error(`Error creating marker for ${location.name}:`, error);
                    }
                }, index * 100);
            });

            // Add connection lines - one after another
            // Wait for all markers to be placed before starting connections
            setTimeout(() => {
                // Create and animate connections sequentially
                const animateConnections = (index) => {
                    // If we've animated all connections, start adding office markers
                    if (index >= destinations.length) {
                        addCompanyOffices(mapInstance);
                        return;
                    }
                    
                    try {
                        const destination = destinations[index];
                        
                        // Double-check map instance is still valid
                        if (!mapInstance || typeof mapInstance.getCenter !== 'function') {
                            console.error("Map instance became invalid");
                            return;
                        }

                        // Create the polyline with no visible stroke initially
                        const flightPath = new window.google.maps.Polyline({
                            path: [
                                { lat: indiaLocation.lat, lng: indiaLocation.lng },
                                { lat: destination.lat, lng: destination.lng }
                            ],
                            geodesic: true,
                            strokeColor: '#00d4ff',
                            strokeOpacity: 0,
                            strokeWeight: isMobile ? 1.5 : 3, // Thinner lines on mobile
                            map: mapInstance,
                            icons: [{
                                icon: {
                                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                                    scale: isMobile ? 2 : 4, // Smaller arrows on mobile
                                    fillColor: '#00d4ff',
                                    fillOpacity: 0, // Start with invisible arrow
                                    strokeColor: '#ffffff',
                                    strokeWeight: 1
                                },
                                offset: '0%' // Start at beginning
                            }]
                        });

                        connectionsRef.current.push(flightPath);
                        
                        // Animate the line drawing
                        let count = 0;
                        const animationDuration = 200; // 1.5 seconds per connection
                        const animationSteps = 20;
                        const interval = animationDuration / animationSteps;
                        
                        const lineAnimation = setInterval(() => {
                            count = (count + 1) % animationSteps;
                            
                            // Gradually increase opacity as animation progresses
                            const progress = count / animationSteps;
                            flightPath.setOptions({
                                strokeOpacity: progress * 0.8 // Max opacity 0.8
                            });
                            
                            // Move the arrow along the line
                            const icons = flightPath.get('icons');
                            icons[0].offset = (count * 100 / animationSteps) + '%';
                            
                            // Make arrow visible once animation starts
                            if (count === 1) {
                                icons[0].icon.fillOpacity = 1;
                            }
                            
                            flightPath.set('icons', icons);
                            
                            // When animation completes, start the next connection
                            if (count === animationSteps - 1) {
                                clearInterval(lineAnimation);
                                
                                // Wait a short moment before starting the next connection
                                setTimeout(() => {
                                    animateConnections(index + 1);
                                }, 300);
                            }
                        }, interval);
                        
                    } catch (error) {
                        console.error(`Error creating connection line to ${destinations[index]?.name}:`, error);
                        // If there's an error, still try to animate the next connection
                        animateConnections(index + 1);
                    }
                };
                
                // Start the sequential animation with the first connection
                animateConnections(0);
                
            }, locations.length * 100 + 500); // Start connections after all markers are placed, with a small extra delay
        } catch (error) {
            console.error("Error in addMarkersAndConnections:", error);
        }
    };

    const addCompanyOffices = (mapInstance) => {
        try {
            // Add office markers sequentially
            const addOfficeMarker = (index) => {
                // If we've added all office markers, we're done
                if (index >= companyOffices.length) {
                    return;
                }
                
                const office = companyOffices[index];
                
                try {
                    // Scale office markers based on device size and office type
                    let markerSize;
                    if (isMobile) {
                        markerSize = office.type === 'head_office' ? 20 : 
                                     office.type === 'international_office' ? 16 : 14;
                    } else {
                        markerSize = office.type === 'head_office' ? 32 : 
                                     office.type === 'international_office' ? 28 : 24;
                    }
                        
                        const marker = new window.google.maps.Marker({
                            position: { lat: office.lat, lng: office.lng },
                            map: mapInstance,
                            title: office.name,
                            icon: {
                                url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(getOfficeIcon(office.type)),
                            scaledSize: new window.google.maps.Size(markerSize, markerSize),
                            anchor: new window.google.maps.Point(markerSize/2, markerSize/2)
                            },
                        zIndex: 1000, // High z-index to ensure visibility
                        // Start with opacity 0
                        opacity: 0,
                        cursor: 'pointer' // Add pointer cursor to indicate interactive element
                        });

                        markersRef.current.push(marker);
        
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
                        content: officeInfo,
                        disableAutoPan: true, // Prevent map from panning to the info window
                        pixelOffset: new window.google.maps.Size(0, -5) // Slight upward offset
                    });
    
                    // Remove the close button after the info window is opened
                    infoWindow.addListener('domready', () => {
                        // Find and remove the close button element
                        const closeButtons = document.querySelectorAll('.gm-ui-hover-effect');
                        closeButtons.forEach(button => {
                            button.style.display = 'none';
                        });
                    });
    
                    // Show info window on hover instead of click
                    marker.addListener('mouseover', () => {
                        infoWindow.open(mapInstance, marker);
                    });
                    
                    // Close info window when mouse leaves
                    marker.addListener('mouseout', () => {
                        infoWindow.close();
                    });
                    
                    // For mobile devices, use click since hover isn't available
                    if (isMobile) {
                        marker.addListener('click', () => {
                            infoWindow.open(mapInstance, marker);
                            
                            // Auto close after 3 seconds on mobile
                            setTimeout(() => {
                                infoWindow.close();
                            }, 3000);
                        });
                    }
                    
                    // Animate marker appearance
                    let fadeInCount = 0;
                    const fadeInSteps = 10;
                    const fadeInInterval = setInterval(() => {
                        fadeInCount++;
                        marker.setOpacity(fadeInCount / fadeInSteps);
                        
                        if (fadeInCount >= fadeInSteps) {
                            clearInterval(fadeInInterval);
                            
                            // Add the next office marker after a delay
                            setTimeout(() => {
                                addOfficeMarker(index + 1);
                            }, 150);
                        }
                    }, 50);
                    } catch (error) {
                        console.error(`Error creating marker for ${office.name}:`, error);
                    // If there's an error, still try to add the next office marker
                    setTimeout(() => {
                        addOfficeMarker(index + 1);
                    }, 150);
                }
            };
            
            // Start adding office markers
            addOfficeMarker(0);
        } catch (error) {
            console.error("Error in addCompanyOffices:", error);
        }
    };

    if (mapError) {
        return (
            <div className="w-full h-[250px] md:h-[600px] flex items-center justify-center bg-gray-100 rounded-lg">
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
        <div ref={containerRef} className="w-full h-full relative">
            {/* Map Container */}
            <div 
                ref={mapRef} 
                className="w-full h-full rounded-lg shadow-lg"
                style={{ 
                    height: isMobile ? '250px' : '600px',
                    maxWidth: '100%'
                }}
            />

            {/* Info Panel - Adjusted for mobile */}
            <div className={`absolute bottom-1 left-2 bg-black bg-opacity-80 text-white p-2 md:p-4 rounded-lg ${isMobile ? 'max-w-[90%] text-xs' : 'max-w-sm'}`}>
                <h3 className={`${isMobile ? 'text-[18px] ml-[-7%] font-medium' : 'text-lg font-bold'} mb-1 md:mb-2`}>Global Connections from India</h3>
                {!isMobile && (
                <p className="text-sm text-gray-300">
                    Interactive map showing business connections from IQ Groups, India to major global markets.
                </p>
                )}
            </div>
        </div>
    );
}