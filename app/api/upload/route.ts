import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // Validasi tipe file
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Hanya file JPG, PNG, atau WEBP" }, { status: 400 });
  }

  // Validasi ukuran (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Ukuran file maksimal 5MB" }, { status: 400 });
  }

  // Buat nama file unik
  const ext = file.name.split(".").pop();
  const fileName = `upload_${Date.now()}.${ext}`;
  const filePath = path.join(process.cwd(), "public", "images", fileName);

  const bytes = await file.arrayBuffer();
  await writeFile(filePath, Buffer.from(bytes));

  return NextResponse.json({ url: `/images/${fileName}` });
}
