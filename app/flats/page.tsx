import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function addFlat(formData:FormData){
 "use server"; const s=await createClient();
 await s.from("flats").insert({flat_no:String(formData.get("flat_no")),owner_name:String(formData.get("owner_name")),phone:String(formData.get("phone")||""),monthly_maintenance:Number(formData.get("monthly_maintenance")||0)});
 revalidatePath("/flats"); revalidatePath("/");
}
export default async function Flats(){
 const s=await createClient(); const {data}=await s.from("flats").select("*").order("flat_no");
 return <main className="container"><h1 className="title">Flats</h1>
 <div className="grid2 section">
  <div className="card"><h2>Add flat</h2><form className="form" action={addFlat}>
   <input className="input" name="flat_no" placeholder="A-101" required/>
   <input className="input" name="owner_name" placeholder="Owner name" required/>
   <input className="input" name="phone" placeholder="Phone"/>
   <input className="input" name="monthly_maintenance" type="number" placeholder="Monthly maintenance"/>
   <button className="btn">Save flat</button>
  </form></div>
  <div className="card"><h2>Flat register</h2><table className="table"><thead><tr><th>Flat</th><th>Owner</th><th>Phone</th><th>Maintenance</th></tr></thead><tbody>
   {(data??[]).map(f=><tr key={f.id}><td>{f.flat_no}</td><td>{f.owner_name}</td><td>{f.phone||"-"}</td><td>₹{Number(f.monthly_maintenance).toLocaleString("en-IN")}</td></tr>)}
  </tbody></table></div>
 </div></main>
}