import React, { ReactElement } from 'react';
import * as CLASSES from './classes';
// Need to look into how i'm importing.  I think doing it this way is making it harder.
import { SKILLS } from './skills';

interface Props {
  currentClass: string;
}

function CharacterInfo(props: Props): ReactElement {
  // the lines below, Current class should be an object (Record), the keys should be strings, and the values should be string or number

  let currentClass: Record<string, string | number> = {
    class: ' ',
    str: 0,
    dex: 0,
    con: 0,
    int: 0,
    passive: '',
  };

  if (props.currentClass) {
    currentClass = CLASSES.classList.filter(
      (val) => val.class === props.currentClass
    )[0];
  }
  console.log(SKILLS);

  return (
    <div>
      <h2>{currentClass.class}</h2>
      <h3>Skills</h3>
      {SKILLS.map((val, i) => {
        return (
          <>
            <p key={i}>{val.toUpperCase()}</p>
            <span>{currentClass[val]}</span>
          </>
        );
      })}
      <h3>Passive Skill</h3>
      <p>{currentClass.passive}</p>
    </div>
  );
}

export default CharacterInfo;
