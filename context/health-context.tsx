import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Meal = {
  id: string;
  type: string;
  calories: number;
  description: string;
  timestamp: string;
};

type WeightEntry = {
  id: string;
  weight: number;
  timestamp: string;
};

type WaterEntry = {
  id: string;
  amount: number;
  timestamp: string;
};

type StepsEntry = {
  id: string;
  steps: number;
  timestamp: string;
};

type HealthContextType = {
  meals: Meal[];
  weights: WeightEntry[];
  waterIntakes: WaterEntry[];
  steps: StepsEntry[];
  waterGoal: number;
  addMeal: (meal: Omit<Meal, "id" | "timestamp">) => void;
  addWeight: (weight: Omit<WeightEntry, "id" | "timestamp">) => void;
  addWater: (water: Omit<WaterEntry, "id" | "timestamp">) => void;
  addSteps: (steps: { steps: number }) => void;
  setWaterGoal: (goal: number) => void;
  getTodayMeals: () => Meal[];
  getTodayWater: () => number;
  getTodaySteps: () => number;
  getLatestWeight: () => number | null;
  getWeeklyWeightData: () => { labels: string[]; data: number[] };
  getMonthlyWeightData: () => { labels: string[]; data: number[] };
  getWeeklyStepsData: () => { labels: string[]; data: number[] };
  getMonthlyStepsData: () => { labels: string[]; data: number[] };
};

const HealthContext = createContext<HealthContextType | null>(null);

export const HealthProvider = ({ children }: { children: React.ReactNode }) => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [weights, setWeights] = useState<WeightEntry[]>([]);
  const [waterIntakes, setWaterIntakes] = useState<WaterEntry[]>([]);
  const [steps, setSteps] = useState<StepsEntry[]>([]);
  const [waterGoal, setWaterGoal] = useState(2500);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [mealsData, weightsData, waterData, stepsData, goalData] = await Promise.all([
        AsyncStorage.getItem("meals"),
        AsyncStorage.getItem("weights"),
        AsyncStorage.getItem("water"),
        AsyncStorage.getItem("steps"),
        AsyncStorage.getItem("waterGoal"),
      ]);

      if (mealsData) setMeals(JSON.parse(mealsData));
      if (weightsData) setWeights(JSON.parse(weightsData));
      if (waterData) setWaterIntakes(JSON.parse(waterData));
      if (stepsData) setSteps(JSON.parse(stepsData));
      if (goalData) setWaterGoal(JSON.parse(goalData));
    } catch (error) {
      console.error("Error loading health data:", error);
    }
  };

  const saveData = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key}:`, error);
    }
  };

  const handleSetWaterGoal = async (goal: number) => {
    setWaterGoal(goal);
    await saveData("waterGoal", goal);
  };

  const addMeal = async (meal: Omit<Meal, "id" | "timestamp">) => {
    const newMeal: Meal = {
      ...meal,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedMeals = [...meals, newMeal];
    setMeals(updatedMeals);
    await saveData("meals", updatedMeals);
  };

  const addWeight = async (weight: Omit<WeightEntry, "id" | "timestamp">) => {
    const newWeight: WeightEntry = {
      ...weight,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedWeights = [...weights, newWeight];
    setWeights(updatedWeights);
    await saveData("weights", updatedWeights);
  };

  const addWater = async (water: Omit<WaterEntry, "id" | "timestamp">) => {
    const newWater: WaterEntry = {
      ...water,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedWater = [...waterIntakes, newWater];
    setWaterIntakes(updatedWater);
    await saveData("water", updatedWater);
  };

  const addSteps = async (stepData: { steps: number }) => {
    const newSteps: StepsEntry = {
      ...stepData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    const updatedSteps = [...steps, newSteps];
    setSteps(updatedSteps);
    await saveData("steps", updatedSteps);
  };

  const getTodayMeals = () => {
    const today = new Date().toISOString().split("T")[0];
    return meals.filter((meal) => meal.timestamp.startsWith(today));
  };

  const getTodayWater = () => {
    const today = new Date().toISOString().split("T")[0];
    return waterIntakes
      .filter((water) => water.timestamp.startsWith(today))
      .reduce((sum, water) => sum + water.amount, 0);
  };

  const getTodaySteps = () => {
    const today = new Date().toISOString().split("T")[0];
    return steps
      .filter((step) => step.timestamp.startsWith(today))
      .reduce((sum, step) => sum + step.steps, 0);
  };

  const getLatestWeight = () => {
    if (weights.length === 0) return null;
    return weights[weights.length - 1].weight;
  };

  const getWeeklyWeightData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const data = last7Days.map((day) => {
      const dayWeights = weights.filter((w) => w.timestamp.startsWith(day));
      return dayWeights.length > 0
        ? dayWeights[dayWeights.length - 1].weight
        : null;
    });

    return {
      labels: last7Days.map((day) => new Date(day).toLocaleDateString("en-US", { weekday: "short" })),
      data: data.map((d) => d || 0),
    };
  };

  const getMonthlyWeightData = () => {
    const last6Months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      return date.toISOString().split("T")[0].slice(0, 7);
    }).reverse();

    const data = last6Months.map((month) => {
      const monthWeights = weights.filter((w) =>
        w.timestamp.startsWith(month)
      );
      return monthWeights.length > 0
        ? monthWeights[monthWeights.length - 1].weight
        : null;
    });

    return {
      labels: last6Months.map((month) =>
        new Date(month + "-01").toLocaleDateString("en-US", { month: "short" })
      ),
      data: data.map((d) => d || 0),
    };
  };

  const getWeeklyStepsData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split("T")[0];
    }).reverse();

    const data = last7Days.map((day) => {
      const daySteps = steps.filter((s) => s.timestamp.startsWith(day));
      return daySteps.reduce((sum, s) => sum + s.steps, 0);
    });

    return {
      labels: last7Days.map((day) => new Date(day).toLocaleDateString("en-US", { weekday: "short" })),
      data,
    };
  };

  const getMonthlyStepsData = () => {
    const last4Weeks = Array.from({ length: 4 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i * 7);
      return date.toISOString().split("T")[0];
    }).reverse();

    const data = last4Weeks.map((week) => {
      const weekSteps = steps.filter((s) => {
        const stepDate = new Date(s.timestamp);
        const weekDate = new Date(week);
        return (
          stepDate >= weekDate &&
          stepDate < new Date(weekDate.setDate(weekDate.getDate() + 7))
        );
      });
      return weekSteps.reduce((sum, s) => sum + s.steps, 0);
    });

    return {
      labels: last4Weeks.map((week) => `Week ${new Date(week).getDate()}`),
      data,
    };
  };

  return (
    <HealthContext.Provider
      value={{
        meals,
        weights,
        waterIntakes,
        steps,
        waterGoal,
        addMeal,
        addWeight,
        addWater,
        addSteps,
        setWaterGoal: handleSetWaterGoal,
        getTodayMeals,
        getTodayWater,
        getTodaySteps,
        getLatestWeight,
        getWeeklyWeightData,
        getMonthlyWeightData,
        getWeeklyStepsData,
        getMonthlyStepsData,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error("useHealth must be used within a HealthProvider");
  }
  return context;
}; 