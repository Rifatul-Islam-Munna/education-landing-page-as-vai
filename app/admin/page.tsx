import { isAdmin } from "@/lib/auth";
import { getAllStudents, getSiteContent } from "@/lib/site";
import { logoutAction } from "./actions";
import { LoginForm, SiteEditor } from "./admin-form";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdmin();

  if (!authed) {
    return (
      <main className="admin-page">
        <LoginForm />
      </main>
    );
  }

  const [content, students] = await Promise.all([getSiteContent(), getAllStudents()]);

  return (
    <main className="admin-page">
      <form action={logoutAction} className="logout-form">
        <button type="submit">Logout</button>
      </form>
      <SiteEditor content={content} students={students} />
    </main>
  );
}
