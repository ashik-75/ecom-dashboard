import { authOptions } from "@/lib/authOptions";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeid: string;
      billboardid: string;
    };
  }
) {
  try {
    const session = await getServerSession(authOptions);
    const { label, imageUrl } = await req.json();

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        user: session?.user?.email!,
        id: params.storeid,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UnAuthorized", {
        status: 403,
      });
    }

    const billboard = await prismadb.billboard.update({
      where: {
        id: params.billboardid,
      },
      data: {
        label,
        imageUrl,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeid: string;
      billboardid: string;
    };
  }
) {
  try {
    const session = await getServerSession(authOptions);

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        user: session?.user?.email!,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UnAuthorized", {
        status: 403,
      });
    }

    const done = await prismadb.billboard.delete({
      where: {
        id: params.billboardid,
      },
    });

    return NextResponse.json(done);
  } catch (error) {
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
