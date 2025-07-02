'use server';
import { getSessionAction } from "./session.actions";

export async function generateGuestIdAction() {
    const session = await getSessionAction();

    if (!session.guestId && !session.accessToken) {
        session.guestId = crypto.randomUUID();
        console.log('Generated new guest_id:', session.guestId);
        await session.save();
    }
}