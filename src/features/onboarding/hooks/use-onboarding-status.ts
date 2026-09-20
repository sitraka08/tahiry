import { getSetting, setSetting } from '@/db';

export const isOnboarded = () => getSetting('onboarded') === '1';
export const markOnboarded = () => setSetting('onboarded', '1');
