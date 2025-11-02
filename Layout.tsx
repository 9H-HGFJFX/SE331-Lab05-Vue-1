// src/components/Layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function Layout({ children }) {
  return (
    <div>
      {/* 引入 Analytics 组件 */}
      <Analytics />
      {children}
    </div>
  );
}