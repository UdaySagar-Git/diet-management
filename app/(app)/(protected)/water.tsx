import { View, TextInput, ScrollView, Pressable } from "react-native";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Card } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { useHealth } from "@/context/health-context";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  withSequence,
  withTiming,
  withDelay,
} from "react-native-reanimated";
import { useRouter } from "expo-router";

const WaterPage = () => {
  const router = useRouter();
  const [waterAmount, setWaterAmount] = useState("");
  const { addWater, getTodayWater, waterIntakes, waterGoal } = useHealth();
  const todayWater = getTodayWater();

  const progress = useSharedValue(0);
  const isCompleted = useSharedValue(0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);

  const handleLogWater = async () => {
    if (!waterAmount) return;
    await addWater({ amount: parseFloat(waterAmount) });
    setWaterAmount("");
    updateProgress();
  };

  const updateProgress = () => {
    const newProgress = (todayWater / waterGoal) * 100;
    progress.value = withSpring(newProgress, {
      damping: 15,
      stiffness: 100,
    });

    if (newProgress >= 100) {
      isCompleted.value = withSpring(1, {
        damping: 15,
        stiffness: 100,
      });
      triggerCelebration();
    } else {
      isCompleted.value = withSpring(0, {
        damping: 15,
        stiffness: 100,
      });
    }
  };

  const triggerCelebration = () => {
    scale.value = withSequence(
      withSpring(1.2),
      withSpring(1)
    );
    opacity.value = withSequence(
      withTiming(1, { duration: 300 }),
      withDelay(2000, withTiming(0, { duration: 300 }))
    );
  };

  const progressStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(1 + isCompleted.value * 0.1),
        },
      ],
    };
  });

  const celebrationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <View className="px-4 py-6 space-y-6">
        <Card className="p-6 bg-card">
          <Text className="text-2xl font-bold text-foreground mb-6">
            Log Water Intake
          </Text>

          <View className="space-y-4">
            <View>
              <Text className="text-lg font-semibold text-foreground mb-2">
                Amount (in ml)
              </Text>
              <TextInput
                className="bg-muted rounded-lg p-4 text-foreground"
                placeholder="Enter amount in ml"
                keyboardType="numeric"
                value={waterAmount}
                onChangeText={setWaterAmount}
              />
            </View>

            <Button
              className="h-14 bg-primary w-full mt-4"
              onPress={handleLogWater}
            >
              <Text className="text-primary-foreground font-semibold text-base">
                Log Water Intake
              </Text>
            </Button>
          </View>
        </Card>

        <Card className="p-6 bg-card">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-2xl font-bold text-foreground">
              Today's Progress
            </Text>
            <Pressable
              onPress={() => router.push("/water-goal")}
              className="p-2 rounded-full bg-muted/50"
            >
              <Ionicons name="settings-outline" size={24} color="#3b82f6" />
            </Pressable>
          </View>

          <Animated.View style={progressStyle} className="items-center">
            <Text className="text-4xl font-bold text-primary">
              {(todayWater / 1000).toFixed(1)}L
            </Text>
            <Text className="text-sm text-muted-foreground mt-2">
              Goal: {(waterGoal / 1000).toFixed(1)}L
            </Text>
          </Animated.View>

          <Animated.View
            style={celebrationStyle}
            className="absolute inset-0 items-center justify-center bg-green-500/90 rounded-lg"
          >
            <View className="items-center">
              <Ionicons name="checkmark-circle" size={48} color="#16a34a" />
              <Text className="text-green-900 font-bold text-xl mt-2">
                Goal Achieved! 🎉
              </Text>
            </View>
          </Animated.View>
        </Card>

        <Card className="p-6 bg-card">
          <Text className="text-2xl font-bold text-foreground mb-6">
            Water Logs
          </Text>
          <View className="space-y-4">
            {waterIntakes.length === 0 ? (
              <Text className="text-muted-foreground text-center">
                No water logs yet
              </Text>
            ) : (
              waterIntakes
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .map((log) => (
                  <View
                    key={log.id}
                    className="flex-row items-center justify-between p-4 bg-muted rounded-lg mb-2"
                  >
                    <View className="flex-row items-center space-x-3">
                      <Ionicons name="water-outline" size={24} color="#3b82f6" />
                      <View>
                        <Text className="text-foreground font-semibold">
                          {(log.amount / 1000).toFixed(1)}L
                        </Text>
                        <Text className="text-sm text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </View>
                ))
            )}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
};

export default WaterPage; 