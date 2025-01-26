import * as React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { cn } from "@/lib/utils";

interface ProgressProps {
	value?: number;
	className?: string;
}

const Progress = React.forwardRef<View, ProgressProps>(
	({ value = 0, className }, ref) => {
		const percentage = Math.min(Math.max(value, 0), 100);

		const animatedStyle = useAnimatedStyle(() => ({
			width: `${percentage}%`,
		}));

		return (
			<View
				ref={ref}
				className={cn(
					"h-2 w-full overflow-hidden rounded-full bg-secondary",
					className,
				)}
			>
				<Animated.View className="h-full bg-primary" style={animatedStyle} />
			</View>
		);
	},
);

Progress.displayName = "Progress";

export { Progress };
