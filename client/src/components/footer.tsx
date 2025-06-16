import { Code, Twitter, Github, Linkedin, MessageSquare, Heart } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-dark-secondary/80 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 purple-gradient rounded-xl flex items-center justify-center">
                <Code className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold gradient-text">Code Illusionists</span>
            </div>
            <p className="text-gray-300">Empowering developers with premium education and community-driven learning.</p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-purple-primary/20 rounded-full flex items-center justify-center text-purple-accent hover:bg-purple-primary/30 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-primary/20 rounded-full flex items-center justify-center text-purple-accent hover:bg-purple-primary/30 transition-colors">
                <MessageSquare className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-primary/20 rounded-full flex items-center justify-center text-purple-accent hover:bg-purple-primary/30 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-purple-primary/20 rounded-full flex items-center justify-center text-purple-accent hover:bg-purple-primary/30 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Courses</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/courses?category=AI & ML"><span className="hover:text-purple-accent transition-colors cursor-pointer">AI & Machine Learning</span></Link></li>
              <li><Link href="/courses?category=Web Development"><span className="hover:text-purple-accent transition-colors cursor-pointer">Web Development</span></Link></li>
              <li><Link href="/courses?category=Cybersecurity"><span className="hover:text-purple-accent transition-colors cursor-pointer">Cybersecurity</span></Link></li>
              <li><Link href="/courses?category=Data Science"><span className="hover:text-purple-accent transition-colors cursor-pointer">Data Science</span></Link></li>
              <li><Link href="/courses?category=Cloud Computing"><span className="hover:text-purple-accent transition-colors cursor-pointer">Cloud Computing</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Resources</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/resources?type=article"><span className="hover:text-purple-accent transition-colors cursor-pointer">Documentation</span></Link></li>
              <li><Link href="/resources?type=article"><span className="hover:text-purple-accent transition-colors cursor-pointer">Tutorials</span></Link></li>
              <li><Link href="/resources?type=template"><span className="hover:text-purple-accent transition-colors cursor-pointer">Code Templates</span></Link></li>
              <li><Link href="/resources?type=tool"><span className="hover:text-purple-accent transition-colors cursor-pointer">Developer Tools</span></Link></li>
              <li><a href="#" className="hover:text-purple-accent transition-colors">API Reference</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about"><span className="hover:text-purple-accent transition-colors cursor-pointer">About Us</span></Link></li>
              <li><a href="#" className="hover:text-purple-accent transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-purple-accent transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-purple-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-purple-accent transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">© 2024 Code Illusionists. All rights reserved.</p>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center">
                Made with <Heart className="text-red-400 mx-1 w-4 h-4" /> for developers
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
