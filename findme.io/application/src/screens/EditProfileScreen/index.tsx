import React from 'react';
import { EditProfileScreenPresenter, editProfileScreenPresenterProps } from '@screens/EditProfileScreen/view';

export type editProfileScreenContainerProps = {};

const EditProfileScreenContainer: React.FC<editProfileScreenContainerProps> = ({}) => {
  const ViewProps: editProfileScreenPresenterProps = {};

  return (
    <EditProfileScreenPresenter {...ViewProps} />
  );
};

export { EditProfileScreenContainer };
