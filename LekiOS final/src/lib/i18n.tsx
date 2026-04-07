"use client";

import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';

const translations = {
  en: {
    "app.title": "AI LekiOOS Studio",
    "ai.generator.title": "AI Generator",
    "ai.generator.description": "Describe what you want the AI to create.",
    "ai.generator.placeholder": "e.g., 'A blue button that says 'Click me' and has a hover effect'",
    "ai.generator.image_placeholder": "e.g., 'A majestic dragon soaring over a mystical forest at dawn'",
    "ai.generator.logo_placeholder": "e.g., 'A minimalist logo for a coffee shop named 'Brew' with a coffee bean icon'",
    "ai.generator.button": "Generate",
    "ai.generator.loading": "Generating...",
    "code.editor.title": "Code Editor",
    "file.manager.title": "File Explorer",
    "preview.panel.title": "Live Preview",
    "preview.panel.desktop": "Desktop",
    "preview.panel.mobile": "Mobile",
    "build.panel.title": "Platform Exporter",
    "build.panel.description": "Generate builds for any platform with one click.",
    "build.panel.apk": "Create APK (Android)",
    "build.panel.ipa": "Create IPA (iOS)",
    "build.panel.exe": "Create EXE (Windows)",
    "build.panel.dmg": "Create DMG (macOS)",
    "build.panel.appimage": "Create AppImage (Linux)",
    "build.panel.pwa": "Create PWA (Web)",
    "build.success": "Build successful!",
    "build.download": "Download",
    "github.sync.button": "Sync",
    "github.sync.inprogress": "Syncing with repository...",
    "github.sync.success": "Repository synchronized successfully!",
    "github.sync.error": "Failed to sync with repository.",
  },
  ru: {
    "app.title": "AI LekiOOS Studio",
    "ai.generator.title": "AI Генератор",
    "ai.generator.description": "Опишите, что вы хотите, чтобы AI создал.",
    "ai.generator.placeholder": "например, 'Синяя кнопка с текстом 'Нажми меня' и эффектом при наведении'",
    "ai.generator.image_placeholder": "например, 'Величественный дракон, парящий над мистическим лесом на рассвете'",
    "ai.generator.logo_placeholder": "например, 'Минималистичный логотип для кофейни 'Brew' с иконкой кофейного зерна'",
    "ai.generator.button": "Генерировать",
    "ai.generator.loading": "Генерация...",
    "code.editor.title": "Редактор Кода",
    "file.manager.title": "Проводник",
    "preview.panel.title": "Живой Предпросмотр",
    "preview.panel.desktop": "Десктоп",
    "preview.panel.mobile": "Мобильный",
    "build.panel.title": "Экспорт на Платформы",
    "build.panel.description": "Создавайте сборки для любой платформы в один клик.",
    "build.panel.apk": "Создать APK (Android)",
    "build.panel.ipa": "Создать IPA (iOS)",
    "build.panel.exe": "Создать EXE (Windows)",
    "build.panel.dmg": "Создать DMG (macOS)",
    "build.panel.appimage": "Создать AppImage (Linux)",
    "build.panel.pwa": "Создать PWA (Веб)",
    "build.success": "Сборка успешно завершена!",
    "build.download": "Скачать",
    "github.sync.button": "Синхронизация",
    "github.sync.inprogress": "Синхронизация с репозиторием...",
    "github.sync.success": "Репозиторий успешно синхронизирован!",
    "github.sync.error": "Не удалось синхронизировать с репозиторием.",
  },
  lez: {
    "app.title": "AI LekiOOS Studio",
    "ai.generator.title": "AI Генератор",
    "ai.generator.description": "Куьн кIанзавай затI AI-диз кхьихь.",
    "ai.generator.placeholder": "мисал яз, 'Вили кнопка 'Идал эцегI' кхьи ва винел акъваздайла эффект авай'",
    "ai.generator.image_placeholder": "мисал яз, 'Зурба аждагьан мистик тамдин винелай экъечIзавай ракъинин кIаник'",
    "ai.generator.logo_placeholder": "мисал яз, 'Brew' тIвар алай къагьваханадин патал минималист логотип, къагьвадин тIвекIвлин иконкIа галаз'",
    "ai.generator.button": "Генерация ая",
    "ai.generator.loading": "Генерация физва...",
    "code.editor.title": "Коддин Редактор",
    "file.manager.title": "Файлрин Explorer",
    "preview.panel.title": "Янлай Предпросмотр",
    "preview.panel.desktop": "Десктоп",
    "preview.panel.mobile": "Мобилдин",
    "build.panel.title": "Платформриз Экспорт",
    "build.panel.description": "Садра эцегIна гьар са платформадиз сборка ая.",
    "build.panel.apk": "APK ая (Android)",
    "build.panel.ipa": "IPA ая (iOS)",
    "build.panel.exe": "EXE ая (Windows)",
    "build.panel.dmg": "DMG ая (macOS)",
    "build.panel.appimage": "AppImage ая (Linux)",
    "build.panel.pwa": "PWA ая (Веб)",
    "build.success": "Сборка хъсандиз кьилиз акъатна!",
    "build.download": "Акъудун",
    "github.sync.button": "Синхронизация",
    "github.sync.inprogress": "Репозиторийдихъ галаз синхронизация физва...",
    "github.sync.success": "Репозиторий хъсандиз синхронизация хьана!",
    "github.sync.error": "Репозиторийдихъ галаз синхронизация ийиз хьанач.",
  },
};

export type Language = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;

interface I18nContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = useMemo(
    () => (key: TranslationKey) => {
      return translations[language][key] || translations.en[key];
    },
    [language]
  );

  const value = {
    language,
    setLanguage,
    t,
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
