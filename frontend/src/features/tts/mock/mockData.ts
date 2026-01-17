import { VoiceProfile, Language, AudioData } from '../types/tts.types';

export const mockVoices: VoiceProfile[] = [
    {
        id: 'voice-1',
        name: 'Aria - Professional',
        tags: ['Professional', 'Neutral', 'Narrative'],
        language: 'en-US',
    },
    {
        id: 'voice-2',
        name: 'Marcus - Energetic',
        tags: ['Energetic', 'Young', 'Promotional'],
        language: 'en-US',
    },
    {
        id: 'voice-3',
        name: 'Sofia - Warm',
        tags: ['Warm', 'Friendly', 'Conversational'],
        language: 'en-US',
    },
];

export const mockLanguages: Language[] = [
    { code: 'en-US', name: 'English', region: 'United States' },
    { code: 'en-GB', name: 'English', region: 'United Kingdom' },
    { code: 'es-ES', name: 'Spanish', region: 'Spain' },
    { code: 'fr-FR', name: 'French', region: 'France' },
];

export const mockAudioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export const mockUserCredits = {
    remaining: 1250,
    total: 1500,
    percentage: 82,
};

export const mockUserStorage = {
    used: 9.4,
    total: 10,
    percentage: 94
};

export const mockAudioHistory: AudioData[] = [
    {
        id: 'audio-1',
        url: mockAudioUrl,
        duration: 43,
        createdAt: '2 mins ago',
        text: 'VoxAI provides the most natural sounding voices...',
        voiceProfile: mockVoices[0],
    },
    {
        id: 'audio-2',
        url: mockAudioUrl,
        duration: 120,
        createdAt: '1 hour ago',
        text: 'The future of AI is here with our new platform...',
        voiceProfile: mockVoices[1],
    },
    {
        id: 'audio-3',
        url: mockAudioUrl,
        duration: 15,
        createdAt: '3 hours ago',
        text: 'Hello, welcome to our service.',
        voiceProfile: mockVoices[2],
    },
    {
        id: 'audio-4',
        url: mockAudioUrl,
        duration: 45,
        createdAt: '1 day ago',
        text: 'This is a test of the emergency broadcast system...',
        voiceProfile: mockVoices[0],
    },
    {
        id: 'audio-5',
        url: mockAudioUrl,
        duration: 10,
        createdAt: '2 days ago',
        text: 'Short clip.',
        voiceProfile: mockVoices[1],
    },
];
