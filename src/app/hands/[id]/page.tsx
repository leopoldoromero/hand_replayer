import Block from "@/components/block/Block";
import HandInfoComponent from "@/components/hand_info/HandInfo";
import Replayer from "@/components/replayer/Replayer";


export default function HandReplay({
    params,
  }: {
    params: { id: string };
  }) {
    return (
        <Block 
        display="flex" 
        justify="center" 
        width="100%" 
        height="100%" 
        position="relative"
        >
            <HandInfoComponent />
            <Replayer />
        </Block>
    );
    }
