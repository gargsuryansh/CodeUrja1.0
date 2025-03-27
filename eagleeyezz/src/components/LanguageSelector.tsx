
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEditor } from "@/hooks/useEditor";
import { languages } from "@/utils/languages";

const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useEditor();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1">
          {language.name}
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            onClick={() => setLanguage(lang)}
            className="cursor-pointer"
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
