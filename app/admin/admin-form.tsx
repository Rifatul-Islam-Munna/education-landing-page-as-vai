"use client";

import { useState, useActionState } from "react";
import { Home, Info, Users, Plus, X } from "lucide-react";
import { loginAction, updateSiteAction } from "./actions";
import type { SiteContent, Student } from "@/lib/site";

const initialState = { ok: false, message: "" };

const tabs = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "students", label: "Students" },
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
  about: <Info size={18} />,
  students: <Users size={18} />,
};

function TabBar({ active, onSwitch }: { active: TabId; onSwitch: (id: TabId) => void }) {
  return (
    <div className="flex gap-1 rounded-xl bg-gray-100 p-1.5 mb-6">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSwitch(t.id)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-bold transition-all duration-200 ${
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
  content,
  students,
}: {
  content: SiteContent;
  students: Student[];
}) {
  const [state, action] = useActionState(updateSiteAction, initialState);
  const [tab, setTab] = useState<TabId>("home");
  const [studentPage, setStudentPage] = useState(0);
  const perPage = 5;
  const [localStudents, setLocalStudents] = useState<Student[]>(
    students.length > 0 ? students : [{ id: "", name: "", department: "", className: "", image: "" }],
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
      <input name="currentStudents" type="hidden" value={JSON.stringify(localStudents)} />
      <input name="studentCount" type="hidden" value={String(localStudents.length)} />

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
                    Image
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
                    Background image
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
              <label>
                Image
                <input name="welcomeImage" type="file" accept="image/*" />
              </label>
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
              <label>
                Image
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

      {tab === "about" && (
        <>
          <section>
            <h2>Header</h2>
            <div className="admin-grid">
              <input name="brandName" defaultValue={content.brandName} placeholder="Brand" />
              <input name="brandTagline" defaultValue={content.brandTagline} placeholder="Tagline" />
              <input name="logoMark" defaultValue={content.logoMark} placeholder="Logo mark" />
              <input name="locationLabel" defaultValue={content.locationLabel} placeholder="Location label" />
              <input name="locationText" defaultValue={content.locationText} placeholder="Location text" />
              <input name="phoneLabel" defaultValue={content.phoneLabel} placeholder="Phone label" />
              <input name="phoneText" defaultValue={content.phoneText} placeholder="Phone text" />
              <input name="applyText" defaultValue={content.applyText} placeholder="Apply text" />
            </div>
          </section>

          <section>
            <h2>Footer & Contact</h2>
            <div className="admin-card">
              <textarea name="footerAddress" defaultValue={content.footer.address} placeholder="Footer address" />
              <input name="footerEmail" defaultValue={content.footer.email} placeholder="Email" />
              <textarea name="footerContactText" defaultValue={content.footer.contactText} placeholder="Contact text" />
              <input name="footerCopyright" defaultValue={content.footer.copyright} placeholder="Copyright" />
              <div className="admin-grid">
                <input name="footerFacebook" defaultValue={content.footer.facebook} placeholder="Facebook URL" />
                <input name="footerTwitter" defaultValue={content.footer.twitter} placeholder="Twitter URL" />
                <input name="footerLinkedin" defaultValue={content.footer.linkedin} placeholder="LinkedIn URL" />
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
              <label>
                Page hero image
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
                        Student image
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
    </form>
  );
}
