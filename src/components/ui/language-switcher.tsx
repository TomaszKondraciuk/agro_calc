'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'pl', name: 'Polski', flag: '🇵🇱' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'uk', name: 'Українська', flag: '🇺🇦' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();

  const handleLanguageChange = (newLocale: string) => {
    router.push(`/${newLocale}`);
  };

  const currentLanguage = languages.find(lang => lang.code === locale);

  return (
    <div className="flex items-center gap-2">
      <Globe className="h-4 w-4 text-muted-foreground" />
      <div className="flex gap-1">
        {languages.map((language) => (
          <Button
            key={language.code}
            variant={locale === language.code ? "default" : "ghost"}
            size="sm"
            onClick={() => handleLanguageChange(language.code)}
            className="h-8 px-2 text-xs"
          >
            <span className="mr-1">{language.flag}</span>
            {language.code.toUpperCase()}
          </Button>
        ))}
      </div>
      {currentLanguage && (
        <Badge variant="outline" className="text-xs">
          {currentLanguage.name}
        </Badge>
      )}
    </div>
  );
}