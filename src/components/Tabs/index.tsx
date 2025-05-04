import {
  Tab as NextUITab,
  Tabs as NextUITabs,
  type TabItemProps as NextUITabProps,
  type TabsProps as NextUITabsProps,
} from '@heroui/react'
import React from 'react'

interface TabsProps extends NextUITabsProps {}

function Tabs(props: TabsProps) {
  return <NextUITabs {...props} />
}

interface TabProps extends NextUITabProps {}

export function Tab(props: TabProps) {
  return <NextUITab {...props} />
}

export default Tabs
