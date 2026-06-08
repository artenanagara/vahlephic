export type AppStore = "googlePlay" | "apple";

export interface Project {
  slug: string;
  num: string;
  title: string;
  description: string;
  period: string;
  caseStudy: boolean;
  liveUrl?: string;
  appStores: AppStore[];
  appStoreUrls?: Partial<Record<AppStore, string>>;
}
