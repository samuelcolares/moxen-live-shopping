import React from "react";
import { HomeSection } from "./_components/homePage";
import { getLives } from "@/lib/live-service";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Button } from "@/components/ui/button";
import Link from "next/link";

dayjs.extend(utc);
dayjs.extend(timezone);

const revalidate = 0;

const HomePage = async () => {
  const lives = await getLives();

  const date = dayjs().tz("America/Sao_Paulo");

  const activeLives = lives.filter((live) => {
    const dateStart = dayjs(live.dateStart);
    const dateEnd = dayjs(live.dateEnd);
    return +date > +dateStart && +date < +dateEnd;
  });

  const nextLives = lives.filter((live) => {
    const dateStart = dayjs(live.dateStart);
    return +date < +dateStart;
  });

  const finishedLives = lives.filter((live) => {
    const dateEnd = dayjs(live.dateEnd);
    return +date > +dateEnd;
  });

  if (lives.length === 0)
    return (
      <section className="w-full p-4 h-full flex flex-col gap-3 items-center justify-center">
        <h2 className="text-2xl">
          Nenhuma live foi agendada até o presente momento.
        </h2>
        <p>Visite a página do seu Canal e agende uma.</p>
        <Button asChild variant={"link"}>
          <Link href={"/canal"}>Me leve para lá</Link>
        </Button>
      </section>
    );

  return (
    <section className="w-full p-4">
      {activeLives.length > 0 && (
        <HomeSection
          title="Lives ativas"
          lives={activeLives}
          icon="live"
          isLive="live"
        />
      )}
      {nextLives.length > 0 && (
        <HomeSection
          title="Próximas lives"
          lives={nextLives}
          icon="proxima"
          isLive="soon"
        />
      )}
      {finishedLives.length > 0 && (
        <HomeSection
          title="Lives encerradas"
          lives={finishedLives}
          icon="finalizada"
          isLive="over"
        />
      )}
    </section>
  );
};

export default HomePage;
