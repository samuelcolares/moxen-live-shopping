import { AlertTriangle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo({ description }: { description: string }) {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4 stroke-[#7a6309] dark:stroke-[#facc15]" />
      <AlertTitle>Atenção!</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
}
