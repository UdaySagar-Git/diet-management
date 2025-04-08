import { ScrollView, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuth } from "@/context/auth-provider";

const Profile = () => {
	const { user, signOut } = useAuth();

	const formatDate = (dateString: string) => {
		return new Date(dateString).toLocaleDateString();
	};

	return (
		<ScrollView className="flex-1 bg-background">
			<View className="items-center p-6">
				<View className="mb-6 w-full rounded-xl bg-card p-6 shadow-lg">
					<InfoItem
						label="Name"
						value={user?.name || "Not set"}
					/>
					<InfoItem
						label="Username"
						value={user?.username || "Not set"}
					/>
					<InfoItem label="Email" value={user?.email || "Not set"} />
					<InfoItem label="Role" value={user?.role || "Not set"} />
					<InfoItem
						label="Member since"
						value={user?.created_at ? formatDate(user.created_at) : "Not set"}
					/>
				</View>
				<Button
					className="w-full"
					onPress={signOut}
					variant="destructive"
					size="lg"
				>
					<Text className="text-lg font-bold">Sign Out</Text>
				</Button>
			</View>
		</ScrollView>
	);
};

const InfoItem = ({
	label,
	value,
}: {
	label: string;
	value: string | undefined;
}) => (
	<View className="mb-4 flex-row items-center justify-between border-b border-border pb-2">
		<Text className="text-lg font-semibold text-foreground">{label}:</Text>
		<Text className="text-lg text-muted-foreground">{value}</Text>
	</View>
);

export default Profile;
