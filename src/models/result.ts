export interface Result<T> {
  isSuccess: boolean;
  errorCode: ErrorCodes;
  value?: T;
}

export type ErrorCodes =
  | 'no-error'
  | 'invalid-time-slot'
  | 'time-slot-fully-booked'
  | 'user-has-existing-booking'
  | 'unknown-error'
  | 'invalid-model';

export class SuccessResult<T> implements Result<T> {
  constructor(val: T) {
    this.value = val;
    this.isSuccess = true;
    this.errorCode = 'no-error';
  }

  isSuccess: boolean;
  errorCode: ErrorCodes;
  value?: T;
}

export class ErrorResult<T> implements Result<T> {
  constructor(code: ErrorCodes) {
    this.errorCode = code;
    this.isSuccess = false;
  }

  isSuccess: boolean;
  errorCode: ErrorCodes;
  value?: T;
}

export class UnknownErrorResult<T> extends ErrorResult<T> {
  constructor() {
    super('unknown-error');
  }
}
