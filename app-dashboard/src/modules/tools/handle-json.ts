export function isValidJSON(str: string): boolean {
  const isKeyValue = str.startsWith("{") && str.endsWith("}");
  const isArray = str.startsWith("[") && str.endsWith("]");
  return typeof str === "string" && (isKeyValue || isArray);
}
