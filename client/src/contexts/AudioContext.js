import { createContext, useReducer, useEffect, useRef } from "react";
import musics from "~/assets/musics";

const initialState = {
  audioElement: null,
  playing: false,
  musicIndex: 0,
};

const AudioContext = createContext({
  audioElement: null,
  playing: false,
  musicIndex: 0,
  nextAudio: () => {},
  prevAudio: () => {},
  togglePlay: () => {},
});

const handlers = {
  INITIALIZE: (state, action) => {
    const { playing, musicIndex } = action.payload;
    return {
      ...state,
      playing,
      musicIndex,
    };
  },
  PLAYING: (state) => {
    return {
      ...state,
      playing: true,
    };
  },
  PAUSED: (state) => {
    return {
      ...state,
      playing: false,
    };
  },
  NEXT: (state) => {
    const musicIndex =
      state.musicIndex === musics.length - 1 ? 0 : state.musicIndex + 1;
    return {
      ...state,
      musicIndex,
    };
  },
  PREVIOUS: (state) => {
    const musicIndex =
      state.musicIndex === 0 ? musics.length - 1 : state.musicIndex - 1;
    return {
      ...state,
      musicIndex,
    };
  },
};

const reducer = (state, action) => {
  if (handlers[action.type]) {
    return handlers[action.type](state, action);
  } else {
    return state;
  }
};

function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const audioRef = useRef();

  function initialize() {
    try {
      const audioData = localStorage.getItem("audioData");

      if (audioData && audioData.playing && audioData.musicIndex) {
        dispatch({
          type: "INITIALIZE",
          payload: {
            playing: audioData.playing,
            musicIndex: audioData.musicIndex,
          },
        });
      } else {
        dispatch({
          type: "INITIALIZE",
          payload: { playing: false, musicIndex: 0 },
        });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "INITIALIZE",
        payload: { playing: false, musicIndex: 0 },
      });
    }
  }

  useEffect(() => {
    initialize();
  }, []);

  const handleTogglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      dispatch({ type: "PLAYING" });
    } else {
      audioRef.current.pause();
      dispatch({ type: "PAUSED" });
    }
  };

  const handlePrevAudio = () => {
    dispatch({ type: "PREVIOUS" });
  };

  const handleNextAudio = () => {
    dispatch({ type: "NEXT" });
  };

  return (
    <AudioContext.Provider
      value={{
        ...state,
        nextAudio: handleNextAudio,
        prevAudio: handlePrevAudio,
        togglePlay: handleTogglePlay,
      }}
    >
      <audio
        ref={audioRef}
        autoPlay={state.playing}
        src={musics[state.musicIndex].path}
        onEnded={handleNextAudio}
      />
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider };
