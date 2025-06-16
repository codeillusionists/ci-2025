import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { FileText, Search, Clock, User, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Article } from "@shared/schema";
import { getCategoryColor } from "@/lib/utils";

export default function Articles() {
  const [location] = useLocation();
  const urlParams = new URLSearchParams(location.split('?')[1] || '');
  const initialCategory = urlParams.get('category') || '';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles", { category: selectedCategory, q: searchQuery }],
    queryFn: () => {
      const params = new URLSearchParams();
      if (selectedCategory) params.append('category', selectedCategory);
      if (searchQuery) params.append('q', searchQuery);
      
      return fetch(`/api/articles${searchQuery ? '/search' : ''}?${params.toString()}`).then(res => res.json());
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

  return (
    <div className="min-h-screen pt-20 stars-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/20 rounded-full mb-6 bounce-hover">
            <FileText className="w-8 h-8 text-blue-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Explore <span className="gradient-text">Articles</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Deep dive into technical articles, tutorials, and guides written by industry experts and experienced developers
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">1000+</div>
            <div className="text-gray-300">Articles</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-300">Authors</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">25K+</div>
            <div className="text-gray-300">Readers</div>
          </Card>
          <Card className="glass-card p-6 text-center bounce-hover">
            <div className="text-3xl font-bold gradient-text mb-2">Daily</div>
            <div className="text-gray-300">Updates</div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="glass-card p-6 rounded-2xl mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 glass-card border-white/10 text-white placeholder-gray-400 focus:border-blue-accent"
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
                      className="text-white hover:bg-blue-primary/20"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 bounce-hover">
              <Zap className="w-4 h-4 mr-2" />
              Featured
            </Button>
          </div>
        </Card>

        {/* Articles Grid */}
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
            {articles?.map((article) => (
              <Card key={article.id} className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer bounce-hover glow-effect">
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-xl mb-6"
                  />
                )}
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge className={getCategoryColor(article.category)}>
                      {article.category}
                    </Badge>
                    <div className="flex items-center space-x-1 text-blue-400">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{article.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-accent transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {article.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <Link href={`/articles/${article.id}`}>
                      <Button variant="ghost" className="text-blue-accent hover:text-blue-primary">
                        Read More
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {articles && articles.length === 0 && (
          <div className="text-center py-16">
            <Card className="glass-card p-12 rounded-2xl max-w-md mx-auto">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">No articles found</h3>
              <p className="text-gray-400">Try adjusting your search criteria or browse all articles.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('');
                }}
                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 mt-4"
              >
                Clear Filters
              </Button>
            </Card>
          </div>
        )}

        {/* Featured Topics */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Trending Topics</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["React 18", "Machine Learning", "Cybersecurity", "TypeScript", "Node.js", "Docker", "AWS", "GraphQL"].map((topic) => (
              <Button
                key={topic}
                variant="outline"
                className="glass-card border-blue-accent/30 text-blue-accent hover:bg-blue-accent/10 bounce-hover"
                onClick={() => setSearchQuery(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}