import { useContext } from "react";
import { AudioContext } from "~/contexts/AudioContext";

const useAudio = () => useContext(AudioContext);

export default useAudio;
