export const getUserDisplayName = (user) => {
  if (user?.displayName) {
    return user.displayName;
  }

  if (user?.email) {
    return user.email.split("@")[0];
  }

  return "User";
};

export const getUserAvatarUrl = (user) => {
  if (user?.photoURL) {
    return user.photoURL;
  }

  const name = encodeURIComponent(getUserDisplayName(user));
  return `https://ui-avatars.com/api/?name=${name}&background=E87461&color=ffffff&bold=true`;
};
