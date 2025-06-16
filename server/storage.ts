import { users, courses, resources, articles, tools, type User, type InsertUser, type Course, type InsertCourse, type Resource, type InsertResource, type Article, type InsertArticle, type Tool, type InsertTool } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  getFeaturedCourses(): Promise<Course[]>;
  getCoursesByCategory(category: string): Promise<Course[]>;
  searchCourses(query: string): Promise<Course[]>;
  
  getResources(): Promise<Resource[]>;
  getResource(id: number): Promise<Resource | undefined>;
  getFeaturedResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  getResourcesByCategory(category: string): Promise<Resource[]>;
  searchResources(query: string): Promise<Resource[]>;
  
  getArticles(): Promise<Article[]>;
  getArticle(id: number): Promise<Article | undefined>;
  getFeaturedArticles(): Promise<Article[]>;
  getArticlesByCategory(category: string): Promise<Article[]>;
  searchArticles(query: string): Promise<Article[]>;
  
  getTools(): Promise<Tool[]>;
  getTool(id: number): Promise<Tool | undefined>;
  getToolsByCategory(category: string): Promise<Tool[]>;
  searchTools(query: string): Promise<Tool[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private resources: Map<number, Resource>;
  private articles: Map<number, Article>;
  private tools: Map<number, Tool>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentResourceId: number;
  private currentArticleId: number;
  private currentToolId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.resources = new Map();
    this.articles = new Map();
    this.tools = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentResourceId = 1;
    this.currentArticleId = 1;
    this.currentToolId = 1;

    this.initializeData();
  }

  private initializeData() {
    // Initialize sample courses
    const sampleCourses: Course[] = [
      {
        id: this.currentCourseId++,
        title: "Complete AI & Machine Learning Mastery",
        description: "Master AI fundamentals, neural networks, and practical machine learning implementations with real-world projects.",
        imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "AI & ML",
        price: 299,
        originalPrice: 599,
        duration: "42 hours",
        students: 15200,
        rating: "4.9",
        instructor: "Dr. Sarah Chen",
        featured: true,
        content: "Comprehensive AI and ML course covering neural networks, deep learning, computer vision, and natural language processing."
      },
      {
        id: this.currentCourseId++,
        title: "Ethical Hacking & Penetration Testing",
        description: "Learn ethical hacking techniques, vulnerability assessment, and penetration testing methodologies.",
        imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Cybersecurity",
        price: 249,
        originalPrice: 499,
        duration: "38 hours",
        students: 12800,
        rating: "4.8",
        instructor: "Michael Rodriguez",
        featured: true,
        content: "Complete ethical hacking course covering penetration testing, vulnerability assessment, and security auditing."
      },
      {
        id: this.currentCourseId++,
        title: "Full-Stack Web Development Bootcamp",
        description: "Complete web development course covering React, Node.js, databases, and modern deployment strategies.",
        imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        category: "Web Development",
        price: 399,
        originalPrice: 799,
        duration: "56 hours",
        students: 22100,
        rating: "4.9",
        instructor: "Alex Johnson",
        featured: true,
        content: "Complete full-stack development course covering frontend and backend technologies, databases, and deployment."
      }
    ];

    // Initialize sample articles
    const sampleArticles: Article[] = [
      {
        id: this.currentArticleId++,
        title: "Advanced React Patterns for Scalable Applications",
        description: "Learn advanced React patterns including render props, higher-order components, and custom hooks for building scalable applications.",
        content: "Detailed article content about advanced React patterns...",
        author: "Emma Davis",
        category: "Web Development",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: "8 min read",
        featured: true
      },
      {
        id: this.currentArticleId++,
        title: "Machine Learning Model Deployment Strategies",
        description: "Comprehensive guide to deploying ML models in production environments using various cloud platforms and containerization.",
        content: "Detailed article content about ML model deployment...",
        author: "Dr. James Wilson",
        category: "AI & ML",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        readTime: "12 min read",
        featured: true
      }
    ];

    // Initialize sample tools
    const sampleTools: Tool[] = [
      {
        id: this.currentToolId++,
        name: "VS Code Extension Pack",
        description: "Essential VS Code extensions for modern web development including React, TypeScript, and debugging tools.",
        category: "Development Tools",
        url: "https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next",
        imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.8",
        free: true
      },
      {
        id: this.currentToolId++,
        name: "Cybersecurity Toolkit",
        description: "Collection of essential cybersecurity tools for penetration testing and vulnerability assessment.",
        category: "Security Tools",
        url: "https://www.kali.org/",
        imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
        rating: "4.9",
        free: true
      }
    ];

    // Initialize sample resources
    const sampleResources: Resource[] = [
      {
        id: this.currentResourceId++,
        title: "React Component Library Template",
        description: "Ready-to-use React component library template with TypeScript, Storybook, and testing setup.",
        type: "template",
        category: "Web Development",
        imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        url: "https://github.com/template/react-component-library",
        content: "Complete template for building React component libraries...",
        featured: true
      },
      {
        id: this.currentResourceId++,
        title: "AI Model Training Guide",
        description: "Comprehensive documentation for training and fine-tuning AI models using modern frameworks.",
        type: "article",
        category: "AI & ML",
        imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400",
        url: null,
        content: "Detailed guide on AI model training best practices...",
        featured: true
      }
    ];

    // Store all data
    sampleCourses.forEach(course => this.courses.set(course.id, course));
    sampleArticles.forEach(article => this.articles.set(article.id, article));
    sampleTools.forEach(tool => this.tools.set(tool.id, tool));
    sampleResources.forEach(resource => this.resources.set(resource.id, resource));
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Course methods
  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async getFeaturedCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.featured);
  }

  async getCoursesByCategory(category: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => 
      course.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async searchCourses(query: string): Promise<Course[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.courses.values()).filter(course =>
      course.title.toLowerCase().includes(lowerQuery) ||
      course.description.toLowerCase().includes(lowerQuery) ||
      course.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Resource methods
  async getResources(): Promise<Resource[]> {
    return Array.from(this.resources.values());
  }

  async getResource(id: number): Promise<Resource | undefined> {
    return this.resources.get(id);
  }

  async getFeaturedResources(): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.featured);
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => resource.type === type);
  }

  async getResourcesByCategory(category: string): Promise<Resource[]> {
    return Array.from(this.resources.values()).filter(resource => 
      resource.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async searchResources(query: string): Promise<Resource[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.resources.values()).filter(resource =>
      resource.title.toLowerCase().includes(lowerQuery) ||
      resource.description.toLowerCase().includes(lowerQuery) ||
      resource.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Article methods
  async getArticles(): Promise<Article[]> {
    return Array.from(this.articles.values());
  }

  async getArticle(id: number): Promise<Article | undefined> {
    return this.articles.get(id);
  }

  async getFeaturedArticles(): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => article.featured);
  }

  async getArticlesByCategory(category: string): Promise<Article[]> {
    return Array.from(this.articles.values()).filter(article => 
      article.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async searchArticles(query: string): Promise<Article[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.articles.values()).filter(article =>
      article.title.toLowerCase().includes(lowerQuery) ||
      article.description.toLowerCase().includes(lowerQuery) ||
      article.category.toLowerCase().includes(lowerQuery)
    );
  }

  // Tool methods
  async getTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }

  async getTool(id: number): Promise<Tool | undefined> {
    return this.tools.get(id);
  }

  async getToolsByCategory(category: string): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => 
      tool.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async searchTools(query: string): Promise<Tool[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tools.values()).filter(tool =>
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.category.toLowerCase().includes(lowerQuery)
    );
  }
}

export const storage = new MemStorage();
