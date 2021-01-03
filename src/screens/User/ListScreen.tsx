import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation';
import GenericList from '../../components/GenericList';
import UserListItem from '../../components/UserListItem';
import colors from '../../styles/colors';
import {observer} from 'mobx-react-lite';
import {useStore} from '../../stores';
import {NavigationProps, UserType} from '../../types';

/**
 * UserListScreen is a screen that renders UI components displaying
 * the user list retrieved from the backend API.
 *
 * @author Joshua Leung <joshuaycleung@gmail.com>
 */
const UserListScreen = ({navigation}: NavigationProps) => {
  const {userStore} = useStore();
  useEffect(() => {
    userStore.loadUserList();
  }, [userStore]);

  // Update UserStore with selected user and navigate to UserDetailScreen.
  const onPressUserRow = (user: UserType) => {
    userStore.selectUser(user);
    navigation.navigate({
      routeName: 'UserDetail',
      params: {
        name: user.name,
        onBack: userStore.resetSelection,
      },
    });
  };

  return (
    <View style={styles.container}>
      <GenericList
        data={userStore.filteredUserList}
        onPress={onPressUserRow}
        renderRowItem={(item: UserType) => {
          return <UserListItem name={item.name} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkestBlue,
  },
});

export default observer(UserListScreen);
