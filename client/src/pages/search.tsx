import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Search, Filter, Clock, Users, Star, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Course, Resource, Article } from "@shared/schema";
import { formatPrice, formatStudentCount, getCategoryColor } from "@/lib/utils";

export default function SearchPage() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialQuery = urlParams.get('q') || '';
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery]);

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["/api/search", { q: searchQuery, category: selectedCategory, type: selectedType }],
    queryFn: async () => {
      if (!searchQuery.trim()) return { courses: [], resources: [], articles: [] };
      
      const params = new URLSearchParams();
      params.append('q', searchQuery);
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      
      const [coursesRes, resourcesRes, articlesRes] = await Promise.all([
        fetch(`/api/courses/search?${params.toString()}`).then(res => res.json()),
        fetch(`/api/resources/search?${params.toString()}`).then(res => res.json()),
        fetch(`/api/articles/search?${params.toString()}`).then(res => res.json())
      ]);
      
      return {
        courses: coursesRes || [],
        resources: resourcesRes || [],
        articles: articlesRes || []
      };
    },
    enabled: !!searchQuery.trim(),
  });

  const categories = [
    "All Categories",
    "Web Development",
    "AI & ML", 
    "Cybersecurity",
    "Data Science",
    "Cloud Computing"
  ];

  const totalResults = (searchResults?.courses?.length || 0) + 
                      (searchResults?.resources?.length || 0) + 
                      (searchResults?.articles?.length || 0);

  return (
    <div className="min-h-screen pt-20 stars-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6 bounce-hover">
            <Search className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Search <span className="gradient-text">Results</span>
          </h1>
          {searchQuery && (
            <p className="text-xl text-gray-300">
              Results for "<span className="text-purple-accent">{searchQuery}</span>"
            </p>
          )}
        </div>

        {/* Search Bar */}
        <Card className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search courses, resources, articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 glass-card border-white/10 text-white placeholder-gray-400 focus:border-blue-accent text-lg"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="glass-card border-white/10 text-white w-full lg:w-[200px] h-12">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="glass-card border-white/10">
                {categories.map((category) => (
                  <SelectItem 
                    key={category} 
                    value={category === "All Categories" ? "all" : category}
                    className="text-white hover:bg-blue-primary/20"
                  >
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Results Summary */}
        {searchQuery && (
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="text-gray-300">
                Found <span className="text-white font-semibold">{totalResults}</span> results
                {selectedCategory !== 'all' && (
                  <span> in <span className="text-purple-accent">{selectedCategory}</span></span>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant={selectedType === 'all' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('all')}
                  className={selectedType === 'all' ? 'purple-gradient' : 'glass-card border-white/10 text-white hover:bg-white/10'}
                  size="sm"
                >
                  All ({totalResults})
                </Button>
                <Button
                  variant={selectedType === 'courses' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('courses')}
                  className={selectedType === 'courses' ? 'purple-gradient' : 'glass-card border-white/10 text-white hover:bg-white/10'}
                  size="sm"
                >
                  Courses ({searchResults?.courses?.length || 0})
                </Button>
                <Button
                  variant={selectedType === 'resources' ? 'default' : 'outline'}
                  onClick={() => setSelectedType('resources')}
                  className={selectedType === 'resources' ? 'purple-gradient' : 'glass-card border-white/10 text-white hover:bg-white/10'}
                  size="sm"
                >
                  Resources ({searchResults?.resources?.length || 0})
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
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
        )}

        {/* Search Results */}
        {!isLoading && searchQuery && searchResults && (
          <div className="space-y-12">
            {/* Courses Results */}
            {(selectedType === 'all' || selectedType === 'courses') && searchResults.courses?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-purple-500/20 p-2 rounded-lg mr-3">📚</span>
                  Courses ({searchResults.courses.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.courses.map((course: Course) => (
                    <Link key={course.id} href={`/courses/${course.id}`}>
                      <Card className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer bounce-hover glow-effect">
                        <img
                          src={course.imageUrl}
                          alt={course.title}
                          className="w-full h-48 object-cover rounded-xl mb-6"
                        />
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <Badge className={getCategoryColor(course.category)}>
                              {course.category}
                            </Badge>
                            <div className="flex items-center space-x-1 text-yellow-400">
                              <Star className="w-4 h-4 fill-current" />
                              <span className="text-sm font-medium">{course.rating}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-accent transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                            {course.description}
                          </p>
                          <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            <div className="flex items-center space-x-4 text-sm text-gray-400">
                              <span className="flex items-center">
                                <Clock className="w-4 h-4 mr-1" />
                                {course.duration}
                              </span>
                              <span className="flex items-center">
                                <Users className="w-4 h-4 mr-1" />
                                {formatStudentCount(course.students)}
                              </span>
                            </div>
                            <div className="text-xl font-bold gradient-text">{formatPrice(course.price)}</div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Resources Results */}
            {(selectedType === 'all' || selectedType === 'resources') && searchResults.resources?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="bg-green-500/20 p-2 rounded-lg mr-3">🛠️</span>
                  Resources ({searchResults.resources.length})
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {searchResults.resources.map((resource: Resource) => (
                    <Card key={resource.id} className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer bounce-hover glow-effect">
                      {resource.imageUrl && (
                        <img
                          src={resource.imageUrl}
                          alt={resource.title}
                          className="w-full h-48 object-cover rounded-xl mb-6"
                        />
                      )}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Badge className={getCategoryColor(resource.category)}>
                            {resource.category}
                          </Badge>
                          <Badge className={resource.type === 'tool' ? 'bg-green-500/20 text-green-400' : 
                                         resource.type === 'template' ? 'bg-orange-500/20 text-orange-400' : 
                                         'bg-blue-500/20 text-blue-400'}>
                            {resource.type}
                          </Badge>
                        </div>
                        <h3 className="text-xl font-bold text-white group-hover:text-purple-accent transition-colors">
                          {resource.title}
                        </h3>
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                          <Link href={`/resources/${resource.id}`}>
                            <Button variant="ghost" className="text-purple-accent hover:text-purple-primary">
                              Learn More
                            </Button>
                          </Link>
                          {resource.url && (
                            <Button 
                              variant="ghost" 
                              size="sm"
                              className="text-white hover:text-purple-accent"
                              onClick={() => resource.url && window.open(resource.url, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* No Results */}
        {!isLoading && searchQuery && totalResults === 0 && (
          <div className="text-center py-16">
            <Card className="glass-card p-12 rounded-2xl max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No results found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find anything matching "{searchQuery}". Try different keywords or browse our categories.
              </p>
              <div className="space-y-3">
                <Button 
                  onClick={() => setSearchQuery('')}
                  className="purple-gradient w-full"
                >
                  Clear Search
                </Button>
                <div className="flex gap-2 justify-center">
                  <Link href="/courses">
                    <Button variant="outline" className="glass-card border-purple-accent/30 text-purple-accent hover:bg-purple-accent/10">
                      Browse Courses
                    </Button>
                  </Link>
                  <Link href="/resources">
                    <Button variant="outline" className="glass-card border-purple-accent/30 text-purple-accent hover:bg-purple-accent/10">
                      Browse Resources
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!searchQuery && (
          <div className="text-center py-16">
            <Card className="glass-card p-12 rounded-2xl max-w-md mx-auto">
              <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Start Searching</h3>
              <p className="text-gray-400 mb-6">
                Enter keywords to search across our courses, resources, and articles.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">500+</div>
                  <div className="text-gray-400">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">1000+</div>
                  <div className="text-gray-400">Resources</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}