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
    const { label, imageUrl } = await req.json();

    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("Unauthenticated", {
        status: 401,
      });
    }

    if (!label) {
      return new NextResponse("Label is Required", {
        status: 400,
      });
    }

    if (!imageUrl) {
      return new NextResponse("Image is Required", {
        status: 400,
      });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        user: session.user?.email!,
      },
    });

    if (!store) {
      return new NextResponse("UnAuthorized User", {
        status: 403,
      });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function GET(
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
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("UnAuthenticated", {
        status: 401,
      });
    }

    const store = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        user: session.user?.email!,
      },
    });

    if (!store) {
      return new NextResponse("UnAuthorized", {
        status: 403,
      });
    }

    const billboard = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
