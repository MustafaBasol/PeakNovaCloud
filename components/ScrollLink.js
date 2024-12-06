import Link from "next/link";

const ScrollLink = ({ href, children, ...props }) => (
  <Link
    href={href}
    onClick={() => {
      window.scrollTo({ top: 0 });
    }}
    {...props}
  >
    {children}
  </Link>
);

export default ScrollLink;
