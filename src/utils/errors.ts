import { isAxiosError } from "axios";

export const getAxiosErrorData = <T = unknown>(error: unknown): T | undefined => {
  if (isAxiosError<T>(error)) {
    return error.response?.data;
  }
  return undefined;
};

export const getErrorMessage = (error: unknown): string | undefined => {
  const data = getAxiosErrorData<{ message?: string }>(error);
  if (data?.message && typeof data.message === "string") {
    return data.message;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return undefined;
};
