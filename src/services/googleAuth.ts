// 100% Mock for Expo Go - NO NATIVE IMPORTS
export const configureGoogleSignIn = () => {
  console.log('Mock: Google Sign-In Configured');
};

export const signInWithGoogle = async () => {
  console.log('Mock: Google Sign-In Triggered');
  return {
    userInfo: { data: { user: { email: 'test@vrumo.com', name: 'Test User' } } },
    idToken: 'MOCK_TOKEN',
  };
};

export const statusCodes = {
  SIGN_IN_CANCELLED: '1',
  IN_PROGRESS: '2',
  PLAY_SERVICES_NOT_AVAILABLE: '3',
};
