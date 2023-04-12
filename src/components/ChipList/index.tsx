import React from "react";

interface ChipProps {
  label?: string;
  hidden?: boolean;
  value?: string;
}

interface ChipListProps {
  chips?: ChipProps[];
  chipType: string;
  handleChipClick: ({ target }: React.SyntheticEvent | ChipListTarget) => void;
  selectedItems: string | string[];
}

export type ChipListTarget = {
  target: {
    isChip: boolean;
    value: string;
    id: string;
  };
};

const ChipList: React.FC<ChipListProps> = ({
  chips,
  chipType,
  handleChipClick,
  selectedItems,
}) => {
  const defaultClasses = "mt-2";

  if (!chips) {
    return null;
  }

  return (
    <div className={`${defaultClasses}`}>
      {chips.map((chip: ChipProps) => {
        const { hidden, value = "", label = "" } = chip;

        if (hidden) {
          return null;
        }

        const selected = selectedItems.includes(value);

        const defaultClasses =
          "w-full max-w-fit inline-flex items-center justify-center h-8 bg-white border rounded border-[#E7E7ED] whitespace-nowrap align-middle box-border text-lg cursor-pointer mr-4 mt-2";
        const hoverClasses = "hover:bg-[#E7E7ED]";
        const activeClasses = "active:bg-gray-300";
        const selectedClasses = selected ? "bg-[#E7E7ED]" : "bg-white";

        const chipClickObject = {
          target: { isChip: true, value, id: chipType },
        };

        return (
          <div
            id={value}
            key={`${chipType}-chip-${value}`}
            slot="Root"
            className={`${defaultClasses} ${hoverClasses} ${activeClasses} ${selectedClasses}`}
            onClick={() => handleChipClick(chipClickObject)}
          >
            <span
              slot="Label"
              className="overflow-hidden overflow-ellipsis py-2 px-4 whitespace-nowrap"
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default ChipList;
