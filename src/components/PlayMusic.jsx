import React from "react";

import ReactJkMusicPlayer from "react-jinke-music-player";
import "react-jinke-music-player/assets/index.css";

export default function Player({ musics, selectedMusicIndex }) {
    const audioLists = musics.map((music) => ({
        name: music.title,
        singer: music.artist.name,
        cover: `${process.env.REACT_APP_PATH_MUSIC + music.thumbnail}`,
        musicSrc: `${process.env.REACT_APP_PATH_MUSIC + music.attache}`,
    }));
    const options = {
        playIndex: selectedMusicIndex,
        mode: "full",
        audioLists,
        defaultPlayIndex: 0,
        theme: "dark",
        remove: true,
        showPlay: true,
        showDestroy: false,
        responsive: true,
        defaultPosition: { bottom: 0, left: 0 },
        toggleMode: true,
        showDownload: false,
        showPlayMode: false,
        showThemeSwitch: false,
        showLyric: false,
        showReload: false,
        glassBg: false,
    };
    return (
        <>
        <ReactJkMusicPlayer {...options} />
        </>
    );
}
