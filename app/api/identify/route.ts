import { NextResponse } from 'next/server';


export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('image');

  if (!file || !(file instanceof File)) {
    return NextResponse.json(
      { error: 'No image file received (key must be "image").' },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const sizeKB = Math.round(bytes.byteLength / 1024);

  return NextResponse.json({
    filename: file.name,
    type: file.type,
    sizeKB,
  });
}
