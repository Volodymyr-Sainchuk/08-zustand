"use client";

export default function NotesFilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <aside style={{ width: 220, borderRight: "1px solid #ddd", padding: "1rem" }}>{sidebar}</aside>
      <main style={{ flex: 1, padding: "1rem" }}>{children}</main>
    </div>
  );
}
