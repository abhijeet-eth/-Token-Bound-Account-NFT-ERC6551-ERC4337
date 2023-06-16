import { GetStaticProps, GetStaticPaths } from "next";
import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ThirdwebNftMedia, useAddress, useWallet } from "@thirdweb-dev/react";
import { nftDropAddress, activeChain } from "../../../const/constants";
import styles from "../../../styles/Home.module.css";
import { Signer } from "ethers";
import { useEffect, useState } from "react";
import SmartWalletConnected from "../../../components/SmartWallet/SmartWalletConnected"
import newSmartWallet from "../../../components/SmartWallet/SmartWallets";

type Props = {
  nft: NFT;
};

export default function Token({ nft }: Props) {
  const [smartWalletAddress, setSmartWalletAddress] = useState<
    string | undefined
  >(undefined);
  const [signer, setSigner] = useState<Signer>();

  const address = useAddress();
  const wallet = useWallet();
  useEffect(() => {
    const createSmartWallet = async (nft:NFT) => {
      if (nft && smartWalletAddress == null && address && wallet) {
        const smartWallet = newSmartWallet(nft);

        await smartWallet.connect({
          personalWallet: wallet,
        });
        setSigner(await smartWallet.getSigner());

        setSmartWalletAddress(await smartWallet.getAddress());

        return smartWallet;
      } else {
        console.log("Wallet not created");
      }
      createSmartWallet(nft);
    };
  }, [nft, smartWalletAddress, address, wallet]);
  return (
    <div className={styles.conatiners}>
      {nft && (
        <div>
          <ThirdwebNftMedia metadata={nft.metadata} />
          <h1>{nft.metadata.name}</h1>
          <p>Token Id: {nft.metadata.id}</p>
        </div>
      )}
      {smartWalletAddress ? 
      <SmartWalletConnected 
        signer = {signer}  
      /> : <p> Loading .... </p>}
    </div>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const tokenId = context.params?.tokenId as string;

  const sdk = new ThirdwebSDK(activeChain);

  const contract = await sdk.getContract(nftDropAddress);

  const nft = await contract.erc721.get(tokenId);

  return {
    props: {
      nft,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const sdk = new ThirdwebSDK(activeChain);

  const contract = await sdk.getContract(nftDropAddress);

  const nfts = await contract.erc721.getAll();

  const paths = nfts.map((nft) => {
    return {
      params: {
        contractAddress: nftDropAddress,
        tokenId: nft.metadata.id,
      },
    };
  });

  return {
    paths,
    fallback: "blocking",
  };
};
