import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { Bell, ChartColumn, Clock, House } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabButton, TabFab } from '@/components/tab-bar';
import { useThemeTokens } from '@/theme';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const t = useThemeTokens();

  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            minHeight: 72,
            paddingTop: 6,
            paddingHorizontal: 12,
            paddingBottom: Math.max(insets.bottom, 12),
            backgroundColor: t.bg,
          }}
        >
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon={House} label="Accueil" />
          </TabTrigger>
          <TabTrigger name="history" href="/history" asChild>
            <TabButton icon={Clock} label="Historique" />
          </TabTrigger>
          <TabFab />
          <TabTrigger name="stats" href="/stats" asChild>
            <TabButton icon={ChartColumn} label="Stats" />
          </TabTrigger>
          <TabTrigger name="reminders" href="/reminders" asChild>
            <TabButton icon={Bell} label="Rappels" />
          </TabTrigger>
        </View>
      </TabList>
    </Tabs>
  );
}
