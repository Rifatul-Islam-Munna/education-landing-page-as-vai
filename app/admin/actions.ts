"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, isAdmin } from "@/lib/auth";
import {
  deleteContactMessage,
  getSiteContent,
  saveStudents,
  saveSiteContent,
  type Course,
  type Department,
  type FeatureCard,
  type HeroSlide,
  type Notice,
  type ResultRecord,
  type ResultRow,
  type SeoEntry,
  type SeoKey,
  type StatItem,
  type Student,
  type Testimonial,
  type WelcomeFeature,
} from "@/lib/site";

type ActionState = {
  message: string;
  ok: boolean;
};

async function uploadImage(file: FormDataEntryValue | null, current: string) {
  if (!(file instanceof File) || file.size === 0) return current;

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = path.extname(file.name) || ".jpg";
  const name = `${Date.now()}-${randomUUID()}${ext}`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}

async function uploadPdf(file: FormDataEntryValue | null, current: string) {
  if (!(file instanceof File) || file.size === 0) return current;

  const ext = path.extname(file.name).toLowerCase();
  if (ext !== ".pdf" && file.type !== "application/pdf") return current;

  const bytes = Buffer.from(await file.arrayBuffer());
  const name = `${Date.now()}-${randomUUID()}.pdf`;
  const dir = path.join(process.cwd(), "public", "uploads");
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, name), bytes);
  return `/uploads/${name}`;
}

function text(formData: FormData, name: string, fallback: string) {
  const value = formData.get(name);
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  if (
    email === process.env.SUPER_ADMIN_EMAIL &&
    password === process.env.SUPER_ADMIN_PASSWORD
  ) {
    await createAdminSession(email);
    redirect("/admin");
  }

  return { ok: false, message: "Invalid email or password" };
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}

export async function deleteContactMessageAction(formData: FormData) {
  if (!(await isAdmin())) return;

  const id = String(formData.get("contactId") || "");
  if (id) await deleteContactMessage(id);
  revalidatePath("/admin");
}

