import { NextResponse } from "next/server";
import Fuse from "fuse.js";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    const DATABASE_URL = process.env.DATABASE_URL as string;
    const connection = await mongoose.connect(DATABASE_URL);
    const db = connection.connection.db;
    const collection = db.collection("stores");
    const stores = await collection
      .find({}, { projection: { _id: 1, storeName: 1, storeImage: 1 } })
      .toArray();
    const options = {
      keys: ["storeName"],
      threshold: 0.6,
    };
    const searchTerm = await request.json();
    const fuse = new Fuse(stores, options);
    const result = fuse.search(searchTerm.search).slice(0, 10);
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err });
  }
}
