import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  console.log("STORE_CREATE: ");
  try {
    const session = await getServerSession(authOptions);

    console.log("Session: ", session);
    const { name } = await req.json();

    if (!session) {
      return new NextResponse("Unauthenticated User", {
        status: 403,
      });
    }

    if (!name) {
      return new NextResponse("Name is Required", {
        status: 400,
      });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        user: session?.user?.email!,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
