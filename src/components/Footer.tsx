const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-muted/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground" style={{ fontFamily: "Satoshi, sans-serif" }}>Skillbridge</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Support</a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Skillbridge. Made with 💜 for students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
