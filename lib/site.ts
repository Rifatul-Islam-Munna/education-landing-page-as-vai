import { MongoClient, type Db } from "mongodb";

export type HeroSlide = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

export type FeatureCard = {
  image: string;
  title: string;
  description: string;
  tone: "blue" | "red" | "deep";
};

export type WelcomeFeature = {
  text: string;
};

export type Department = {
  title: string;
  description: string;
};

export type StatItem = {
  value: string;
  label: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type Student = {
  id: string;
  name: string;
  department: string;
  className: string;
  image: string;
};

export type SiteContent = {
  brandName: string;
  brandTagline: string;
  logoMark: string;
  locationLabel: string;
  locationText: string;
  phoneLabel: string;
  phoneText: string;
  applyText: string;
  heroSlides: HeroSlide[];
  featureCards: FeatureCard[];
  welcome: {
    image: string;
    title: string;
    descriptionOne: string;
    descriptionTwo: string;
    features: WelcomeFeature[];
  };
  departments: {
    eyebrow: string;
    title: string;
    items: Department[];
  };
  university: {
    image: string;
    title: string;
    descriptionOne: string;
    descriptionTwo: string;
    descriptionThree: string;
    stats: StatItem[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    items: Testimonial[];
  };
  footer: {
    address: string;
    email: string;
    contactText: string;
    copyright: string;
    facebook: string;
    twitter: string;
    linkedin: string;
    links: FooterLink[];
    services: FooterLink[];
  };
  studentPage: {
    title: string;
    breadcrumb: string;
    searchTitle: string;
    searchPlaceholder: string;
    emptyText: string;
    heroImage: string;
  };
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "education_landing";

let clientPromise: Promise<MongoClient> | null = null;

export const defaultContent: SiteContent = {
  brandName: "SHINRO",
  brandTagline: "Manabi Academy",
  logoMark: "SA",
  locationLabel: "Location",
  locationText: "1010 New York, NY 10018 US",
  phoneLabel: "Phone",
  phoneText: "+880 2456 547",
  applyText: "Apply Now",
  heroSlides: [
    {
      image: "/seed/shinro-reference.jpeg",
      eyebrow: "Japanese Language Academy",
      title: "Learn Japanese, Shape Your Future",
      subtitle:
        "Empowering dreams through quality Japanese language education and cultural understanding.",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      eyebrow: "Study & Work In Japan",
      title: "Your Pathway To Japan Starts Here",
      subtitle:
        "Practical classes, expert mentoring, and guidance for students planning a global future.",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      eyebrow: "JLPT Preparation",
      title: "Build Skill With Confidence",
      subtitle:
        "Focused preparation, modern teaching methods, and a supportive learning environment.",
    },
  ],
  featureCards: [
    {
      image: "/seed/shinro-reference.jpeg",
      title: "About Us",
      description:
        "We provide the best environment for learning Japanese language and culture, helping students build global opportunities.",
      tone: "blue",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      title: "Quality Education",
      description:
        "Interactive classes, experienced teachers, and modern techniques ensure effective learning.",
      tone: "red",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      title: "Your Pathway To Japan",
      description:
        "From language skills to career opportunities, we help you achieve your dream of studying and working in Japan.",
      tone: "deep",
    },
  ],
  welcome: {
    image: "/seed/shinro-reference.jpeg",
    title: "Welcome To Campus",
    descriptionOne:
      "Build Japanese language confidence through practical classes, cultural guidance, and expert mentoring.",
    descriptionTwo:
      "Our academy supports students from first lesson to study and work opportunities in Japan.",
    features: [
      { text: "Expert Teachers" },
      { text: "Practical Learning" },
      { text: "JLPT Preparation" },
      { text: "Study Support" },
      { text: "Career Guidance" },
      { text: "Culture Training" },
    ],
  },
  departments: {
    eyebrow: "Our Programs",
    title: "Popular Departments",
    items: [
      {
        title: "Japanese Language",
        description: "Structured lessons for beginner to advanced learners.",
      },
      {
        title: "JLPT Preparation",
        description: "Focused exam preparation with mock tests and feedback.",
      },
      {
        title: "Conversation Practice",
        description: "Practical speaking classes for daily and academic use.",
      },
      {
        title: "Study In Japan",
        description: "Guidance for admission, documents, and interview readiness.",
      },
      {
        title: "Work In Japan",
        description: "Language and culture support for career pathways.",
      },
      {
        title: "Cultural Training",
        description: "Learn etiquette, lifestyle, and communication norms.",
      },
    ],
  },
  university: {
    image: "/seed/shinro-reference.jpeg",
    title: "World Best University",
    descriptionOne:
      "Our students prepare with clear goals, strong language foundations, and practical coaching.",
    descriptionTwo:
      "Every class is designed to improve skill, confidence, and readiness for Japan.",
    descriptionThree:
      "From teachers to student support, the experience stays focused on progress.",
    stats: [
      { value: "60", label: "Teachers" },
      { value: "800", label: "Students" },
      { value: "37", label: "Courses" },
      { value: "19", label: "Awards" },
    ],
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Our Student Saying...",
    items: [
      {
        quote:
          "Classes are practical, teachers are supportive, and the full process feels clear.",
        name: "Jhon Smith",
        role: "Student",
      },
      {
        quote:
          "The academy helped me prepare for JLPT and understand study options in Japan.",
        name: "Sarah Khan",
        role: "Student",
      },
      {
        quote:
          "I improved my speaking confidence and learned useful Japanese culture basics.",
        name: "Tanvir Ahmed",
        role: "Student",
      },
    ],
  },
  footer: {
    address: "900 Lucerne Station Road\nTerrace, Orlando, FL 32806, USA",
    email: "contact@shinroacademy.com",
    contactText:
      "Need admission, course, or Japan pathway support? Contact our team anytime.",
    copyright: "Shinro Manabi Academy 2026. All Rights Reserved.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Instructors", href: "#" },
      { label: "Courses", href: "#" },
      { label: "History", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Service Plus", href: "#" },
    ],
    services: [
      { label: "Japanese Language", href: "#" },
      { label: "JLPT Preparation", href: "#" },
      { label: "Graduation", href: "#" },
      { label: "Admission", href: "#" },
      { label: "Study In Japan", href: "#" },
      { label: "Faqs", href: "#" },
    ],
  },
  studentPage: {
    title: "Students List",
    breadcrumb: "Home - Students",
    searchTitle: "Search Student",
    searchPlaceholder: "ID Number",
    emptyText: "No student found for this ID.",
    heroImage: "/seed/shinro-reference.jpeg",
  },
};

export const defaultStudents: Student[] = [
  {
    id: "2501",
    name: "Mohammad MK",
    department: "Science",
    className: "Ten (X)",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2502",
    name: "Sadia Zaman",
    department: "Engineering",
    className: "Ten (X)",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2503",
    name: "Arman Khan",
    department: "Science",
    className: "Ten (X)",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2504",
    name: "Zamanulla",
    department: "Science",
    className: "Ten (X)",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2505",
    name: "Jasicara Khan",
    department: "Science",
    className: "Ten (X)",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2506",
    name: "Azharulla Kubir",
    department: "Science",
    className: "Ten (X)",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2507",
    name: "Nadia Akter",
    department: "Japanese",
    className: "N5",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2508",
    name: "Rafi Hasan",
    department: "JLPT",
    className: "N4",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2509",
    name: "Mim Sultana",
    department: "Language",
    className: "N5",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2510",
    name: "Sakib Rahman",
    department: "Culture",
    className: "N3",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2511",
    name: "Farhan Ahmed",
    department: "Study Japan",
    className: "N4",
    image: "/seed/shinro-reference.jpeg",
  },
  {
    id: "2512",
    name: "Ayesha Noor",
    department: "Career",
    className: "N3",
    image: "/seed/shinro-reference.jpeg",
  },
];

function mergeContent(content?: Partial<SiteContent> | null): SiteContent {
  if (!content) return defaultContent;

  return {
    ...defaultContent,
    ...content,
    heroSlides: defaultContent.heroSlides.map((slide, index) => ({
      ...slide,
      ...(content.heroSlides?.[index] || {}),
    })),
    featureCards: defaultContent.featureCards.map((card, index) => ({
      ...card,
      ...(content.featureCards?.[index] || {}),
    })),
    welcome: {
      ...defaultContent.welcome,
      ...(content.welcome || {}),
      features: defaultContent.welcome.features.map((feature, index) => ({
        ...feature,
        ...(content.welcome?.features?.[index] || {}),
      })),
    },
    departments: {
      ...defaultContent.departments,
      ...(content.departments || {}),
      items: defaultContent.departments.items.map((item, index) => ({
        ...item,
        ...(content.departments?.items?.[index] || {}),
      })),
    },
    university: {
      ...defaultContent.university,
      ...(content.university || {}),
      stats: defaultContent.university.stats.map((stat, index) => ({
        ...stat,
        ...(content.university?.stats?.[index] || {}),
      })),
    },
    testimonials: {
      ...defaultContent.testimonials,
      ...(content.testimonials || {}),
      items: defaultContent.testimonials.items.map((item, index) => ({
        ...item,
        ...(content.testimonials?.items?.[index] || {}),
      })),
    },
    footer: {
      ...defaultContent.footer,
      ...(content.footer || {}),
      links: defaultContent.footer.links.map((link, index) => ({
        ...link,
        ...(content.footer?.links?.[index] || {}),
      })),
      services: defaultContent.footer.services.map((service, index) => ({
        ...service,
        ...(content.footer?.services?.[index] || {}),
      })),
    },
    studentPage: {
      ...defaultContent.studentPage,
      ...(content.studentPage || {}),
    },
  };
}

export async function getDb(): Promise<Db | null> {
  if (!uri) return null;

  clientPromise ??= new MongoClient(uri).connect();
  const client = await clientPromise;
  return client.db(dbName);
}

export async function getAllStudents(): Promise<Student[]> {
  const db = await getDb();
  if (!db) return defaultStudents;

  const students = await db
    .collection<Student>("students")
    .find({})
    .sort({ id: 1 })
    .toArray();

  if (!students.length) return defaultStudents;

  return defaultStudents.map((student, index) => ({
    ...student,
    ...(students[index] || {}),
  }));
}

export async function getStudentsPage({
  page,
  studentId,
  pageSize = 6,
}: {
  page: number;
  studentId?: string;
  pageSize?: number;
}) {
  const all = await getAllStudents();
  const normalized = studentId?.trim();
  const filtered = normalized ? all.filter((student) => student.id === normalized) : all;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    students: filtered.slice(start, start + pageSize),
    totalPages,
    page: safePage,
    total: filtered.length,
  };
}

export async function saveStudents(students: Student[]) {
  const db = await getDb();
  if (!db) throw new Error("MONGODB_URI missing");

  const collection = db.collection<Student>("students");
  await collection.deleteMany({});
  if (students.length) {
    await collection.insertMany(students);
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  const db = await getDb();
  if (!db) return defaultContent;

  const content = await db
    .collection<Partial<SiteContent>>("site_content")
    .findOne({ key: "homepage" } as object);

  return mergeContent(content);
}

export async function saveSiteContent(content: SiteContent) {
  const db = await getDb();
  if (!db) throw new Error("MONGODB_URI missing");

  await db.collection("site_content").updateOne(
    { key: "homepage" },
    {
      $set: {
        ...content,
        updatedAt: new Date(),
      },
      $setOnInsert: { createdAt: new Date() },
    },
    { upsert: true },
  );
}
