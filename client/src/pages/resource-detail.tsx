import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { ExternalLink, Download, FileText, Code, Wrench, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Resource } from "@shared/schema";
import { getCategoryColor } from "@/lib/utils";

export default function ResourceDetail() {
  const [match, params] = useRoute("/resources/:id");
  const resourceId = params?.id ? parseInt(params.id) : 0;

  const { data: resource, isLoading, error } = useQuery<Resource>({
    queryKey: ["/api/resources", resourceId],
    queryFn: () => fetch(`/api/resources/${resourceId}`).then(res => res.json()),
    enabled: !!resourceId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="h-12 bg-gray-700 rounded w-2/3 mb-8"></div>
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-64 bg-gray-700 rounded-xl mb-6"></div>
                <div className="space-y-4">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
              <div className="h-96 bg-gray-700 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Resource not found</h1>
          <p className="text-gray-400">The resource you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-5 h-5" />;
      case "tool":
        return <Wrench className="w-5 h-5" />;
      case "template":
        return <Code className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "article":
        return "bg-blue-500/20 text-blue-400";
      case "tool":
        return "bg-green-500/20 text-green-400";
      case "template":
        return "bg-orange-500/20 text-orange-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <span>Resources</span>
          <span className="mx-2">/</span>
          <Badge className={getTypeColor(resource.type)}>
            {getTypeIcon(resource.type)}
            <span className="ml-1 capitalize">{resource.type}</span>
          </Badge>
          <span className="mx-2">/</span>
          <span className="text-white">{resource.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge className={getTypeColor(resource.type)}>
                  {getTypeIcon(resource.type)}
                  <span className="ml-1 capitalize">{resource.type}</span>
                </Badge>
                <Badge className={getCategoryColor(resource.category)}>
                  {resource.category}
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{resource.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{resource.description}</p>
            </div>

            {/* Resource Image */}
            {resource.imageUrl && (
              <div className="glass-card p-6 rounded-2xl">
                <img
                  src={resource.imageUrl}
                  alt={resource.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-xl"
                />
              </div>
            )}

            {/* Resource Content */}
            {resource.content && (
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">About This Resource</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {resource.content}
                  </p>
                </div>
              </Card>
            )}

            {/* Features/Benefits */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">
                {resource.type === 'tool' ? 'Features' : 
                 resource.type === 'template' ? 'What\'s Included' : 'Key Points'}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {(resource.type === 'tool' ? [
                  "Easy to use interface",
                  "Regular updates and maintenance",
                  "Comprehensive documentation",
                  "Community support",
                  "Open source and free",
                  "Cross-platform compatibility"
                ] : resource.type === 'template' ? [
                  "Clean, modern code structure",
                  "Best practices implementation",
                  "Comprehensive documentation",
                  "Ready-to-use components",
                  "Customizable and extensible",
                  "Production-ready setup"
                ] : [
                  "Step-by-step instructions",
                  "Real-world examples",
                  "Best practices included",
                  "Beginner-friendly approach",
                  "Industry insights",
                  "Practical applications"
                ]).map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-purple-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Card */}
            <Card className="glass-card p-8 sticky top-24">
              <div className="space-y-4 mb-6">
                {resource.url && (
                  <Button 
                    className="purple-gradient w-full py-3 text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300"
                    onClick={() => resource.url && window.open(resource.url, '_blank')}
                  >
                    <ExternalLink className="w-5 h-5 mr-2" />
                    {resource.type === 'tool' ? 'Use Tool' : 
                     resource.type === 'template' ? 'Get Template' : 'Read Article'}
                  </Button>
                )}
                <Button variant="outline" className="w-full border-purple-accent text-purple-accent hover:bg-purple-accent/10">
                  <Download className="w-5 h-5 mr-2" />
                  Save Resource
                </Button>
                <Button variant="outline" className="w-full border-purple-accent text-purple-accent hover:bg-purple-accent/10">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </Button>
              </div>

              <Separator className="bg-white/10 mb-6" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white capitalize">{resource.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{resource.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status:</span>
                  <span className="text-green-400">Available</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Updated:</span>
                  <span className="text-white">Recently</span>
                </div>
              </div>
            </Card>

            {/* Related Resources */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Related Resources</h3>
              <div className="space-y-3 text-sm">
                <div className="p-3 glass-card rounded-lg">
                  <div className="font-medium text-white mb-1">Similar Tool</div>
                  <div className="text-gray-400">Alternative development tool</div>
                </div>
                <div className="p-3 glass-card rounded-lg">
                  <div className="font-medium text-white mb-1">Documentation</div>
                  <div className="text-gray-400">Complete usage guide</div>
                </div>
                <div className="p-3 glass-card rounded-lg">
                  <div className="font-medium text-white mb-1">Tutorial</div>
                  <div className="text-gray-400">Step-by-step tutorial</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
