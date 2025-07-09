import { NextApiRequest, NextApiResponse } from "next";

let listings = [
  {
    id: "1",
    carName: "Toyota Camry",
    location: "Dubai",
    pricePerDay: 120,
    status: "pending",
  },
  {
    id: "2",
    carName: "BMW X5",
    location: "Abu Dhabi",
    pricePerDay: 250,
    status: "approved",
  },
  {
    id: "3",
    carName: "Nissan Sunny",
    location: "Sharjah",
    pricePerDay: 90,
    status: "rejected",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(listings);
  } else if (req.method === "PUT") {
    const { id, status } = req.body;
    listings = listings.map((listing) =>
      listing.id === id ? { ...listing, status } : listing
    );
    res.status(200).json({ message: "Updated", listings });
  } else {
    res.status(405).end();
  }
}
