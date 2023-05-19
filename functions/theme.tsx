import { cookies } from "next/headers";
import {
  IoDesktopOutline,
  IoLogoAndroid,
  IoLogoApple,
  IoLogoMicrosoft,
  IoLogoTux,
  IoMoon,
  IoPhonePortraitOutline,
  IoSunny,
} from "react-icons/io5";

export type PrefersColorScheme = "dark" | "light";
export type Theme = "system" | "dark" | "light";
export type Themes = {
  icon: JSX.Element;
  name: string;
  value: Theme;
};
export type UserAgent = typeof window.navigator.userAgent;
export type Set = {
  prefersColorScheme?: PrefersColorScheme;
  theme?: Theme;
  userAgent?: UserAgent;
};
export type GetThemeReturn = {
  className: PrefersColorScheme;
  name: "theme";
  value: Theme;
};

export async function getTheme(): Promise<GetThemeReturn> {
  const cookieStore = cookies();

  const prefersColorScheme = cookieStore.get("prefersColorScheme");
  const theme = cookieStore.get("theme");

  return {
    className: (prefersColorScheme && theme?.value === "system"
      ? prefersColorScheme.value
      : theme?.value ?? "system") as PrefersColorScheme,
    name: "theme",
    value: (theme?.value ?? "system") as Theme,
  };
}

export async function getThemes() {
  const userAgent = cookies().get("userAgent") as {
    name: "userAgent";
    value: UserAgent | undefined;
  };

  const themes = [
    {
      icon:
        userAgent && typeof userAgent.value === "string" ? (
          userAgent.value.includes("Android") ? (
            <IoLogoAndroid />
          ) : userAgent.value.includes("Apple") ? (
            <IoLogoApple />
          ) : userAgent.value.includes("Windows") ? (
            <IoLogoMicrosoft />
          ) : userAgent.value.includes("Linux") ? (
            <IoLogoTux />
          ) : userAgent.value.includes("Mobile") ? (
            <IoPhonePortraitOutline />
          ) : (
            <IoDesktopOutline />
          )
        ) : (
          <IoDesktopOutline />
        ),
      name: "System",
      value: "system",
    },
    {
      icon: <IoMoon />,
      name: "Dark",
      value: "dark",
    },
    {
      icon: <IoSunny />,
      name: "Light",
      value: "light",
    },
  ] as Themes[];

  return themes;
}

export async function setTheme({ prefersColorScheme, theme, userAgent }: Set) {
  "use server";

  const cookieStore = cookies();

  if (prefersColorScheme) {
    cookieStore.set("prefersColorScheme", prefersColorScheme);
  }

  if (theme) {
    cookieStore.set("theme", theme);
  } else {
    cookieStore.set("theme", "system");
  }

  if (userAgent)
    cookieStore.set(
      "userAgent",
      userAgent?.includes("Android")
        ? "Android"
        : userAgent?.includes("Apple")
        ? "Apple"
        : userAgent?.includes("Windows")
        ? "Windows"
        : userAgent?.includes("Linux")
        ? "Linux"
        : userAgent?.includes("Mobile")
        ? "Mobile"
        : userAgent
    );
}
