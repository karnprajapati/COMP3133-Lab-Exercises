export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface LaunchSite {
  site_id: string;
  site_name: string;
  site_name_long: string;
}

export interface Links {
  mission_patch?: string;
  mission_patch_small?: string;
  reddit_campaign?: string;
  reddit_launch?: string;
  reddit_recovery?: string;
  reddit_media?: string;
  presskit?: string;
  article_link?: string;
  wikipedia?: string;
  video_link?: string;
  youtube_id?: string;
  flickr_images?: string[];
}

export interface Mission {
  flight_number: number;
  mission_name: string;
  mission_id: string[];
  upcoming: boolean;
  launch_year: string;
  launch_date_unix: number;
  launch_date_utc: string;
  launch_date_local: string;
  is_tentative: boolean;
  tentative_max_precision: string;
  tbd: boolean;
  launch_window?: number;
  rocket: Rocket;
  ships: string[];
  telemetry: {
    flight_club?: string;
  };
  launch_site: LaunchSite;
  launch_success?: boolean;
  launch_failure_details?: {
    time: number;
    altitude?: number;
    reason: string;
  };
  links: Links;
  details?: string;
  static_fire_date_utc?: string;
  static_fire_date_unix?: number;
  timeline?: Record<string, number>;
  crew?: any[];
}

export interface MissionFilter {
  year?: string;
  searchTerm?: string;
}