const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="container xl:max-w-screen-2xl mx-auto">{children}</main>
  );
};
export default DashboardLayout;
