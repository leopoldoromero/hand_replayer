'use client';
import { useState } from "react";
import Block from "../block/Block";
import Dropdown from "../dropdown/DropDown";
import { PotType, sixMaxPositions } from "@/modules/hand/domain/hand";
import { Range } from "../range/Range";
import Text from "../text/Text";
import Toggle from "../toggle/Toggle";
import Button from "../button/Button";
import { Criteria } from "@/modules/shared/domain/criteria";
import { CriteriaFilter } from "@/modules/shared/domain/criteria_filter";

interface Props {
    filterHandsByCriteria: (criteria: Criteria) => void;
    loadHands: () => void;
}

const HandListFilters: React.FC<Props> = ({filterHandsByCriteria, loadHands}) => {
    const [potType, setPotType] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [minPotSize, setMinPotSize] = useState<number>(0);
    const [showLosingHands, setShowLosingHands] = useState<boolean>(false);

    const potTypeToEnumMapper = (): PotType => {
        const valuesToEnum: {[key in string]: PotType} = {
            SRP: PotType.OPEN_RAISED,
            ROL: PotType.ROL_RAISED,
            LIMPED: PotType.LIMPED,
            "3BET": PotType.THREE_BET,
            SQUEEZE: PotType.SQUEEZE,
            "4BET": PotType.FOUR_BET,
        }
        return valuesToEnum[potType] ?? PotType.UNOPENED;
    }

    const applyFilters = () => {
        const filters: Array<CriteriaFilter> = [];
        if (potType !== "") {
            filters.push(new CriteriaFilter("potType", potTypeToEnumMapper()))
        }
        if (position !== "") {
            filters.push(new CriteriaFilter("position", position))
        }
        if (minPotSize !== 0) {
            filters.push(new CriteriaFilter("minPotSize", minPotSize))
        }
        if (showLosingHands) {
            filters.push(new CriteriaFilter("loosingHands", showLosingHands))
        }
        if (filters?.length) {
            const criteria = new Criteria(filters);
            filterHandsByCriteria(criteria);
        }
    }

    return (
        <Block display="flex" direction="column">
            <Block 
            display="flex"
            justify="space-between"
            mb="m"
            >
                <Block 
                display="flex"
                direction="column" 
                >
                    <Dropdown  
                    label="POT TYPE"
                    options={["SRP", "ROL", "LIMPED", "3BET", "SQUEEZE", "4BET"]}
                    value={potType}
                    onChange={setPotType}
                    />
                    <Dropdown  
                    label="POSITION"
                    options={Object.values(sixMaxPositions)}
                    value={position}
                    onChange={setPosition}
                    />
                </Block>
                <Block
                display="flex" 
                direction="column" 
                >
                    <Block 
                    display="flex" 
                    direction="column" 
                    justify="center" 
                    align="flex-end"
                    >
                        <Range 
                        min={0} 
                        max={200} 
                        value={minPotSize} 
                        onChange={setMinPotSize}
                        />
                        <Text>Pot size ≥ {minPotSize} BB</Text>
                    </Block>
                    <Block 
                    display="flex" 
                    direction="column" 
                    justify="center" 
                    align="flex-end"
                    >
                        <Toggle 
                        isChecked={showLosingHands} 
                        onToggle={() => setShowLosingHands(!showLosingHands)}
                        />
                        <Text>{showLosingHands ? "Showing only losing hands" : "Showing all hands"}</Text>
                    </Block>
                </Block>
            </Block>
            <Block 
            display="flex" 
            justify="space-evenly"
            mb="m">
                <Button 
                variant="default" 
                size="m" 
                text="Apply filters"
                color="green" 
                onClick={() => applyFilters()}
                /> 
                <Button 
                variant="default" 
                size="m" 
                text="Reset filters"
                color="green" 
                onClick={() => loadHands()}
                />               
            </Block>
        </Block>
    );
}

export default HandListFilters;