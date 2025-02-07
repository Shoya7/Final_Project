import React, { useState } from "react";
import ClassCard from "./ClassCard";
import "./RaceCard.css";

const RaceCard = ({ race }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getRecommendedClasses = (raceIndex) => {
    const recommendations = {
      dwarf: [
        {
          name: "Fighter",
          role: "Tank",
          description:
            "Natural armor proficiency and constitution bonus make excellent fighters",
        },
        {
          name: "Cleric",
          role: "Healer",
          description:
            "Wisdom and constitution help create durable divine spellcasters",
        },
      ],
      elf: [
        {
          name: "Ranger",
          role: "DPS",
          description:
            "Dexterity bonus and natural affinity for nature make perfect rangers",
        },
        {
          name: "Wizard",
          role: "Caster",
          description:
            "High intelligence and magical affinity create powerful wizards",
        },
      ],
      halfling: [
        {
          name: "Rogue",
          role: "Stealth/DPS",
          description: "Small size and natural stealth make excellent thieves",
        },
        {
          name: "Bard",
          role: "Support/Magic",
          description:
            "Charismatic nature and luck powers enhance bardic abilities",
        },
        {
          name: "Ranger",
          role: "Ranged/Stealth",
          description: "Dexterity and size make great skirmishers",
        },
      ],
      human: [
        {
          name: "Fighter",
          role: "Versatile",
          description: "Adaptable nature makes excellent all-around warriors",
        },
        {
          name: "Wizard",
          role: "Arcane",
          description: "Versatility allows mastery of complex magic",
        },
        {
          name: "Paladin",
          role: "Tank/Divine",
          description: "Strong leadership and adaptability suit holy warriors",
        },
        {
          name: "Sorcerer",
          role: "Arcane",
          description: "Natural charisma enhances magical abilities",
        },
      ],
      dragonborn: [
        {
          name: "Paladin",
          role: "Tank/Divine",
          description:
            "Natural leadership and strength make inspiring holy warriors",
        },
        {
          name: "Sorcerer",
          role: "Arcane",
          description: "Draconic heritage enhances magical abilities",
        },
        {
          name: "Fighter",
          role: "Melee/Tank",
          description:
            "Strength and intimidating presence make powerful warriors",
        },
      ],
      gnome: [
        {
          name: "Wizard",
          role: "Arcane",
          description:
            "High intelligence and magical affinity excel at spellcasting",
        },
        {
          name: "Artificer",
          role: "Utility/Support",
          description: "Natural inventors with magical creativity",
        },
        {
          name: "Rogue",
          role: "Stealth/Utility",
          description: "Small size and cleverness make cunning tricksters",
        },
      ],
      "half-elf": [
        {
          name: "Bard",
          role: "Support/Face",
          description: "Charisma and versatility make natural performers",
        },
        {
          name: "Warlock",
          role: "Arcane",
          description: "Charisma and adaptability suit pact magic",
        },
        {
          name: "Sorcerer",
          role: "Arcane",
          description: "Natural charisma powers innate magic",
        },
        {
          name: "Paladin",
          role: "Tank/Face",
          description: "Leadership and divine calling make inspiring champions",
        },
      ],
      "half-orc": [
        {
          name: "Barbarian",
          role: "Melee/DPS",
          description: "Savage attacks and endurance make fierce warriors",
        },
        {
          name: "Fighter",
          role: "Melee/Tank",
          description: "Strength and endurance create powerful fighters",
        },
        {
          name: "Ranger",
          role: "Hunter/Melee",
          description: "Survival instincts make excellent hunters",
        },
      ],
      tiefling: [
        {
          name: "Warlock",
          role: "Arcane",
          description: "Infernal heritage naturally suits pact magic",
        },
        {
          name: "Sorcerer",
          role: "Arcane",
          description: "Innate magic enhanced by infernal bloodline",
        },
        {
          name: "Paladin",
          role: "Tank/Divine",
          description: "Redemption themes make compelling holy warriors",
        },
        {
          name: "Bard",
          role: "Support/Face",
          description: "Natural charisma powers performance abilities",
        },
      ],
    };

    return recommendations[raceIndex] || [];
  };

  return (
    <div className="flip-card">
      <div
        className={`flip-card-inner ${isFlipped ? "is-flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card */}
        <div className="flip-card-front">
          <h2>{race.name}</h2>
          <div className="speed-stat">Speed: {race.speed}ft</div>
          <div className="ability-scores">
            {race.ability_bonuses.map((bonus, index) => (
              <span key={index} className="ability-tag">
                {bonus.ability_score.name}: +{bonus.bonus}
              </span>
            ))}
          </div>

          <div className="traits">
            {race.traits.map((trait, index) => (
              <span key={index} className="trait-tag">
                {trait.name}
              </span>
            ))}
          </div>
        </div>

        {/* Back of Card */}
        <div className="flip-card-back">
          <h2>Recommended Classes</h2>
          <div className="classes-container">
            {getRecommendedClasses(race.index).map((classInfo, index) => (
              <ClassCard
                key={index}
                className={classInfo.name}
                role={classInfo.role}
                description={classInfo.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;
