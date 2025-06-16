import { useQuery } from "@tanstack/react-query";
import { BookOpen, MessageCircle, Users, Zap, GraduationCap, Info, FileText, Wrench, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import HeroSection from "@/components/hero-section";
import CourseCard from "@/components/course-card";
import ResourceCard from "@/components/resource-card";
import { Course, Resource } from "@shared/schema";

export default function Home() {
  const { data: featuredCourses, isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses/featured"],
  });

  const { data: featuredResources, isLoading: resourcesLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources/featured"],
  });

  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* Featured Courses Section */}
      <section className="py-24 bg-dark-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Featured <span className="gradient-text">Courses</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Master cutting-edge technologies with our expertly crafted courses designed by industry professionals
            </p>
          </div>

          {coursesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                  <div className="w-full h-48 bg-gray-700 rounded-xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                    <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCourses?.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/courses">
              <Button className="purple-gradient px-8 py-4 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300">
                <BookOpen className="w-5 h-5 mr-2" />
                View All Courses
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Premium Resources Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Premium <span className="gradient-text">Resources</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Access curated articles, tools, and documentation to accelerate your learning journey
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="purple-gradient p-3 rounded-xl">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Technical Articles</h3>
                    <p className="text-gray-300 mb-4">In-depth tutorials and guides covering latest technologies, best practices, and industry insights.</p>
                    <Link href="/resources?type=article">
                      <span className="text-purple-accent hover:text-purple-primary transition-colors font-medium cursor-pointer">
                        Explore Articles →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="purple-gradient p-3 rounded-xl">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Developer Tools</h3>
                    <p className="text-gray-300 mb-4">Curated collection of essential tools, libraries, and frameworks for modern development.</p>
                    <Link href="/resources?type=tool">
                      <span className="text-purple-accent hover:text-purple-primary transition-colors font-medium cursor-pointer">
                        Browse Tools →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8 rounded-2xl">
                <div className="flex items-start space-x-4">
                  <div className="purple-gradient p-3 rounded-xl">
                    <BookOpen className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-3">Code Templates</h3>
                    <p className="text-gray-300 mb-4">Ready-to-use code templates and boilerplates to jumpstart your projects.</p>
                    <Link href="/resources?type=template">
                      <span className="text-purple-accent hover:text-purple-primary transition-colors font-medium cursor-pointer">
                        Get Templates →
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="glass-card p-6 rounded-2xl">
                <img
                  src="https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=300"
                  alt="Clean modern workspace with laptop displaying code editor"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold gradient-text mb-2">1000+</div>
                  <div className="text-sm text-gray-300">Articles</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold gradient-text mb-2">250+</div>
                  <div className="text-sm text-gray-300">Tools</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold gradient-text mb-2">150+</div>
                  <div className="text-sm text-gray-300">Templates</div>
                </div>
                <div className="glass-card p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold gradient-text mb-2">50+</div>
                  <div className="text-sm text-gray-300">Guides</div>
                </div>
              </div>
            </div>
          </div>

          {resourcesLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                  <div className="w-full h-48 bg-gray-700 rounded-xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                    <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredResources?.slice(0, 3).map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Community Section */}
      <section className="py-24 stars-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join Our <span className="gradient-text">Community</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with fellow developers, share knowledge, and collaborate on exciting projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300 bounce-hover">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Discussion Forums</h3>
              <p className="text-gray-300 mb-6">Engage in technical discussions and share expertise with thousands of developers.</p>
              <div className="text-sm text-purple-accent font-medium">25k+ Active Members</div>
            </Card>

            <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300 bounce-hover">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Project Collaboration</h3>
              <p className="text-gray-300 mb-6">Find teammates for hackathons and open-source projects.</p>
              <div className="text-sm text-purple-accent font-medium">500+ Active Projects</div>
            </Card>

            <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300 bounce-hover md:col-span-2 lg:col-span-1">
              <div className="purple-gradient w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-4">Mentorship Program</h3>
              <p className="text-gray-300 mb-6">Connect with industry experts who can guide your learning journey.</p>
              <div className="text-sm text-purple-accent font-medium">200+ Mentors Available</div>
            </Card>
          </div>

          <div className="text-center">
            <Link href="/community">
              <Button className="purple-gradient px-8 py-4 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 glow-effect">
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-dark-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold">
                  About <span className="gradient-text">Code Illusionists</span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  We're building the future of tech education by curating premium content and fostering a community of passionate developers, creators, and innovators.
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Our platform combines the depth of technical content with a modern, creator-focused approach. We believe in making high-quality education accessible while maintaining the highest standards.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <Card className="glass-card p-6 bounce-hover">
                  <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
                  <div className="text-gray-300">Active Learners</div>
                </Card>
                <Card className="glass-card p-6 bounce-hover">
                  <div className="text-3xl font-bold gradient-text mb-2">95%</div>
                  <div className="text-gray-300">Success Rate</div>
                </Card>
              </div>

              <Link href="/about">
                <Button className="purple-gradient px-8 py-4 text-white font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300 glow-effect">
                  <Info className="w-5 h-5 mr-2" />
                  Learn More About Us
                </Button>
              </Link>
            </div>

            <div className="space-y-6">
              <Card className="glass-card p-6 floating-animation">
                <img
                  src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400"
                  alt="Futuristic AI visualization with neural network patterns"
                  className="w-full h-64 object-cover rounded-xl"
                />
              </Card>

              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-card p-4 bounce-hover floating-animation" style={{animationDelay: '1s'}}>
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                    alt="Professional developer working on multiple monitors"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </Card>
                <Card className="glass-card p-4 bounce-hover floating-animation" style={{animationDelay: '2s'}}>
                  <img
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
                    alt="Digital security and cybersecurity concept"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access to Resource Types */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Explore by <span className="gradient-text">Resource Type</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Find exactly what you need with our categorized resource collections
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/articles">
              <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300 cursor-pointer bounce-hover glow-effect">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="text-blue-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-accent transition-colors">Explore Articles</h3>
                <p className="text-gray-300 mb-6">In-depth tutorials, guides, and technical insights from industry experts.</p>
                <div className="text-sm text-blue-accent font-medium">1000+ Articles</div>
              </Card>
            </Link>

            <Link href="/tools">
              <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300 cursor-pointer bounce-hover glow-effect">
                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Wrench className="text-green-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-green-accent transition-colors">Browse Tools</h3>
                <p className="text-gray-300 mb-6">Essential development tools, libraries, and utilities for modern workflows.</p>
                <div className="text-sm text-green-accent font-medium">250+ Tools</div>
              </Card>
            </Link>

            <Link href="/templates">
              <Card className="glass-card p-8 text-center group hover:bg-white/10 transition-all duration-300 cursor-pointer bounce-hover glow-effect">
                <div className="bg-orange-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="text-orange-400 w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-orange-accent transition-colors">Get Templates</h3>
                <p className="text-gray-300 mb-6">Production-ready templates and boilerplates to jumpstart your projects.</p>
                <div className="text-sm text-orange-accent font-medium">150+ Templates</div>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
