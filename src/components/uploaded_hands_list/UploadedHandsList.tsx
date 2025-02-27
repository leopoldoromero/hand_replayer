'use client';
import Block from '../block/Block';
import HandSummaryCard from '../hand_summary_card/HandSummaryCard';
import { Hand } from '@/modules/hand/domain/hand';
import { useRouter } from 'next/navigation';

interface Props {
  hands: Array<Hand>;
}

const UploadedHandsList: React.FC<Props> = ({
  hands,
}) => {
  const router = useRouter();
  return (
    <Block display='flex' flexWrap='wrap' gap='10px' justify='center'>
        {hands?.length
          ? hands.map(
              ({ id, hero, potType, lastPhaseHeroFolded, tableType }, i) => (
                <HandSummaryCard
                  key={i}
                  handId={id}
                  cards={hero?.cards}
                  heroPosition={hero?.seat}
                  potType={potType}
                  lastPhaseHeroFolded={lastPhaseHeroFolded}
                  onClickHandler={() =>
                    router.push(`/hands/${id}`, { scroll: true })
                  }
                  gameType={tableType}
                />
              )
            )
          : null}
      </Block>
  );
};

export default UploadedHandsList;
