import type { MenuProps } from "antd";
import type React from "react";

type Item = NonNullable<MenuProps["items"]>[number];

export function antdFindLabelByKey(
  list: MenuProps["items"],
  target: React.Key,
): React.ReactNode | undefined {
  if (!list) return;
  for (const it of list as Item[]) {
    if (!it) continue;
    if ("key" in it && it.key === target && "label" in it) return it.label;
    if ("children" in it && it.children) {
      const hit = antdFindLabelByKey(it.children as MenuProps["items"], target);
      if (hit !== undefined) return hit;
    }
  }
  return undefined;
}
