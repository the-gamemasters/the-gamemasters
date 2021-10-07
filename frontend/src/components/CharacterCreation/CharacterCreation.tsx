import { ReactElement, useState } from 'react';
import CharacterInfo from './CharacterInfo';
import { classList } from './classes';
import axios from 'axios';

interface Props {}

export default function CharacterCreation(props: Props): ReactElement {
  const [charName, setCharName] = useState<string>('');
  const [currentClass, setCurrentClass] = useState<
    'KNIGHT' | 'ROGUE' | 'BARBARIAN' | 'MAGE' | 'NONE'
  >('NONE');
  const [description, setDescription] = useState<string>('');

  console.log(
    charName,
    'charName',
    description,
    'description',
    currentClass,
    'currentClass',
    classList[currentClass],
    'stats and stuff'
  );

  return (
    <div>
      <h1>Enter Character Name!!</h1>
      <input
        type="string"
        value={charName}
        name="character name"
        onChange={(e) => setCharName(e.target.value)}
        placeholder="Character name"
      />
      <h1>Enter Character Description</h1>
      <textarea
        name="Character description"
        placeholder="Please enter a description of your character"
        value={description}
        cols={50}
        rows={5}
        onChange={(e) => setDescription(e.target.value)}
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
      <button
        onClick={async () => {
          const result = await axios.post('/api/character', {
            charName,
            description,
            strength: classList[currentClass].str,
            constitution: classList[currentClass].con,
            intelligence: classList[currentClass].int,
            dexterity: classList[currentClass].dex,
          });

          console.log(result, 'from the submit');
        }}
      >
        Select
      </button>
    </div>
  );
}
