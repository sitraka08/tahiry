import { TabList, TabSlot, TabTrigger, Tabs } from 'expo-router/ui';
import { ChartColumn, Clock, House, LayoutGrid } from 'lucide-react-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { TabBarFade, TabButton, TabFab } from '@/components/tab-bar';

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs style={{ flex: 1 }}>
      <TabSlot style={{ flex: 1 }} />
      <TabList asChild>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 28,
            paddingHorizontal: 12,
            paddingBottom: Math.max(insets.bottom, 12),
          }}
        >
          <TabBarFade />
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon={House} label="Accueil" fill="cutout" />
          </TabTrigger>
          <TabTrigger name="history" href="/history" asChild>
            <TabButton icon={Clock} label="Historique" fill="cutout" />
          </TabTrigger>
          <TabFab />
          <TabTrigger name="stats" href="/stats" asChild>
            <TabButton icon={ChartColumn} label="Stats" />
          </TabTrigger>
          <TabTrigger name="more" href="/more" asChild>
            <TabButton icon={LayoutGrid} label="Plus" fill="solid" />
          </TabTrigger>
        </View>
      </TabList>
    </Tabs>
  );
}
