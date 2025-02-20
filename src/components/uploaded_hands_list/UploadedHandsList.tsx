'use client';
import { Criteria } from "@/modules/shared/domain/criteria";
import Block from "../block/Block";
import HandSummaryCard from "../hand_summary_card/HandSummaryCard";
import HandListFilters from "./HandListFilters";
import { Hand } from "@/modules/hand/domain/hand";
import { useRouter } from "next/navigation";

interface Props {
    hands: Array<Hand>
    filterHandsByCriteria: (criteria: Criteria) => void;
    loadHands: () => void;
}

const UploadedHandsList: React.FC<Props> = ({ hands, filterHandsByCriteria, loadHands }) => {
    const router = useRouter();
    return (
        <Block mt="m">
            <Block mb="m">
                <HandListFilters 
                filterHandsByCriteria={filterHandsByCriteria}
                loadHands={loadHands}
                />
            </Block>
            <Block 
            display="flex" 
            flexWrap="wrap" 
            gap="10px" 
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
                            onClickHandler={() => router.push(`/hands/${id}`, {scroll: true})}
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