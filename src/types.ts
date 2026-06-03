/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface ScoreLog {
  id: string;
  date: string;
  paragraphsSolved: number;
  verbalLogicSolved: number;
  geographyZonesStudied: string;
  historyUnitsCompleted: number;
  mathProblemsAttempted: number;
  mood: "Süper 🔥" | "Yorulduk 😴" | "Sinir Tepede 😡" | "Zirvedeyiz 🚀";
  note: string;
}

export type GymSessionType = "Bacak/Leg Day" | "Cardio" | "Mix Pestil" | "Sırt/Omuz" | "Off Day";

export interface GymLog {
  id: string;
  date: string;
  sessionType: GymSessionType;
  durationMinutes: number;
  pushedByTrainer: boolean; // İlker's "kalk baba" mode
  leggingsSafe: boolean; // Hummel leggings protective meter
  bodyguardActive: boolean; // Musti's protection against Tunahan-giller
  sweetRewardEarned: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Song {
  title: string;
  artist: string;
  icon: string;
  youtubeId?: string;
  spotifyUri?: string;
  moodTag: string;
}
