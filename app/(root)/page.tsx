import React from "react";
import { HomeSection } from "./_components/homePage";

const HomePage = () => {
  return (
    <section className="w-full p-4">
      <HomeSection title="Lives ativas" lives={[]} icon="live"/>
      <HomeSection title="Próximas lives" lives={[]} icon="proxima"/>
      <HomeSection title="Lives encerradas" lives={[]} icon="finalizada"/>
    </section>
  );
};

export default HomePage;
