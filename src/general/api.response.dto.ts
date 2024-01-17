import { Type, applyDecorators } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiProperty,
  getSchemaPath,
} from '@nestjs/swagger';

export class ApiResponseWrapper<T> {
  @ApiProperty({ example: true, description: '요청 성공 여부' })
  success: boolean;

  data: T;
}

export class NullData {
  @ApiProperty({ example: null })
  data: any;
}

export const ApiOkReponseNull = (status?: number) =>
  applyDecorators(
    ApiExtraModels(ApiResponseWrapper, NullData),
    ApiOkResponse({
      status: status,
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseWrapper) },
          {
            $ref: getSchemaPath(NullData),
          },
        ],
      },
    }),
  );

export const ApiOkResponseWrapped = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ApiResponseWrapper, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseWrapper) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(dataDto),
                allOf: [{ $ref: getSchemaPath(dataDto) }],
              },
            },
          },
        ],
      },
    }),
  );

export const ApiOkResponseWrappedArray = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(ApiResponseWrapper, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ApiResponseWrapper) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
  );
