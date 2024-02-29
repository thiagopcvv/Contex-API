import React, { useContext } from "react";
import { View, StyleSheet, Button } from "react-native";
import { signIn } from "../../services/auth";
import AuthContext from "../../contexts/auth";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
  });

const Dashboard: React.FC = () => {

    const {signOut} = useContext(AuthContext)

    async function handleSignOut() {
        signOut()
      }

    return (
    <View style={styles.container}>
        <Button title="Logout" onPress={handleSignOut} />
    </View>
    )
    };

export default Dashboard;