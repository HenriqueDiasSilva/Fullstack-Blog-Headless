import Sidebar from "@/components/Sidebar";
import PostService from "@/lib/services/PostService";

export default async function LayoutGeral({ children }) {
  const recentPosts = await PostService.recentPosts();

  return (
    <>
      <main className="container">
        <div className="row g-5">
          <div className="col-md-8">{children}</div>
          <div className="col-md-4">
            <Sidebar recentes={recentPosts}></Sidebar>
          </div>
        </div>
      </main>
    </>
  );
}
