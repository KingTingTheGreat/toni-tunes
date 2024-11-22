import { ProfileProps } from "@/types";
import { createContext, useContext, useState } from "react";

const defaultState: ProfileContextState = {
  profile: null,
};

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState(defaultState);

  const set = (newChanges: Partial<ProfileContextState>) => {
    const newState = {
      ...state,
      ...newChanges,
    };
    setState(newState);
  };

  return (
    <ProfileContext.Provider value={{ state, set }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfileContext = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error(
      "useProfileContext must be used with a ProfileContextProvider",
    );
  }
  return context;
};

export type ProfileContextProps = {
  state: ProfileContextState;
  set: (state: ProfileContextState) => void;
};

export type ProfileContextState = {
  profile: ProfileProps | null;
};
