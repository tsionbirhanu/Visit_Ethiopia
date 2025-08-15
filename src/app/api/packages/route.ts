import { NextResponse } from 'next/server';
import {prisma } from '@/lib/prisma';

export const runtime = 'nodejs';

export async function GET() {
  try {
    const packages = await prisma.package.findMany({
      select: {
        id: true,
        name: true,
        inclusions: true,
        Price: true,
      },
    });
    return NextResponse.json(packages);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, inclusions, Price } = body;

    const newPackage = await prisma.package.create({
      data: { name, inclusions, Price },
    });

    return NextResponse.json(newPackage, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save package' }, { status: 500 });
  }
}
