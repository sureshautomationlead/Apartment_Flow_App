import "./globals.css";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = {
  title: "Apartment Funds",
  description: "Apartment maintenance and funds management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();
  const loggedIn = !!data?.claims;

  return (
    <html lang="en">
      <body>
        {loggedIn && (
          <header className="topbar">
            <div className="brand">Apartment Funds</div>

            <nav className="nav">
              <Link href="/">Dashboard</Link>
              <Link href="/flats">Flats</Link>
              <Link href="/payments">Payments</Link>
              <Link href="/expenses">Expenses</Link>
              <Link href="/funds">Funds</Link>
              <Link href="/reports">Reports</Link>

              <form action="/auth/signout" method="post">
                <button type="submit">Logout</button>
              </form>
            </nav>
          </header>
        )}

        {children}
      </body>
    </html>
  );
}