export async function updateSiteAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) return { ok: false, message: "Unauthorized" };

  const current = await getSiteContent();
  const activeTab = String(formData.get("activeTab") || "");

  const heroSlides: HeroSlide[] = await Promise.all(
    current.heroSlides.map(async (slide, index) => ({
      image: await uploadImage(formData.get(`heroImage${index}`), slide.image),
      eyebrow: text(formData, `heroEyebrow${index}`, slide.eyebrow),
      title: text(formData, `heroTitle${index}`, slide.title),
      subtitle: text(formData, `heroSubtitle${index}`, slide.subtitle),
    })),
  );

  const featureCards: FeatureCard[] = await Promise.all(
    current.featureCards.map(async (card, index) => ({
      image: await uploadImage(formData.get(`cardImage${index}`), card.image),
      title: text(formData, `cardTitle${index}`, card.title),
      description: text(formData, `cardDescription${index}`, card.description),
      tone: card.tone,
    })),
  );

  const welcomeFeatures: WelcomeFeature[] = current.welcome.features.map((feature, index) => ({
    text: text(formData, `welcomeFeature${index}`, feature.text),
  }));

  const currentWelcomeImagesRaw = formData.get("currentWelcomeImages");
  const currentWelcomeImages =
    typeof currentWelcomeImagesRaw === "string"
      ? (JSON.parse(currentWelcomeImagesRaw) as string[])
      : current.welcome.sliderImages;
  const welcomeImageCount = Number(formData.get("welcomeImageCount")) || currentWelcomeImages.length;
  const welcomeSliderImages = await Promise.all(
    Array.from({ length: welcomeImageCount }, async (_, index) =>
      uploadImage(
        formData.get(`welcomeSliderImage${index}`),
        text(formData, `welcomeSliderCurrent${index}`, currentWelcomeImages[index] || current.welcome.image),
      ),
    ),
  );

  const departments: Department[] = current.departments.items.map((department, index) => ({
    title: text(formData, `departmentTitle${index}`, department.title),
    description: text(formData, `departmentDescription${index}`, department.description),
  }));

  const stats: StatItem[] = current.university.stats.map((stat, index) => ({
    value: text(formData, `statValue${index}`, stat.value),
    label: text(formData, `statLabel${index}`, stat.label),
  }));

  const testimonials: Testimonial[] = current.testimonials.items.map((item, index) => ({
    quote: text(formData, `testimonialQuote${index}`, item.quote),
    name: text(formData, `testimonialName${index}`, item.name),
    role: text(formData, `testimonialRole${index}`, item.role),
  }));

  const footerLinks = current.footer.links.map((link, index) => ({
    label: text(formData, `footerLinkLabel${index}`, link.label),
    href: text(formData, `footerLinkHref${index}`, link.href),
  }));

  const footerServices = current.footer.services.map((service, index) => ({
    label: text(formData, `footerServiceLabel${index}`, service.label),
    href: text(formData, `footerServiceHref${index}`, service.href),
  }));

  const currentStudentsRaw = formData.get("currentStudents");
  const currentStudents =
    typeof currentStudentsRaw === "string"
      ? (JSON.parse(currentStudentsRaw) as Student[])
      : [];

  const studentCount = Number(formData.get("studentCount")) || 0;
  const hasStudentInputs = activeTab === "students";
  const students: Student[] = hasStudentInputs
    ? Array.from({ length: studentCount }, (_, index) => ({
        id: text(formData, `studentId${index}`, currentStudents[index]?.id || ""),
        name: text(formData, `studentName${index}`, currentStudents[index]?.name || ""),
        department: text(
          formData,
          `studentDepartment${index}`,
          currentStudents[index]?.department || "",
        ),
        className: text(formData, `studentClass${index}`, currentStudents[index]?.className || ""),
        image: "",
      })).filter((student) => student.id && student.name)
    : currentStudents;

  const studentsWithImages: Student[] = await Promise.all(
    students.map(async (student, index) => ({
      ...student,
      image: await uploadImage(
        formData.get(`studentImage${index}`),
        currentStudents[index]?.image || "/seed/shinro-reference.jpeg",
      ),
    })),
  );

  const currentCoursesRaw = formData.get("currentCourses");
  const currentCourses =
    typeof currentCoursesRaw === "string" ? (JSON.parse(currentCoursesRaw) as Course[]) : [];
  const courseCount = Number(formData.get("courseCount")) || current.coursePage.courses.length;
  const hasCourseInputs = activeTab === "courses";
  const courses: Course[] = hasCourseInputs
    ? await Promise.all(
        Array.from({ length: courseCount }, async (_, index) => {
          const course = currentCourses[index] || current.coursePage.courses[index] || {
            image: "/seed/shinro-reference.jpeg",
            price: "",
            title: "",
            description: "",
            students: "",
            comments: "",
            reviews: "",
          };
          return {
            image: await uploadImage(formData.get(`courseImage${index}`), course.image),
            price: text(formData, `coursePrice${index}`, course.price),
            title: text(formData, `courseTitle${index}`, course.title),
            description: text(formData, `courseDescription${index}`, course.description),
            students: text(formData, `courseStudents${index}`, course.students),
            comments: text(formData, `courseComments${index}`, course.comments),
            reviews: text(formData, `courseReviews${index}`, course.reviews),
          };
        }),
      ).then((items) => items.filter((course) => course.title))
    : current.coursePage.courses;

  const currentResultRecordsRaw = formData.get("currentResultRecords");
  const currentResultRecords =
    typeof currentResultRecordsRaw === "string"
      ? (JSON.parse(currentResultRecordsRaw) as ResultRecord[])
      : [];
  const resultCount = Number(formData.get("resultCount")) || current.resultPage.records.length;
  const hasResultInputs = activeTab === "result";
  const resultRecords: ResultRecord[] = hasResultInputs
    ? Array.from({ length: resultCount }, (_, index) => {
        const record = currentResultRecords[index] || current.resultPage.records[index] || {
          department: "",
          year: "",
          idNumber: "",
          registrationNumber: "",
          rows: [],
        };
        const rowCount = Number(formData.get(`resultRowCount${index}`)) || record.rows.length || 1;
        const rows: ResultRow[] = Array.from({ length: rowCount }, (_, rowIndex) => {
          const row = record.rows[rowIndex] || {
            courseTitle: "",
            grade: "",
            credits: "",
            term: "",
          };
          return {
            courseTitle: text(
              formData,
              `resultRecordCourseTitle${index}_${rowIndex}`,
              row.courseTitle,
            ),
            grade: text(formData, `resultRecordGrade${index}_${rowIndex}`, row.grade),
            credits: text(formData, `resultRecordCredits${index}_${rowIndex}`, row.credits),
            term: text(formData, `resultRecordTerm${index}_${rowIndex}`, row.term),
          };
        }).filter((row) => row.courseTitle || row.grade || row.credits || row.term);
        return {
          department: text(formData, `resultDepartment${index}`, record.department),
          year: text(formData, `resultYear${index}`, record.year),
          idNumber: text(formData, `resultIdNumber${index}`, record.idNumber),
          registrationNumber: text(
            formData,
            `resultRegistrationNumber${index}`,
            record.registrationNumber,
          ),
          rows,
        };
      }).filter((record) => record.department && record.year && record.idNumber)
    : current.resultPage.records;

  const resultRows = resultRecords[0]?.rows?.length ? resultRecords[0].rows : current.resultPage.rows;

  const currentNoticesRaw = formData.get("currentNotices");
  const currentNotices =
    typeof currentNoticesRaw === "string" ? (JSON.parse(currentNoticesRaw) as Notice[]) : [];
  const noticeCount = Number(formData.get("noticeCount")) || current.noticePage.notices.length;
  const hasNoticeInputs = activeTab === "notice";
  const notices: Notice[] = hasNoticeInputs
    ? await Promise.all(
        Array.from({ length: noticeCount }, async (_, index) => {
          const notice = currentNotices[index] || current.noticePage.notices[index] || {
            day: "",
            month: "",
            year: "",
            category: "",
            title: "",
            pdf: "#",
          };
          return {
            day: text(formData, `noticeDay${index}`, notice.day),
            month: text(formData, `noticeMonth${index}`, notice.month),
            year: text(formData, `noticeYear${index}`, notice.year || new Date().getFullYear().toString()),
            category: text(formData, `noticeCategory${index}`, notice.category),
            title: text(formData, `noticeTitle${index}`, notice.title),
            pdf: await uploadPdf(formData.get(`noticePdf${index}`), notice.pdf),
          };
        }),
      ).then((items) => items.filter((notice) => notice.title))
    : current.noticePage.notices;

  const seoKeys = Object.keys(current.seo) as SeoKey[];
  const seo = seoKeys.reduce(
    (acc, key) => {
      const currentSeo = current.seo[key];
      acc[key] = {
        title: text(formData, `seoTitle_${key}`, currentSeo.title),
        description: text(formData, `seoDescription_${key}`, currentSeo.description),
        keywords: text(formData, `seoKeywords_${key}`, currentSeo.keywords),
        ogTitle: text(formData, `seoOgTitle_${key}`, currentSeo.ogTitle),
        ogDescription: text(formData, `seoOgDescription_${key}`, currentSeo.ogDescription),
        ogImage: text(formData, `seoOgImage_${key}`, currentSeo.ogImage),
        canonical: text(formData, `seoCanonical_${key}`, currentSeo.canonical),
        robots: text(formData, `seoRobots_${key}`, currentSeo.robots),
      };
      return acc;
    },
    {} as Record<SeoKey, SeoEntry>,
  );

  await saveSiteContent({
    brandName: text(formData, "brandName", current.brandName),
    brandTagline: text(formData, "brandTagline", current.brandTagline),
    logoMark: text(formData, "logoMark", current.logoMark),
    logoImage: await uploadImage(formData.get("logoImage"), current.logoImage),
    siteIcon: await uploadImage(formData.get("siteIcon"), current.siteIcon),
    locationLabel: text(formData, "locationLabel", current.locationLabel),
    locationText: text(formData, "locationText", current.locationText),
    phoneLabel: text(formData, "phoneLabel", current.phoneLabel),
    phoneText: text(formData, "phoneText", current.phoneText),
    applyText: text(formData, "applyText", current.applyText),
    applyHref: text(formData, "applyHref", current.applyHref),
    heroSlides,
    featureCards,
    welcome: {
      image: welcomeSliderImages[0] || current.welcome.image,
      sliderImages: welcomeSliderImages.length ? welcomeSliderImages : current.welcome.sliderImages,
      title: text(formData, "welcomeTitle", current.welcome.title),
      descriptionOne: text(formData, "welcomeDescriptionOne", current.welcome.descriptionOne),
      descriptionTwo: text(formData, "welcomeDescriptionTwo", current.welcome.descriptionTwo),
      features: welcomeFeatures,
    },
    departments: {
      eyebrow: text(formData, "departmentsEyebrow", current.departments.eyebrow),
      title: text(formData, "departmentsTitle", current.departments.title),
      items: departments,
    },
    university: {
      image: await uploadImage(formData.get("universityImage"), current.university.image),
      title: text(formData, "universityTitle", current.university.title),
      descriptionOne: text(formData, "universityDescriptionOne", current.university.descriptionOne),
      descriptionTwo: text(formData, "universityDescriptionTwo", current.university.descriptionTwo),
      descriptionThree: text(formData, "universityDescriptionThree", current.university.descriptionThree),
      videoUrl: text(formData, "universityVideoUrl", current.university.videoUrl),
      stats,
    },
    chairmanMessage: {
      image: await uploadImage(formData.get("chairmanImage"), current.chairmanMessage.image),
      eyebrow: text(formData, "chairmanEyebrow", current.chairmanMessage.eyebrow),
      title: text(formData, "chairmanTitle", current.chairmanMessage.title),
      message: text(formData, "chairmanMessage", current.chairmanMessage.message),
      name: text(formData, "chairmanName", current.chairmanMessage.name),
      role: text(formData, "chairmanRole", current.chairmanMessage.role),
    },
    testimonials: {
      eyebrow: text(formData, "testimonialsEyebrow", current.testimonials.eyebrow),
      title: text(formData, "testimonialsTitle", current.testimonials.title),
      items: testimonials,
    },
    footer: {
      address: text(formData, "footerAddress", current.footer.address),
      email: text(formData, "footerEmail", current.footer.email),
      contactText: text(formData, "footerContactText", current.footer.contactText),
      copyright: text(formData, "footerCopyright", current.footer.copyright),
      facebook: text(formData, "footerFacebook", current.footer.facebook),
      twitter: text(formData, "footerTwitter", current.footer.twitter),
      linkedin: text(formData, "footerLinkedin", current.footer.linkedin),
      instagram: text(formData, "footerInstagram", current.footer.instagram),
      youtube: text(formData, "footerYoutube", current.footer.youtube),
      links: footerLinks,
      services: footerServices,
    },
    studentPage: {
      title: text(formData, "studentPageTitle", current.studentPage.title),
      breadcrumb: text(formData, "studentPageBreadcrumb", current.studentPage.breadcrumb),
      searchTitle: text(formData, "studentSearchTitle", current.studentPage.searchTitle),
      searchPlaceholder: text(
        formData,
        "studentSearchPlaceholder",
        current.studentPage.searchPlaceholder,
      ),
      emptyText: text(formData, "studentEmptyText", current.studentPage.emptyText),
      heroImage: await uploadImage(
        formData.get("studentHeroImage"),
        current.studentPage.heroImage,
      ),
      videoUrl: text(formData, "studentVideoUrl", current.studentPage.videoUrl),
    },
    aboutPage: {
      title: text(formData, "aboutPageTitle", current.aboutPage.title),
      breadcrumb: text(formData, "aboutPageBreadcrumb", current.aboutPage.breadcrumb),
      heroImage: await uploadImage(formData.get("aboutHeroImage"), current.aboutPage.heroImage),
      chooseTitle: text(formData, "aboutChooseTitle", current.aboutPage.chooseTitle),
      chooseButtonText: text(
        formData,
        "aboutChooseButtonText",
        current.aboutPage.chooseButtonText,
      ),
    },
    coursePage: {
      title: text(formData, "coursePageTitle", current.coursePage.title),
      breadcrumb: text(formData, "coursePageBreadcrumb", current.coursePage.breadcrumb),
      intro: text(formData, "coursePageIntro", current.coursePage.intro),
      heroImage: await uploadImage(formData.get("courseHeroImage"), current.coursePage.heroImage),
      courses,
    },
    resultPage: {
      title: text(formData, "resultPageTitle", current.resultPage.title),
      breadcrumb: text(formData, "resultPageBreadcrumb", current.resultPage.breadcrumb),
      searchTitle: text(formData, "resultSearchTitle", current.resultPage.searchTitle),
      intro: text(formData, "resultIntro", current.resultPage.intro),
      departmentPlaceholder: text(
        formData,
        "resultDepartmentPlaceholder",
        current.resultPage.departmentPlaceholder,
      ),
      yearPlaceholder: text(formData, "resultYearPlaceholder", current.resultPage.yearPlaceholder),
      idPlaceholder: text(formData, "resultIdPlaceholder", current.resultPage.idPlaceholder),
      registrationPlaceholder: text(
        formData,
        "resultRegistrationPlaceholder",
        current.resultPage.registrationPlaceholder,
      ),
      buttonText: text(formData, "resultButtonText", current.resultPage.buttonText),
      resultTitle: text(formData, "resultTitle", current.resultPage.resultTitle),
      heroImage: await uploadImage(formData.get("resultHeroImage"), current.resultPage.heroImage),
      rows: resultRows,
      records: resultRecords,
    },
    noticePage: {
      title: text(formData, "noticePageTitle", current.noticePage.title),
      breadcrumb: text(formData, "noticePageBreadcrumb", current.noticePage.breadcrumb),
      heroImage: await uploadImage(formData.get("noticeHeroImage"), current.noticePage.heroImage),
      notices,
    },
    contactPage: {
      title: text(formData, "contactPageTitle", current.contactPage.title),
      breadcrumb: text(formData, "contactPageBreadcrumb", current.contactPage.breadcrumb),
      formTitle: text(formData, "contactFormTitle", current.contactPage.formTitle),
      infoTitle: text(formData, "contactInfoTitle", current.contactPage.infoTitle),
      address: text(formData, "contactAddress", current.contactPage.address),
      phone: text(formData, "contactPhone", current.contactPage.phone),
      email: text(formData, "contactEmail", current.contactPage.email),
      mapEmbedUrl: text(formData, "contactMapEmbedUrl", current.contactPage.mapEmbedUrl),
      heroImage: await uploadImage(formData.get("contactHeroImage"), current.contactPage.heroImage),
    },
    seo,
  });

  await saveStudents(studentsWithImages);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/about");
  revalidatePath("/students");
  revalidatePath("/courses");
  revalidatePath("/result");
  revalidatePath("/notice");
  revalidatePath("/contact");
  return { ok: true, message: "Saved" };
}
