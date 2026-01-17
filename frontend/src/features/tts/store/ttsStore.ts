import { create } from 'zustand';
import { TTSState, AudioData } from '../types/tts.types';

interface TTSStore extends TTSState {
  // Actions
  setInputText: (text: string) => void;
  setSelectedVoice: (voice: TTSState['selectedVoice']) => void;
  setSelectedLanguage: (language: TTSState['selectedLanguage']) => void;
  setSpeed: (speed: number) => void;
  setPitch: (pitch: number) => void;
  setStability: (stability: number) => void;
  setIsGenerating: (isGenerating: boolean) => void;
  setGeneratedAudio: (audio: AudioData | null) => void;
  enterEditMode: () => void;
  exitEditMode: () => void;
  applyChanges: () => void;
  setSelectionStart: (time: number) => void;
  setSelectionEnd: (time: number) => void;
  toggleConfig: () => void;
  resetState: () => void;
}

const initialState: TTSState = {
  inputText: '',
  charCount: 0,
  selectedVoice: null,
  selectedLanguage: null,
  speed: 1.0,
  pitch: 0,
  stability: 75,
  isGenerating: false,
  generatedAudio: null,
  isEditMode: false,
  selectionStart: 0,
  selectionEnd: 0,
  hasUnsavedChanges: false,
  originalAudio: null,
  isConfigExpanded: true,
};

export const useTTSStore = create<TTSStore>((set) => ({
  ...initialState,

  toggleConfig: () => set((state) => ({ isConfigExpanded: !state.isConfigExpanded })),

  setInputText: (text) => set({ inputText: text, charCount: text.length }),
  setSelectedVoice: (voice) => set({ selectedVoice: voice }),
  setSelectedLanguage: (language) => set({ selectedLanguage: language }),
  setSpeed: (speed) => set({ speed }),
  setPitch: (pitch) => set({ pitch }),
  setStability: (stability) => set({ stability }),
  setIsGenerating: (isGenerating) => set({ isGenerating }),
  setGeneratedAudio: (audio) => set({ generatedAudio: audio }),

  enterEditMode: () => set((state) => ({
    isEditMode: true,
    originalAudio: state.generatedAudio,
    selectionStart: 0,
    selectionEnd: state.generatedAudio?.duration || 0,
  })),

  exitEditMode: () => set((state) => ({
    isEditMode: false,
    generatedAudio: state.originalAudio,
    hasUnsavedChanges: false,
  })),

  applyChanges: () => set((state) => ({
    isEditMode: false,
    hasUnsavedChanges: false,
    generatedAudio: state.generatedAudio ? {
      ...state.generatedAudio,
      duration: state.selectionEnd - state.selectionStart
    } : null,
    originalAudio: null
  })),

  setSelectionStart: (time) => set({
    selectionStart: time,
    hasUnsavedChanges: true
  }),

  setSelectionEnd: (time) => set({
    selectionEnd: time,
    hasUnsavedChanges: true
  }),

  resetState: () => set(initialState),
}));
