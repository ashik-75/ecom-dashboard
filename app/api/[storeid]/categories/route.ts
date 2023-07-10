import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeid: string;
    };
  }
) {
  try {
    const { name, billboardId } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    const category = await prismadb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 });
  }
}
