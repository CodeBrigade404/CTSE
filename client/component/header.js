import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <div key={href}>
          <Link
            href={href}
            style={{ textDecoration: "none", color: "white", fontWeight: 700 }}
          >
            {label}
          </Link>
        </div>
      );
    });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#002147",
        height: "60px",
        paddingRight: "40px",
        paddingLeft: "40px",
      }}
    >
      <Link
        style={{
          marginRight: "20px",
          textDecoration: "none",
          fontSize: "20px",
          color: "white",
          fontWeight: 700,
        }}
        href="/"
      >
        OUR APPLICATION
      </Link>
      <div>
        <div
          style={{
            display: "flex",
            listStyle: "none",
            padding: 0,
            alignItems: "center",
            gap: "30px",
          }}
        >
          {links}
        </div>
      </div>
    </div>
  );
};

export default Header;
