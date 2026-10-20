import {
  ArrowLeftRight,
  Award,
  Banknote,
  Briefcase,
  Car,
  CircleEllipsis,
  Fuel,
  Gift,
  GraduationCap,
  HeartPulse,
  House,
  KeyRound,
  Landmark,
  Laptop,
  PartyPopper,
  Percent,
  PiggyBank,
  Popcorn,
  Repeat,
  RotateCcw,
  Shirt,
  ShoppingCart,
  Smartphone,
  Sofa,
  Store,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react-native';

import type { ThemeTokens } from '@/theme';

export type ColorToken = Extract<
  keyof ThemeTokens,
  'catOrange' | 'catBlue' | 'catSand' | 'catViolet' | 'catRose' | 'catTeal' | 'catGreen' | 'subtle'
>;

export type Visual = { icon: LucideIcon; color: ColorToken };

const OTHER: Visual = { icon: CircleEllipsis, color: 'subtle' };

const OUT: Record<string, Visual> = {
  food: { icon: ShoppingCart, color: 'catOrange' },
  transport: { icon: Car, color: 'catBlue' },
  fuel: { icon: Fuel, color: 'catBlue' },
  rent: { icon: House, color: 'catViolet' },
  bills: { icon: Zap, color: 'catSand' },
  phone: { icon: Smartphone, color: 'catTeal' },
  health: { icon: HeartPulse, color: 'catRose' },
  school: { icon: GraduationCap, color: 'catBlue' },
  family: { icon: Users, color: 'catRose' },
  gifts: { icon: Gift, color: 'catViolet' },
  fun: { icon: Popcorn, color: 'catTeal' },
  clothes: { icon: Shirt, color: 'catRose' },
  home: { icon: Sofa, color: 'catSand' },
  events: { icon: PartyPopper, color: 'catViolet' },
  fees: { icon: Landmark, color: 'catSand' },
  debt: { icon: Repeat, color: 'catViolet' },
  save: { icon: PiggyBank, color: 'catGreen' },
};

const IN: Record<string, Visual> = {
  salary: { icon: Briefcase, color: 'catGreen' },
  sale: { icon: Store, color: 'catTeal' },
  freelance: { icon: Laptop, color: 'catBlue' },
  bonus: { icon: Award, color: 'catGreen' },
  refund: { icon: RotateCcw, color: 'catSand' },
  gift: { icon: Gift, color: 'catRose' },
  rentin: { icon: KeyRound, color: 'catViolet' },
  interest: { icon: Percent, color: 'catTeal' },
};

export const TRANSFER_VISUAL: Visual = { icon: ArrowLeftRight, color: 'catViolet' };

export function categoryVisual(kind: 'in' | 'out', key: string | null | undefined): Visual {
  if (!key) return OTHER;
  return (kind === 'in' ? IN : OUT)[key] ?? OTHER;
}

const ACCOUNTS: Record<'bank' | 'mobile' | 'cash' | 'group', Visual> = {
  mobile: { icon: Smartphone, color: 'catSand' },
  bank: { icon: Landmark, color: 'catBlue' },
  cash: { icon: Banknote, color: 'catOrange' },
  group: { icon: Users, color: 'catViolet' },
};

export function accountVisual(type: keyof typeof ACCOUNTS): Visual {
  return ACCOUNTS[type];
}
