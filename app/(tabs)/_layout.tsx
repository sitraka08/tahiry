import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { Bell, ChartColumn, Clock, House } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabButton, TabFab } from '@/components/tab-bar';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs>
      <TabSlot />
      <TabList
        style={{ minHeight: 84, paddingBottom: Math.max(insets.bottom, 18) }}
        className="flex-row items-center justify-around rounded-t-[26px] bg-dark px-3 pt-2"
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
      </TabList>
    </Tabs>
  );
}
