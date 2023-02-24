import { ApplicationError } from "../protocols";

export function conflictError(message: string = "Conflict"): ApplicationError {
    return {
      name: "ConflictError",
      message,
    };
  }