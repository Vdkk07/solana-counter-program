import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { expect, test } from "bun:test";
import { COUNTER_SIZE } from "./types";

let adminAccount = Keypair.generate();
let dataAccount = Keypair.generate();

const connection = new Connection("https://api.devnet.solana.com");
const PROGRAM_ID = new PublicKey(
  "9McmJpYaaCKey5Zmox3ZzSZJ98Q1EqUhi5oWmnZtKEvT"
);

test("Account is initialized", async () => {
  const res = await connection.requestAirdrop(
    adminAccount.publicKey,
    1 * LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(res);

  const lamports = await connection.getMinimumBalanceForRentExemption(
    COUNTER_SIZE
  );

  const createCounterAcccount = SystemProgram.createAccount({
    fromPubkey: adminAccount.publicKey,
    newAccountPubkey: dataAccount.publicKey,
    lamports,
    programId: PROGRAM_ID,
    space: COUNTER_SIZE,
  });

  const tx = new Transaction();
  tx.add(createCounterAcccount);

  const signature = await connection.sendTransaction(tx, [
    adminAccount,
    dataAccount,
  ]);
  await connection.confirmTransaction(signature);
  console.log(dataAccount.publicKey.toBase58());
});
