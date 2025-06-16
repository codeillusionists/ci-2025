import { useQuery } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Clock, Users, Star, Award, Play, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Course } from "@shared/schema";
import { formatPrice, formatStudentCount, getCategoryColor } from "@/lib/utils";

export default function CourseDetail() {
  const [match, params] = useRoute("/courses/:id");
  const courseId = params?.id ? parseInt(params.id) : 0;

  const { data: course, isLoading, error } = useQuery<Course>({
    queryKey: ["/api/courses", courseId],
    queryFn: () => fetch(`/api/courses/${courseId}`).then(res => res.json()),
    enabled: !!courseId,
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

  if (error || !course) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Course not found</h1>
          <p className="text-gray-400">The course you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-400">
          <span>Courses</span>
          <span className="mx-2">/</span>
          <Badge className={getCategoryColor(course.category)}>
            {course.category}
          </Badge>
          <span className="mx-2">/</span>
          <span className="text-white">{course.title}</span>
        </nav>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center space-x-1 text-yellow-400">
                  <Star className="w-5 h-5 fill-current" />
                  <span className="font-medium">{course.rating}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Users className="w-5 h-5" />
                  <span>{formatStudentCount(course.students)} students</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-5 h-5" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Award className="w-5 h-5" />
                  <span>Certificate included</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-6">
                <span className="text-gray-400">Instructor:</span>
                <span className="font-medium text-purple-accent">{course.instructor}</span>
              </div>
            </div>

            {/* Course Image */}
            <div className="glass-card p-6 rounded-2xl">
              <img
                src={course.imageUrl}
                alt={course.title}
                className="w-full h-64 lg:h-80 object-cover rounded-xl"
              />
            </div>

            {/* Course Description */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">About This Course</h2>
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg">
                  {course.content}
                </p>
              </div>
            </Card>

            {/* What You'll Learn */}
            <Card className="glass-card p-8">
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Master fundamental concepts and advanced techniques",
                  "Build real-world projects from scratch",
                  "Industry best practices and methodologies", 
                  "Hands-on experience with latest tools",
                  "Problem-solving and critical thinking skills",
                  "Career-ready skills and certification"
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase Card */}
            <Card className="glass-card p-8 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {formatPrice(course.price)}
                </div>
                {course.originalPrice && (
                  <div className="text-lg text-gray-400 line-through">
                    {formatPrice(course.originalPrice)}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <Button className="purple-gradient w-full py-3 text-lg font-semibold hover:shadow-xl hover:shadow-purple-500/25 transition-all duration-300">
                  <Play className="w-5 h-5 mr-2" />
                  Enroll Now
                </Button>
                <Button variant="outline" className="w-full border-purple-accent text-purple-accent hover:bg-purple-accent/10">
                  <Download className="w-5 h-5 mr-2" />
                  Download Syllabus
                </Button>
              </div>

              <Separator className="bg-white/10 mb-6" />

              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{course.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Students:</span>
                  <span className="text-white">{formatStudentCount(course.students)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Language:</span>
                  <span className="text-white">English</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Certificate:</span>
                  <span className="text-white">Yes</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Access:</span>
                  <span className="text-white">Lifetime</span>
                </div>
              </div>
            </Card>

            {/* Course Features */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Course Features</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Mobile and desktop</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>Certificate of completion</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>24/7 support</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
