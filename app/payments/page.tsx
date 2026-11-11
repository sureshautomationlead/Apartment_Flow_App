import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
async function addPayment(formData:FormData){
 "use server"; const s=await createClient();
 await s.from("payments").insert({flat_id:String(formData.get("flat_id")),amount:Number(formData.get("amount")),payment_date:String(formData.get("payment_date")),month:String(formData.get("month")),status:"paid",reference:String(formData.get("reference")||"")});
 revalidatePath("/payments"); revalidatePath("/");
}
export default async function Payments(){
 const s=await createClient();
 const [{data:flats},{data:payments}]=await Promise.all([
  s.from("flats").select("id,flat_no").order("flat_no"),
  s.from("payments").select("*, flats(flat_no,owner_name)").order("payment_date",{ascending:false})
 ]);
 return <main className="container"><h1 className="title">Maintenance Payments</h1>
 <div className="grid2 section">
 <div className="card"><h2>Record payment</h2><form className="form" action={addPayment}>
  <select className="select" name="flat_id" required><option value="">Select flat</option>{(flats??[]).map(f=><option key={f.id} value={f.id}>{f.flat_no}</option>)}</select>
  <input className="input" name="month" placeholder="2026-08" required/>
  <input className="input" name="amount" type="number" placeholder="Amount" required/>
  <input className="input" name="payment_date" type="date" required/>
  <input className="input" name="reference" placeholder="UPI / receipt reference"/>
  <button className="btn">Save payment</button>
 </form></div>
 <div className="card"><h2>Recent payments</h2><table className="table"><thead><tr><th>Date</th><th>Flat</th><th>Month</th><th>Amount</th></tr></thead><tbody>
 {(payments??[]).map(p=><tr key={p.id}><td>{p.payment_date}</td><td>{p.flats?.flat_no}</td><td>{p.month}</td><td>₹{Number(p.amount).toLocaleString("en-IN")}</td></tr>)}
 </tbody></table></div></div></main>
}