export interface GameResponse {
    count:                number;
    description:          string;
    filters:              Filters;
    next:                 string;
    nofollow:             boolean;
    nofollow_collections: string[];
    noindex:              boolean;
    previous:             null;
    results:              Result[];
    seo_description:      string;
    seo_h1:               string;
    seo_keywords:         string;
    seo_title:            string;
   }
   
   export interface Filters {
    years: FiltersYear[];
   }
   
   export interface FiltersYear {
    count:    number;
    decade:   number;
    filter:   string;
    from:     number;
    nofollow: boolean;
    to:       number;
    years:    YearYear[];
   }
   
   export interface YearYear {
    count:    number;
    nofollow: boolean;
    year:     number;
   }
   
   export interface Result {
    added:              number;
    added_by_status:    AddedByStatus;
    background_image:   string;
    clip:               null;
    dominant_color:     Color;
    esrb_rating:        EsrbRating;
    genres:             Genre[];
    id:                 number;
    metacritic:         number;
    name:               string;
    parent_platforms:   ParentPlatform[];
    platforms:          PlatformElement[];
    playtime:           number;
    rating:             number;
    rating_top:         number;
    ratings:            Rating[];
    ratings_count:      number;
    released:           Date;
    reviews_count:      number;
    reviews_text_count: number;
    saturated_color:    Color;
    short_screenshots:  ShortScreenshot[];
    slug:               string;
    stores:             Store[];
    suggestions_count:  number;
    tags:               Genre[];
    tba:                boolean;
    updated:            Date;
    user_game:          null;
   }
   
   export interface AddedByStatus {
    beaten:  number;
    dropped: number;
    owned:   number;
    playing: number;
    toplay:  number;
    yet:     number;
   }
   
   export enum Color {
    The0F0F0F = "0f0f0f",
   }
   
   export interface EsrbRating {
    id:   number;
    name: string;
    slug: string;
   }
   
   export interface Genre {
    domain?:          Domain;
    games_count:      number;
    id:               number;
    image_background: string;
    language?:        Language;
    name:             string;
    slug:             string;
   }
   
   export enum Domain {
    AppsAppleCOM = "apps.apple.com",
    EpicgamesCOM = "epicgames.com",
    GogCOM = "gog.com",
    MarketplaceXboxCOM = "marketplace.xbox.com",
    MicrosoftCOM = "microsoft.com",
    NintendoCOM = "nintendo.com",
    PlayGoogleCOM = "play.google.com",
    StorePlaystationCOM = "store.playstation.com",
    StoreSteampoweredCOM = "store.steampowered.com",
   }
   
   export enum Language {
    Eng = "eng",
   }
   
   export interface ParentPlatform {
    platform: EsrbRating;
   }
   
   export interface PlatformElement {
    platform:        PlatformPlatform;
    released_at:     Date;
    requirements_en: Requirements | null;
    requirements_ru: Requirements | null;
   }
   
   export interface PlatformPlatform {
    games_count:      number;
    id:               number;
    image:            null;
    image_background: string;
    name:             string;
    slug:             string;
    year_end:         null;
    year_start:       number | null;
   }
   
   export interface Requirements {
    minimum:      string;
    recommended?: string;
   }
   
   export interface Rating {
    count:   number;
    id:      number;
    percent: number;
    title:   Title;
   }
   
   export enum Title {
    Exceptional = "exceptional",
    Meh = "meh",
    Recommended = "recommended",
    Skip = "skip",
   }
   
   export interface ShortScreenshot {
    id:    number;
    image: string;
   }
   
   export interface Store {
    id:    number;
    store: Genre;
   }
   