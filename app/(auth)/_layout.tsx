import { Redirect, Tabs } from "expo-router";

// Styles
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { COLORS } from "@/constants/Colors";
import { useAuth } from "@clerk/clerk-expo";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginTop: 3 }} {...props} />;
}

export const LogoutButton = () => {
  const { signOut } = useAuth();

  return (
    <Pressable onPress={() => signOut()} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={"#fff"} />
    </Pressable>
  );
};

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.salmon,
        tabBarLabelStyle: { fontSize: 12, fontFamily: "WorkSans" },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => <TabBarIcon name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Record"
        options={{
          title: "Record",
          tabBarIcon: ({ color }) => <TabBarIcon name="pencil" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Map"
        options={{
          title: "Map",
          tabBarIcon: ({ color }) => <TabBarIcon name="map" color={color} />,
        }}
      />
    </Tabs>
  );
}
