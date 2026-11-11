import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="card">
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              fontSize: 42,
              marginBottom: 8,
            }}
          >
            🏢
          </div>

          <h1 className="title">Apartment Funds</h1>

          <p className="muted">
            Manage your apartment maintenance, payments and funds
          </p>
        </div>

        <form className="form" action={login}>
          <input
            className="input"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            required
          />

          <input
            className="input"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            minLength={6}
            required
          />

          <button className="btn" type="submit">
            Login
          </button>
        </form>

        <details>
          <summary>Create admin account</summary>

          <form className="form" action={signup}>
            <input
              className="input"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="email"
              required
            />

            <input
              className="input"
              name="password"
              type="password"
              placeholder="Password"
              autoComplete="new-password"
              minLength={6}
              required
            />

            <button className="btn secondary" type="submit">
              Create Account
            </button>
          </form>
        </details>

        <div className="login-footer">
          Apartment Management System
        </div>
      </div>
    </div>
  );
}