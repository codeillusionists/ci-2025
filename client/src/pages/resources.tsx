import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Filter, FileText, Wrench, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ResourceCard from "@/components/resource-card";
import { Resource } from "@shared/schema";

export default function Resources() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialType = urlParams.get('type') || 'all';
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedType, setSelectedType] = useState(initialType);

  const { data: resources, isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources", { type: selectedType === 'all' ? '' : selectedType, category: selectedCategory, q: searchQuery }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedType !== 'all') params.append('type', selectedType);
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      if (searchQuery) params.append('q', searchQuery);
      
      return fetch(`/api/resources${searchQuery ? '/search' : ''}?${params.toString()}`).then(res => res.json());
    },
  });

  const categories = [
    "All Categories",
    "Web Development",
    "AI & ML", 
    "Cybersecurity",
    "Data Science",
    "Cloud Computing"
  ];

  const types = [
    { value: 'all', label: 'All Types', icon: Filter },
    { value: 'article', label: 'Articles', icon: FileText },
    { value: 'tool', label: 'Tools', icon: Wrench },
    { value: 'template', label: 'Templates', icon: Code }
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Premium <span className="gradient-text">Resources</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Access curated articles, tools, and templates to accelerate your development journey
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-card border-white/10 text-white placeholder-gray-400 focus:border-purple-accent"
              />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="glass-card border-white/10 text-white w-full sm:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent className="glass-card border-white/10">
                  {categories.map((category) => (
                    <SelectItem 
                      key={category} 
                      value={category === "All Categories" ? "all" : category}
                      className="text-white hover:bg-purple-primary/20"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Type Tabs */}
        <Tabs value={selectedType} onValueChange={setSelectedType} className="mb-8">
          <TabsList className="glass-card p-1 bg-transparent border border-white/10">
            {types.map((type) => {
              const Icon = type.icon;
              return (
                <TabsTrigger 
                  key={type.value} 
                  value={type.value}
                  className="flex items-center space-x-2 data-[state=active]:bg-purple-primary/20 data-[state=active]:text-purple-accent"
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {types.map((type) => (
            <TabsContent key={type.value} value={type.value}>
              {/* Results */}
              {isLoading ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
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
              ) : resources?.length === 0 ? (
                <div className="text-center py-16">
                  <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
                    <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">No resources found</h3>
                    <p className="text-gray-400">Try adjusting your search criteria or browse all resources.</p>
                    <Button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('');
                        setSelectedType('all');
                      }}
                      className="purple-gradient mt-4"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {resources?.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        {/* Results Count */}
        {resources && resources.length > 0 && (
          <div className="mt-8 text-center text-gray-400">
            Showing {resources.length} resource{resources.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedType !== 'all' && ` in ${types.find(t => t.value === selectedType)?.label}`}
            {selectedCategory && ` - ${selectedCategory}`}
          </div>
        )}
      </div>
    </div>
  );
}
