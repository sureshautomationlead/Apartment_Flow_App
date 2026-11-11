import { login, signup } from "./actions";
export default function LoginPage(){
 return <main className="container" style={{maxWidth:460,marginTop:70}}>
  <div className="card">
   <h1 className="title">Apartment Funds</h1><p className="muted">Admin login</p>
   <form className="form" action={login}>
    <input className="input" name="email" type="email" placeholder="Email" required/>
    <input className="input" name="password" type="password" placeholder="Password" minLength={6} required/>
    <button className="btn" type="submit">Login</button>
   </form>
   <form action={signup} style={{marginTop:10}}><input type="hidden" name="email" value=""/><p className="muted">Create an admin account using the same form below.</p></form>
   <details style={{marginTop:16}}><summary>Create account</summary>
    <form className="form" action={signup} style={{marginTop:12}}>
     <input className="input" name="email" type="email" placeholder="Email" required/>
     <input className="input" name="password" type="password" placeholder="Password" minLength={6} required/>
     <button className="btn secondary" type="submit">Sign up</button>
    </form>
   </details>
  </div>
 </main>
}