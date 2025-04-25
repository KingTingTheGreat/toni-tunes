"use client";
import { ProfileProps } from "@/types/types";
import { createContext, useContext, useState } from "react";

export const defaultProfileState: ProfileContextState = null;

const ProfileContext = createContext<ProfileContextProps | null>(null);

export const ProfileContextProvider = ({
  profile,
  children,
}: {
  profile: ProfileProps | null;
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<ProfileContextState>(profile);

  const set = (profile: ProfileContextState) => {
    setState(profile);
  };

  return (
    <ProfileContext.Provider value={{ value: state, set }}>
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
  value: ProfileContextState;
  set: (state: ProfileContextState) => void;
};

export type ProfileContextState = ProfileProps | null;
