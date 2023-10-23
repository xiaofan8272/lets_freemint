import MTNFT from "../asset/abi/MTNFT.json";
import MTNFTest from "../asset/abi/MTNFTest.json";
class FMintNFT {
  static tokenURI(addr, library, tokenId) {
    return new Promise((resolve, reject) => {
      const _web3 = library;
      let contract = new _web3.eth.Contract(MTNFTest.abi, addr);
      try {
        contract.methods
          .tokenURI(tokenId)
          .call()
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static name(addr, library) {
    return new Promise((resolve, reject) => {
      const _web3 = library;
      let contract = new _web3.eth.Contract(MTNFTest.abi, addr);
      try {
        contract.methods
          .name()
          .call()
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static mint(addr, library, account) {
    return new Promise((resolve, reject) => {
      const _web3 = library;
      let contract = new _web3.eth.Contract(MTNFTest.abi, addr);
      try {
        contract.methods
          .mint()
          .send({
            from: account,
          })
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (err) {
        reject(err);
      }
    });
  }

  static transferEvent(addr, library) {
    return new Promise((resolve, reject) => {
      const _web3 = library;
      let contract = new _web3.eth.Contract(MTNFTest.abi, addr);
      contract.events
        .Transfer(
          {
            // filter: {
            //   myIndexedParam: [20, 23],
            //   myOtherIndexedParam: "0x123456789...",
            // }, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
          },
          function (error, event) {
            console.log(event);
          }
        )
        .on("connected", function (subscriptionId) {
          console.log(subscriptionId);
        })
        .on("data", function (event) {
          console.log(event); // same results as the optional callback above
        })
        .on("changed", function (event) {
          // remove event from local database
        })
        .on("error", function (error, receipt) {
          // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
        });
    });
  }
}

export default FMintNFT;
