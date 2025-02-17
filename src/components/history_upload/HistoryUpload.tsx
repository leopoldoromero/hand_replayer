'use client';
import { useState } from "react";
import Block from "../block/Block";
import Text from "../text/Text";
import Textarea from "../textarea/Textarea";
import { uploadHistoryAction } from "@/actions/upload_history.action";
import { StyledForm } from "./HistoryUpload.styles";
import UploadedHandsList from "../uploaded_hands_list/UploadedHandsList";
import { useHandContext } from "@/contexts/HandContext";
import { LocalStorageRepository } from "@/modules/shared/infrastructure/local_storage.repository";
import Button from "../button/Button";

const HistoryUploadComponent = () => {
    const { setHands } = useHandContext();
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const localStorageRepository = new LocalStorageRepository();

    const handleUpload = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        try {
        const file = new File([text], "history.txt", { type: "text/plain" });
        const response = await uploadHistoryAction(file);
        setHands(response);
        localStorageRepository.saveHandHistory(response, 'handHistory', true);
        console.log("Upload Success:", response);
        } catch (error) {
        console.error("Upload Failed:", error);
        } finally {
        setLoading(false);
        }
    };
    return (
        <Block 
        display="flex" 
        direction="column" 
        width="100%" 
        height="100%" 
        position="relative" 
        justify="space-between"
        customStyles={{maxHeight: '300px'}}
        pt="l" 
        pr="l" 
        pb="l" 
        pl="l"
        >
            <Text 
            as="h4" 
            textAlign="center"
            fontSize="tiny"
            weight="bold"
            mb="m"
            >
                Upload your poker hands
            </Text>
            <Text mb="m">Paste your hand history or directly upload a .txt file with your hand history and we&apos;ll convert it into a replay for you to share with others.</Text>
            <StyledForm onSubmit={handleUpload}>
                <Textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)} 
                placeholder="Paste your hand history to upload..." 
                rows={4}
                name=""
                cols={10}
                />
                 <Block display="flex" justify="center" mt="m" mb="m">
                    <Button 
                    type="submit"
                    disabled={loading}
                    variant="default" 
                    size="m" 
                    text={loading ? "Uploading..." : "Upload"}
                    color="green" 
                    />                
                </Block>
            </StyledForm>
            <UploadedHandsList />
        </Block>
    )
}

export default HistoryUploadComponent;