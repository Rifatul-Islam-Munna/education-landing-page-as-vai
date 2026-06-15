import { MongoClient, ObjectId, type Db } from "mongodb";

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

export type ChairmanMessage = {
  image: string;
  eyebrow: string;
  title: string;
  message: string;
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

export type Course = {
  image: string;
  price: string;
  title: string;
  description: string;
  students: string;
  comments: string;
  reviews: string;
};

export type ResultRow = {
  courseTitle: string;
  grade: string;
  credits: string;
  term: string;
};

export type ResultRecord = {
  department: string;
  year: string;
  idNumber: string;
  registrationNumber: string;
  rows: ResultRow[];
};

export type Notice = {
  day: string;
  month: string;
  year: string;
  category: string;
  title: string;
  pdf: string;
};

export type SeoEntry = {
  title: string;
  description: string;
  keywords: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonical: string;
  robots: string;
};

export type SeoKey =
  | "home"
  | "about"
  | "courses"
  | "students"
  | "result"
  | "notice"
  | "contact";

export type ContactMessage = {
  _id?: ObjectId | string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt?: Date | string;
};

export type SiteContent = {
  brandName: string;
  brandTagline: string;
  logoMark: string;
  logoImage: string;
  siteIcon: string;
  locationLabel: string;
  locationText: string;
  phoneLabel: string;
  phoneText: string;
  applyText: string;
  applyHref: string;
  heroSlides: HeroSlide[];
  featureCards: FeatureCard[];
  welcome: {
    image: string;
    sliderImages: string[];
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
    videoUrl: string;
    stats: StatItem[];
  };
  chairmanMessage: ChairmanMessage;
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
    instagram: string;
    youtube: string;
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
    videoUrl: string;
  };
  aboutPage: {
    title: string;
    breadcrumb: string;
    heroImage: string;
    chooseTitle: string;
    chooseButtonText: string;
  };
  coursePage: {
    title: string;
    breadcrumb: string;
    intro: string;
    heroImage: string;
    courses: Course[];
  };
  resultPage: {
    title: string;
    breadcrumb: string;
    searchTitle: string;
    intro: string;
    departmentPlaceholder: string;
    yearPlaceholder: string;
    idPlaceholder: string;
    registrationPlaceholder: string;
    buttonText: string;
    resultTitle: string;
    heroImage: string;
    rows: ResultRow[];
    records: ResultRecord[];
  };
  noticePage: {
    title: string;
    breadcrumb: string;
    heroImage: string;
    notices: Notice[];
  };
  contactPage: {
    title: string;
    breadcrumb: string;
    formTitle: string;
    infoTitle: string;
    address: string;
    phone: string;
    email: string;
    mapEmbedUrl: string;
    heroImage: string;
  };
  seo: Record<SeoKey, SeoEntry>;
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || "education_landing";

let clientPromise: Promise<MongoClient> | null = null;

export const defaultContent: SiteContent = {
  brandName: "SHINRO",
  brandTagline: "Manabi Academy",
  logoMark: "SA",
  logoImage: "#",
  siteIcon: "/favicon.ico",
  locationLabel: "Location",
  locationText: "1010 New York, NY 10018 US",
  phoneLabel: "Phone",
  phoneText: "+880 1922-881828",
  applyText: "Apply Now",
  applyHref: "/contact",
  heroSlides: [
    {
      image: "/seed/shinro-reference.jpeg",
      eyebrow: "Japanese Language Academy",
      title: "Your Trusted Pathway to Study in Japan",
      subtitle:
        "Empowering Bangladeshi students through Japanese language education, study abroad guidance, visa support, and complete student assistance in Japan.",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      eyebrow: "Study & Work In Japan",
      title: "Study Abroad Guidance",
      subtitle:
        "Admission support, documentation assistance, visa processing, pre-departure orientation, and post-arrival support.",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      eyebrow: "JLPT Preparation",
      title: "Build Skill With Confidence",
      subtitle:
        "Japanese N5, N4, JLPT, NAT-Test, communication practice, and cultural training for Japan-ready students.",
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
      title: "Student Counseling",
      description:
        "Personalized consultation and educational planning for students who wish to study in Japan.",
      tone: "red",
    },
    {
      image: "/seed/shinro-reference.jpeg",
      title: "Visa & Arrival Support",
      description:
        "Immigration guidance, pre-departure orientation, airport pickup, settlement, and emergency assistance.",
      tone: "deep",
    },
  ],
  welcome: {
    image: "/seed/shinro-reference.jpeg",
    sliderImages: [
      "/seed/shinro-reference.jpeg",
      "/seed/shinro-reference.jpeg",
      "/seed/shinro-reference.jpeg",
    ],
    title: "Welcome to Shinro Manabi Academy",
    descriptionOne:
      "Shinro Manabi Academy is a Bangladesh-Japan educational support organization dedicated to helping students achieve academic and career goals in Japan.",
    descriptionTwo:
      "We build a strong educational bridge between Bangladesh and Japan through language training, admission support, documentation, visa guidance, and post-arrival support.",
    features: [
      { text: "Expert Teachers" },
      { text: "Complete Support System" },
      { text: "JLPT Preparation" },
      { text: "Visa Support" },
      { text: "Arrival Support" },
      { text: "Culture Training" },
    ],
  },
  departments: {
    eyebrow: "Our Programs",
    title: "Our Services",
    items: [
      {
        title: "Student Counseling",
        description: "Personalized consultation and educational planning for Japan study goals.",
      },
      {
        title: "Japanese Language Education",
        description: "N5, N4, JLPT, NAT-Test, communication, and cultural training.",
      },
      {
        title: "Documentation Support",
        description: "Application forms, SOP, translation support, and academic document review.",
      },
      {
        title: "Visa Processing Assistance",
        description: "Student visa application support and immigration document guidance.",
      },
      {
        title: "Arrival Support in Japan",
        description: "Airport pickup, transport guidance, settlement, and emergency help.",
      },
      {
        title: "Accommodation Support",
        description: "Dormitory assistance, apartment search, and housing consultation.",
      },
    ],
  },
  university: {
    image: "/seed/shinro-reference.jpeg",
    title: "Why Choose Shinro Manabi Academy?",
    descriptionOne:
      "Professional counselors help students with transparent, ethical guidance from admission to settlement in Japan.",
    descriptionTwo:
      "Strong institutional networks create partnership opportunities with Japanese language schools, vocational colleges, and universities.",
    descriptionThree:
      "Continuous post-arrival support helps students adapt academically and personally after reaching Japan.",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    stats: [
      { value: "10", label: "Journey Steps" },
      { value: "2", label: "Country Offices" },
      { value: "7", label: "Core Services" },
      { value: "24/7", label: "Student Support" },
    ],
  },
  chairmanMessage: {
    image: "/seed/shinro-reference.jpeg",
    eyebrow: "Chairman's Message",
    title: "A Message From Our Chairman",
    message:
      "At Shinro Manabi Academy, we believe education creates opportunities and transforms lives.\n\nOur goal is not only to help students reach Japan but also to ensure they are fully prepared for academic success and personal growth. Through strong partnerships with Japanese educational institutions, we continue to support students throughout every stage of their journey.\n\nWe look forward to contributing to stronger educational ties between Bangladesh and Japan.",
    name: "Hossain Sohag",
    role: "Chairman",
  },
  testimonials: {
    eyebrow: "Testimonials",
    title: "Our Student Saying...",
    items: [
      {
        quote:
          "The counseling process was very professional and helpful.",
        name: "Jhon Smith",
        role: "Student",
      },
      {
        quote:
          "Thanks to Shinro Manabi Academy, my admission and visa process became much easier.",
        name: "Sarah Khan",
        role: "Student",
      },
      {
        quote:
          "The support I received after arriving in Japan was extremely valuable.",
        name: "Tanvir Ahmed",
        role: "Student",
      },
    ],
  },
  footer: {
    address: "27 Indira Road (4th Floor)\nFarmgate, Dhaka-1215\nBangladesh",
    email: "shinromanabi@gmail.com",
    contactText:
      "Your pathway to Japan. Connecting Bangladesh and Japan through education, language, and opportunity.",
    copyright: "Shinro Manabi Academy 2026. All Rights Reserved.",
    facebook: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    youtube: "#",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Our Instructors", href: "#" },
      { label: "Courses", href: "/courses" },
      { label: "History", href: "#" },
      { label: "Privacy Policy", href: "#" },
      { label: "Service Plus", href: "#" },
    ],
    services: [
      { label: "Japanese Language", href: "/courses" },
      { label: "JLPT Preparation", href: "/courses" },
      { label: "Admission", href: "#" },
      { label: "Visa Support", href: "#" },
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
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  aboutPage: {
    title: "About Us",
    breadcrumb: "Home - About Us",
    heroImage: "/seed/shinro-reference.jpeg",
    chooseTitle: "Why Choose Us?",
    chooseButtonText: "Contact Us",
  },
  coursePage: {
    title: "Our Courses",
    breadcrumb: "Home - Our Courses",
    intro:
      "Choose focused Japanese language, JLPT, and Japan pathway programs built for steady student progress.",
    heroImage: "/seed/shinro-reference.jpeg",
    courses: [
      {
        image: "/seed/shinro-reference.jpeg",
        price: "$55",
        title: "Japanese Language N5",
        description: "Foundation course for first-time Japanese learners.",
        students: "14",
        comments: "13",
        reviews: "14 Reviews",
      },
      {
        image: "/seed/shinro-reference.jpeg",
        price: "$99",
        title: "Japanese Language N4",
        description: "Grammar, reading, listening, and speaking practice.",
        students: "12",
        comments: "65",
        reviews: "25 Reviews",
      },
      {
        image: "/seed/shinro-reference.jpeg",
        price: "$55",
        title: "JLPT Preparation",
        description: "Mock tests, feedback, and exam-focused coaching.",
        students: "25",
        comments: "98",
        reviews: "45 Reviews",
      },
      {
        image: "/seed/shinro-reference.jpeg",
        price: "$86",
        title: "Conversation Class",
        description: "Daily speaking drills for confidence and fluency.",
        students: "15",
        comments: "18",
        reviews: "19 Reviews",
      },
      {
        image: "/seed/shinro-reference.jpeg",
        price: "$85",
        title: "Study In Japan Guidance",
        description: "Institution selection, admission, documents, and interview preparation.",
        students: "11",
        comments: "17",
        reviews: "15 Reviews",
      },
      {
        image: "/seed/shinro-reference.jpeg",
        price: "$95",
        title: "Visa Processing Assistance",
        description: "Student visa application support, immigration guidance, and pre-departure orientation.",
        students: "14",
        comments: "13",
        reviews: "14 Reviews",
      },
    ],
  },
  resultPage: {
    title: "Result",
    breadcrumb: "Home - Result",
    searchTitle: "Search Your Result",
    intro:
      "Enter department, year, student ID, and registration number to view academic progress.",
    departmentPlaceholder: "Department One",
    yearPlaceholder: "2026",
    idPlaceholder: "ID Number",
    registrationPlaceholder: "Registration Number",
    buttonText: "View Result",
    resultTitle: "Here Your Result",
    heroImage: "/seed/shinro-reference.jpeg",
    rows: [
      { courseTitle: "Japanese N5", grade: "A+", credits: "5.00", term: "Spring 2026" },
      { courseTitle: "Japanese N4", grade: "A", credits: "4.00", term: "Spring 2026" },
      { courseTitle: "JLPT Preparation", grade: "A", credits: "4.00", term: "Spring 2026" },
      { courseTitle: "Conversation Class", grade: "A+", credits: "5.00", term: "Spring 2026" },
      { courseTitle: "Study In Japan", grade: "A", credits: "4.00", term: "Spring 2026" },
      { courseTitle: "Culture Training", grade: "A", credits: "4.00", term: "Spring 2026" },
    ],
    records: [
      {
        department: "Japanese Language",
        year: "2026",
        idNumber: "2501",
        registrationNumber: "REG-2501",
        rows: [
          { courseTitle: "Japanese N5", grade: "A+", credits: "5.00", term: "Spring 2026" },
          { courseTitle: "Japanese N4", grade: "A", credits: "4.00", term: "Spring 2026" },
          { courseTitle: "JLPT Preparation", grade: "A", credits: "4.00", term: "Spring 2026" },
        ],
      },
    ],
  },
  noticePage: {
    title: "Notice",
    breadcrumb: "Home - Notice",
    heroImage: "/seed/shinro-reference.jpeg",
    notices: [
      {
        day: "14",
        month: "December",
        year: "2026",
        category: "Academy Notice",
        title: "Japanese language admission notice for new student batch.",
        pdf: "#",
      },
      {
        day: "14",
        month: "December",
        year: "2026",
        category: "Exam Notice",
        title: "JLPT preparation mock test routine published.",
        pdf: "#",
      },
      {
        day: "14",
        month: "December",
        year: "2026",
        category: "Student Notice",
        title: "Document submission deadline for Japan study support.",
        pdf: "#",
      },
      {
        day: "14",
        month: "December",
        year: "2026",
        category: "Class Notice",
        title: "Updated class schedule for conversation practice program.",
        pdf: "#",
      },
      {
        day: "14",
        month: "December",
        year: "2026",
        category: "Office Notice",
        title: "Holiday notice and office support timing update.",
        pdf: "#",
      },
    ],
  },
  contactPage: {
    title: "Contact Form",
    breadcrumb: "Home - Contact Us",
    formTitle: "Get In Touch",
    infoTitle: "Don't Hesitate to contact with us for any kind of information",
    address:
      "Bangladesh Head Office: 27 Indira Road (4th Floor), Farmgate, Dhaka-1215. Japan Liaison Office: Room 203, Matsushima 4-8-8, Edogawa-ku, Tokyo, Japan.",
    phone: "+880 1922-881828",
    email: "shinromanabi@gmail.com",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Orlando%20FL&t=&z=11&ie=UTF8&iwloc=&output=embed",
    heroImage: "/seed/shinro-reference.jpeg",
  },
  seo: {
    home: {
      title: "Shinro Manabi Academy | Your Trusted Pathway to Study in Japan",
      description:
        "Japanese language education, study abroad guidance, visa support, and student assistance for Bangladeshi students planning to study in Japan.",
      keywords:
        "Shinro Manabi Academy, study in Japan, Japanese language course, Bangladesh Japan education, student visa Japan",
      ogTitle: "Shinro Manabi Academy",
      ogDescription:
        "Your trusted pathway to study in Japan with language training, admission support, visa guidance, and post-arrival assistance.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/",
      robots: "index, follow",
    },
    about: {
      title: "About Shinro Manabi Academy",
      description:
        "Learn about Shinro Manabi Academy, a Bangladesh-Japan educational support organization helping students reach Japan.",
      keywords: "about Shinro Manabi Academy, Bangladesh Japan education support",
      ogTitle: "About Shinro Manabi Academy",
      ogDescription:
        "A trusted Bangladesh-Japan education bridge for language training, admission, visa, and student support.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/about",
      robots: "index, follow",
    },
    courses: {
      title: "Japanese Language Courses | Shinro Manabi Academy",
      description:
        "Explore Japanese N5, N4, JLPT, NAT-Test, communication, and cultural training courses.",
      keywords: "Japanese N5, Japanese N4, JLPT preparation, NAT-Test, Japanese language Bangladesh",
      ogTitle: "Japanese Language Courses",
      ogDescription: "Practical Japanese courses for study and life in Japan.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/courses",
      robots: "index, follow",
    },
    students: {
      title: "Students | Shinro Manabi Academy",
      description: "Search student information and verification details from Shinro Manabi Academy.",
      keywords: "Shinro students, student verification, student list",
      ogTitle: "Students",
      ogDescription: "Student search and verification portal.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/students",
      robots: "index, follow",
    },
    result: {
      title: "Result | Shinro Manabi Academy",
      description: "Search student course results and academic progress.",
      keywords: "student result, Shinro result, academic result",
      ogTitle: "Result",
      ogDescription: "Search student result and progress.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/result",
      robots: "index, follow",
    },
    notice: {
      title: "Notice | Shinro Manabi Academy",
      description: "Latest academy notices, updates, and downloadable PDF documents.",
      keywords: "academy notice, Shinro notice, Japan study notice",
      ogTitle: "Notice",
      ogDescription: "Latest academy notices and PDF downloads.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/notice",
      robots: "index, follow",
    },
    contact: {
      title: "Contact Shinro Manabi Academy",
      description:
        "Contact Shinro Manabi Academy Bangladesh head office or Japan liaison office for study in Japan support.",
      keywords: "contact Shinro Manabi Academy, Japan study consultation, Farmgate Dhaka",
      ogTitle: "Contact Shinro Manabi Academy",
      ogDescription: "Book consultation and contact our Bangladesh or Japan office.",
      ogImage: "/seed/shinro-reference.jpeg",
      canonical: "/contact",
      robots: "index, follow",
    },
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
      sliderImages: content.welcome?.sliderImages?.length
        ? content.welcome.sliderImages
        : defaultContent.welcome.sliderImages,
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
    chairmanMessage: {
      ...defaultContent.chairmanMessage,
      ...(content.chairmanMessage || {}),
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
    aboutPage: {
      ...defaultContent.aboutPage,
      ...(content.aboutPage || {}),
    },
    coursePage: {
      ...defaultContent.coursePage,
      ...(content.coursePage || {}),
      courses: content.coursePage?.courses?.length
        ? content.coursePage.courses
        : defaultContent.coursePage.courses,
    },
    resultPage: {
      ...defaultContent.resultPage,
      ...(content.resultPage || {}),
      rows: content.resultPage?.rows?.length ? content.resultPage.rows : defaultContent.resultPage.rows,
      records: content.resultPage?.records?.length
        ? content.resultPage.records
        : defaultContent.resultPage.records,
    },
    noticePage: {
      ...defaultContent.noticePage,
      ...(content.noticePage || {}),
      notices: content.noticePage?.notices?.length
        ? content.noticePage.notices
        : defaultContent.noticePage.notices,
    },
    contactPage: {
      ...defaultContent.contactPage,
      ...(content.contactPage || {}),
    },
    seo: {
      ...defaultContent.seo,
      ...(content.seo || {}),
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

  return students.length
    ? students.map((student) => ({
        id: student.id,
        name: student.name,
        department: student.department,
        className: student.className,
        image: student.image,
      }))
    : defaultStudents;
}

export function getResultDepartments(content: SiteContent) {
  return Array.from(new Set(content.resultPage.records.map((record) => record.department).filter(Boolean)));
}

export function searchResultRecords({
  content,
  department,
  year,
  idNumber,
  registrationNumber,
}: {
  content: SiteContent;
  department?: string;
  year?: string;
  idNumber?: string;
  registrationNumber?: string;
}) {
  const searched = Boolean(department || year || idNumber || registrationNumber);
  if (!searched) return { searched, records: [] as ResultRecord[] };

  const records = content.resultPage.records.filter((record) => {
    const matchDepartment = !department || record.department === department;
    const matchYear = !year || record.year === year;
    const matchId = !idNumber || record.idNumber === idNumber;
    const matchRegistration =
      !registrationNumber || record.registrationNumber === registrationNumber;
    return matchDepartment && matchYear && matchId && matchRegistration;
  });

  return { searched, records };
}

export async function saveContactMessage(message: ContactMessage) {
  const db = await getDb();
  if (!db) throw new Error("MONGODB_URI missing");

  await db.collection<ContactMessage>("contact_messages").insertOne({
    ...message,
    createdAt: new Date(),
  });
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  const db = await getDb();
  if (!db) return [];

  const messages = await db
    .collection<ContactMessage>("contact_messages")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return messages.map((message) => ({
    ...message,
    _id: message._id?.toString(),
    createdAt:
      message.createdAt instanceof Date ? message.createdAt.toISOString() : message.createdAt,
  }));
}

export async function deleteContactMessage(id: string) {
  const db = await getDb();
  if (!db) throw new Error("MONGODB_URI missing");

  await db.collection("contact_messages").deleteOne({ _id: new ObjectId(id) });
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

  if (content) {
    delete (content as Partial<SiteContent> & { _id?: unknown })._id;
    delete (content as Partial<SiteContent> & { key?: unknown }).key;
    delete (content as Partial<SiteContent> & { createdAt?: unknown }).createdAt;
    delete (content as Partial<SiteContent> & { updatedAt?: unknown }).updatedAt;
  }

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
