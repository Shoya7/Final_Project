import React, { useState } from "react";
import ClassCard from "./ClassCard";
import "./RaceCard.css";

const raceImages = {
  dwarf: require("../assets/images/dwarf.jpg"),
  elf: require("../assets/images/elf.jpg"),
  halfling: require("../assets/images/halfling.jpg"),
  human: require("../assets/images/human.jpg"),
  dragonborn: require("../assets/images/dragonborn.jpg"),
  gnome: require("../assets/images/gnome.jpg"),
  "half-elf": require("../assets/images/halfelf.jpg"),
  "half-orc": require("../assets/images/halforc.jpg"),
  tiefling: require("../assets/images/tiefling.jpg"),
};

const RaceCard = ({ race }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const getRecommendedClasses = (raceIndex) => {
    const recommendations = {
      dwarf: [
        {
          name: "Fighter",
          role: "Tank",
          description:
            "Natural armor proficiency and constitution bonus make dwarves excellent fighters.",
        },
        {
          name: "Cleric",
          role: "Healer",
          description:
            "Wisdom bonus and defensive abilities complement the cleric's role.",
        },
      ],
      elf: [
        {
          name: "Ranger",
          role: "Damage Dealer",
          description:
            "Dexterity bonus and natural proficiency with bows make elves exceptional rangers.",
        },
        {
          name: "Wizard",
          role: "Spellcaster",
          description:
            "High intelligence and natural magic affinity suit the wizard class perfectly.",
        },
      ],
      halfling: [
        {
          name: "Rogue",
          role: "Stealth",
          description:
            "Natural stealth abilities and size make halflings perfect rogues.",
        },
        {
          name: "Bard",
          role: "Support",
          description: "Charisma and luck powers enhance bardic abilities.",
        },
      ],
      human: [
        {
          name: "Any Class",
          role: "Versatile",
          description:
            "Balanced ability scores make humans suitable for any class.",
        },
        {
          name: "Paladin",
          role: "Tank/Healer",
          description: "Versatility and determination make excellent paladins.",
        },
      ],
      dragonborn: [
        {
          name: "Paladin",
          role: "Tank",
          description: "Natural strength and charisma make powerful paladins.",
        },
        {
          name: "Sorcerer",
          role: "Spellcaster",
          description: "Draconic heritage enhances magical abilities.",
        },
      ],
      gnome: [
        {
          name: "Wizard",
          role: "Spellcaster",
          description:
            "High intelligence and magical aptitude make excellent wizards.",
        },
        {
          name: "Artificer",
          role: "Support",
          description: "Natural tinkering abilities enhance artificer skills.",
        },
      ],
      "half-elf": [
        {
          name: "Warlock",
          role: "Spellcaster",
          description: "High charisma and versatility make perfect warlocks.",
        },
        {
          name: "Bard",
          role: "Support",
          description:
            "Social skills and adaptability enhance bardic abilities.",
        },
      ],
      "half-orc": [
        {
          name: "Barbarian",
          role: "Damage Dealer",
          description:
            "Natural strength and endurance make fearsome barbarians.",
        },
        {
          name: "Fighter",
          role: "Tank",
          description:
            "Combat abilities and resilience create powerful fighters.",
        },
      ],
      tiefling: [
        {
          name: "Warlock",
          role: "Spellcaster",
          description: "Infernal heritage and charisma make natural warlocks.",
        },
        {
          name: "Sorcerer",
          role: "Spellcaster",
          description: "Innate magical abilities enhance sorcerous powers.",
        },
      ],
    };
    return recommendations[raceIndex] || [];
  };

  return (
    <div className="card">
      <div
        className={`card__inner ${isFlipped ? "card__inner--flipped" : ""}`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="card__side card__side--front">
          <img
            src={raceImages[race.index]}
            alt={race.name}
            className="card__image"
          />
          <h2 className="card__title">{race.name}</h2>
          <div className="speed">{`Speed: ${race.speed}ft`}</div>
          <div className="abilities">
            {race.ability_bonuses.map((bonus, index) => (
              <span key={index} className="abilities__tag">
                {`${bonus.ability_score.name}: +${bonus.bonus}`}
              </span>
            ))}
          </div>
        </div>
        <div className="card__side card__side--back">
          <h2 className="card__title">Recommended Classes</h2>
          <div className="traits">
            {race.traits.map((trait, index) => (
              <span key={index} className="tag tag--trait">
                {trait.name}
              </span>
            ))}
          </div>
          <div className="classes">
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
