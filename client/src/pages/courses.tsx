import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CourseCard from "@/components/course-card";
import { Course } from "@shared/schema";

export default function Courses() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialSearch = urlParams.get('search') || '';
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: courses, isLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses/search", { q: searchQuery, category: selectedCategory }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory && selectedCategory !== 'all') params.append('category', selectedCategory);
      
      return fetch(`/api/courses/search?${params.toString()}`).then(res => res.json());
    },
  });

  const categories = [
    "All Categories",
    "AI & ML",
    "Web Development", 
    "Cybersecurity",
    "Data Science",
    "Cloud Computing"
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Explore <span className="gradient-text">Courses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl">
            Discover world-class courses designed by industry experts to help you master the latest technologies
          </p>
        </div>

        {/* Filters */}
        <div className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <Input
                placeholder="Search courses..."
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
            
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'purple-gradient' : 'glass-card text-white hover:bg-purple-primary/20'}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'purple-gradient' : 'glass-card text-white hover:bg-purple-primary/20'}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {[...Array(6)].map((_, i) => (
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
        ) : courses?.length === 0 ? (
          <div className="text-center py-16">
            <div className="glass-card p-12 rounded-2xl max-w-md mx-auto">
              <Filter className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No courses found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or browse all courses.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="purple-gradient mt-4"
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8" : "space-y-6"}>
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}

        {/* Results Count */}
        {courses && courses.length > 0 && (
          <div className="mt-8 text-center text-gray-400">
            Showing {courses.length} course{courses.length !== 1 ? 's' : ''}
            {searchQuery && ` for "${searchQuery}"`}
            {selectedCategory && ` in ${selectedCategory}`}
          </div>
        )}
      </div>
    </div>
  );
}
