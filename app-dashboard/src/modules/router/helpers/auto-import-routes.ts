import type { ComponentType } from "react";
import { createElement, lazy } from "react";
import type { RouteObject } from "react-router-dom";

/**
 * 根据 Vite 动态导入的 glob 模块生成路由配置
 * @param modules - Vite 动态导入的 glob 模块
 * @param options.baseDir - 文件路径中的基础目录名
 * @param options.fileName - 文件名
 * @returns 路由对象数组
 * @example
 * ```ts
 * const routes = autoImportedLazyRoutes(
 *   import.meta.glob("@/pages/**" + "/page.tsx", { eager: false })
 * );
 * ```
 */
export function autoImportedRoutes(
  modules: IAutoImportedModules,
  options: { baseDir?: string; fileName?: string },
): IAutoImportedRoutes {
  return Object.entries(modules).map(([filepath, importFunction]) => {
    return {
      index: false,
      path: getNormalizePath(filepath, options),
      element: createElement(lazy(importFunction)),
    };
  });
}

export type IAutoImportedModules = Record<string, () => Promise<{ default: ComponentType }>>;
export type IAutoImportedRoutes = Array<RouteObject>;

// ====================================================================================================

/**
 * 将文件路径转换为路由路径
 * @param filepath 文件路径
 * @param options.baseDir 文件路径中的基础目录名
 * @param options.fileName 文件名
 * @example
 * ```ts
 * getNormalizePath("/app/pages/auth/login/page.tsx");                              // "/auth/login"
 * getNormalizePath("/app/pages/auth/notes/[id]/page.tsx");                         // "/auth/notes/:id"
 * getNormalizePath("/aa/bb/cc/view.tsx", { baseDir: "/aa/bb", fileName: "view" }); // "/cc"
 * ```
 */
function getNormalizePath(
  filepath: string,
  options: { baseDir?: string; fileName?: string } = {},
): string {
  const { baseDir = "/app/pages", fileName = "page" } = options;
  return (
    filepath
      .replace(new RegExp(`^.*${baseDir}`), "") // 提取文件路径中的基础目录名
      .replace(new RegExp(`/${fileName}\\.[a-zA-Z0-9]+$`), "") // 移除文件名及其后缀名
      .replace(/\[(.*?)\]/g, ":$1") // 将文件名中的动态参数替换为路由参数 ( 比如 `[id]`→`:id` )
      .replace(/\/index$/, "") || "/" // 移除结尾中的 `/index` 并转换为根路径 `/`
  );
}
