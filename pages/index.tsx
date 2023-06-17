import {
  ConnectWallet,
  Web3Button,
  useAddress,
  useContract,
  useOwnedNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { nftDropAddress } from "../const/constants";
import styles from "../styles/Home.module.css";
import NFTGrid from "../components/NFTGrid";
const Home: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(nftDropAddress);

  const { data, isLoading } = useOwnedNFTs(contract, address);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Token Bound Account NFT - ERC6551 + ERC4337</h1>
        <ConnectWallet />
        {!address ? (
          <p className={styles.description}>
            Connect your wallet to get started.{" "}
          </p>
        ) : (
          <>
            <h3>Your NFTs</h3>
            <NFTGrid
              isLoading={isLoading}
              nfts={data}
              emptyText="You don't own any NFTs yet"
            />
            <div>
              <Web3Button
                contractAddress={nftDropAddress}
                action={(contract) => contract.erc721.claim(1)}
              >
                Claim NFT
              </Web3Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
