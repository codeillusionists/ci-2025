import { Rocket, Play, Users, Star, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="hero-bg stars-bg min-h-screen flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Master <span className="gradient-text">Tech Skills</span>
                <br />Like Never Before
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                Join Code Illusionists - the premium platform curating high-quality courses, resources, and tools for AI, web development, and cybersecurity. Learn from industry experts and connect with a thriving tech community.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="purple-gradient glow-effect px-8 py-4 text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                <Rocket className="w-5 h-5 mr-2" />
                Start Learning Today
              </Button>
              <Button variant="ghost" className="glass-card bounce-hover px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Watch Demo
              </Button>
            </div>

            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2 bounce-hover">
                <Users className="text-purple-accent w-4 h-4" />
                <span>50K+ Learners</span>
              </div>
              <div className="flex items-center space-x-2 bounce-hover">
                <Star className="text-purple-accent w-4 h-4" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center space-x-2 bounce-hover">
                <Award className="text-purple-accent w-4 h-4" />
                <span>Industry Certified</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="glass-card p-8 rounded-3xl floating-animation">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern tech workspace with multiple monitors and coding environment"
                className="rounded-2xl w-full h-auto"
              />
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute -top-6 -right-6 glass-card p-4 rounded-2xl bounce-hover floating-animation" style={{animationDelay: '1s'}}>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">500+</div>
                <div className="text-sm text-gray-300">Courses</div>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-2xl bounce-hover floating-animation" style={{animationDelay: '2s'}}>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text">98%</div>
                <div className="text-sm text-gray-300">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
