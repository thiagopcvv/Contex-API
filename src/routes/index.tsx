import React, { useContext } from 'react';

import AuthRoutes from '../routes/auth.routes';
import AppRoutes from '../routes/app.routes';

import AuthContext from '../contexts/auth';
import { ActivityIndicator, View } from 'react-native';



const Routes: React.FC = () => {
    const {signed, loading} = useContext(AuthContext)

    if(loading){
      return(
        <View>
          <ActivityIndicator></ActivityIndicator>
        </View>
      )
    }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;