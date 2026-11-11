import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
async function addFund(formData:FormData){
 "use server"; const s=await createClient();
 await s.from("funds").insert({name:String(formData.get("name")),balance:Number(formData.get("balance")||0),description:String(formData.get("description")||"")});
 revalidatePath("/funds"); revalidatePath("/");
}
export default async function Funds(){
 const s=await createClient(); const {data}=await s.from("funds").select("*").order("name");
 return <main className="container"><h1 className="title">Apartment Funds</h1>
 <div className="grid2 section"><div className="card"><h2>Create fund</h2><form className="form" action={addFund}>
 <input className="input" name="name" placeholder="Corpus Fund" required/><input className="input" name="balance" type="number" placeholder="Opening balance"/><input className="input" name="description" placeholder="Description"/><button className="btn">Save fund</button>
 </form></div><div className="card"><h2>Fund balances</h2><table className="table"><thead><tr><th>Fund</th><th>Balance</th><th>Description</th></tr></thead><tbody>
 {(data??[]).map(f=><tr key={f.id}><td>{f.name}</td><td>₹{Number(f.balance).toLocaleString("en-IN")}</td><td>{f.description||"-"}</td></tr>)}
 </tbody></table></div></div></main>
}