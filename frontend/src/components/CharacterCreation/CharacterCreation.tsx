import React, { ReactElement, useState } from 'react';
import * as CLASSES from './classes';
import CharacterInfo from './CharacterInfo';

interface Props {}

export default function CharacterCreation(props: Props): ReactElement {
  const [charName, setCharName] = useState<string>('');
  const [currentClass, setCurrentClass] = useState<string>('');

  return (
    <div>
      <div> Avatar Pictures </div>
      <input
        type="string"
        value={charName}
        name="character name"
        onChange={(e) => setCharName(e.target.value)}
        placeholder="Please enter your character name"
      />
      <h2>Pick a class </h2>
      <div>
        {CLASSES.classList.map((val) => {
          return (
            <div>
              <input
                type="radio"
                value={val.class}
                name="class"
                onChange={(e) => setCurrentClass(e.target.value)}
              />
              {val.class}
            </div>
          );
        })}
      </div>
      <CharacterInfo currentClass={currentClass} />
    </div>
  );
}
