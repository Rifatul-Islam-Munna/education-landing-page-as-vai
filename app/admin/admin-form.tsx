"use client";

import { useActionState } from "react";
import { loginAction, updateSiteAction } from "./actions";
import type { SiteContent, Student } from "@/lib/site";

const initialState = { ok: false, message: "" };

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

export function SiteEditor({
  content,
  students,
}: {
  content: SiteContent;
  students: Student[];
}) {
  const [state, action] = useActionState(updateSiteAction, initialState);

  return (
    <form className="admin-shell admin-editor" action={action}>
      <div className="admin-heading">
        <div>
          <p>Dashboard</p>
          <h1>Homepage Content</h1>
        </div>
        <SubmitButton label="Save Changes" />
      </div>

      {state.message ? (
        <p className={state.ok ? "admin-message ok" : "admin-message"}>{state.message}</p>
      ) : null}
      <input name="currentStudents" type="hidden" value={JSON.stringify(students.slice(0, 12))} />

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

        <div className="admin-stack section-gap">
          {students.slice(0, 12).map((student, index) => (
            <div className="admin-card" key={index}>
              <h3>Student {index + 1}</h3>
              <div className="admin-grid">
                <input name={`studentId${index}`} defaultValue={student.id} placeholder="Student ID" />
                <input name={`studentName${index}`} defaultValue={student.name} placeholder="Name" />
                <input
                  name={`studentDepartment${index}`}
                  defaultValue={student.department}
                  placeholder="Department"
                />
                <input name={`studentClass${index}`} defaultValue={student.className} placeholder="Class" />
              </div>
              <label>
                Student image
                <input name={`studentImage${index}`} type="file" accept="image/*" />
              </label>
            </div>
          ))}
        </div>
      </section>
    </form>
  );
}
