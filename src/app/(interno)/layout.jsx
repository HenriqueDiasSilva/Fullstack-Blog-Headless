import LayoutGeral from "../Layouts/LayoutGeral";

export default async function Layout({ children }) {
  return (
    <>
      <LayoutGeral>{children}</LayoutGeral>
    </>
  );
}
