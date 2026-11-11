import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function Dashboard(){
 const supabase=await createClient();
 const [{data:flats},{data:payments},{data:expenses},{data:funds}] = await Promise.all([
  supabase.from("flats").select("id"),
  supabase.from("payments").select("amount,status"),
  supabase.from("expenses").select("amount"),
  supabase.from("funds").select("balance")
 ]);
 const collected=(payments??[]).filter(x=>x.status==="paid").reduce((s,x)=>s+Number(x.amount),0);
 const expenseTotal=(expenses??[]).reduce((s,x)=>s+Number(x.amount),0);
 const fundTotal=(funds??[]).reduce((s,x)=>s+Number(x.balance),0);
 return <main className="container">
  <h1 className="title">Dashboard</h1><p className="muted">Apartment financial overview</p>
  <section className="grid section">
   <div className="card"><div className="muted">Total flats</div><div className="metric">{flats?.length??0}</div></div>
   <div className="card"><div className="muted">Collected</div><div className="metric">₹{collected.toLocaleString("en-IN")}</div></div>
   <div className="card"><div className="muted">Expenses</div><div className="metric">₹{expenseTotal.toLocaleString("en-IN")}</div></div>
   <div className="card"><div className="muted">Fund balances</div><div className="metric">₹{fundTotal.toLocaleString("en-IN")}</div></div>
  </section>
  <section className="grid2 section">
   <div className="card"><h2>Quick actions</h2><p><Link className="btn" href="/flats">Manage flats</Link></p><p><Link className="btn secondary" href="/payments">Record payment</Link></p></div>
   <div className="card"><h2>Financial position</h2><p>Net cash movement: <b>₹{(collected-expenseTotal).toLocaleString("en-IN")}</b></p><p className="muted">Use Reports for month-wise summaries.</p></div>
  </section>
 </main>
}