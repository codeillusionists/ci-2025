import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, Download, Plus, Trash2, Save, FileText, Book } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function AdminCSV() {
  const [csvData, setCsvData] = useState("");
  const [dataType, setDataType] = useState<"courses" | "resources">("courses");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Sample CSV templates
  const courseTemplate = `title,description,imageUrl,category,price,originalPrice,duration,students,rating,instructor,featured,content
"Complete AI & Machine Learning Mastery","Master AI fundamentals and practical implementations","https://images.unsplash.com/photo-1677442136019-21780ecad995","AI & ML",299,599,"42 hours",15200,4.9,"Dr. Sarah Chen",true,"Comprehensive AI and ML course"`;

  const resourceTemplate = `title,description,type,category,imageUrl,url,content,featured
"React Component Library Template","Ready-to-use React component library template","template","Web Development","https://images.unsplash.com/photo-1555066931-4365d14bab8c","https://github.com/template/react-component-library","Complete template for building React component libraries",true`;

  const uploadMutation = useMutation({
    mutationFn: async (data: { type: string; csvData: string }) => {
      return apiRequest(`/api/admin/upload-csv`, {
        method: "POST",
        body: JSON.stringify(data),
      });
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: `${dataType} data uploaded successfully`,
      });
      queryClient.invalidateQueries({ queryKey: [`/api/${dataType}`] });
      setCsvData("");
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to upload data",
        variant: "destructive",
      });
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCsvData(content);
      };
      reader.readAsText(file);
    } else {
      toast({
        title: "Error",
        description: "Please select a valid CSV file",
        variant: "destructive",
      });
    }
  };

  const downloadTemplate = () => {
    const template = dataType === "courses" ? courseTemplate : resourceTemplate;
    const blob = new Blob([template], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${dataType}-template.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const handleSubmit = () => {
    if (!csvData.trim()) {
      toast({
        title: "Error",
        description: "Please provide CSV data",
        variant: "destructive",
      });
      return;
    }

    uploadMutation.mutate({
      type: dataType,
      csvData: csvData.trim(),
    });
  };

  return (
    <div className="min-h-screen pt-20 stars-bg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/20 rounded-full mb-6 bounce-hover">
            <FileText className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            CSV Data <span className="gradient-text">Management</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Upload and manage courses and resources data through CSV files
          </p>
        </div>

        <Tabs value={dataType} onValueChange={(value) => setDataType(value as "courses" | "resources")} className="w-full">
          <TabsList className="glass-card p-1 bg-transparent border border-white/10 mb-8">
            <TabsTrigger 
              value="courses" 
              className="flex items-center space-x-2 data-[state=active]:bg-purple-primary/20 data-[state=active]:text-purple-accent"
            >
              <Book className="w-4 h-4" />
              <span>Courses</span>
            </TabsTrigger>
            <TabsTrigger 
              value="resources" 
              className="flex items-center space-x-2 data-[state=active]:bg-purple-primary/20 data-[state=active]:text-purple-accent"
            >
              <FileText className="w-4 h-4" />
              <span>Resources</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="courses">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-2 text-purple-accent" />
                  Upload Courses Data
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="csv-file" className="text-white mb-2 block">
                      Upload CSV File
                    </Label>
                    <Input
                      id="csv-file"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="glass-card border-white/10 text-white file:bg-purple-500/20 file:text-purple-400 file:border-0"
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-gray-400">OR</span>
                  </div>

                  <div>
                    <Label htmlFor="csv-data" className="text-white mb-2 block">
                      Paste CSV Data
                    </Label>
                    <Textarea
                      id="csv-data"
                      placeholder="Paste your CSV data here..."
                      value={csvData}
                      onChange={(e) => setCsvData(e.target.value)}
                      className="glass-card border-white/10 text-white placeholder-gray-400 min-h-[200px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={downloadTemplate}
                      variant="outline"
                      className="glass-card border-purple-accent/30 text-purple-accent hover:bg-purple-accent/10 flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={uploadMutation.isPending}
                      className="purple-gradient flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {uploadMutation.isPending ? "Uploading..." : "Upload Data"}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Instructions */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 text-purple-accent">CSV Format for Courses</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <Badge className="bg-purple-500/20 text-purple-400 mb-2">Required Fields</Badge>
                    <ul className="space-y-1 text-gray-300 ml-4">
                      <li>• title (string)</li>
                      <li>• description (string)</li>
                      <li>• imageUrl (URL)</li>
                      <li>• category (string)</li>
                      <li>• price (number)</li>
                      <li>• duration (string)</li>
                      <li>• instructor (string)</li>
                      <li>• content (string)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <Badge className="bg-gray-500/20 text-gray-400 mb-2">Optional Fields</Badge>
                    <ul className="space-y-1 text-gray-300 ml-4">
                      <li>• originalPrice (number)</li>
                      <li>• students (number, default: 0)</li>
                      <li>• rating (string, default: "4.5")</li>
                      <li>• featured (boolean, default: false)</li>
                    </ul>
                  </div>

                  <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-400 mb-2">Important Notes:</h4>
                    <ul className="space-y-1 text-gray-300 text-xs">
                      <li>• Use double quotes for text fields containing commas</li>
                      <li>• Boolean values should be true/false</li>
                      <li>• Image URLs should be valid and accessible</li>
                      <li>• Categories: "AI & ML", "Web Development", "Cybersecurity", etc.</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Upload Section */}
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Upload className="w-6 h-6 mr-2 text-purple-accent" />
                  Upload Resources Data
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="csv-file-resources" className="text-white mb-2 block">
                      Upload CSV File
                    </Label>
                    <Input
                      id="csv-file-resources"
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      className="glass-card border-white/10 text-white file:bg-purple-500/20 file:text-purple-400 file:border-0"
                    />
                  </div>

                  <div className="text-center">
                    <span className="text-gray-400">OR</span>
                  </div>

                  <div>
                    <Label htmlFor="csv-data-resources" className="text-white mb-2 block">
                      Paste CSV Data
                    </Label>
                    <Textarea
                      id="csv-data-resources"
                      placeholder="Paste your CSV data here..."
                      value={csvData}
                      onChange={(e) => setCsvData(e.target.value)}
                      className="glass-card border-white/10 text-white placeholder-gray-400 min-h-[200px]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={downloadTemplate}
                      variant="outline"
                      className="glass-card border-purple-accent/30 text-purple-accent hover:bg-purple-accent/10 flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Template
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={uploadMutation.isPending}
                      className="purple-gradient flex-1"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {uploadMutation.isPending ? "Uploading..." : "Upload Data"}
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Instructions */}
              <Card className="glass-card p-8">
                <h3 className="text-xl font-bold mb-4 text-purple-accent">CSV Format for Resources</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <Badge className="bg-purple-500/20 text-purple-400 mb-2">Required Fields</Badge>
                    <ul className="space-y-1 text-gray-300 ml-4">
                      <li>• title (string)</li>
                      <li>• description (string)</li>
                      <li>• type (string)</li>
                      <li>• category (string)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <Badge className="bg-gray-500/20 text-gray-400 mb-2">Optional Fields</Badge>
                    <ul className="space-y-1 text-gray-300 ml-4">
                      <li>• imageUrl (URL)</li>
                      <li>• url (URL)</li>
                      <li>• content (string)</li>
                      <li>• featured (boolean, default: false)</li>
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-400 mb-2">Resource Types:</h4>
                    <ul className="space-y-1 text-gray-300 text-xs">
                      <li>• "article" - Technical articles and tutorials</li>
                      <li>• "tool" - Development tools and utilities</li>
                      <li>• "template" - Code templates and boilerplates</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Recent Activities */}
        <Card className="glass-card p-8 mt-8">
          <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="glass-card border-green-accent/30 text-green-accent hover:bg-green-accent/10 h-auto p-4 flex flex-col items-center gap-2"
            >
              <Plus className="w-6 h-6" />
              <span>Add Single Course</span>
            </Button>
            <Button
              variant="outline"
              className="glass-card border-blue-accent/30 text-blue-accent hover:bg-blue-accent/10 h-auto p-4 flex flex-col items-center gap-2"
            >
              <Plus className="w-6 h-6" />
              <span>Add Single Resource</span>
            </Button>
            <Button
              variant="outline"
              className="glass-card border-red-accent/30 text-red-accent hover:bg-red-accent/10 h-auto p-4 flex flex-col items-center gap-2"
            >
              <Trash2 className="w-6 h-6" />
              <span>Bulk Delete</span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}