const links = [
  {
    href: "https://github.com/vitejs/vite",
    icon: "github-icon",
    label: "GitHub",
  },
  { href: "https://chat.vite.dev/", icon: "discord-icon", label: "Discord" },
  { href: "https://x.com/vite_js", icon: "x-icon", label: "X.com" },
  {
    href: "https://bsky.app/profile/vite.dev",
    icon: "bluesky-icon",
    label: "Bluesky",
  },
];

function Footer() {
  return (
    <footer id="footer">
      <ul className="social-links">
        {links.map((link) => (
          <li key={link.label}>
            <a href={link.href} target="_blank">
              <svg
                className="button-icon"
                role="presentation"
                aria-hidden="true"
              >
                <use href={`/icons.svg#${link.icon}`}></use>
              </svg>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      <p>© {new Date().getFullYear()} - Consumo de APIs com React</p>
    </footer>
  );
}

export default Footer;
