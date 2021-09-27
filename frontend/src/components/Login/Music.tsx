import React, { ReactElement, useEffect } from 'react';
import { Howl } from 'howler';

interface Props {}

export default function Music(props: Props): ReactElement {
  const music: string = `audio/login.mp3`;
  var sound = new Howl({
    src: [music],
    volume: 0.1,
    loop: true,
  });

  useEffect(() => {
    sound.play();
  }, []);

  return (
    <div>
      Music
      <button onClick={() => sound.play()}>play</button>
      <button onClick={() => sound.pause()}>pause</button>
    </div>
  );
}
