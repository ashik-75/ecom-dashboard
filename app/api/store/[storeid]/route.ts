import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    const { name } = await req.json();

    if (!session) {
      return new NextResponse("User Not Login", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is Required", {
        status: 400,
      });
    }

    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeid,
        user: session.user?.email!,
      },
      data: {
        name,
      },
    });

    console.log(store);

    return NextResponse.json(store);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }

    return new NextResponse("Server Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { storeid: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("User not logged in", { status: 403 });
    }

    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeid,
        user: session.user?.email!,
      },
    });

    return NextResponse.json({
      message: "store deleted",
    });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, {
        status: 500,
      });
    }

    return new NextResponse("Server Error", {
      status: 500,
    });
  }
}
