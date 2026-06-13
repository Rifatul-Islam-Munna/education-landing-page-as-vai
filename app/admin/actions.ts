"use server";

import { randomUUID } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearAdminSession, createAdminSession, isAdmin } from "@/lib/auth";
import {
  getSiteContent,
  saveStudents,
  saveSiteContent,
  type Department,
  type FeatureCard,
  type HeroSlide,
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

export async function updateSiteAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAdmin())) return { ok: false, message: "Unauthorized" };

  const current = await getSiteContent();

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

  const studentCount = 12;
  const students: Student[] = Array.from({ length: studentCount }, (_, index) => ({
    id: text(formData, `studentId${index}`, ""),
    name: text(formData, `studentName${index}`, ""),
    department: text(formData, `studentDepartment${index}`, ""),
    className: text(formData, `studentClass${index}`, ""),
    image: "",
  })).filter((student) => student.id && student.name);

  const currentStudentsRaw = formData.get("currentStudents");
  const currentStudents =
    typeof currentStudentsRaw === "string"
      ? (JSON.parse(currentStudentsRaw) as Student[])
      : [];

  const studentsWithImages: Student[] = await Promise.all(
    students.map(async (student, index) => ({
      ...student,
      image: await uploadImage(
        formData.get(`studentImage${index}`),
        currentStudents[index]?.image || "/seed/shinro-reference.jpeg",
      ),
    })),
  );

  await saveSiteContent({
    brandName: text(formData, "brandName", current.brandName),
    brandTagline: text(formData, "brandTagline", current.brandTagline),
    logoMark: text(formData, "logoMark", current.logoMark),
    locationLabel: text(formData, "locationLabel", current.locationLabel),
    locationText: text(formData, "locationText", current.locationText),
    phoneLabel: text(formData, "phoneLabel", current.phoneLabel),
    phoneText: text(formData, "phoneText", current.phoneText),
    applyText: text(formData, "applyText", current.applyText),
    heroSlides,
    featureCards,
    welcome: {
      image: await uploadImage(formData.get("welcomeImage"), current.welcome.image),
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
      stats,
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
    },
  });

  await saveStudents(studentsWithImages);
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/students");
  return { ok: true, message: "Saved" };
}
