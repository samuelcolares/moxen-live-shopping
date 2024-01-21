import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { Results, ResultsSkeleton } from "./_components/results";

type SearchPageProps = {
  searchParams: {
    termo?: string;
  };
};

const BuscarPage = ({ searchParams }: SearchPageProps) => {
  if (!searchParams.termo) {
    redirect("/");
  }
  return (
    <section className="w-full p-4 h-full">
      <Suspense fallback={<ResultsSkeleton term={searchParams.termo}/>}>
        <Results term={searchParams.termo} />
      </Suspense>
    </section>
  );
};

export default BuscarPage;
