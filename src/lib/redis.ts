import { createClient } from "redis";

export async function setRedisKeyVal(
  key: string,
  val: string
): Promise<boolean> {
  try {
    const client = await createClient({
      url: "redis://localhost:6379",
    })
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    await client.set(key, val);
    await client.disconnect();
    return true;
  } catch (err) {
    console.log("Redis Client Error=>", err);
    return false;
  }
}

export async function getRedisKeyVal(key: string): Promise<string | null> {
  try {
    const client = await createClient({
      url: "redis://localhost:6379",
    })
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect();
    const value = await client.get(key);
    await client.disconnect();
    return value;
  } catch (err) {
    console.log("Redis Client Error=>", err);
    return null;
  }
}

//const value = await client.get("key");
