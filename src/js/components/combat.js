// function attack(attacker, defender = hero) {
//   printFeedback('yaaaaaaaaaaaaaaaaaar');
//   let round = 0,
//       damage = 0,
//       attackerHp = attacker.hp,
//       defenderHp = defender.hp;

//   async function load() {
//     while (attackerHp > 0 && defenderHp > 0) {
//       round += 1;

//       damage = calcAttackDamage(attacker);
//       defenderHp = (defenderHp - damage > 0) ? defenderHp - damage : 0;
//       handleHealthbar(defender, damage);
//       printFeedback(`${attacker.name} hits ${defender.name} for ${damage} damage.`);

//       if (defenderHp == 0) {
//         isHero(defender.name) ? printFeedback('Noooooooooooo! You are dead...') : printFeedback(`${defender.name} falls dead to the ground`);
//         return;
//       }

//       damage = calcAttackDamage(defender);
//       attackerHp = (attackerHp - damage > 0) ? attackerHp - damage : 0;
//       handleHealthbar(attacker, damage);
//       printFeedback(`${defender.name} hits ${attacker.name} for ${damage} damage.`);

//       if (attackerHp == 0) isHero(attacker.name) ? printFeedback('Noooooooooooo! You are dead...') : printFeedback(`${attacker.name} falls dead to the ground`);

//       // call the timer function with 1s as parameter.
//       await timer(1000);
//     }
//   }

//   load();

// }

// function calcAttackDamage (character) {
//   return Math.ceil(Math.random() * attackDie + character.attack);
// }