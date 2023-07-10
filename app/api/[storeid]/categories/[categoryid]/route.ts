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
      categoryid: string;
    };
  }
) {
  try {
    const { name, billboardId } = await req.json();

    const session = await getServerSession(authOptions);

    if (!name) {
      return new NextResponse("Name Is Required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard Id is Required!", { status: 400 });
    }

    if (!session) {
      return new NextResponse("UnAuthenticated User", { status: 401 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        user: session.user?.email!,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UnAuthorized", {
        status: 403,
      });
    }

    const updateCat = await prismadb.category.update({
      where: {
        id: params.categoryid,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(updateCat);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      storeid: string;
      categoryid: string;
    };
  }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new NextResponse("UnAuthenticated", { status: 401 });
    }

    const storeByUser = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        user: session.user?.email!,
      },
    });

    if (!storeByUser) {
      return new NextResponse("UnAuthorized", { status: 403 });
    }

    const deleteCat = await prismadb.category.delete({
      where: {
        id: params.categoryid,
      },
    });

    console.log({ deleteCat, catId: params.categoryid });

    return NextResponse.json(deleteCat);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 400 });
  }
}
