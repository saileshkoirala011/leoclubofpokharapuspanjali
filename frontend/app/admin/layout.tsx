/**
 * Admin shell — intentionally has NO public Navbar / Footer.
 * Auth state comes from the AuthProvider already mounted in the root layout.
 */
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
