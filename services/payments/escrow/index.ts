/** Escrow operations via Soroban contract — TODO: Implement */
export interface EscrowService {
  create(orderId: string, amountStroops: bigint): Promise<string>;
  release(escrowId: string): Promise<void>;
  refund(escrowId: string): Promise<void>;
}

export const escrowService: EscrowService = {
  async create(_orderId: string, _amountStroops: bigint): Promise<string> {
    throw new Error("Not implemented — TODO: escrow contract");
  },
  async release(_escrowId: string): Promise<void> {
    throw new Error("Not implemented");
  },
  async refund(_escrowId: string): Promise<void> {
    throw new Error("Not implemented");
  },
};
