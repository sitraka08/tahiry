import { CloudUpload, Pencil, User } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';

import { AppSheet, AppText, Button, TextField, type SheetMethods } from '@/components';
import { useThemeTokens } from '@/theme';

type Props = { name: string; onSaveName: (name: string) => void; onBackup: () => void };

export function ProfileCard({ name, onSaveName, onBackup }: Props) {
  const t = useThemeTokens();
  const sheetRef = useRef<SheetMethods>(null);
  const [draft, setDraft] = useState(name);

  return (
    <View className="mx-4 mt-4 gap-3 rounded-card bg-card p-4">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Modifier mon prénom"
        onPress={() => {
          setDraft(name);
          requestAnimationFrame(() => sheetRef.current?.present());
        }}
        className="flex-row items-center gap-3 active:opacity-70"
      >
        <View className="size-11 items-center justify-center rounded-full bg-accent">
          <User size={22} color={t.onAccent} strokeWidth={1.8} />
        </View>
        <View className="flex-1 gap-0.5">
          <AppText weight="bold" className="text-base">
            {name || 'Ajoute ton prénom'}
          </AppText>
          <AppText className="text-xs text-muted">Données sur ce téléphone uniquement</AppText>
        </View>
        <Pencil size={18} color={t.muted} strokeWidth={1.8} />
      </Pressable>

      <Button
        label="Exporter une sauvegarde"
        size="sm"
        icon={<CloudUpload size={18} color={t.onDark} strokeWidth={1.8} />}
        onPress={onBackup}
      />

      <AppSheet sheetRef={sheetRef}>
        <View className="gap-3 pt-2">
          <AppText weight="bold" className="text-base">
            Ton prénom
          </AppText>
          <TextField
            label="Prénom"
            placeholder="Ex. Tahiry"
            value={draft}
            onChangeText={setDraft}
            autoCapitalize="words"
          />
          <Button
            label="Enregistrer"
            onPress={() => {
              onSaveName(draft);
              sheetRef.current?.dismiss();
            }}
          />
        </View>
      </AppSheet>
    </View>
  );
}
