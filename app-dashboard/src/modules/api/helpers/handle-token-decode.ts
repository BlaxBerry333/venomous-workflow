export default function getDecodeJWT<T extends Record<string, unknown>>(token: string | undefined) {
  try {
    if (!token) {
      return null;
    }

    const parts = token.split(".");
    if (parts.length < 2) {
      throw new Error("Invalid JWT token");
    }

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decoded = JSON.parse(atob(base64));
    return decoded as T;
  } catch {
    throw new Error("Invalid JWT token");
  }
}
