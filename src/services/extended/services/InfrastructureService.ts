import { InfrastructureData } from '../../../app/datatypes';
import { request as __request } from '../../openapi/core/request';

export class InfrastructureService {

  /**
   * Posts INFRASTRUCTURE_DATA_DATA data payload
   * @returns any Successfully posted
   * @throws ApiError
   */
  public static async getAllInfrastructure(): Promise<InfrastructureData[]> {
    const result = await __request({
      method: 'GET',
      path: `/infrastructure/all`,
      errors: {
        400: `Failed to parse payload`,
        401: `Current user is not authenticated`,
      },
    });
    return result.body;
  }
}
