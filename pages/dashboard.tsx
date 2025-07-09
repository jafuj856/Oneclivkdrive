import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import EditFile from "./components/EditFile";

type Listing = {
  id: string;
  carName: string;
  location: string;
  pricePerDay: number;
  status: string;
};

export default function Dashboard() {
  const [listings, setListings] = useState<Listing[]>([]);
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  const fetchListings = async () => {
    const res = await axios.get("/api/listings");
    setListings(res.data);
  };

  const updateStatus = async (id: string, status: string) => {
    await axios.put("/api/listings", { id, status });
    fetchListings();
  };

  const handleLogout = () => {
    Cookies.remove("auth");
    router.push("/");
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const openEditModal = (listing: Listing) => {
    setSelectedListing(listing);
    setEditOpen(true);
  };

  const handleUpdate = (updatedListing: Listing) => {
    setListings((prev) =>
      prev.map((l) => (l.id === updatedListing.id ? updatedListing : l))
    );
    setEditOpen(false);
  };

  return (
    <div className="p-6">
      <EditFile
        isOpen={editOpen}
        setIsOpen={setEditOpen}
        listing={selectedListing}
        onUpdate={handleUpdate}
      />
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-md">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 border-b">Car Name</th>
              <th className="p-4 border-b">Location</th>
              <th className="p-4 border-b">Price/Day</th>
              <th className="p-4 border-b">Status</th>
              <th className="p-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id} className="border-t hover:bg-gray-50">
                <td className="p-4">{listing.carName}</td>
                <td className="p-4">{listing.location}</td>
                <td className="p-4">AED {listing.pricePerDay}</td>
                <td className="p-4 capitalize">{listing.status}</td>
                <td className="p-4 space-x-2">
                  <button
                    onClick={() => updateStatus(listing.id, "approved")}
                    className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStatus(listing.id, "rejected")}
                    className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => openEditModal(listing)}
                    className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
