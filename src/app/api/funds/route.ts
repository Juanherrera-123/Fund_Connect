import { NextResponse } from "next/server";
import { collection, getDocs } from "firebase/firestore";

import { getServerFirestore } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getServerFirestore();
    const snapshot = await getDocs(collection(db, "funds"));
    const funds = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(funds);
  } catch (error) {
    console.error("Unable to fetch funds", error);
    return NextResponse.json({ error: "Unable to fetch funds" }, { status: 500 });
  }
}
