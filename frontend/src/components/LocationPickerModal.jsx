import React, { useState } from 'react';
import DeliveryMap from './DeliveryMap';
import { X, MapPin, Navigation, CheckCircle2, Building2, Truck } from 'lucide-react';

export default function LocationPickerModal({
  isOpen,
  onClose,
  currentLocation,
  onSaveLocation,
  deliveryConfig = { baseFee: 30, perKmRate: 8, freeDeliveryThreshold: 499 }
}) {
  const [selectedLoc, setSelectedLoc] = useState(
    currentLocation || { lat: 12.9352, lng: 77.6245, address: 'Koramangala, Bengaluru', distanceKm: 5.2 }
  );

  if (!isOpen) return null;

  const handleConfirmLocation = () => {
    if (onSaveLocation) {
      onSaveLocation(selectedLoc);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 space-y-4 relative shadow-2xl border border-slate-200 animate-in zoom-in-95">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-700 p-2 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
            Real-Time Delivery Route Calculator
          </span>
          <h2 className="text-xl font-black text-slate-900 font-serif mt-1">
            Pin Delivery Location & Calculate Distance
          </h2>
          <p className="text-xs text-slate-500">
            Drag the pin or search your address to see exact route from Vruksha Central HQ and per-KM delivery cost.
          </p>
        </div>

        {/* Interactive Map */}
        <DeliveryMap
          officeLocation={{
            lat: 12.9716,
            lng: 77.5946,
            name: 'Vruksha Main HQ, Indiranagar, Bengaluru'
          }}
          deliveryLocation={selectedLoc}
          onLocationChange={(newLoc) => setSelectedLoc(newLoc)}
          deliveryConfig={deliveryConfig}
          height="340px"
          interactive={true}
        />

        {/* Selected Address Summary Bar */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="space-y-1">
            <span className="font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-emerald-600" />
              <span>Selected Destination:</span>
            </span>
            <p className="text-slate-900 font-medium truncate max-w-md">
              {selectedLoc.address}
            </p>
          </div>

          <button
            onClick={handleConfirmLocation}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold px-5 py-2.5 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 whitespace-nowrap text-xs"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Confirm Delivery Location</span>
          </button>
        </div>

      </div>
    </div>
  );
}
