'use server';
import { revalidatePath } from 'next/cache';

export const revalidateEndpoint = async (endpoint: string) => {
	revalidatePath(endpoint);
};
