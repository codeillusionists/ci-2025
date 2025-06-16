import { Clock, Users, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { Course } from "@shared/schema";
import { formatPrice, formatStudentCount, getCategoryColor } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="glass-card p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 group cursor-pointer">
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
          
          <p className="text-gray-300 text-sm leading-relaxed">
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
                {formatStudentCount(course.students)} students
              </span>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text">{formatPrice(course.price)}</div>
              {course.originalPrice && (
                <div className="text-sm text-gray-400 line-through">{formatPrice(course.originalPrice)}</div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
