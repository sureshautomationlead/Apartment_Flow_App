import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
async function addExpense(formData:FormData){
 "use server"; const s=await createClient();
 await s.from("expenses").insert({category:String(formData.get("category")),description:String(formData.get("description")||""),amount:Number(formData.get("amount")),expense_date:String(formData.get("expense_date")),vendor:String(formData.get("vendor")||"")});
 revalidatePath("/expenses"); revalidatePath("/");
}
export default async function Expenses(){
 const s=await createClient(); const {data}=await s.from("expenses").select("*").order("expense_date",{ascending:false});
 return <main className="container"><h1 className="title">Expenses</h1>
 <div className="grid2 section"><div className="card"><h2>Add expense</h2><form className="form" action={addExpense}>
  <input className="input" name="category" placeholder="Security / Lift / Cleaning" required/>
  <input className="input" name="description" placeholder="Description"/>
  <input className="input" name="vendor" placeholder="Vendor"/>
  <input className="input" name="amount" type="number" placeholder="Amount" required/>
  <input className="input" name="expense_date" type="date" required/>
  <button className="btn">Save expense</button>
 </form></div>
 <div className="card"><h2>Expense register</h2><table className="table"><thead><tr><th>Date</th><th>Category</th><th>Vendor</th><th>Amount</th></tr></thead><tbody>
 {(data??[]).map(e=><tr key={e.id}><td>{e.expense_date}</td><td>{e.category}</td><td>{e.vendor||"-"}</td><td>₹{Number(e.amount).toLocaleString("en-IN")}</td></tr>)}
 </tbody></table></div></div></main>
}