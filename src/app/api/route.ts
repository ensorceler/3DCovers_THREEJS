import { getRedisKeyVal, setRedisKeyVal } from "@/lib/redis";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const key = searchParams.get("key");
  let value = null;
  if (key) {
    value = await getRedisKeyVal(key);
  }
  if (key == null || value == null) {
    return NextResponse.json({ data: null });
  }
  //console.log("val ", value);
  if (typeof value === "object") {
    value = JSON.parse(value);
  }
  return NextResponse.json({ data: value });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  let key = "key";
  let val = null;

  key = res.key;
  val = res.value;
  const ok = await setRedisKeyVal(key, val);
  return NextResponse.json({ success: ok });
}
