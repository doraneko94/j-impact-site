// src/lib/imageRegistry.ts

// 画像globはここで1回だけ行う
export const postImages = import.meta.glob(
  "/src/assets/posts/**/*.{jpg,jpeg,png,webp,avif}",
  { eager: true }
);
