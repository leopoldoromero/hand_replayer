'use client';
import Block from "@/components/block/Block";
import PlayerComponent from "@/components/player/Player";
import Table from "@/components/table/Table";
import { useHandContext } from "@/contexts/HandContext";
import { Action } from "@/modules/hand/domain/action";
import { Player } from "@/modules/hand/domain/player";
import { useEffect, useState } from "react";

export default function ReplayerLegacy() {
  const { currentHand } = useHandContext();
  const [actionIndex, setActionIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [players, setPlayers] = useState<Array<Player>>(currentHand?.players || []);
  const [pot, setPot] = useState(0);

  const executeAction = (action: Action) => {
    if (!action) return;
    console.log('EXECUTING:', players)
    setPlayers((prevPlayers) =>
      prevPlayers.map((player) =>
        player.name === action.player
          ? { ...player, stack: action.amount ? player.stack - action.amount : player.stack }
          : player
      )
    );

    if (action.amount) {
      setPot((prevPot) => prevPot + action.amount);
    }
  };

  useEffect(() => {
    if (!isPlaying || !currentHand) return;

    if (actionIndex >= currentHand.actions.length) {
      setIsPlaying(false); 
      return;
    }

    if (currentHand && !players?.length) {
        setPlayers(currentHand.players)
    }

    const timer = setTimeout(() => {
      executeAction(currentHand.actions[actionIndex]);
      setActionIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isPlaying, actionIndex, currentHand]);

  const handlePlayPause = () => setIsPlaying((prev) => !prev);
  const handleNext = () => {
    if (!currentHand) {
        return
    }
    return actionIndex < currentHand?.actions?.length && setActionIndex((prev) => prev + 1);
  }
  const handlePrevious = () => actionIndex > 0 && setActionIndex((prev) => prev - 1);

  if (!currentHand) return <p>Loading...</p>;

  return (
    <Block 
      display="flex" 
      direction="column"
      justify="center" 
      align="center" 
      height="100%"
    >
      {players.map((player) => (
        <PlayerComponent 
          nick={player.name}
          stack={player.stack} 
          currency={currentHand.currency} 
          cards={player?.cards?.length ? player?.cards : ["", ""]}  
          seat={player.seat}
          key={player.seat}
        />
      ))}
      <Table 
        pot={pot} 
        currency={currentHand.currency} 
        cards={currentHand.actions[actionIndex]?.cards || []} 
        room={currentHand.room}
      />
      <Block display="flex" justify="center" mt="m" customStyles={{ position: 'fixed', bottom: '5%'}}>
        <button onClick={handlePrevious} disabled={actionIndex === 0}>Previous</button>
        <button onClick={handlePlayPause}>{isPlaying ? "Pause" : "Play"}</button>
        <button onClick={handleNext} disabled={actionIndex >= currentHand.actions.length}>Next</button>
      </Block>
    </Block>
  );
}
