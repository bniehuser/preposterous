/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Chat_ListItem } from '../models/Chat_ListItem';
import { request as __request } from '../core/request';

export class ChatService {

    /**
     * Posts the CHANNEL_DATA payload to the server.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postChatService(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/chat/data`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts the CHANNEL_MESSAGE_ADDED payload to the server.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postChatService1(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/chat/message_added`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts the CHANNEL_MESSAGE_DELETED payload to the server.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postChatService2(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/chat/message_deleted`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Posts the CHANNEL_MESSAGE_LIST payload to the server.  For payload, see FIORest source
     * @returns any Successfully posted
     * @throws ApiError
     */
    public static async postChatService3(): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/chat/message_list`,
            errors: {
                400: `Failed to parse payload`,
                401: `Current user is not authenticated`,
            },
        });
        return result.body;
    }

    /**
     * Retrieves a list of searchable channel names and their corresponding ChannelIds
     * @returns Chat_ListItem Successfully retrieved list of Channels
     * @throws ApiError
     */
    public static async getChatService(): Promise<Array<Chat_ListItem>> {
        const result = await __request({
            method: 'GET',
            path: `/chat/list`,
        });
        return result.body;
    }

    /**
     * Retrieves the last 300 messages of the provided ChannelDescription
     * @param channelDescription The ChannelDescription.  Can be:
     * 1) ChannelId
     * 2) ChannelDisplayName
     * 2) PlanetName
     * 3) PlanetNaturalId
     *
     * @returns any Successfully retrieved channel data.  See FIORest source for payload
     * @throws ApiError
     */
    public static async getChatService1(
        channelDescription: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/chat/display/${channelDescription}`,
        });
        return result.body;
    }

    /**
     * Retrieves the last 300 messages of the provided ChannelDescription in a 'pretty' (textual) format
     * @param channelDescription The ChannelDescription.  Can be:
     * 1) ChannelId
     * 2) ChannelDisplayName
     * 2) PlanetName
     * 3) PlanetNaturalId
     *
     * @returns any Successfully retrieved channel data.  Response payload will be up to 300 most recent messages as plaintext
     * @throws ApiError
     */
    public static async getChatService2(
        channelDescription: string,
    ): Promise<any> {
        const result = await __request({
            method: 'GET',
            path: `/chat/display/pretty/${channelDescription}`,
        });
        return result.body;
    }

}