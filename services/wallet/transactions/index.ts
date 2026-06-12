import type { TransactionRequest, TransactionResult } from "@delego/types";

/** Transaction signing and submission — TODO: stellar-sdk + Soroban */
export interface TransactionService {
  submit(request: TransactionRequest): Promise<TransactionResult>;
  simulate(request: TransactionRequest): Promise<unknown>;
}

export const transactionService: TransactionService = {
  async submit(_request: TransactionRequest): Promise<TransactionResult> {
    throw new Error("Not implemented — TODO: transaction submission");
  },
  async simulate(_request: TransactionRequest): Promise<unknown> {
    throw new Error("Not implemented — TODO: Soroban simulation");
  },
};
