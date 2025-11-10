import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/use-theme-color';

import {NativeStackHeaderProps} from '@react-navigation/native-stack'
import { ExternalPathString, Link, RelativePathString } from 'expo-router';
import { ThemedText } from './themed-text';
import { LinkProps } from '@react-navigation/native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function Header({ back }: NativeStackHeaderProps) {

  return <Link href={(back?.href ?? '/') as RelativePathString}>
          <Link.Trigger>
            <ThemedText type="subtitle">back</ThemedText>
          </Link.Trigger>
          <Link.Preview />
          
        </Link>
}
