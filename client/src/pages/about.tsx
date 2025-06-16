import { Info, Mail, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-5xl font-bold">
                About <span className="gradient-text">Code Illusionists</span>
              </h1>
              <p className="text-xl text-gray-300 leading-relaxed">
                We're building the future of tech education by curating premium content and fostering a community of passionate developers, creators, and innovators.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our platform combines the depth of GeeksforGeeks with the modern, creator-focused approach of platforms like Whop. We believe in making high-quality technical education accessible while maintaining the highest standards of content quality.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="glass-card p-6">
                <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
                <div className="text-gray-300">Active Learners</div>
              </Card>
              <Card className="glass-card p-6">
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-300">Expert Instructors</div>
              </Card>
              <Card className="glass-card p-6">
                <div className="text-3xl font-bold gradient-text mb-2">95%</div>
                <div className="text-gray-300">Job Placement Rate</div>
              </Card>
              <Card className="glass-card p-6">
                <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-gray-300">Community Support</div>
              </Card>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="purple-gradient px-8 py-4 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300">
                <Info className="w-5 h-5 mr-2" />
                Learn More
              </Button>
              <Button variant="outline" className="glass-card px-8 py-4 text-white font-semibold border-purple-accent text-purple-accent hover:bg-purple-accent/10 transition-all duration-300">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="glass-card p-6">
              <img
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                alt="Futuristic AI visualization with neural network patterns"
                className="w-full h-64 object-cover rounded-xl"
              />
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card className="glass-card p-4">
                <img
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Professional developer working on multiple monitors"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </Card>
              <Card className="glass-card p-4">
                <img
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                  alt="Digital security and cybersecurity concept"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </Card>
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Empowering the next generation of tech innovators through premium education and community collaboration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card p-8 text-center">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Quality Education</h3>
              <p className="text-gray-300">Curated courses from industry experts covering the latest technologies and best practices.</p>
            </Card>

            <Card className="glass-card p-8 text-center">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Community Driven</h3>
              <p className="text-gray-300">Foster collaboration and knowledge sharing among passionate developers worldwide.</p>
            </Card>

            <Card className="glass-card p-8 text-center">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Career Success</h3>
              <p className="text-gray-300">Provide the skills and support needed to excel in today's competitive tech landscape.</p>
            </Card>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">Excellence in Education</h3>
              <p className="text-gray-300 leading-relaxed">
                We maintain the highest standards in course quality, instructor expertise, and educational outcomes. Every piece of content is carefully curated and reviewed by industry professionals.
              </p>
            </Card>

            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">Innovation First</h3>
              <p className="text-gray-300 leading-relaxed">
                We embrace cutting-edge technologies and methodologies, ensuring our learners stay ahead of industry trends and technological advancements.
              </p>
            </Card>

            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">Community Impact</h3>
              <p className="text-gray-300 leading-relaxed">
                We believe in the power of community-driven learning, where knowledge sharing and collaboration create exponential growth for all members.
              </p>
            </Card>

            <Card className="glass-card p-8">
              <h3 className="text-2xl font-bold mb-4">Accessible Learning</h3>
              <p className="text-gray-300 leading-relaxed">
                Quality education should be accessible to everyone. We strive to remove barriers and create inclusive learning environments for all backgrounds.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
