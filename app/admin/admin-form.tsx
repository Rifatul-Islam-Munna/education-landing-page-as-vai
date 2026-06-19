"use client";

import { useState, useActionState } from "react";
import { Bell, BookOpen, FileCheck, Globe, Home, Info, Mail, Users, Plus, X } from "lucide-react";
import { deleteContactMessageAction, loginAction, updateSiteAction } from "./actions";
import type { ContactMessage, Course, Notice, ResultRecord, ResultRow, SiteContent, Student } from "@/lib/site";

const initialState = { ok: false, message: "" };

const tabs = [
  { id: "home", label: "Home" },
  { id: "common", label: "Common" },
  { id: "about", label: "About" },
  { id: "students", label: "Students" },
  { id: "courses", label: "Courses" },
  { id: "result", label: "Result" },
  { id: "notice", label: "Notice" },
  { id: "contact", label: "Contact" },
  { id: "seo", label: "SEO" },
] as const;

type TabId = (typeof tabs)[number]["id"];

function SubmitButton({ label }: { label: string }) {
  return (
    <button className="admin-button" type="submit">
      {label}
    </button>
  );
}

export function LoginForm() {
  const [state, action] = useActionState(loginAction, initialState);

  return (
    <form className="admin-shell admin-login" action={action}>
      <h1>Admin Login</h1>
      <input name="email" type="email" placeholder="Email" required />
      <input name="password" type="password" placeholder="Password" required />
      {state.message ? <p className="admin-message">{state.message}</p> : null}
      <SubmitButton label="Login" />
    </form>
  );
}

const tabIcons: Record<TabId, React.ReactNode> = {
  home: <Home size={18} />,
  common: <Info size={18} />,
  about: <Info size={18} />,
  students: <Users size={18} />,
  courses: <BookOpen size={18} />,
  result: <FileCheck size={18} />,
  notice: <Bell size={18} />,
  contact: <Mail size={18} />,
  seo: <Globe size={18} />,
};

const seoLabels: Record<string, string> = {
  home: "Home",
  about: "About",
  courses: "Courses",
  students: "Students",
  result: "Result",
  notice: "Notice",
  contact: "Contact",
};

function TabBar({ active, onSwitch }: { active: TabId; onSwitch: (id: TabId) => void }) {
  return (
    <div className="flex flex-wrap gap-1 rounded-xl bg-gray-100 p-1.5 mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSwitch(t.id)}
          className={`flex min-w-[132px] flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
            t.id === active
              ? "bg-white text-[#c81422] shadow-sm"
              : "text-gray-500 hover:text-gray-800"
          }`}
        >
          {tabIcons[t.id]}
          {t.label}
        </button>
      ))}
    </div>
  );
}

