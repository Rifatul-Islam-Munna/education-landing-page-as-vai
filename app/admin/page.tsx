import { isAdmin } from "@/lib/auth";
import { getAllStudents, getContactMessages, getSiteContent } from "@/lib/site";
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

  const [content, students, contacts] = await Promise.all([
    getSiteContent(),
    getAllStudents(),
    getContactMessages(),
  ]);

  return (
    <main className="admin-page">
      <form action={logoutAction} className="logout-form">
        <button type="submit">Logout</button>
      </form>
      <SiteEditor content={content} contacts={contacts} students={students} />
    </main>
  );
}
