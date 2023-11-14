import { redirect } from "next/navigation";

const Home = () => {
  redirect("/dodaj");
  return (
    <main className="w-full h-screen flex justify-center items-center">
      <p className="text-2xl">treść strony będzie dodana w przyszłości</p>
    </main>
  );
};

export default Home;
