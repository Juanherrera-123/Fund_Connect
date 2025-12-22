import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function AuthPage() {
  return (
    <div className="auth-page">
      <Navbar />
      <main>
        <section className="page-header minimal compact-hero">
          <div className="container">
            <p className="eyebrow">User Access</p>
            <h1>Acceso y onboarding</h1>
            <p className="lead compact">
              Completa un KYC ligero y elige tu perfil para desbloquear el flujo de IGATES.
            </p>
          </div>
        </section>

        <section className="auth-section">
          <div className="container">
            <div className="auth-shell">
              <div className="auth-tabs" role="tablist" aria-label="Access options">
                <button
                  className="auth-tab is-active"
                  type="button"
                  data-auth-tab="signup"
                  role="tab"
                  aria-selected="true"
                >
                  Sign Up
                </button>
                <button
                  className="auth-tab"
                  type="button"
                  data-auth-tab="login"
                  role="tab"
                  aria-selected="false"
                >
                  Log In
                </button>
              </div>

              <div className="auth-panels">
                <div className="auth-panel" id="signupPanel" role="tabpanel">
                  <div className="progress-indicator" id="signupProgress">
                    Step 1 of 4
                  </div>
                  <form id="signupForm" className="contact-form" autoComplete="off"></form>
                  <div className="wizard-actions" id="signupActions"></div>
                  <p className="form-status" id="signupStatus" aria-live="polite"></p>
                </div>

                <div className="auth-panel is-hidden" id="loginPanel" role="tabpanel">
                  <form id="loginForm" className="contact-form" autoComplete="off">
                    <label>
                      <span>Usuario o email</span>
                      <input
                        type="text"
                        name="identifier"
                        placeholder="Sebastian_ACY o tu correo"
                        required
                      />
                    </label>
                    <label>
                      <span>Contraseña</span>
                      <input type="password" name="password" placeholder="••••••••" required />
                    </label>
                    <button className="btn btn-primary" type="submit">
                      Log In
                    </button>
                    <p className="form-status" id="loginStatus" aria-live="polite"></p>
                    <div className="auth-hint">
                      <p className="small">
                        MasterUser: <strong>Sebastian_ACY</strong> / <strong>dB9(NP1O</strong>
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
