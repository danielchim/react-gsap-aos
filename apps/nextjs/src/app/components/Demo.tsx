import { AOSProvider } from "react-gsap-aos/client";

import GithubButton from "@/components/GithubButton";
import FAB from "./FAB";
import Tabs from "./Tabs";
import Panel from "./Panel";

export default function Demo() {
  return (
    <AOSProvider className="relative flex flex-col pb-4 *:px-4">
      <div className="sticky top-0 z-10 flex items-center gap-2 p-4 backdrop-blur-md">
        <Tabs />
        <GithubButton />
      </div>
      <Panel />
      <FAB />
    </AOSProvider>
  );
}
