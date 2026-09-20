import { TabSlot, Tabs } from 'expo-router/ui';

import { TabBar } from '@/components/tab-bar';

export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <TabBar />
    </Tabs>
  );
}
