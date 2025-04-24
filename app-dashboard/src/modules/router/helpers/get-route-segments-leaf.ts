/**
 * 获取路由路径的所有节点片段
 * @param routePath 路由路径
 * @description
 * 建议将路由设计为三个节点的结构:
 * - 顶级路由段：顶级路由 ( 比如 `auth|dashboard` )
 * - 二级路由段：应用名称 ( 比如 `workflow|users` )
 * - 三级路由段：具体功能 ( 比如 `create|list|:id` )
 * @example
 * ```ts
 * getRouteSegments("/auth/login");          // ["auth", "login"]
 * getRouteSegments("/dashboard/notes/:id"); // ["dashboard", "notes", ":id"]
 * ```
 */
export function getRouteSegments(routePath: string): string[] {
  const segments = routePath.split("/").filter(Boolean);
  return segments;
}

/**
 * 获取路由路径的具体功能节点片段 ( 最后一个节点 )
 * @param routePath 路由路径
 * @param options.removeSearchQuery 是否移除路由路径中的查询参数
 * @description
 * 建议将路由设计为三个节点的结构:
 * - 顶级路由段：顶级路由 ( 比如 `auth|dashboard` )
 * - 二级路由段：应用名称 ( 比如 `workflow|users` )
 * - 三级路由段：具体功能 ( 比如 `create|list|detail` )
 * @example
 * ```ts
 * getRouteLeaf("/auth/login");                                    // "login"
 * getRouteLeaf("/dashboard/notes/:id");                           // ":id"
 * getRouteLeaf("/dashboard/notes/123");                           // "123"
 * getRouteLeaf("/xxx/yyy?query=11");                              // "yyy?query=11"
 * getRouteLeaf("/xxx/yyy?query=11", { removeSearchQuery: true }); // "yyy"
 * ```
 */
export function getRouteLeaf(
  routePath: string,
  options: { removeSearchQuery?: boolean } = {},
): string {
  if (options?.removeSearchQuery) {
    routePath = routePath.split("?")[0];
  }
  const segments = getRouteSegments(routePath);
  const leaf = segments[segments.length - 1];
  return leaf;
}
