export type Language = "en" | "pt-br";

export interface LocalizedText {
  en: string;
  "pt-br": string;
}

export interface Post {
  id: string;
  title: LocalizedText;
  date: string;
  tags: string[];
  category: string;
  coverImage: string;
  description: LocalizedText;
  folder: string;
}

export interface PostContent {
  title: string;
  content: string;
}
