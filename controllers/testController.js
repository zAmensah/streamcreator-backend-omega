exports.getNetwork = async (req, res) => {
  const number = "0203024295";
  let getNetwork = number.substring(2, 3);

  if (getNetwork === "0") {
    return "Vodafone";
  }

  if (getNetwork === "4" || getNetwork === "5" || getNetwork === "9") {
    return "MTN";
  }

  if (getNetwork === "6" || getNetwork === "7") {
    return "AirtelTigo";
  }
};

exports.removeFirstChar = (req, res) => {
  let str = "Hello";

  str = str.substring(1);
  console.log(str);
};

exports.paymentRef = (req, res) => {
  var ref = Math.ceil(Math.random() * 10e13);
  console.log(ref);
};
