import { zodResolver } from '@hookform/resolvers/zod';
import {
  ArrowRight,
  Banknote,
  Landmark,
  Smartphone,
  Users,
  type LucideIcon,
} from 'lucide-react-native';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { View } from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut, LinearTransition } from 'react-native-reanimated';

import { AppText, AppTextInput, Button, Chip, Headline } from '@/components';
import { formatNumber, parseAmount } from '@/lib/money';
import { useThemeTokens } from '@/theme';

import { accountsStepSchema, type AccountsStepValues } from '../schemas/accounts-schema';
import type { AccountDraft, AccountKind } from '../types';
import { OnboardingShell } from './onboarding-shell';
import { OptionCard } from './option-card';

const KINDS: { type: AccountKind; label: string; base: string; icon: LucideIcon }[] = [
  { type: 'bank', label: 'Banque', base: 'Banque', icon: Landmark },
  { type: 'mobile', label: 'Mobile Money', base: 'Mobile Money', icon: Smartphone },
  { type: 'cash', label: 'Espèces', base: 'Portefeuille', icon: Banknote },
  { type: 'group', label: 'Épargne de groupe', base: 'Épargne de groupe', icon: Users },
];

type Props = {
  initial: AccountDraft[];
  onSubmit: (accounts: AccountDraft[]) => void;
  onSkip: () => void;
  onBack: () => void;
};

function RowIcon({ type }: { type: AccountKind }) {
  const t = useThemeTokens();
  const Icon = KINDS.find((k) => k.type === type)?.icon ?? Banknote;
  const tone = {
    bank: { bg: t.accent, fg: t.onAccent },
    mobile: { bg: t.dark, fg: t.onDark },
    cash: { bg: t.tile, fg: t.ink },
    group: { bg: t.tile, fg: t.ink },
  }[type];
  return (
    <View
      style={{ backgroundColor: tone.bg }}
      className="size-9 items-center justify-center rounded-[11px]"
    >
      <Icon size={18} color={tone.fg} strokeWidth={1.8} />
    </View>
  );
}

export function AccountsStep({ initial, onSubmit, onSkip, onBack }: Props) {
  const t = useThemeTokens();
  const { control, handleSubmit, formState } = useForm<AccountsStepValues>({
    resolver: zodResolver(accountsStepSchema),
    defaultValues: { accounts: initial },
  });
  const { fields, append, remove } = useFieldArray({ control, name: 'accounts' });
  const values = useWatch({ control, name: 'accounts' });

  const countOf = (type: AccountKind) => values.filter((a) => a.type === type).length;

  const nameFor = (type: AccountKind) => {
    const kind = KINDS.find((k) => k.type === type);
    const n = countOf(type);
    return n === 0 ? (kind?.base ?? '') : `${kind?.base} ${n + 1}`;
  };

  const add = (type: AccountKind) => append({ type, name: nameFor(type), balance: '' });

  const toggle = (type: AccountKind) => {
    if (countOf(type) === 0) return add(type);
    const indexes = values.flatMap((a, i) => (a.type === type ? [i] : []));
    remove(indexes);
  };

  const rows = KINDS.reduce<(typeof KINDS)[]>((acc, k, i) => {
    if (i % 2 === 0) acc.push([k]);
    else acc[acc.length - 1].push(k);
    return acc;
  }, []);

  const error =
    formState.errors.accounts?.root?.message ??
    formState.errors.accounts?.find?.((e) => e?.name)?.name?.message;

  return (
    <OnboardingShell
      step={1}
      onBack={onBack}
      headerRight={{ kind: 'skip', onPress: onSkip }}
      title={<Headline lead="Où gardes-tu " highlight="ton argent" tail=" ?" />}
      subtitle="Choisis tout ce que tu utilises."
      footer={
        <Button
          label="Continuer"
          icon={<ArrowRight size={20} color={t.onDark} strokeWidth={2} />}
          onPress={handleSubmit((v) => onSubmit(v.accounts))}
        />
      }
    >
      <View className="mt-4 gap-2">
        {rows.map((pair, index) => (
          <View key={pair[0].type} className="flex-row gap-2">
            {pair.map((k, i) => (
              <Animated.View
                key={k.type}
                entering={FadeInDown.delay(100 + (index * 2 + i) * 60).duration(300)}
                style={{ flex: 1 }}
              >
                <OptionCard
                  variant="type"
                  label={k.label}
                  selected={countOf(k.type) > 0}
                  onPress={() => toggle(k.type)}
                />
              </Animated.View>
            ))}
          </View>
        ))}
      </View>

      <AppText weight="bold" className="mt-[22px] text-headline">
        Tes comptes et leur solde actuel
      </AppText>
      <AppText className="mt-1 text-caption text-muted">
        Renomme-les comme tu veux. Tu peux en ajouter plusieurs.
      </AppText>

      <View className="mt-2.5 gap-1.5">
        {fields.map((field, index) => (
          <Animated.View
            key={field.id}
            entering={FadeIn.duration(200)}
            exiting={FadeOut.duration(140)}
            layout={LinearTransition.duration(200)}
          >
            <View className="flex-row items-center gap-3 rounded-2xl bg-card py-2 pl-2.5 pr-2">
              <RowIcon type={field.type} />
              <Controller
                control={control}
                name={`accounts.${index}.name`}
                render={({ field: f }) => (
                  <AppTextInput
                    weight="medium"
                    accessibilityLabel="Nom du compte"
                    value={f.value}
                    onChangeText={f.onChange}
                    numberOfLines={1}
                    className="h-10 flex-1 border-b border-dashed border-outline p-0 text-sm"
                  />
                )}
              />
              <Controller
                control={control}
                name={`accounts.${index}.balance`}
                render={({ field: f }) => (
                  <AppTextInput
                    weight="bold"
                    accessibilityLabel={`Solde de ${values[index]?.name ?? 'ce compte'}`}
                    placeholder="0 Ar"
                    keyboardType="number-pad"
                    value={f.value}
                    onChangeText={(text) => {
                      const n = parseAmount(text);
                      f.onChange(n ? formatNumber(n) : '');
                    }}
                    className="h-10 w-28 rounded-xl border border-outline bg-tile px-3 py-0 text-right text-sm"
                  />
                )}
              />
            </View>
          </Animated.View>
        ))}
      </View>

      {error ? <AppText className="mt-2 text-xs text-danger">{error}</AppText> : null}

      <View className="mt-2 flex-row flex-wrap gap-2">
        <Chip large dashed label="+ Une banque" onPress={() => add('bank')} />
        <Chip large dashed label="+ Un mobile money" onPress={() => add('mobile')} />
      </View>
    </OnboardingShell>
  );
}
