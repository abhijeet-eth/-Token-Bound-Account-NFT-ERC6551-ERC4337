import {
  ThirdwebSDKProvider,
  useAddress,
  useBalance,
  Web3Button,
  ThirdwebNftMedia,
  useContract,
  useOwnedNFTs
} from "@thirdweb-dev/react";
import React from "react";
import {
  activeChain,
  editionDrop_Address,
  tokenAddress,
} from "../../const/constants";
import { Signer } from "ethers";
import style from "../../styles/Token.module.css";
// import toast from "react-hot-toast";
// import toastStyle from "../../util/toastConfig";
interface ConnectedProps {
  signer: Signer | undefined;
}

const SmartWalletConnected: React.FC<ConnectedProps> = ({ signer }) => {
  return (
    <ThirdwebSDKProvider signer={signer} activeChain={activeChain}>
      <ClaimTokens />
    </ThirdwebSDKProvider>
  );
};

const ClaimTokens = () => {
  const address = useAddress();
  const { data: tokenBalance } = useBalance(tokenAddress);

  const {
    contract
  } = useContract(editionDrop_Address);
  const {
    data: ownedNFTs,
    isLoading:ownedNFTsIsLoading
  } = useOwnedNFTs(contract,address)

  return (
    <div>
      <p>Smart Wallet Address: {address}</p>
      <h1>Claim Tokens:</h1>
      <p>Token Balance: {tokenBalance?.displayValue}</p>
      <Web3Button
        contractAddress={tokenAddress}
        action={(contract) => contract.erc20.claim(10)}
      >
        Claim Tokens
      </Web3Button>
      <br />
      <h1>Claim NFT:</h1>
      <Web3Button
        contractAddress={editionDrop_Address}
        action={(contract) => contract.erc1155.claim(0, 1)}
      >
        Claim NFT
      </Web3Button>
      <br /> <br />
      {ownedNFTsIsLoading ? (
        <p>Loading...</p>
      ) :(
        <div>
          {ownedNFTs && ownedNFTs.length > 0 ?(
            ownedNFTs.map((nft) => (
              <div>
                <ThirdwebNftMedia
                  metadata = {nft.metadata}
                  />
                  <p>{nft.metadata.name}</p>
                  <p>QTY:{nft.quantityOwned}</p>
              </div>
            ))
          ) :(
            <p>You have no NFTs</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SmartWalletConnected;
