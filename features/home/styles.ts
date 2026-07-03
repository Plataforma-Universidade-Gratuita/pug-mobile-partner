import { StyleSheet } from "react-native";

export function createStyles(screenBackground: string) {
	return StyleSheet.create({
		screen: {
			flex: 1,
			backgroundColor: screenBackground,
		},
	});
}
