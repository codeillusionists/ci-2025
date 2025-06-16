import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Wrench, Search, Star, ExternalLink, Download, Zap, Shield, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Tool } from "@shared/schema";
import { getCategoryColor } from "@/lib/utils";

export default function Tools() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: tools, isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools", { category: selectedCategory, q: searchQuery }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('q', searchQuery);
      
      return fetch(`/api/tools${searchQuery ? '/search' : ''}?${params.toString()}`).then(res => res.json());
    },
  });

  const categories = [
    "All Categories",
    "Development Tools",
    "Security Tools",
    "Design Tools",
    "Testing Tools",
    "Deployment Tools"
  ];

  const featuredTools = [
    { icon: Code, name: "VS Code", category: "Development" },
    { icon: Shield, name: "Security Scanner", category: "Security" },
    { icon: Zap, name: "Performance Monitor", category: "Testing" }
  ];

  return (
    <div className="min-h-screen pt-20 stars-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500/20 rounded-full mb-6 bounce-hover">
            <Wrench className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Browse <span className="gradient-text">Tools</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover powerful development tools, libraries, and utilities to supercharge your coding workflow
          </p>
        </div>

        {/* Featured Tools Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Essential Developer Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredTools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <Card key={index} className="glass-card p-6 text-center group hover:bg-white/10 transition-all duration-300 bounce-hover glow-effect">
                  <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{tool.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{tool.category} Tool</p>
                  <Button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 w-full">
                    Explore Tool
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">250+</div>
            <div className="text-gray-300">Tools</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">15+</div>
            <div className="text-gray-300">Categories</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">100K+</div>
            <div className="text-gray-300">Downloads</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">4.8★</div>
            <div className="text-gray-300">Avg Rating</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-card border-white/10 text-white placeholder-gray-400 focus:border-green-accent"
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
                      className="text-white hover:bg-green-primary/20"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 bounce-hover">
                <Star className="w-4 h-4 mr-2" />
                Top Rated
              </Button>
              <Button className="bg-green-500/20 text-green-400 hover:bg-green-500/30 bounce-hover">
                Free Only
              </Button>
            </div>
          </div>
        </Card>

        {/* Tools Grid */}
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
            {tools?.map((tool) => (
              <Card key={tool.id} className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer bounce-hover glow-effect">
                {tool.imageUrl && (
                  <img
                    src={tool.imageUrl}
                    alt={tool.name}
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(tool.category)}>
                      {tool.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-yellow-400">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm">{tool.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-green-accent transition-colors">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {tool.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2">
                      {tool.free ? (
                        <Badge className="bg-green-500/20 text-green-400">Free</Badge>
                      ) : (
                        <Badge className="bg-yellow-500/20 text-yellow-400">Premium</Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-green-accent hover:text-green-primary"
                        onClick={() => window.open(tool.url, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-green-accent hover:text-green-primary"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {tools && tools.length === 0 && (
          <div className="text-center py-16">
            <Card className="glass-card p-12 rounded-2xl max-w-md mx-auto">
              <Wrench className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No tools found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or browse all tools.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="bg-green-500/20 text-green-400 hover:bg-green-500/30 mt-4"
              >
                Clear Filters
              </Button>
            </Card>
          </div>
        )}

        {/* Popular Categories */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Popular Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Code Editors", count: "45+ tools", icon: Code },
              { name: "Testing Tools", count: "30+ tools", icon: Zap },
              { name: "Security Tools", count: "25+ tools", icon: Shield }
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <Card key={index} className="glass-card p-6 text-center group hover:bg-white/10 transition-all duration-300 cursor-pointer bounce-hover">
                  <div className="bg-green-500/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-green-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.count}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}