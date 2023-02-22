import { ApplicationError } from "../protocols";

export function unprocessableError(message: string = "Unprocessable Entity"): ApplicationError {
  return {
    name: "UnprocessableError",
    message,
  };
}