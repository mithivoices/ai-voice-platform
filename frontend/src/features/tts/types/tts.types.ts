export interface VoiceProfile {
  id: string;
  name: string;
  tags: string[];
  language: string;
  previewUrl?: string;
}

export interface Language {
  code: string;
  name: string;
  region: string;
}

export interface AudioData {
  id: string;
  url: string;
  duration: number;
  createdAt: string;
  text: string;
  voiceProfile: VoiceProfile;
}

export interface TTSState {
  // Input
  inputText: string;
  charCount: number;

  // Configuration
  selectedVoice: VoiceProfile | null;
  selectedLanguage: Language | null;
  speed: number;
  pitch: number;
  stability: number;

  // Generation
  isGenerating: boolean;
  generatedAudio: AudioData | null;

  // Edit mode
  isEditMode: boolean;
  selectionStart: number;
  selectionEnd: number;
  hasUnsavedChanges: boolean;
  originalAudio: AudioData | null;

  // UI State
  isConfigExpanded: boolean;
}
