const KNIGHT = {
  class: 'Knight',
  str: 15,
  dex: 6,
  con: 11,
  int: 8,
  passive: 'Tempered Swing, Random crit (x2) chance for attacks',
};
const ROGUE = {
  class: 'Rogue',
  str: 6,
  dex: 15,
  con: 8,
  int: 11,
  passive: 'LightFoot, Random Dodge chance',
};
const BARBARIAN = {
  class: 'Barbarian',
  str: 11,
  dex: 8,
  con: 15,
  int: 6,
  passive: 'Sustaining Rage, Random chance to heal',
};
const MAGE = {
  class: 'Mage',
  str: 8,
  dex: 11,
  con: 6,
  int: 15,
  passive: 'Arcane Mastery, Random crit (x2) chance for spells',
};

const classList = [KNIGHT, ROGUE, BARBARIAN, MAGE];

export { classList };
