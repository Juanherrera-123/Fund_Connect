import Link from "next/link";

export function Navbar() {
  return (
    <header className="site-header">
      <Link className="logo" href="/" aria-label="IGATES home">
        <img src="/IGATESLOGO.png" alt="IGATES Fund Intelligence logo" />
      </Link>
      <nav className="nav">
        <Link href="/#why" data-i18n="navWhy">
          Why IGATES
        </Link>
        <Link href="/gestores-verificados">Gestores Verificados</Link>
        <Link href="/for-managers" data-i18n="navManagers">
          Fund Manager
        </Link>
        <Link href="/family-offices" data-i18n="navFamily">
          Family Offices
        </Link>
        <Link href="/#learn" data-i18n="navLearn">
          Learn
        </Link>
        <Link href="/#contact" data-i18n="navContact">
          Contact
        </Link>
      </nav>
      <div className="header-actions">
        <div className="language-switcher">
          <button
            className="language-toggle"
            id="languageToggle"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-label="Select language"
          >
            EN ▾
          </button>
          <ul className="language-menu" id="languageMenu" role="listbox" aria-label="Language options">
            <li role="option" data-lang="en" aria-selected="true">
              English
            </li>
            <li role="option" data-lang="pt" aria-selected="false">
              Português
            </li>
            <li role="option" data-lang="es" aria-selected="false">
              Español
            </li>
            <li role="option" data-lang="it" aria-selected="false">
              Italiano
            </li>
            <li role="option" data-lang="zh" aria-selected="false">
              中文（简体）
            </li>
          </ul>
        </div>
        <Link className="btn btn-secondary" href="/#contact" data-i18n="navRequestDemo">
          Request Demo
        </Link>
        <Link className="btn btn-primary auth-link" href="/auth" data-i18n="navAuth">
          Sign Up / Log In
        </Link>
      </div>
    </header>
  );
}
