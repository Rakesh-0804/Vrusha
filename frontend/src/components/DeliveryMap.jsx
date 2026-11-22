import React, { useEffect, useState, useRef } from 'react';
import { MapPin, Navigation, Compass, Truck, Building2, CheckCircle2 } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Calculate distance using Haversine formula
export function calculateHaversineDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Helper to create custom Leaflet marker icon
const createCustomIcon = (color, labelText) => {
  try {
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="36" height="48">
        <path fill="${color}" stroke="#ffffff" stroke-width="20" d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67a24 24 0 0 1-35.464 0z"/>
        <circle cx="192" cy="192" r="70" fill="#ffffff"/>
      </svg>
    `;
    return L.divIcon({
      className: 'custom-leaflet-marker',
      html: `<div class="relative group">
              <div class="drop-shadow-md">${svg}</div>
              <span class="absolute -top-7 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm opacity-90">${labelText}</span>
            </div>`,
      iconSize: [36, 48],
      iconAnchor: [18, 48],
      popupAnchor: [0, -48]
    });
  } catch (e) {
    return null;
  }
};

export default function DeliveryMap({
  officeLocation = { lat: 12.9716, lng: 77.5946, name: 'Vruksha HQ, Bengaluru' },
  deliveryLocation = { lat: 12.9352, lng: 77.6245, address: 'Koramangala, Bengaluru' },
  onLocationChange,
  deliveryConfig = { baseFee: 30, perKmRate: 8, freeDeliveryThreshold: 499 },
  height = '360px',
  interactive = true,
  cartSubtotal = 0,
  movingDriver = false
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const deliveryMarkerRef = useRef(null);
  const polylineRef = useRef(null);
  const driverMarkerRef = useRef(null);

  const [currentDelivery, setCurrentDelivery] = useState(deliveryLocation);
  const [distanceKm, setDistanceKm] = useState(() =>
    calculateHaversineDistance(officeLocation.lat, officeLocation.lng, deliveryLocation.lat, deliveryLocation.lng)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Sync state if prop changes
  useEffect(() => {
    if (deliveryLocation.lat && deliveryLocation.lng) {
      setCurrentDelivery(deliveryLocation);
      const dist = calculateHaversineDistance(
        officeLocation.lat,
        officeLocation.lng,
        deliveryLocation.lat,
        deliveryLocation.lng
      );
      setDistanceKm(dist);
    }
  }, [deliveryLocation.lat, deliveryLocation.lng, officeLocation.lat, officeLocation.lng]);

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    try {
      if (!mapInstanceRef.current) {
        const map = L.map(mapContainerRef.current, {
          center: [(officeLocation.lat + currentDelivery.lat) / 2, (officeLocation.lng + currentDelivery.lng) / 2],
          zoom: 12,
          zoomControl: true
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        const officeIcon = createCustomIcon('#059669', 'Vruksha HQ');
        const deliveryIcon = createCustomIcon('#dc2626', 'Delivery Point');

        // Add HQ Marker
        const hqMarker = officeIcon 
          ? L.marker([officeLocation.lat, officeLocation.lng], { icon: officeIcon })
          : L.marker([officeLocation.lat, officeLocation.lng]);
        hqMarker.addTo(map).bindPopup(`<b>🏢 ${officeLocation.name || 'Vruksha Dispatch HQ'}</b><br/>Dispatch Origin Hub`);

        // Add Delivery Marker
        const delMarkerOptions = { draggable: interactive };
        if (deliveryIcon) delMarkerOptions.icon = deliveryIcon;
        const delMarker = L.marker([currentDelivery.lat, currentDelivery.lng], delMarkerOptions).addTo(map);

        delMarker.bindPopup(`<b>📍 Delivery Destination</b><br/>${currentDelivery.address || 'Selected Delivery Location'}`);

        if (interactive) {
          delMarker.on('dragend', (e) => {
            const newPos = e.target.getLatLng();
            const newLat = Number(newPos.lat.toFixed(4));
            const newLng = Number(newPos.lng.toFixed(4));
            const updatedLoc = { lat: newLat, lng: newLng, address: `Lat: ${newLat}, Lng: ${newLng}` };
            setCurrentDelivery(updatedLoc);
            const dist = calculateHaversineDistance(officeLocation.lat, officeLocation.lng, newLat, newLng);
            setDistanceKm(dist);
            if (onLocationChange) {
              onLocationChange({ ...updatedLoc, distanceKm: dist });
            }
          });

          // Click map to reposition pin
          map.on('click', (e) => {
            const newLat = Number(e.latlng.lat.toFixed(4));
            const newLng = Number(e.latlng.lng.toFixed(4));
            delMarker.setLatLng([newLat, newLng]);
            const updatedLoc = { lat: newLat, lng: newLng, address: `Selected Pin (${newLat}, ${newLng})` };
            setCurrentDelivery(updatedLoc);
            const dist = calculateHaversineDistance(officeLocation.lat, officeLocation.lng, newLat, newLng);
            setDistanceKm(dist);
            if (onLocationChange) {
              onLocationChange({ ...updatedLoc, distanceKm: dist });
            }
          });
        }

        deliveryMarkerRef.current = delMarker;

        // Polyline (Route line)
        const line = L.polyline(
          [
            [officeLocation.lat, officeLocation.lng],
            [currentDelivery.lat, currentDelivery.lng]
          ],
          { color: '#059669', weight: 4, dashArray: '8, 8', opacity: 0.85 }
        ).addTo(map);
        polylineRef.current = line;

        mapInstanceRef.current = map;
      }
    } catch (err) {
      console.error('Leaflet map initialization error:', err);
    }

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.remove();
        } catch (e) {}
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update map polyline and marker on location update
  useEffect(() => {
    if (!mapInstanceRef.current) return;

    if (deliveryMarkerRef.current) {
      deliveryMarkerRef.current.setLatLng([currentDelivery.lat, currentDelivery.lng]);
    }

    if (polylineRef.current) {
      polylineRef.current.setLatLngs([
        [officeLocation.lat, officeLocation.lng],
        [currentDelivery.lat, currentDelivery.lng]
      ]);
    }

    // Fit bounds smoothly
    const bounds = L.latLngBounds([
      [officeLocation.lat, officeLocation.lng],
      [currentDelivery.lat, currentDelivery.lng]
    ]);
    mapInstanceRef.current.fitBounds(bounds, { padding: [40, 40] });
  }, [currentDelivery.lat, currentDelivery.lng, officeLocation.lat, officeLocation.lng]);

  // Handle Animated Delivery Driver Movement
  useEffect(() => {
    if (!movingDriver || !mapInstanceRef.current) return;

    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;
      if (progress > 1) progress = 0;

      const currentLat = officeLocation.lat + (currentDelivery.lat - officeLocation.lat) * progress;
      const currentLng = officeLocation.lng + (currentDelivery.lng - officeLocation.lng) * progress;

      if (!driverMarkerRef.current) {
        const driverIcon = L.divIcon({
          className: 'driver-marker',
          html: `<div class="bg-amber-500 text-slate-950 p-2 rounded-full shadow-lg border-2 border-white animate-bounce"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>`,
          iconSize: [32, 32],
          iconAnchor: [16, 16]
        });
        driverMarkerRef.current = L.marker([currentLat, currentLng], { icon: driverIcon }).addTo(mapInstanceRef.current);
      } else {
        driverMarkerRef.current.setLatLng([currentLat, currentLng]);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [movingDriver, officeLocation, currentDelivery]);

  // Calculate pricing
  const baseFee = Number(deliveryConfig.baseFee || 30);
  const perKmRate = Number(deliveryConfig.perKmRate || 8);
  const distFee = Math.round(distanceKm * perKmRate);
  const rawDeliveryCharge = baseFee + distFee;

  const isFreeDelivery = cartSubtotal >= (deliveryConfig.freeDeliveryThreshold || 499) && distanceKm <= 10;
  const finalDeliveryCharge = isFreeDelivery ? 0 : rawDeliveryCharge;

  // Search Address Location via Nominatim OpenStreetMap Geocoding API
  const handleSearchLocation = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery + ', India')}`);
      const data = await res.json();
      if (data && data.length > 0) {
        const first = data[0];
        const newLat = Number(parseFloat(first.lat).toFixed(4));
        const newLng = Number(parseFloat(first.lon).toFixed(4));
        const updatedLoc = { lat: newLat, lng: newLng, address: first.display_name };
        setCurrentDelivery(updatedLoc);
        const dist = calculateHaversineDistance(officeLocation.lat, officeLocation.lng, newLat, newLng);
        setDistanceKm(dist);
        if (onLocationChange) {
          onLocationChange({ ...updatedLoc, distanceKm: dist });
        }
      } else {
        alert('Location not found. Try dragging the marker on the map directly.');
      }
    } catch (err) {
      console.error('Location search failed:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm space-y-0">
      
      {/* Search Bar & Address Header */}
      {interactive && (
        <div className="p-3 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
            <Compass className="w-4 h-4 animate-spin text-emerald-400" />
            <span>Select Delivery Location on Map</span>
          </div>

          <form onSubmit={handleSearchLocation} className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search area, city or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs px-3 py-1.5 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 w-full sm:w-64"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap"
            >
              {isSearching ? 'Locating...' : 'Search Location'}
            </button>
          </form>
        </div>
      )}

      {/* Map Display Container */}
      <div className="relative w-full" style={{ height }}>
        <div ref={mapContainerRef} className="w-full h-full z-10" />

        {/* Floating Real-time HUD */}
        <div className="absolute top-3 right-3 z-20 bg-slate-950/85 backdrop-blur-md text-white p-3 rounded-2xl shadow-xl border border-slate-700 max-w-xs space-y-2">
          <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400">
              <Truck className="w-4 h-4" />
              <span>Route & Distance</span>
            </div>
            <span className="text-xs font-black text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/50">
              {distanceKm} KM
            </span>
          </div>

          <div className="text-[11px] space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>Office HQ Origin:</span>
              <span className="font-bold text-slate-100">{officeLocation.city || 'Bengaluru HQ'}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Rate:</span>
              <span className="font-bold text-slate-100">₹{baseFee} + ₹{perKmRate}/KM</span>
            </div>
            <div className="flex justify-between border-t border-slate-800 pt-1 font-bold text-xs">
              <span className="text-slate-200">Delivery Charge:</span>
              <span className={isFreeDelivery ? 'text-emerald-400 font-extrabold' : 'text-emerald-400'}>
                {isFreeDelivery ? 'FREE (Special Offer)' : `₹${finalDeliveryCharge}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Badge */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-700 gap-2">
        <div className="flex items-center gap-2 font-medium">
          <Building2 className="w-4 h-4 text-emerald-600" />
          <span>Origin: <b>{officeLocation.name || 'Vruksha Main HQ'}</b></span>
        </div>
        <div className="flex items-center gap-2 font-medium text-slate-600">
          <MapPin className="w-4 h-4 text-red-600" />
          <span className="truncate max-w-xs">Destination: <b>{currentDelivery.address}</b></span>
        </div>
      </div>

    </div>
  );
}
