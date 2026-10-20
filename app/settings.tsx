import { useRouter } from 'expo-router';
import {
  Banknote,
  Bell,
  ChevronLeft,
  Coins,
  Download,
  EyeOff,
  KeyRound,
  Landmark,
  PiggyBank,
  Repeat,
  Target,
  Upload,
} from 'lucide-react-native';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText, IconButton } from '@/components';
import {
  AppearancePicker,
  ProfileCard,
  SettingsRow,
  SettingsSection,
  chooseColorScheme,
  hydrateSettings,
  saveUserName,
  useColorSchemeChoice,
  useUserName,
} from '@/features/settings';
import { restoreBackup, shareBackup } from '@/features/backup';
import { useSecuritySettings } from '@/features/security';
import { useUiStore } from '@/lib/ui-store';
import { toast } from '@/lib/toast-store';

export default function Settings() {
  const router = useRouter();
  const name = useUserName();
  const colorScheme = useColorSchemeChoice();
  const { pinEnabled } = useSecuritySettings();
  const hideAmounts = useUiStore((s) => s.hideAmounts);
  const setHideAmounts = useUiStore((s) => s.setHideAmounts);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View className="flex-row items-center gap-3 px-5 pt-5">
        <IconButton icon={ChevronLeft} label="Retour" onPress={() => router.back()} />
        <AppText accessibilityRole="header" weight="bold" className="text-2xl">
          Réglages
        </AppText>
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard name={name} onSaveName={saveUserName} onBackup={shareBackup} />

        <View className="mx-5 mt-5">
          <AppText
            weight="medium"
            className="mb-2.5 text-[13px] uppercase text-muted"
            style={{ letterSpacing: 0.6 }}
          >
            Apparence
          </AppText>
          <AppearancePicker value={colorScheme} onChange={chooseColorScheme} />
        </View>

        <SettingsSection title="Général">
          <SettingsRow
            icon={Landmark}
            label="Mes comptes"
            onPress={() => router.push('/accounts')}
          />
          <SettingsRow icon={Coins} label="Devise" value="Ariary (Ar)" />
          <SettingsRow
            icon={KeyRound}
            label="Code PIN"
            value={pinEnabled ? 'Activé' : 'Désactivé'}
            onPress={() => router.push('/pin')}
          />
          <SettingsRow
            icon={EyeOff}
            label="Masquer les montants"
            toggle={{ value: hideAmounts, onChange: setHideAmounts }}
          />
          <SettingsRow icon={Bell} label="Rappels" last onPress={() => router.push('/reminders')} />
        </SettingsSection>

        <SettingsSection title="Sauvegarde">
          <SettingsRow icon={Upload} label="Exporter mes données" onPress={shareBackup} />
          <SettingsRow
            icon={Download}
            label="Importer une sauvegarde"
            last
            onPress={() =>
              restoreBackup({
                confirm: true,
                onRestored: () => {
                  hydrateSettings();
                  toast('Sauvegarde importée');
                },
              })
            }
          />
        </SettingsSection>

        <SettingsSection title="Outils">
          <SettingsRow icon={PiggyBank} label="Budgets" onPress={() => router.push('/budgets')} />
          <SettingsRow
            icon={Target}
            label="Objectifs d’épargne"
            onPress={() => router.push('/goals')}
          />
          <SettingsRow icon={Repeat} label="Dettes & prêts" onPress={() => router.push('/debts')} />
          <SettingsRow
            icon={Banknote}
            label="Compter mes espèces"
            last
            onPress={() => router.push('/cash-count')}
          />
        </SettingsSection>
      </ScrollView>
    </SafeAreaView>
  );
}
