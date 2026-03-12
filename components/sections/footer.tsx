export default function Footer() {
  return (
    <footer className="bg-card border-t border-border/50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-foreground">Skill Gap Analyzer</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered career guidance platform helping students discover and develop the skills they need for their dream roles.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Analyzer</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Dashboard</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Resources</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3 text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Skill Gap Analyzer. All rights reserved.</p>
          <p className="mt-4 sm:mt-0">Built for Hackathon • Powered by AI</p>
        </div>
      </div>
    </footer>
  )
}
