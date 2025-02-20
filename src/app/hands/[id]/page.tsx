import Replayer from "@/components/replayer/Replayer";

export default function HandReplay({
    params,
  }: {
    params: { id: string };
  }) {
    const {id} = params;
    return (
      <Replayer handId={id}/>
    );
    }
