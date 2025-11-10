import { FC, PropsWithChildren, useEffect, useRef } from "react";
import { Animated, ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{ style?: ViewStyle }>;

export const AnimateInView: FC<FadeInViewProps> = ({children, style}) => {
  const opacityAnim = useRef(new Animated.Value(0)).current; 

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacityAnim]);

  return (
    <Animated.View
      style={{
        ...(style ?? {}),
        opacity: opacityAnim,
      }}
    >
      {children}
    </Animated.View>
  );
};
