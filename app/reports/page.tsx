import { createClient } from "@/lib/supabase/server";
export default async function Reports(){
 const s=await createClient();
 const [{data:payments},{data:expenses},{data:flats},{data:funds}]=await Promise.all([
  s.from("payments").select("amount,status,month"),
  s.from("expenses").select("amount,category,expense_date"),
  s.from("flats").select("id,flat_no"),
  s.from("funds").select("name,balance")
 ]);
 const paid=(payments??[]).filter(x=>x.status==="paid").reduce((a,x)=>a+Number(x.amount),0);
 const spent=(expenses??[]).reduce((a,x)=>a+Number(x.amount),0);
 return <main className="container"><h1 className="title">Reports</h1>
 <div className="grid section"><div className="card"><div className="muted">Flats</div><div className="metric">{flats?.length??0}</div></div><div className="card"><div className="muted">Collections</div><div className="metric">₹{paid.toLocaleString("en-IN")}</div></div><div className="card"><div className="muted">Expenses</div><div className="metric">₹{spent.toLocaleString("en-IN")}</div></div><div className="card"><div className="muted">Net</div><div className="metric">₹{(paid-spent).toLocaleString("en-IN")}</div></div></div>
 <div className="card section"><h2>Funds</h2><table className="table"><thead><tr><th>Fund</th><th>Balance</th></tr></thead><tbody>{(funds??[]).map(f=><tr key={f.name}><td>{f.name}</td><td>₹{Number(f.balance).toLocaleString("en-IN")}</td></tr>)}</tbody></table></div>
 <div className="card section"><h2>Expense categories</h2><table className="table"><thead><tr><th>Category</th><th>Date</th><th>Amount</th></tr></thead><tbody>{(expenses??[]).map((e,i)=><tr key={i}><td>{e.category}</td><td>{e.expense_date}</td><td>₹{Number(e.amount).toLocaleString("en-IN")}</td></tr>)}</tbody></table></div>
 </main>
}