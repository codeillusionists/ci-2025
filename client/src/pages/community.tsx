import { MessageCircle, Users, Zap, GraduationCap, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function Community() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Join Our <span className="gradient-text">Community</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Connect with fellow developers, share knowledge, and collaborate on exciting projects
          </p>
        </div>

        {/* Community Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
            <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Discussion Forums</h3>
            <p className="text-gray-300 mb-6">Engage in technical discussions, ask questions, and share your expertise with thousands of developers.</p>
            <div className="text-sm text-purple-accent font-medium">25k+ Active Members</div>
          </Card>

          <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
            <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Project Collaboration</h3>
            <p className="text-gray-300 mb-6">Find teammates for hackathons, open-source projects, and build amazing applications together.</p>
            <div className="text-sm text-purple-accent font-medium">500+ Active Projects</div>
          </Card>

          <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300">
            <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="text-white w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-4">Mentorship Program</h3>
            <p className="text-gray-300 mb-6">Connect with industry experts and experienced developers who can guide your learning journey.</p>
            <div className="text-sm text-purple-accent font-medium">200+ Mentors Available</div>
          </Card>
        </div>

        {/* Join Community CTA */}
        <Card className="glass-card p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
                alt="Diverse group of coding students working together"
                className="w-full h-80 object-cover rounded-xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Ready to Connect?</h3>
              <p className="text-gray-300 text-lg">Join thousands of developers already collaborating and growing together in our community.</p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400 w-5 h-5" />
                  <span>Free access to all community features</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400 w-5 h-5" />
                  <span>Weekly tech talks and workshops</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="text-green-400 w-5 h-5" />
                  <span>Exclusive job opportunities and networking</span>
                </div>
              </div>

              <Button className="purple-gradient px-8 py-4 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 w-full sm:w-auto">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </div>
          </div>
        </Card>

        {/* Community Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-16">
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">25K+</div>
            <div className="text-gray-300">Active Members</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">500+</div>
            <div className="text-gray-300">Projects</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">200+</div>
            <div className="text-gray-300">Mentors</div>
          </div>
          <div className="glass-card p-6 text-center">
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-300">Events/Month</div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Recent Community Activity</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="glass-card p-6">
              <h4 className="font-semibold mb-2">Latest Discussions</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">React 18 Best Practices</span>
                  <span className="text-purple-accent">12 replies</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">AI Model Optimization Tips</span>
                  <span className="text-purple-accent">8 replies</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Cybersecurity Career Path</span>
                  <span className="text-purple-accent">15 replies</span>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-6">
              <h4 className="font-semibold mb-2">Active Projects</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Open Source ML Library</span>
                  <span className="text-purple-accent">5 contributors</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Web3 Dashboard</span>
                  <span className="text-purple-accent">3 contributors</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Security Scanner Tool</span>
                  <span className="text-purple-accent">7 contributors</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
