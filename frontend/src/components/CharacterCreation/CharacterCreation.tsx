import React, { ReactElement, useState } from 'react';
import CharacterInfo from './CharacterInfo';

interface Props {}

export default function CharacterCreation(props: Props): ReactElement {
  const [charName, setCharName] = useState<string>('');
  const [currentClass, setCurrentClass] = useState<
    'KNIGHT' | 'ROGUE' | 'BARBARIAN' | 'MAGE' | 'NONE'
  >('NONE');

  return (
    <div>
      <h1>Enter Character Name!!</h1>
      <input
        type="string"
        value={charName}
        name="character name"
        onChange={(e) => setCharName(e.target.value)}
        placeholder="Please enter your character name"
      />
      <h2>Pick a class </h2>
      <div>
        <div>
          <input
            type="radio"
            value="KNIGHT"
            name="class"
            onChange={() => setCurrentClass('KNIGHT')}
          />
          Knight
        </div>
        <div>
          <input
            type="radio"
            value="ROGUE"
            name="class"
            onChange={() => setCurrentClass('ROGUE')}
          />
          Rogue
        </div>
        <div>
          <input
            type="radio"
            value="BARBARIAN"
            name="class"
            onChange={(e) => setCurrentClass('BARBARIAN')}
          />
          Barbarian
        </div>
        <div>
          <input
            type="radio"
            value="MAGE"
            name="class"
            onChange={(e) => setCurrentClass('MAGE')}
          />
          Mage
        </div>
      </div>
      <CharacterInfo currentClass={currentClass} />
      <button>Select</button>
    </div>
  );
}
