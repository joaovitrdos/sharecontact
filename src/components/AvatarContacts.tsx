import { StyleSheet, View, Image, ImageProps, Text } from "react-native";
import { Colors } from "../constants/Colors";


const variants = {
    size: {
        medium: {
            width: 54,
            height: 54,
            borderRadius: 20
        },
        large: {
            width: 150,
            height: 150,
            borderRadius: 999
        }
    },
    text:{
        medium: {
            fontSize: 34,
            color: "#FFF"
        },
        large: {
            fontSize: 34,
            color: "#FFF"
        }

    }
}

type Props = {
    image?: ImageProps | null
    name: string
    variant?: "medium" | "large"
}

export function AvatarContacts({ image, name, variant = "medium"}: Props){
    return(
        <View style={styles.container}>
            {
                image ? ( <Image source={image} style={variants.size[variant]}/> ) : (
                
                <View style={styles.letter}>
                    <Text style={variants.text[variant]}>
                        {name[0].toUpperCase()}
                    </Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{

    },
    letter:{
        width: 54,
        height: 54,
        backgroundColor: Colors.colors.black,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    }
})