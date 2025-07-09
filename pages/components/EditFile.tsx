import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import axios from "axios";

type Listing = {
  id: string;
  carName: string;
  location: string;
  pricePerDay: number;
  status: string;
};

type EditFileProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  listing: Listing | null;
  onUpdate: (updatedListing: Listing) => void;
};

function EditFile({ isOpen, setIsOpen, listing, onUpdate }: EditFileProps) {
  const [carName, setCarName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (listing) {
      setCarName(listing.carName);
      setLocation(listing.location);
      setPrice(listing.pricePerDay.toString());
      setError("");
    }
  }, [listing]);

  const validate = () => {
    if (!carName.trim()) {
      setError("Car Name is required.");
      return false;
    }
    if (!location.trim()) {
      setError("Location is required.");
      return false;
    }
    if (!price.trim() || isNaN(Number(price)) || Number(price) <= 0) {
      setError("Price must be a positive number.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || !listing) return;

    setLoading(true);
    try {
      const updatedListing = {
        ...listing,
        carName,
        location,
        pricePerDay: Number(price),
      };

      await axios.put("/api/listings", updatedListing);

      onUpdate(updatedListing);
    } catch {
      setError("Failed to update listing. Try again.");
    }
    setLoading(false);
  };

  return (
    <Modal
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="flex items-center justify-center p-4"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-md p-4 w-full max-w-[400px]"
      >
        <h1 className="font-bold text-md mb-4 text-center">Edit Listing</h1>

        {error && (
          <p className="text-red-600 text-center mb-2 text-sm font-medium">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-4 w-full">
          <div className="w-full text-xs">
            <label className="block mb-1">Car Name</label>
            <input
              type="text"
              className="w-full h-10 p-2 border border-black/20 rounded"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="w-full text-xs">
            <label className="block mb-1">Location</label>
            <input
              type="text"
              className="w-full h-10 p-2 border border-black/20 rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="w-full text-xs">
            <label className="block mb-1">Price (AED per day)</label>
            <input
              type="number"
              className="w-full h-10 p-2 border border-black/20 rounded"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={loading}
              min={1}
              step={0.01}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default EditFile;
