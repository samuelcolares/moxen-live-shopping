import React from "react";

import { LiveSearchCard } from "@/components/ui/live-search-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getSearch } from "@/lib/search-service";

export const revalidate = 0;

type ResultsProp = {
  term: string;
};

export const Results: React.FC<ResultsProp> = async ({ term }) => {
  const data = await getSearch(term);
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Resultados para o termo: &quot;{term}&quot;
      </h2>
      {data.length === 0 && (
        <p className="text-muted-foreground text-sm">
          Nenhum resutado encontrado.
        </p>
      )}
      {data.length > 0 && (
        <ul className="flex flex-col gap-4 lg:pl-6">
          {data.map((live) => (
            <li
              key={live.id}
              className="w-fit dark:hover:bg-white/10 hover:bg-primary/20 rounded-md transition lg:p-2"
            >
              <LiveSearchCard live={live} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const ResultsSkeleton: React.FC<ResultsProp> = ({ term }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">
        Resultados para o termo: &quot;{term}&quot;
      </h2>

      <ul className="flex flex-col gap-4 pl-6">
        {[...Array(3)].map((_, i) => (
          <li
            key={i}
            className="w-fit hover:bg-white/10 rounded-md transition p-2"
          >
            <div className="flex gap-4">
              <Skeleton className="aspect-video min-w-80 w-80 h-full rounded-md" />
              <div className="w-80 flex flex-col gap-1">
                <Skeleton className="h-7 w-full" />
                <Skeleton className="h-5 w-full" />

                <div className="flex items-center gap-2 my-2">
                  <Skeleton className="aspect-square h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-20" />
                </div>

                <Skeleton className="w-2xl h-5" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
