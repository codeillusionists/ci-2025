import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Code, Search, Download, Github, Eye, Zap, Layers, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Resource } from "@shared/schema";
import { getCategoryColor } from "@/lib/utils";

export default function Templates() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: templates, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources", { type: "template", category: selectedCategory, q: searchQuery }],
    queryFn: () => {
      const params = new URLSearchParams();
      params.append('type', 'template');
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('q', searchQuery);
      
      return fetch(`/api/resources${searchQuery ? '/search' : ''}?${params.toString()}`).then(res => res.json());
    },
  });

  const categories = [
    "All Categories",
    "Web Development",
    "Mobile Apps",
    "Desktop Apps",
    "API & Backend",
    "Machine Learning",
    "DevOps"
  ];

  const templateTypes = [
    { 
      icon: Layers, 
      name: "Full Stack", 
      description: "Complete application templates",
      count: "25+ templates",
      color: "bg-purple-500/20 text-purple-400"
    },
    { 
      icon: Palette, 
      name: "UI Components", 
      description: "Reusable component libraries",
      count: "40+ templates",
      color: "bg-pink-500/20 text-pink-400"
    },
    { 
      icon: Zap, 
      name: "Starter Kits", 
      description: "Project boilerplates",
      count: "30+ templates",
      color: "bg-yellow-500/20 text-yellow-400"
    }
  ];

  return (
    <div className="min-h-screen pt-20 stars-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500/20 rounded-full mb-6 bounce-hover">
            <Code className="w-8 h-8 text-orange-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Get <span className="gradient-text">Templates</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Jumpstart your projects with production-ready templates, boilerplates, and starter kits
          </p>
        </div>

        {/* Template Types */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Template Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {templateTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <Card key={index} className="glass-card p-6 text-center group hover:bg-white/10 transition-all duration-300 bounce-hover glow-effect cursor-pointer">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 ${type.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{type.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">{type.description}</p>
                  <Badge className={type.color}>{type.count}</Badge>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">150+</div>
            <div className="text-gray-300">Templates</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">20+</div>
            <div className="text-gray-300">Frameworks</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">50K+</div>
            <div className="text-gray-300">Downloads</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">MIT</div>
            <div className="text-gray-300">License</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-card border-white/10 text-white placeholder-gray-400 focus:border-orange-accent"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="glass-card border-white/10 text-white w-full sm:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category === "All Categories" ? "all" : category}
                      className="text-white hover:bg-orange-primary/20"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 bounce-hover">
                <Zap className="w-4 h-4 mr-2" />
                Featured
              </Button>
              <Button className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 bounce-hover">
                Recent
              </Button>
            </div>
          </div>
        </Card>

        {/* Templates Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="glass-card p-6 rounded-2xl animate-pulse">
                <div className="w-full h-48 bg-gray-700 rounded-xl mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {templates?.map((template) => (
              <Card key={template.id} className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer bounce-hover glow-effect">
                {template.imageUrl && (
                  <img
                    src={template.imageUrl}
                    alt={template.title}
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge className="bg-orange-500/20 text-orange-400">
                      Template
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-accent transition-colors">
                    {template.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-orange-accent hover:text-orange-primary"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Preview
                      </Button>
                      {template.url && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-orange-accent hover:text-orange-primary"
                          onClick={() => template.url && window.open(template.url, '_blank')}
                        >
                          <Github className="w-4 h-4 mr-1" />
                          Code
                        </Button>
                      )}
                    </div>
                    <Button 
                      className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30"
                      size="sm"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Get
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {templates && templates.length === 0 && (
          <div className="text-center py-16">
            <Card className="glass-card p-12 rounded-2xl max-w-md mx-auto">
              <Code className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No templates found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or browse all templates.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 mt-4"
              >
                Clear Filters
              </Button>
            </Card>
          </div>
        )}

        {/* Popular Technologies */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Technologies</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Next.js", "Vue.js", "Node.js", "TypeScript", "Tailwind CSS", "Express", "MongoDB"].map((tech) => (
              <Button
                key={tech}
                variant="outline"
                className="glass-card border-orange-accent/30 text-orange-accent hover:bg-orange-accent/10 bounce-hover"
                onClick={() => setSearchQuery(tech)}
              >
                {tech}
              </Button>
            ))}
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-16">
          <Card className="glass-card p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-4">How to Use Templates</h2>
              <p className="text-gray-300">Get started with any template in minutes</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-orange-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-400 font-bold">1</span>
                </div>
                <h3 className="font-semibold mb-2">Choose Template</h3>
                <p className="text-gray-400 text-sm">Browse and select the perfect template for your project</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-400 font-bold">2</span>
                </div>
                <h3 className="font-semibold mb-2">Download & Setup</h3>
                <p className="text-gray-400 text-sm">Clone the repository and install dependencies</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-orange-400 font-bold">3</span>
                </div>
                <h3 className="font-semibold mb-2">Customize & Deploy</h3>
                <p className="text-gray-400 text-sm">Modify the template and deploy your application</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}