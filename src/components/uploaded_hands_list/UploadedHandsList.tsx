'use client';
import { useHandContext } from "@/contexts/HandContext";
import Block from "../block/Block";
import HandSummaryCard from "../hand_summary_card/HandSummaryCard";
import HandListFilters from "./HandListFilters";

const UploadedHandsList = () => {
    const { hands, setCurrentHandIdx } = useHandContext();

    return (
        <Block mt="m">
            <Block mb="m">
                <HandListFilters />
            </Block>
            <Block 
            display="flex" 
            flexWrap="wrap" 
            gap="5px" 
            justify="center"
            >
                {
                    hands?.length ? (
                        hands.map(({ id,  hero, potType, lastPhaseHeroFolded, tableType }, i) => (
                            <HandSummaryCard 
                            key={i} 
                            handId={id}
                            cards={hero?.cards} 
                            heroPosition={hero?.seat} 
                            potType={potType}
                            lastPhaseHeroFolded={lastPhaseHeroFolded}
                            onClickHandler={() => setCurrentHandIdx(i)}
                            gameType={tableType}
                            />
                        ))
                    ) : (
                        null
                    )
                }
            </Block>
        </Block>
    )
}

export default UploadedHandsList;