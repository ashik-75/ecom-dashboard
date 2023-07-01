import prismadb from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const { name } = await req.json();

    if (!userId) {
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
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    return new NextResponse("Internal server error", {
      status: 500,
    });
  }
}
