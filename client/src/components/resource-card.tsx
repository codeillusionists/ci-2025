import { ExternalLink, FileText, Code, Wrench } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Resource } from "@shared/schema";
import { getCategoryColor } from "@/lib/utils";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
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
    <Card className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group">
      {resource.imageUrl && (
        <img
          src={resource.imageUrl}
          alt={resource.title}
          className="w-full h-48 object-cover rounded-xl mb-6"
        />
      )}
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Badge className={getTypeColor(resource.type)}>
            {getTypeIcon(resource.type)}
            <span className="ml-1 capitalize">{resource.type}</span>
          </Badge>
          <Badge className={getCategoryColor(resource.category)}>
            {resource.category}
          </Badge>
        </div>
        
        <h3 className="text-xl font-bold text-white group-hover:text-purple-accent transition-colors">
          {resource.title}
        </h3>
        
        <p className="text-gray-300 text-sm leading-relaxed">
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
              className="text-white hover:text-purple-accent"
              onClick={() => window.open(resource.url, '_blank')}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
