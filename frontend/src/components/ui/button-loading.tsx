import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ButtonLoading(props: {
  buttonClassString?: string;
  loadingText?: string;
}) {
  return (
    <Button disabled className={props.buttonClassString}>
      <Loader2 className="animate-spin" />
      {props.loadingText ?? "Please wait"}
    </Button>
  );
}
