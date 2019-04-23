import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
export declare function transformException(error: Error | undefined): Error | PayloadTooLargeException | BadRequestException;
