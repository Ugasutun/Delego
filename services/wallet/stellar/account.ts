import type { WalletAccount, StellarNetwork } from "@delego/types";

/** Stellar account utilities — TODO: Integrate stellar-sdk */
export interface AccountService {
  getAccount(address: string): Promise<WalletAccount | null>;
  createAccount(network: StellarNetwork): Promise<WalletAccount>;
}

export const accountService: AccountService = {
  async getAccount(address: string): Promise<WalletAccount | null> {
    // TODO: Fetch from Horizon API
    return { address, network: "testnet" };
  },

  async createAccount(network: StellarNetwork): Promise<WalletAccount> {
    // TODO: Generate keypair and fund on testnet
    throw new Error("Not implemented — TODO: stellar-sdk integration");
  },
};
