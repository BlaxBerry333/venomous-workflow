import getDecodeJWT from "./handle-token-decode";

export default function validateTokenExpires(token: string | undefined): boolean {
  if (!token) {
    return false;
  }

  try {
    const decoded = getDecodeJWT<{ exp: number }>(token);
    if (!decoded || !("exp" in decoded)) {
      return false;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - 10 > currentTime; // 提前 10 秒预留时间容差
  } catch {
    throw new Error("Invalid JWT token");
  }
}