export function SiteEditor({
  contacts,
  content,
  students,
}: {
  contacts: ContactMessage[];
  content: SiteContent;
  students: Student[];
}) {
  const [state, action] = useActionState(updateSiteAction, initialState);
  const [tab, setTab] = useState<TabId>("home");
  const [studentPage, setStudentPage] = useState(0);
  const [contactListPage, setContactListPage] = useState(0);
  const [noticeListPage, setNoticeListPage] = useState(0);
  const perPage = 5;
  const [localStudents, setLocalStudents] = useState<Student[]>(
    students.length > 0 ? students : [{ id: "", name: "", department: "", className: "", image: "" }],
  );
  const [localCourses, setLocalCourses] = useState<Course[]>(
    content.coursePage.courses.length
      ? content.coursePage.courses
      : [{ image: "/seed/shinro-reference.jpeg", price: "", title: "", description: "", students: "", comments: "", reviews: "" }],
  );
  const [localNotices, setLocalNotices] = useState<Notice[]>(
    content.noticePage.notices.length
      ? content.noticePage.notices
      : [{ day: "", month: "", category: "", title: "", pdf: "#" }],
  );
  const [localResults, setLocalResults] = useState<ResultRecord[]>(
    content.resultPage.records.length
      ? content.resultPage.records
      : [
          {
            department: "",
            year: "",
            idNumber: "",
            registrationNumber: "",
            rows: [{ courseTitle: "", grade: "", credits: "", term: "" }],
          },
        ],
  );
  const [welcomeImages, setWelcomeImages] = useState<string[]>(
    content.welcome.sliderImages.length ? content.welcome.sliderImages : [content.welcome.image],
  );

  function addStudent() {
    setLocalStudents((prev) => [
      ...prev,
      { id: "", name: "", department: "", className: "", image: "" },
    ]);
  }

  function removeStudent(index: number) {
    setLocalStudents((prev) => {
      const next = prev.filter((_, i) => i !== index);
      const maxPage = Math.ceil(next.length / perPage) - 1;
      if (studentPage > maxPage) setStudentPage(Math.max(maxPage, 0));
      return next;
    });
  }

  function updateStudent(index: number, field: keyof Student, value: string) {
    setLocalStudents((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)),
    );
  }

  function addCourse() {
    setLocalCourses((prev) => [
      ...prev,
      { image: "/seed/shinro-reference.jpeg", price: "", title: "", description: "", students: "", comments: "", reviews: "" },
    ]);
  }

  function removeCourse(index: number) {
    setLocalCourses((prev) => prev.filter((_, i) => i !== index));
  }

  function updateCourse(index: number, field: keyof Course, value: string) {
    setLocalCourses((prev) => prev.map((course, i) => (i === index ? { ...course, [field]: value } : course)));
  }

  function addNotice() {
    setLocalNotices((prev) => [...prev, { day: "", month: "", year: "", category: "", title: "", pdf: "#" }]);
  }

  function removeNotice(index: number) {
    setLocalNotices((prev) => prev.filter((_, i) => i !== index));
  }

  function updateNotice(index: number, field: keyof Notice, value: string) {
    setLocalNotices((prev) => prev.map((notice, i) => (i === index ? { ...notice, [field]: value } : notice)));
  }

  function addResult() {
    setLocalResults((prev) => [
      ...prev,
      {
        department: "",
        year: "",
        idNumber: "",
        registrationNumber: "",
        rows: [{ courseTitle: "", grade: "", credits: "", term: "" }],
      },
    ]);
  }

  function removeResult(index: number) {
    setLocalResults((prev) => prev.filter((_, i) => i !== index));
  }

  function updateResult(index: number, field: keyof Omit<ResultRecord, "rows">, value: string) {
    setLocalResults((prev) => prev.map((record, i) => (i === index ? { ...record, [field]: value } : record)));
  }

  function addResultRow(index: number) {
    setLocalResults((prev) =>
      prev.map((record, i) =>
        i === index
          ? { ...record, rows: [...record.rows, { courseTitle: "", grade: "", credits: "", term: "" }] }
          : record,
      ),
    );
  }

  function removeResultRow(index: number, rowIndex: number) {
    setLocalResults((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, rows: record.rows.filter((_, r) => r !== rowIndex) } : record,
      ),
    );
  }

  function updateResultRow(index: number, rowIndex: number, field: keyof ResultRow, value: string) {
    setLocalResults((prev) =>
      prev.map((record, i) =>
        i === index
          ? {
              ...record,
              rows: record.rows.map((row, r) => (r === rowIndex ? { ...row, [field]: value } : row)),
            }
          : record,
      ),
    );
  }

  function addWelcomeImage() {
    setWelcomeImages((prev) => [...prev, "/seed/shinro-reference.jpeg"]);
  }

  function removeWelcomeImage(index: number) {
    setWelcomeImages((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form className="admin-shell admin-editor" action={action}>
      <div className="admin-heading">
        <div>
          <p>Dashboard</p>
          <h1>Site Content</h1>
        </div>
        <SubmitButton label="Save Changes" />
      </div>

      {state.message ? (
        <p className={state.ok ? "admin-message ok" : "admin-message"}>{state.message}</p>
      ) : null}

      <TabBar active={tab} onSwitch={setTab} />
      <input name="activeTab" type="hidden" value={tab} />
      <input name="currentStudents" type="hidden" value={JSON.stringify(localStudents)} />
      <input name="studentCount" type="hidden" value={String(localStudents.length)} />
      <input name="currentCourses" type="hidden" value={JSON.stringify(localCourses)} />
      <input name="courseCount" type="hidden" value={String(localCourses.length)} />
      <input name="currentNotices" type="hidden" value={JSON.stringify(localNotices)} />
      <input name="noticeCount" type="hidden" value={String(localNotices.length)} />
      <input name="currentResultRecords" type="hidden" value={JSON.stringify(localResults)} />
      <input name="resultCount" type="hidden" value={String(localResults.length)} />
      <input name="currentWelcomeImages" type="hidden" value={JSON.stringify(welcomeImages)} />
      <input name="welcomeImageCount" type="hidden" value={String(welcomeImages.length)} />

      {tab === "home" && (
        <>
          <section>
            <h2>Hero Slider</h2>
            <div className="admin-stack">
              {content.heroSlides.map((slide, index) => (
                <div className="admin-card" key={index}>
                  <h3>Slide {index + 1}</h3>
                  <input name={`heroEyebrow${index}`} defaultValue={slide.eyebrow} placeholder="Eyebrow" />
                  <input name={`heroTitle${index}`} defaultValue={slide.title} placeholder="Title" />
                  <textarea name={`heroSubtitle${index}`} defaultValue={slide.subtitle} placeholder="Subtitle" />
                  <label>
                    Image (recommended 1920x760px)
                    <input name={`heroImage${index}`} type="file" accept="image/*" />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Bottom Cards</h2>
            <div className="admin-stack">
              {content.featureCards.map((card, index) => (
                <div className="admin-card" key={index}>
                  <h3>Card {index + 1}</h3>
                  <input name={`cardTitle${index}`} defaultValue={card.title} placeholder="Title" />
                  <textarea name={`cardDescription${index}`} defaultValue={card.description} placeholder="Description" />
                  <label>
                    Background image (recommended 600x420px)
                    <input name={`cardImage${index}`} type="file" accept="image/*" />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Welcome Section</h2>
            <div className="admin-card">
              <input name="welcomeTitle" defaultValue={content.welcome.title} placeholder="Title" />
              <textarea name="welcomeDescriptionOne" defaultValue={content.welcome.descriptionOne} placeholder="Description one" />
              <textarea name="welcomeDescriptionTwo" defaultValue={content.welcome.descriptionTwo} placeholder="Description two" />
              <div className="admin-stack">
                <div className="flex items-center justify-between">
                  <h3 className="!mb-0">Slider Images</h3>
                  <button type="button" onClick={addWelcomeImage} className="flex items-center gap-1.5 rounded-lg bg-[#c81422] px-3 py-2 text-xs font-bold text-white hover:bg-[#a0101b] transition-colors">
                    <Plus size={16} />
                    Add Image
                  </button>
                </div>
                {welcomeImages.map((image, index) => (
                  <div className="admin-card" key={index}>
                    <div className="flex items-center justify-between">
                      <h3 className="!mb-0">Image {index + 1}</h3>
                      {welcomeImages.length > 1 && (
                        <button type="button" onClick={() => removeWelcomeImage(index)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    <input name={`welcomeSliderCurrent${index}`} type="hidden" value={image} />
                    <label>
                      Upload image (recommended 900x700px)
                      <input name={`welcomeSliderImage${index}`} type="file" accept="image/*" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="admin-grid">
                {content.welcome.features.map((feature, index) => (
                  <input
                    key={index}
                    name={`welcomeFeature${index}`}
                    defaultValue={feature.text}
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2>Departments</h2>
            <div className="admin-grid">
              <input name="departmentsEyebrow" defaultValue={content.departments.eyebrow} placeholder="Eyebrow" />
              <input name="departmentsTitle" defaultValue={content.departments.title} placeholder="Title" />
            </div>
            <div className="admin-stack section-gap">
              {content.departments.items.map((department, index) => (
                <div className="admin-card" key={index}>
                  <h3>Department {index + 1}</h3>
                  <input name={`departmentTitle${index}`} defaultValue={department.title} placeholder="Title" />
                  <textarea
                    name={`departmentDescription${index}`}
                    defaultValue={department.description}
                    placeholder="Description"
                  />
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>University Section</h2>
            <div className="admin-card">
              <input name="universityTitle" defaultValue={content.university.title} placeholder="Title" />
              <textarea name="universityDescriptionOne" defaultValue={content.university.descriptionOne} placeholder="Description one" />
              <textarea name="universityDescriptionTwo" defaultValue={content.university.descriptionTwo} placeholder="Description two" />
              <textarea name="universityDescriptionThree" defaultValue={content.university.descriptionThree} placeholder="Description three" />
              <input name="universityVideoUrl" defaultValue={content.university.videoUrl} placeholder="YouTube video URL" />
              <label>
                Image (recommended 900x600px)
                <input name="universityImage" type="file" accept="image/*" />
              </label>
              <div className="admin-grid">
                {content.university.stats.map((stat, index) => (
                  <div className="admin-card" key={index}>
                    <input name={`statValue${index}`} defaultValue={stat.value} placeholder="Value" />
                    <input name={`statLabel${index}`} defaultValue={stat.label} placeholder="Label" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2>Testimonials</h2>
            <div className="admin-card">
              <h3>Chairman's Message</h3>
              <div className="admin-grid">
                <input name="chairmanEyebrow" defaultValue={content.chairmanMessage.eyebrow} placeholder="Eyebrow" />
                <input name="chairmanTitle" defaultValue={content.chairmanMessage.title} placeholder="Title" />
                <input name="chairmanName" defaultValue={content.chairmanMessage.name} placeholder="Name" />
                <input name="chairmanRole" defaultValue={content.chairmanMessage.role} placeholder="Role" />
              </div>
              <textarea name="chairmanMessage" defaultValue={content.chairmanMessage.message} placeholder="Message" />
              <label>
                Chairman photo (recommended 700x900px)
                <input name="chairmanImage" type="file" accept="image/*" />
              </label>
            </div>
            <div className="admin-grid">
              <input name="testimonialsEyebrow" defaultValue={content.testimonials.eyebrow} placeholder="Eyebrow" />
              <input name="testimonialsTitle" defaultValue={content.testimonials.title} placeholder="Title" />
            </div>
            <div className="admin-stack section-gap">
              {content.testimonials.items.map((item, index) => (
                <div className="admin-card" key={index}>
                  <h3>Testimonial {index + 1}</h3>
                  <textarea name={`testimonialQuote${index}`} defaultValue={item.quote} placeholder="Quote" />
                  <input name={`testimonialName${index}`} defaultValue={item.name} placeholder="Name" />
                  <input name={`testimonialRole${index}`} defaultValue={item.role} placeholder="Role" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "common" && (
        <>
          <section>
            <h2>Header</h2>
            <div className="admin-grid">
              <input name="brandName" defaultValue={content.brandName} placeholder="Brand" />
              <input name="brandTagline" defaultValue={content.brandTagline} placeholder="Tagline" />
              <input name="logoMark" defaultValue={content.logoMark} placeholder="Logo mark" />
              <label>
                Logo image (recommended 240x120px)
                {content.logoImage && content.logoImage !== "#" ? (
                  <span className="flex h-20 w-28 items-center justify-center rounded-md border border-gray-200 bg-white p-2">
                    <img src={content.logoImage} alt={content.brandName} className="max-h-full max-w-full object-contain" />
                  </span>
                ) : null}
                <input name="logoImage" type="file" accept="image/*" />
              </label>
              <input name="locationLabel" defaultValue={content.locationLabel} placeholder="Location label" />
              <input name="locationText" defaultValue={content.locationText} placeholder="Location text" />
              <input name="phoneLabel" defaultValue={content.phoneLabel} placeholder="Phone label" />
              <input name="phoneText" defaultValue={content.phoneText} placeholder="Phone text" />
              <input name="applyText" defaultValue={content.applyText} placeholder="Apply text" />
              <input name="applyHref" defaultValue={content.applyHref} placeholder="Apply link URL" />
            </div>
          </section>

          <section>
            <h2>Footer</h2>
            <div className="admin-card">
              <textarea name="footerAddress" defaultValue={content.footer.address} placeholder="Footer address" />
              <input name="footerEmail" defaultValue={content.footer.email} placeholder="Email" />
              <textarea name="footerContactText" defaultValue={content.footer.contactText} placeholder="Contact text" />
              <input name="footerCopyright" defaultValue={content.footer.copyright} placeholder="Copyright" />
              <div className="admin-grid">
                <input name="footerFacebook" defaultValue={content.footer.facebook} placeholder="Facebook URL" />
                <input name="footerTwitter" defaultValue={content.footer.twitter} placeholder="Twitter URL" />
                <input name="footerLinkedin" defaultValue={content.footer.linkedin} placeholder="LinkedIn URL" />
                <input name="footerInstagram" defaultValue={content.footer.instagram} placeholder="Instagram URL" />
                <input name="footerYoutube" defaultValue={content.footer.youtube} placeholder="YouTube URL" />
              </div>
            </div>
            <div className="admin-grid section-gap">
              <div className="admin-card">
                <h3>Useful Links</h3>
                {content.footer.links.map((link, index) => (
                  <div className="admin-grid" key={index}>
                    <input name={`footerLinkLabel${index}`} defaultValue={link.label} placeholder="Label" />
                    <input name={`footerLinkHref${index}`} defaultValue={link.href} placeholder="URL" />
                  </div>
                ))}
              </div>
              <div className="admin-card">
                <h3>Our Services</h3>
                {content.footer.services.map((service, index) => (
                  <div className="admin-grid" key={index}>
                    <input name={`footerServiceLabel${index}`} defaultValue={service.label} placeholder="Label" />
                    <input name={`footerServiceHref${index}`} defaultValue={service.href} placeholder="URL" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {tab === "about" && (
        <>
          <section>
            <h2>About Page</h2>
            <div className="admin-card">
              <div className="admin-grid">
                <input name="aboutPageTitle" defaultValue={content.aboutPage.title} placeholder="Page title" />
                <input name="aboutPageBreadcrumb" defaultValue={content.aboutPage.breadcrumb} placeholder="Breadcrumb" />
                <input name="aboutChooseTitle" defaultValue={content.aboutPage.chooseTitle} placeholder="Choose section title" />
                <input name="aboutChooseButtonText" defaultValue={content.aboutPage.chooseButtonText} placeholder="Button text" />
              </div>
              <label>
                Page hero image (recommended 1920x520px)
                <input name="aboutHeroImage" type="file" accept="image/*" />
              </label>
            </div>
          </section>

          <section>
            <h2>Hero Card Information</h2>
            <div className="admin-stack">
              {content.featureCards.map((card, index) => (
                <div className="admin-card" key={index}>
                  <h3>Card {index + 1}</h3>
                  <input name={`cardTitle${index}`} defaultValue={card.title} placeholder="Title" />
                  <textarea name={`cardDescription${index}`} defaultValue={card.description} placeholder="Description" />
                  <label>
                    Background image (recommended 600x420px)
                    <input name={`cardImage${index}`} type="file" accept="image/*" />
                  </label>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2>Welcome to Shinro Manabi Academy</h2>
            <div className="admin-card">
              <input name="welcomeTitle" defaultValue={content.welcome.title} placeholder="Title" />
              <textarea name="welcomeDescriptionOne" defaultValue={content.welcome.descriptionOne} placeholder="Description one" />
              <textarea name="welcomeDescriptionTwo" defaultValue={content.welcome.descriptionTwo} placeholder="Description two" />
              <div className="admin-stack">
                <div className="flex items-center justify-between">
                  <h3 className="!mb-0">Slider Images</h3>
                  <button type="button" onClick={addWelcomeImage} className="flex items-center gap-1.5 rounded-lg bg-[#c81422] px-3 py-2 text-xs font-bold text-white hover:bg-[#a0101b] transition-colors">
                    <Plus size={16} />
                    Add Image
                  </button>
                </div>
                {welcomeImages.map((image, index) => (
                  <div className="admin-card" key={index}>
                    <div className="flex items-center justify-between">
                      <h3 className="!mb-0">Image {index + 1}</h3>
                      {welcomeImages.length > 1 && (
                        <button type="button" onClick={() => removeWelcomeImage(index)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                          <X size={18} />
                        </button>
                      )}
                    </div>
                    <input name={`welcomeSliderCurrent${index}`} type="hidden" value={image} />
                    <label>
                      Upload image (recommended 900x700px)
                      <input name={`welcomeSliderImage${index}`} type="file" accept="image/*" />
                    </label>
                  </div>
                ))}
              </div>
              <div className="admin-grid">
                {content.welcome.features.map((feature, index) => (
                  <input
                    key={index}
                    name={`welcomeFeature${index}`}
                    defaultValue={feature.text}
                    placeholder={`Feature ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2>Why Choose Us?</h2>
            <div className="admin-card">
              <input name="universityTitle" defaultValue={content.university.title} placeholder="Title" />
              <textarea name="universityDescriptionOne" defaultValue={content.university.descriptionOne} placeholder="Description one" />
              <textarea name="universityDescriptionTwo" defaultValue={content.university.descriptionTwo} placeholder="Description two" />
              <textarea name="universityDescriptionThree" defaultValue={content.university.descriptionThree} placeholder="Description three" />
              <input name="universityVideoUrl" defaultValue={content.university.videoUrl} placeholder="YouTube video URL" />
              <label>
                Background image (recommended 900x600px)
                <input name="universityImage" type="file" accept="image/*" />
              </label>
              <div className="admin-grid">
                {content.university.stats.map((stat, index) => (
                  <div className="admin-card" key={index}>
                    <input name={`statValue${index}`} defaultValue={stat.value} placeholder="Value" />
                    <input name={`statLabel${index}`} defaultValue={stat.label} placeholder="Label" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <h2>Our Student Saying...</h2>
            <div className="admin-grid">
              <input name="testimonialsEyebrow" defaultValue={content.testimonials.eyebrow} placeholder="Eyebrow" />
              <input name="testimonialsTitle" defaultValue={content.testimonials.title} placeholder="Title" />
            </div>
            <div className="admin-stack section-gap">
              {content.testimonials.items.map((item, index) => (
                <div className="admin-card" key={index}>
                  <h3>Testimonial {index + 1}</h3>
                  <textarea name={`testimonialQuote${index}`} defaultValue={item.quote} placeholder="Quote" />
                  <input name={`testimonialName${index}`} defaultValue={item.name} placeholder="Name" />
                  <input name={`testimonialRole${index}`} defaultValue={item.role} placeholder="Role" />
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "students" && (
        <>
          <section>
            <h2>Students Page</h2>
            <div className="admin-card">
              <div className="admin-grid">
                <input name="studentPageTitle" defaultValue={content.studentPage.title} placeholder="Page title" />
                <input name="studentPageBreadcrumb" defaultValue={content.studentPage.breadcrumb} placeholder="Breadcrumb" />
                <input name="studentSearchTitle" defaultValue={content.studentPage.searchTitle} placeholder="Search box title" />
                <input
                  name="studentSearchPlaceholder"
                  defaultValue={content.studentPage.searchPlaceholder}
                  placeholder="ID input placeholder"
                />
              </div>
              <textarea name="studentEmptyText" defaultValue={content.studentPage.emptyText} placeholder="Empty text" />
              <input name="studentVideoUrl" defaultValue={content.studentPage.videoUrl} placeholder="YouTube video URL" />
              <label>
                Page hero image (recommended 1920x520px)
                <input name="studentHeroImage" type="file" accept="image/*" />
              </label>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="!mb-0">Students</h2>
              <button type="button" onClick={addStudent} className="flex items-center gap-1.5 rounded-lg bg-[#c81422] px-3 py-2 text-xs font-bold text-white hover:bg-[#a0101b] transition-colors">
                <Plus size={16} />
                Add Student
              </button>
            </div>
            <div className="admin-stack section-gap">
              {(() => {
                const start = studentPage * perPage;
                const paginated = localStudents.slice(start, start + perPage);
                return paginated.map((student, i) => {
                  const realIndex = start + i;
                  return (
                    <div className="admin-card relative" key={realIndex}>
                      <div className="flex items-center justify-between">
                        <h3 className="!mb-0">Student {realIndex + 1}</h3>
                        {localStudents.length > 1 && (
                          <button type="button" onClick={() => removeStudent(realIndex)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                            <X size={18} />
                          </button>
                        )}
                      </div>
                      <div className="admin-grid">
                        <input
                          name={`studentId${realIndex}`}
                          value={student.id}
                          onChange={(e) => updateStudent(realIndex, "id", e.target.value)}
                          placeholder="Student ID"
                        />
                        <input
                          name={`studentName${realIndex}`}
                          value={student.name}
                          onChange={(e) => updateStudent(realIndex, "name", e.target.value)}
                          placeholder="Name"
                        />
                        <input
                          name={`studentDepartment${realIndex}`}
                          value={student.department}
                          onChange={(e) => updateStudent(realIndex, "department", e.target.value)}
                          placeholder="Department"
                        />
                        <input
                          name={`studentClass${realIndex}`}
                          value={student.className}
                          onChange={(e) => updateStudent(realIndex, "className", e.target.value)}
                          placeholder="Class"
                        />
                      </div>
                      <label>
                        Student image (recommended 600x600px)
                        <input name={`studentImage${realIndex}`} type="file" accept="image/*" />
                      </label>
                    </div>
                  );
                });
              })()}
            </div>

            {localStudents.length > perPage && (
              <div className="mt-4 flex items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={studentPage === 0}
                  onClick={() => setStudentPage((p) => Math.max(0, p - 1))}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-bold text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Prev
                </button>
                {Array.from({ length: Math.ceil(localStudents.length / perPage) }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setStudentPage(i)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                      i === studentPage
                        ? "bg-[#c81422] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={studentPage >= Math.ceil(localStudents.length / perPage) - 1}
                  onClick={() => setStudentPage((p) => p + 1)}
                  className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-bold text-gray-600 disabled:opacity-40 hover:bg-gray-50 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </section>
        </>
      )}

      {tab === "courses" && (
        <>
          <section>
            <h2>Courses Page</h2>
            <div className="admin-card">
              <div className="admin-grid">
                <input name="coursePageTitle" defaultValue={content.coursePage.title} placeholder="Page title" />
                <input name="coursePageBreadcrumb" defaultValue={content.coursePage.breadcrumb} placeholder="Breadcrumb" />
              </div>
              <textarea name="coursePageIntro" defaultValue={content.coursePage.intro} placeholder="Intro text" />
              <label>
                Page hero image (recommended 1920x520px)
                <input name="courseHeroImage" type="file" accept="image/*" />
              </label>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="!mb-0">Courses</h2>
              <button type="button" onClick={addCourse} className="flex items-center gap-1.5 rounded-lg bg-[#c81422] px-3 py-2 text-xs font-bold text-white hover:bg-[#a0101b] transition-colors">
                <Plus size={16} />
                Add Course
              </button>
            </div>
            <div className="admin-stack section-gap">
              {localCourses.map((course, index) => (
                <div className="admin-card" key={index}>
                  <div className="flex items-center justify-between">
                    <h3 className="!mb-0">Course {index + 1}</h3>
                    {localCourses.length > 1 && (
                      <button type="button" onClick={() => removeCourse(index)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  <div className="admin-grid">
                    <input name={`courseTitle${index}`} value={course.title} onChange={(e) => updateCourse(index, "title", e.target.value)} placeholder="Title" />
                    <input name={`coursePrice${index}`} value={course.price} onChange={(e) => updateCourse(index, "price", e.target.value)} placeholder="Price" />
                    <input name={`courseStudents${index}`} value={course.students} onChange={(e) => updateCourse(index, "students", e.target.value)} placeholder="Students" />
                    <input name={`courseComments${index}`} value={course.comments} onChange={(e) => updateCourse(index, "comments", e.target.value)} placeholder="Comments" />
                    <input name={`courseReviews${index}`} value={course.reviews} onChange={(e) => updateCourse(index, "reviews", e.target.value)} placeholder="Reviews" />
                  </div>
                  <textarea name={`courseDescription${index}`} value={course.description} onChange={(e) => updateCourse(index, "description", e.target.value)} placeholder="Description" />
                  <label>
                    Course image (recommended 600x420px)
                    <input name={`courseImage${index}`} type="file" accept="image/*" />
                  </label>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "result" && (
        <>
          <section>
            <h2>Result Page</h2>
            <div className="admin-card">
              <div className="admin-grid">
                <input name="resultPageTitle" defaultValue={content.resultPage.title} placeholder="Page title" />
                <input name="resultPageBreadcrumb" defaultValue={content.resultPage.breadcrumb} placeholder="Breadcrumb" />
                <input name="resultSearchTitle" defaultValue={content.resultPage.searchTitle} placeholder="Search title" />
                <input name="resultDepartmentPlaceholder" defaultValue={content.resultPage.departmentPlaceholder} placeholder="Department placeholder" />
                <input name="resultYearPlaceholder" defaultValue={content.resultPage.yearPlaceholder} placeholder="Year placeholder" />
                <input name="resultIdPlaceholder" defaultValue={content.resultPage.idPlaceholder} placeholder="ID placeholder" />
                <input name="resultRegistrationPlaceholder" defaultValue={content.resultPage.registrationPlaceholder} placeholder="Registration placeholder" />
                <input name="resultButtonText" defaultValue={content.resultPage.buttonText} placeholder="Button text" />
                <input name="resultTitle" defaultValue={content.resultPage.resultTitle} placeholder="Result title" />
              </div>
              <textarea name="resultIntro" defaultValue={content.resultPage.intro} placeholder="Intro text" />
              <label>
                Page hero image (recommended 1920x520px)
                <input name="resultHeroImage" type="file" accept="image/*" />
              </label>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="!mb-0">Result Records</h2>
              <button type="button" onClick={addResult} className="flex items-center gap-1.5 rounded-lg bg-[#c81422] px-3 py-2 text-xs font-bold text-white hover:bg-[#a0101b] transition-colors">
                <Plus size={16} />
                Add Result
              </button>
            </div>
            <div className="admin-stack section-gap">
              {localResults.map((record, index) => (
                <div className="admin-card" key={index}>
                  <div className="flex items-center justify-between">
                    <h3 className="!mb-0">Result {index + 1}</h3>
                    {localResults.length > 1 && (
                      <button type="button" onClick={() => removeResult(index)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                        <X size={18} />
                      </button>
                    )}
                  </div>
                  <div className="admin-grid">
                    <input name={`resultDepartment${index}`} value={record.department} onChange={(e) => updateResult(index, "department", e.target.value)} placeholder="Department" />
                    <input name={`resultYear${index}`} value={record.year} onChange={(e) => updateResult(index, "year", e.target.value)} placeholder="Year" />
                    <input name={`resultIdNumber${index}`} value={record.idNumber} onChange={(e) => updateResult(index, "idNumber", e.target.value)} placeholder="ID Number" />
                    <input name={`resultRegistrationNumber${index}`} value={record.registrationNumber} onChange={(e) => updateResult(index, "registrationNumber", e.target.value)} placeholder="Registration Number" />
                  </div>
                  <input name={`resultRowCount${index}`} type="hidden" value={String(record.rows.length)} />
                  <div className="admin-stack">
                    {record.rows.map((row, rowIndex) => (
                      <div className="admin-card" key={rowIndex}>
                        <div className="flex items-center justify-between">
                          <h3 className="!mb-0">Course Row {rowIndex + 1}</h3>
                          {record.rows.length > 1 && (
                            <button type="button" onClick={() => removeResultRow(index, rowIndex)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                              <X size={18} />
                            </button>
                          )}
                        </div>
                        <div className="admin-grid">
                          <input name={`resultRecordCourseTitle${index}_${rowIndex}`} value={row.courseTitle} onChange={(e) => updateResultRow(index, rowIndex, "courseTitle", e.target.value)} placeholder="Course title" />
                          <input name={`resultRecordGrade${index}_${rowIndex}`} value={row.grade} onChange={(e) => updateResultRow(index, rowIndex, "grade", e.target.value)} placeholder="Grade" />
                          <input name={`resultRecordCredits${index}_${rowIndex}`} value={row.credits} onChange={(e) => updateResultRow(index, rowIndex, "credits", e.target.value)} placeholder="Credits" />
                          <input name={`resultRecordTerm${index}_${rowIndex}`} value={row.term} onChange={(e) => updateResultRow(index, rowIndex, "term", e.target.value)} placeholder="Term" />
                        </div>
                      </div>
                    ))}
                  </div>
                  <button type="button" onClick={() => addResultRow(index)} className="flex w-fit items-center gap-1.5 rounded-lg border border-[#c81422] px-3 py-2 text-xs font-bold text-[#c81422] hover:bg-[#c81422] hover:text-white transition-colors">
                    <Plus size={16} />
                    Add Course Row
                  </button>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {tab === "notice" && (
        <>
          <section>
            <h2>Notice Page</h2>
            <div className="admin-card">
              <div className="admin-grid">
                <input name="noticePageTitle" defaultValue={content.noticePage.title} placeholder="Page title" />
                <input name="noticePageBreadcrumb" defaultValue={content.noticePage.breadcrumb} placeholder="Breadcrumb" />
              </div>
              <label>
                Page hero image (recommended 1920x520px)
                <input name="noticeHeroImage" type="file" accept="image/*" />
              </label>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="!mb-0">Notice Items</h2>
              <button type="button" onClick={addNotice} className="flex items-center gap-1.5 rounded-lg bg-[#c81422] px-3 py-2 text-xs font-bold text-white hover:bg-[#a0101b] transition-colors">
                <Plus size={16} />
                Add Notice
              </button>
            </div>
            <div className="admin-stack section-gap">
              {localNotices
                .slice(noticeListPage * perPage, noticeListPage * perPage + perPage)
                .map((notice, i) => {
                  const index = noticeListPage * perPage + i;
                  return (
                    <div className="admin-card" key={index}>
                      <div className="flex items-center justify-between">
                        <h3 className="!mb-0">Notice {index + 1}</h3>
                        {localNotices.length > 1 && (
                          <button type="button" onClick={() => removeNotice(index)} className="text-gray-400 hover:text-[#c81422] transition-colors">
                            <X size={18} />
                          </button>
                        )}
                      </div>
                      <div className="admin-grid">
                        <input name={`noticeDay${index}`} value={notice.day} onChange={(e) => updateNotice(index, "day", e.target.value)} placeholder="Day" />
                        <input name={`noticeMonth${index}`} value={notice.month} onChange={(e) => updateNotice(index, "month", e.target.value)} placeholder="Month" />
                        <input name={`noticeYear${index}`} value={notice.year || ""} onChange={(e) => updateNotice(index, "year", e.target.value)} placeholder="Year" />
                        <input name={`noticeCategory${index}`} value={notice.category} onChange={(e) => updateNotice(index, "category", e.target.value)} placeholder="Category" />
                        <input name={`noticeTitle${index}`} value={notice.title} onChange={(e) => updateNotice(index, "title", e.target.value)} placeholder="Title" />
                      </div>
                      <label>
                        PDF file
                        <input name={`noticePdf${index}`} type="file" accept="application/pdf,.pdf" />
                      </label>
                      {notice.pdf && notice.pdf !== "#" ? (
                        <a className="text-sm font-bold text-[#c81422]" href={notice.pdf} download>
                          Current PDF
                        </a>
                      ) : null}
                    </div>
                  );
                })}
            </div>
            {localNotices.length > perPage && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {Array.from({ length: Math.ceil(localNotices.length / perPage) }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setNoticeListPage(i)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                      i === noticeListPage
                        ? "bg-[#c81422] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {tab === "contact" && (
        <>
          <section>
            <h2>Contact Page</h2>
            <div className="admin-card">
              <div className="admin-grid">
                <input name="contactPageTitle" defaultValue={content.contactPage.title} placeholder="Page title" />
                <input name="contactPageBreadcrumb" defaultValue={content.contactPage.breadcrumb} placeholder="Breadcrumb" />
                <input name="contactFormTitle" defaultValue={content.contactPage.formTitle} placeholder="Form title" />
                <input name="contactInfoTitle" defaultValue={content.contactPage.infoTitle} placeholder="Info title" />
                <input name="contactAddress" defaultValue={content.contactPage.address} placeholder="Address" />
                <input name="contactPhone" defaultValue={content.contactPage.phone} placeholder="Phone" />
                <input name="contactEmail" defaultValue={content.contactPage.email} placeholder="Email" />
                <input name="contactMapEmbedUrl" defaultValue={content.contactPage.mapEmbedUrl} placeholder="Google map embed URL" />
              </div>
              <label>
                Page hero image (recommended 1920x520px)
                <input name="contactHeroImage" type="file" accept="image/*" />
              </label>
            </div>
          </section>

          <section>
            <h2>Contact Documents</h2>
            <div className="admin-stack section-gap">
              {contacts.length ? (
                contacts
                  .slice(contactListPage * perPage, contactListPage * perPage + perPage)
                  .map((contact) => (
                    <div className="admin-card" key={String(contact._id)}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="!mb-1">{contact.subject || "Contact Message"}</h3>
                          <p className="text-sm font-bold text-gray-500">
                            {contact.name} | {contact.email} | {contact.phone || "No phone"}
                          </p>
                        </div>
                        <button
                          className="rounded-lg bg-[#c81422] px-3 py-2 text-xs font-black text-white"
                          formAction={deleteContactMessageAction}
                          name="contactId"
                          type="submit"
                          value={String(contact._id)}
                        >
                          Delete
                        </button>
                      </div>
                      <p className="text-sm font-semibold leading-7 text-gray-700">{contact.message}</p>
                    </div>
                  ))
              ) : (
                <div className="admin-card text-sm font-bold text-gray-500">No contact documents yet.</div>
              )}
            </div>

            {contacts.length > perPage && (
              <div className="mt-4 flex items-center justify-center gap-2">
                {Array.from({ length: Math.ceil(contacts.length / perPage) }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setContactListPage(i)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-bold transition-colors ${
                      i === contactListPage
                        ? "bg-[#c81422] text-white"
                        : "border border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {tab === "seo" && (
        <section>
          <h2>SEO</h2>
          <div className="admin-card">
            <h3>Website Icon</h3>
            <label>
              Favicon / browser tab icon (ICO, PNG, or SVG)
              <input name="siteIcon" type="file" accept="image/*,.ico,.svg" />
            </label>
          </div>
          <div className="admin-stack section-gap">
            {Object.entries(content.seo).map(([key, seo]) => (
              <div className="admin-card" key={key}>
                <h3>{seoLabels[key] || key}</h3>
                <div className="admin-grid">
                  <input name={`seoTitle_${key}`} defaultValue={seo.title} placeholder="Meta title" />
                  <input name={`seoKeywords_${key}`} defaultValue={seo.keywords} placeholder="Keywords, comma separated" />
                  <input name={`seoOgTitle_${key}`} defaultValue={seo.ogTitle} placeholder="Open Graph title" />
                  <input name={`seoOgImage_${key}`} defaultValue={seo.ogImage} placeholder="Open Graph image URL (recommended 1200x630px)" />
                  <input name={`seoOgImageFile_${key}`} type="file" accept="image/*" />
                  <input name={`seoCanonical_${key}`} defaultValue={seo.canonical} placeholder="Canonical URL/path" />
                  <input name={`seoRobots_${key}`} defaultValue={seo.robots} placeholder="Robots: index, follow" />
                </div>
                <textarea name={`seoDescription_${key}`} defaultValue={seo.description} placeholder="Meta description" />
                <textarea name={`seoOgDescription_${key}`} defaultValue={seo.ogDescription} placeholder="Open Graph description" />
              </div>
            ))}
          </div>
        </section>
      )}
    </form>
  );
}
